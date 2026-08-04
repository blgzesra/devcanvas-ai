"use client";

import { useState } from "react";

type ToolResultProps = {
  title: string;
  content: string;
  hasResult: boolean;
};

export default function ToolResult({
  title,
  content,
  hasResult,
}: ToolResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!hasResult) return;

    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error("Failed to copy.");
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <button
          onClick={handleCopy}
          disabled={!hasResult}
          className={`rounded-lg border px-4 py-2 text-sm transition ${
            hasResult
              ? "border-zinc-700 hover:bg-zinc-800"
              : "cursor-not-allowed border-zinc-800 text-zinc-600"
          }`}
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>

      <div className="min-h-[220px] whitespace-pre-wrap rounded-xl bg-[#0A0A0A] p-5 text-zinc-300">
        {content}
      </div>
    </div>
  );
}