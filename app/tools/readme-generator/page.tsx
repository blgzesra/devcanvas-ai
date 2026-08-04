"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function ReadmeGeneratorPage() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleDescription =
    "An AI-powered developer toolkit built with Next.js, React and Tailwind CSS.";

  async function handleGenerate() {
    if (!description.trim()) {
      setResult("⚠️ Please enter a repository description.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/readme-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Something went wrong.");
      } else {
        setResult(data.result);
      }
    } catch {
      setResult("❌ Failed to connect to AI.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setDescription("");
    setResult("");
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <ToolHeader
          title="README Generator"
          description="Write a repository description and generate a professional README."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your repository..."
            className="h-56 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate README"}
            </button>

            <button
              onClick={() => setDescription(exampleDescription)}
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