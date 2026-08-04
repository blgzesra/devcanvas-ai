"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function ColorPaletteGeneratorPage() {
  const [theme, setTheme] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleTheme = "Fintech Startup";

  async function handleGenerate() {
    if (!theme.trim()) {
      setResult("⚠️ Please enter a theme.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/color-palette-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
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
    setTheme("");
    setResult("");
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <ToolHeader
          title="Color Palette Generator"
          description="Describe a theme and generate a color palette."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">

          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Example: Fintech Startup"
            className="h-40 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerate}
              disabled={loading}
className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.18)]"            >
              {loading ? "Generating..." : "Generate Palette"}
            </button>

            <button
              onClick={() => setTheme(exampleTheme)}
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