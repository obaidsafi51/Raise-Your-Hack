"use client";

/*
  Homepage of the AI-powered developer assistant.
  Provides a welcome message and main entry point.
*/

import React from "react";
import PromptGeneratePanel from "@/components/PromptGeneratePanel";
import RefactorWidget from "@/components/RefactorWidget";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Developer Assistant</h1>
        <p className="text-lg text-muted-foreground">
          Generate code, refactor existing code, and review pull requests with AI assistance
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <PromptGeneratePanel />
        <RefactorWidget />
      </div>
    </main>
  );
}
