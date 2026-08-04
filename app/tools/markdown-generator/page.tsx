"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function MarkdownGeneratorPage() {
  const [markdown, setMarkdown] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleMarkdown = `# DevCanvas AI

## Features

- JSON Explain
- Regex Generator
- Markdown Generator`;

  function handleGenerate() {
    if (!markdown.trim()) {
      setResult("⚠️ Please enter some markdown.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResult(`Markdown processed successfully.

AI Enhancement (Demo)

• Markdown structure looks good.
• AI can improve formatting.
• OpenAI integration will be enabled later.`);
      setLoading(false);
    }, 1200);
  }

  function handleClear() {
    setMarkdown("");
    setResult("");
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <ToolHeader
          title="Markdown Generator"
          description="Write markdown and improve it with AI."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown..."
            className="h-80 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Improve with AI"}
            </button>

            <button
              onClick={() => setMarkdown(exampleMarkdown)}
              className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-800"
            >
              Load Example
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-red-700 px-6 py-3 text-red-400 transition hover:bg-red-900/20"
            >
              Clear
            </button>

          </div>

        </div>

        <ToolResult
          title="AI Response"
          content={result || "AI response will appear here..."}
        />

      </div>
    </main>
  );
}