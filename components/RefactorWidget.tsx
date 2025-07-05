"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RefactorWidgetProps {
  initialCode?: string;
  onRefactoredCode?: (code: string, explanation: string) => void;
}

export default function RefactorWidget({
  initialCode = "",
  onRefactoredCode,
}: RefactorWidgetProps) {
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
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 border border-yellow-400/20 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Code Refactor</h3>
        <p className="text-gray-400">
          Select code and provide refactoring instructions
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-3 text-yellow-200">
            Code to Refactor
          </label>
          <Textarea
            id="code"
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            className="font-mono text-sm bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
          />
        </div>

        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium mb-3 text-yellow-200"
          >
            Refactoring Instructions
          </label>
          <Textarea
            id="instructions"
            placeholder="e.g., Improve readability, optimize performance, follow best practices..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={3}
            className="bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
          />
        </div>

        <Button
          onClick={handleRefactor}
          disabled={loading || !code.trim() || !instructions.trim()}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
        >
          {loading ? "Refactoring..." : "Refactor Code"}
        </Button>

        {refactoredCode && (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="refactored-code"
                className="block text-sm font-medium mb-3 text-yellow-200"
              >
                Refactored Code
              </label>
              <div className="relative">
                <Textarea
                  id="refactored-code"
                  value={refactoredCode}
                  readOnly
                  rows={8}
                  className="font-mono text-sm bg-gray-800/50 border-yellow-400/20 text-gray-200"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/10 hover:border-yellow-400"
                  onClick={() => copyToClipboard(refactoredCode)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {explanation && (
              <div>
                <label
                  htmlFor="explanation"
                  className="block text-sm font-medium mb-3 text-yellow-200"
                >
                  Explanation
                </label>
                <div className="p-4 bg-gray-800/50 border border-yellow-400/20 rounded-lg text-sm text-gray-200">
                  {explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
