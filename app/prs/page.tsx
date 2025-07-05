"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PRReviewCard from "@/components/PRReviewCard";

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

export default function PRsPage() {
  const [prs, setPrs] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPRs();
  }, []);

  const fetchPRs = async () => {
    try {
      const response = await fetch("/api/github/prs");
      if (response.ok) {
        const data = await response.json();
        setPrs(data);
      }
    } catch (error) {
      console.error("Error fetching PRs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">PR Dashboard</h1>
        <div className="text-center">Loading PRs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">PR Dashboard</h1>
        <Button onClick={fetchPRs}>Refresh</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {prs.map((pr) => (
          <PRReviewCard key={pr.id} pr={pr} />
        ))}
      </div>

      {prs.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No PRs Found</CardTitle>
            <CardDescription>
              You don&apos;t have any pull requests to review at the moment.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
