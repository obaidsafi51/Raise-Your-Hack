"use client";

/*
  Component for accepting natural language prompts and showing streaming AI responses.
  Uses React Query for server interaction and Zustand for global state.
*/

import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import VoiceControl from "./VoiceControl";

export default function PromptGeneratePanel() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setResponse("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                setResponse((prev) => prev + parsed.content);
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Error: Failed to generate response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceTranscription = (transcription: string) => {
    setPrompt(transcription);
  };

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Code Assistant</CardTitle>
        <CardDescription>
          Generate code snippets, explanations, and solutions from natural
          language prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Your Prompt
            </label>
            <div className="flex space-x-2">
              <Textarea
                id="prompt"
                placeholder="Describe what you want to build, debug, or understand..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="flex-1"
              />
              <VoiceControl
                onTranscription={handleVoiceTranscription}
                disabled={isGenerating}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Response"}
          </Button>
        </form>

        {response && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="response" className="text-sm font-medium">
                AI Response
              </label>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
            <div
              id="response"
              ref={responseRef}
              className="bg-gray-50 p-4 rounded-md font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto"
            >
              {response}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
