import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        promptLogs: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        prReviews: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate analytics
    const totalPrompts = user.promptLogs.length;
    const totalPRReviews = user.prReviews.length;
    
    // Calculate average response time (mock data for now)
    const averageResponseTime = 1500; // ms

    // Get most used features (mock data for now)
    const mostUsedFeatures = [
      { feature: "Code Generation", count: Math.floor(totalPrompts * 0.6) },
      { feature: "Code Refactoring", count: Math.floor(totalPrompts * 0.3) },
      { feature: "PR Reviews", count: totalPRReviews },
      { feature: "Voice Commands", count: Math.floor(totalPrompts * 0.1) },
    ];

    // Generate recent activity
    const recentActivity = [
      ...user.promptLogs.slice(0, 5).map((log) => ({
        id: log.id,
        type: "prompt",
        timestamp: log.createdAt.toISOString(),
        description: `Generated code for: "${log.prompt.substring(0, 50)}..."`,
      })),
      ...user.prReviews.slice(0, 5).map((review) => ({
        id: review.id,
        type: "pr_review",
        timestamp: review.createdAt.toISOString(),
        description: `Reviewed PR #${review.prNumber} in ${review.repo}`,
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
     .slice(0, 10);

    return NextResponse.json({
      totalPrompts,
      totalPRReviews,
      averageResponseTime,
      mostUsedFeatures,
      recentActivity,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 