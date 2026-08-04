"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function FakeDataGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const examplePrompt = "Generate 5 fake users";

  function handleGenerate() {
    if (!prompt.trim()) {
      setResult("⚠️ Please describe the fake data you need.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResult(`Fake Data Generated (Demo)

Name: John Doe
Email: john@example.com
Company: DevCanvas Labs
Address: 123 Main Street

• AI can generate realistic names, emails and addresses.
• OpenAI integration will generate dynamic fake data automatically.`);
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
          title="Fake Data Generator"
          description="Generate realistic fake names, emails, companies and addresses."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Generate 5 fake users..."
            className="h-40 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Fake Data"}
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