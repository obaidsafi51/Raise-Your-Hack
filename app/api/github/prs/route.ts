import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface GitHubPR {
  id: number;
  title: string;
  number: number;
  state: string;
  html_url: string;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  repository_url: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 },
      );
    }

    // Fetch PRs from GitHub API
    const response = await fetch(
      "https://api.github.com/search/issues?q=is:pr+is:open+author:@me",
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to include repository information
    const prs = await Promise.all(
      data.items.map(async (pr: GitHubPR) => {
        const repoResponse = await fetch(pr.repository_url, {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        const repoData = await repoResponse.json();

        return {
          id: pr.id,
          title: pr.title,
          number: pr.number,
          state: pr.state,
          html_url: pr.html_url,
          created_at: pr.created_at,
          user: {
            login: pr.user.login,
            avatar_url: pr.user.avatar_url,
          },
          repository: {
            name: repoData.name,
            full_name: repoData.full_name,
          },
        };
      }),
    );

    return NextResponse.json(prs);
  } catch (error) {
    console.error("GitHub PRs API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
