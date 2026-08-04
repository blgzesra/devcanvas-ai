"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function ApiMockGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const examplePrompt = "User API";

  function handleGenerate() {
    if (!prompt.trim()) {
      setResult("⚠️ Please describe the API.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResult(`{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Admin"
}

⚠️ Demo response.
OpenAI integration will generate realistic mock APIs later.`);
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
          title="API Mock Generator"
          description="Describe an API and generate a mock JSON response."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: User API"
            className="h-40 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Mock API"}
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
          title="Generated JSON"
          content={result || "Generated mock API response will appear here..."}
        />

      </div>
    </main>
  );
}