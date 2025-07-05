"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PR {
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
  repository: {
    name: string;
    full_name: string;
  };
}

interface PRReviewCardProps {
  pr: PR;
}

export default function PRReviewCard({ pr }: PRReviewCardProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [riskLevel, setRiskLevel] = useState<string>("");

  const generateReview = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/review-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prNumber: pr.number,
          repo: pr.repository.full_name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
        setRiskLevel(data.riskLevel);
      }
    } catch (error) {
      console.error("Error generating review:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{pr.title}</CardTitle>
            <CardDescription>
              #{pr.number} by {pr.user.login} • {pr.repository.name}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                pr.state === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {pr.state}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <img
            src={pr.user.avatar_url}
            alt={pr.user.login}
            className="w-5 h-5 rounded-full"
          />
          <span>{pr.user.login}</span>
          <span>•</span>
          <span>{new Date(pr.created_at).toLocaleDateString()}</span>
        </div>

        {summary && (
          <div className="space-y-2">
            <div className="text-sm">
              <strong>Summary:</strong>
              <p className="text-muted-foreground mt-1">{summary}</p>
            </div>
            {riskLevel && (
              <div className="text-sm">
                <strong>Risk Level:</strong>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${getRiskColor(riskLevel)}`}
                >
                  {riskLevel}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            onClick={generateReview}
            disabled={loading}
            size="sm"
            className="flex-1"
          >
            {loading ? "Generating..." : "Generate Review"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(pr.html_url, "_blank")}
          >
            View PR
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
