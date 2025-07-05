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

    const { code, instructions } = await request.json();
    if (!code || !instructions) {
      return NextResponse.json(
        { error: "Code and instructions are required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a code refactoring expert. Provide refactored code with clear explanations of changes. Return the response in JSON format with 'refactoredCode' and 'explanation' fields.",
        },
        {
          role: "user",
          content: `Refactor this code: ${instructions}\n\nCode:\n\`\`\`\n${code}\n\`\`\``,
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
        refactoredCode: response,
        explanation: "Code has been refactored according to your instructions.",
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Refactor API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 