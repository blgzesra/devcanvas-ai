"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function RegexGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const examplePrompt = "Match all valid email addresses";

  function handleGenerate() {
    if (!prompt.trim()) {
      setResult("⚠️ Please describe the regex you want to generate.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResult(`Regex:
/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/

Explanation:

• Matches most valid email addresses.
• Supports usernames with dots, underscores and special characters.
• OpenAI integration will generate custom regex patterns later.`);
      setLoading(false);
    }, 1200);
  }

  function handleClear() {
    setPrompt("");
    setResult("");
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <ToolHeader
          title="Regex Generator"
          description="Describe what you need and generate a regex pattern."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Match all valid email addresses..."
            className="h-48 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Regex"}
            </button>

            <button
              onClick={() => setPrompt(examplePrompt)}
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
  title="Generated Regex"
  content={
    result ||
    "Your AI-generated regular expression will appear here."
  }
  hasResult={!!result}
/>

      </div>
    </main>
  );
}