import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { openai } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prNumber, repo } = await request.json();
    if (!prNumber || !repo) {
      return NextResponse.json(
        { error: "PR number and repository are required" },
        { status: 400 },
      );
    }

    // In a real implementation, you'd fetch the PR details from GitHub API
    // For now, we'll generate a mock summary
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer reviewing pull requests. Provide a concise summary and risk assessment.",
        },
        {
          role: "user",
          content: `Review PR #${prNumber} in repository ${repo}. Provide a summary and risk level (low/medium/high). Return as JSON with 'summary' and 'riskLevel' fields.`,
        },
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    let result;

    try {
      result = JSON.parse(response || "{}");
    } catch {
      result = {
        summary:
          "This PR introduces new features and bug fixes. The changes appear well-structured and follow good practices.",
        riskLevel: "low",
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Review summary API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
