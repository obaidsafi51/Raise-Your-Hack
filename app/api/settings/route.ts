import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface UserSettings {
  enableVoiceControl: boolean;
  enablePRReviews: boolean;
  enableAnalytics: boolean;
  theme: string;
  githubToken?: string;
  openaiApiKey?: string;
}

// In a real app, you'd store settings in the database
// For now, we'll use a simple in-memory store
const userSettings = new Map<string, UserSettings>();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = userSettings.get(session.user.email) || {
      enableVoiceControl: true,
      enablePRReviews: true,
      enableAnalytics: true,
      theme: "system",
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings GET API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await request.json();

    // Validate settings
    const validSettings: UserSettings = {
      enableVoiceControl: Boolean(settings.enableVoiceControl),
      enablePRReviews: Boolean(settings.enablePRReviews),
      enableAnalytics: Boolean(settings.enableAnalytics),
      theme: ["light", "dark", "system"].includes(settings.theme)
        ? settings.theme
        : "system",
      githubToken: settings.githubToken || "",
      openaiApiKey: settings.openaiApiKey || "",
    };

    userSettings.set(session.user.email, validSettings);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
