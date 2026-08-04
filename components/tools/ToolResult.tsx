"use client";

import { useState } from "react";

type ToolResultProps = {
  title: string;
  content: string;
};

export default function ToolResult({
  title,
  content,
}: ToolResultProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!content) return;

    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <button
          onClick={handleCopy}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
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