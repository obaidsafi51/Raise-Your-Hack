"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RefactorWidgetProps {
  initialCode?: string;
  onRefactoredCode?: (code: string, explanation: string) => void;
}

export default function RefactorWidget({ initialCode = "", onRefactoredCode }: RefactorWidgetProps) {
  const [code, setCode] = useState(initialCode);
  const [instructions, setInstructions] = useState("");
  const [refactoredCode, setRefactoredCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRefactor = async () => {
    if (!code.trim() || !instructions.trim()) {
      alert("Please provide both code and refactoring instructions");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/refactor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          instructions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRefactoredCode(data.refactoredCode || "");
        setExplanation(data.explanation || "");
        
        if (onRefactoredCode) {
          onRefactoredCode(data.refactoredCode, data.explanation);
        }
      } else {
        console.error("Refactoring failed");
      }
    } catch (error) {
      console.error("Error refactoring code:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Refactor</CardTitle>
        <CardDescription>
          Select code and provide refactoring instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Code to Refactor</label>
          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Refactoring Instructions</label>
          <Textarea
            placeholder="e.g., Improve readability, optimize performance, follow best practices..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          onClick={handleRefactor}
          disabled={loading || !code.trim() || !instructions.trim()}
          className="w-full"
        >
          {loading ? "Refactoring..." : "Refactor Code"}
        </Button>

        {refactoredCode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Refactored Code</label>
              <div className="relative">
                <Textarea
                  value={refactoredCode}
                  readOnly
                  rows={8}
                  className="font-mono text-sm bg-gray-50"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(refactoredCode)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {explanation && (
              <div>
                <label className="block text-sm font-medium mb-2">Explanation</label>
                <div className="p-3 bg-blue-50 rounded-md text-sm">
                  {explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 