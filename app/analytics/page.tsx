"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";

interface Analytics {
  totalPrompts: number;
  totalPRReviews: number;
  averageResponseTime: number;
  mostUsedFeatures: Array<{
    feature: string;
    count: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    timestamp: string;
    description: string;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        <div className="text-center">No analytics data available.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Prompts"
          value={analytics.totalPrompts.toString()}
          description="AI interactions"
        />
        <StatCard
          title="PR Reviews"
          value={analytics.totalPRReviews.toString()}
          description="GitHub reviews"
        />
        <StatCard
          title="Avg Response Time"
          value={`${analytics.averageResponseTime}ms`}
          description="AI response speed"
        />
        <StatCard
          title="Active Features"
          value={analytics.mostUsedFeatures.length.toString()}
          description="Features used"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most Used Features</CardTitle>
            <CardDescription>Your most frequently used AI features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.mostUsedFeatures.map((feature, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{feature.feature}</span>
                  <span className="text-sm text-muted-foreground">{feature.count} uses</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 