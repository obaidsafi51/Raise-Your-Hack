"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import VoiceControl from "./VoiceControl";

interface GenerationResult {
  success: boolean;
  project: {
    name: string;
    path: string;
    description: string;
  };
  preview: {
    url: string;
    instructions: string;
  };
  files: string[];
  dependencies: string[];
  generationTime: string;
}

export default function PromptGeneratePanel() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setResult(null);
    setError(null);
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate app");
      }

      const data: GenerationResult = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating app:", error);
      setError(error instanceof Error ? error.message : "Failed to generate app");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVoiceTranscription = (transcription: string) => {
    setPrompt(transcription);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-8 border border-yellow-400/20 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">AI Code Assistant</h3>
        <p className="text-gray-400">
          Describe what you want to build and Athena will create a complete React application for you
        </p>
      </div>
      
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="prompt" className="text-sm font-medium text-yellow-200">
              Your Request
            </label>
            <div className="flex space-x-3">
              <Textarea
                id="prompt"
                placeholder="e.g., Create a todo app with dark mode, Build a weather dashboard, Make a portfolio website..."
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
            {isGenerating ? "Creating Your App..." : "Generate React App"}
          </Button>
        </form>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-400/30 rounded-lg text-red-200">
            <h4 className="font-semibold mb-2">Error</h4>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="p-6 bg-green-900/20 border border-green-400/30 rounded-lg">
              <h4 className="text-xl font-bold text-green-400 mb-4">✅ App Generated Successfully!</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-yellow-200 mb-2">Project</h5>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-gray-300 mb-2">
                      <span className="text-yellow-200">Name:</span> {result.project.name}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <span className="text-yellow-200">Description:</span> {result.project.description}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <span className="text-yellow-200">Path:</span> {result.project.path}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <span className="text-yellow-200">Generation Time:</span> {result.generationTime}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(result.project.path)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Copy Path
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`cd "${result.project.path}" && npm install && npm start`)}
                        className="border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/10"
                      >
                        Copy Commands
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-yellow-200 mb-2">Preview Your App</h5>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-gray-300 mb-3">
                      <span className="text-yellow-200">Preview URL:</span> {result.preview.url}
                    </p>
                    <div className="bg-gray-900/50 p-3 rounded border border-gray-600/30">
                      <h6 className="text-sm font-semibold text-yellow-200 mb-2">Instructions:</h6>
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                        {result.preview.instructions}
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-yellow-200 mb-2">Generated Files</h5>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {result.files.map((file, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-yellow-600/20 border border-yellow-400/30 rounded text-yellow-200 text-sm"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-yellow-200 mb-2">Dependencies</h5>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {result.dependencies.map((dep, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-600/20 border border-blue-400/30 rounded text-blue-200 text-sm"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
