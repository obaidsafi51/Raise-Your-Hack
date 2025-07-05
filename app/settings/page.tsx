"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Settings {
  githubToken?: string;
  openaiApiKey?: string;
  enableVoiceControl: boolean;
  enablePRReviews: boolean;
  enableAnalytics: boolean;
  theme: "light" | "dark" | "system";
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    enableVoiceControl: true,
    enablePRReviews: true,
    enableAnalytics: true,
    theme: "system",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="text-center">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>API Tokens</CardTitle>
            <CardDescription>Configure your API keys for external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                GitHub Personal Access Token
              </label>
              <Textarea
                placeholder="ghp_..."
                value={settings.githubToken || ""}
                onChange={(e) => setSettings({ ...settings, githubToken: e.target.value })}
                rows={2}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required for PR reviews and GitHub integration
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                OpenAI API Key
              </label>
              <Textarea
                placeholder="sk-..."
                value={settings.openaiApiKey || ""}
                onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
                rows={2}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required for AI code generation and voice transcription
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>Enable or disable specific features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Voice Control</label>
                <p className="text-xs text-muted-foreground">
                  Enable voice-to-text for prompts
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableVoiceControl}
                onChange={(e) => setSettings({ ...settings, enableVoiceControl: e.target.checked })}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">PR Reviews</label>
                <p className="text-xs text-muted-foreground">
                  Enable GitHub PR review features
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enablePRReviews}
                onChange={(e) => setSettings({ ...settings, enablePRReviews: e.target.checked })}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Analytics</label>
                <p className="text-xs text-muted-foreground">
                  Track usage analytics and metrics
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAnalytics}
                onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the app appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
} 