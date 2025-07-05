"use client";

/*
  Component for accepting natural language prompts and showing streaming AI responses.
  Uses React Query for server interaction and Zustand for global state.
*/

import React, { useState, useRef } from "react";
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
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 border border-yellow-400/20 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">AI Code Assistant</h3>
        <p className="text-gray-400">
          Generate code snippets, explanations, and solutions from natural language prompts
        </p>
      </div>
      
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="prompt" className="text-sm font-medium text-yellow-200">
              Your Prompt
            </label>
            <div className="flex space-x-3">
              <Textarea
                id="prompt"
                placeholder="Describe what you want to build, debug, or understand..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="flex-1 bg-gray-800/50 border-yellow-400/30 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
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
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-400/25"
          >
            {isGenerating ? "Generating..." : "Generate Response"}
          </Button>
        </form>

        {response && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="response" className="text-sm font-medium text-yellow-200">
                AI Response
              </label>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={copyToClipboard}
                className="border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/10 hover:border-yellow-400"
              >
                Copy
              </Button>
            </div>
            <div
              id="response"
              ref={responseRef}
              className="bg-gray-800/50 border border-yellow-400/20 p-4 rounded-lg font-mono text-sm text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto"
            >
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
