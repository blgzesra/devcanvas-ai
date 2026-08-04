"use client";

import { useState } from "react";

import ToolHeader from "@/components/tools/ToolHeader";
import ToolResult from "@/components/tools/ToolResult";

export default function JsonExplainPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleJson = `{
  "name": "Esra",
  "age": 21,
  "skills": [
    "Next.js",
    "React",
    "Tailwind CSS"
  ],
  "isStudent": true
}`;

  function handleExplain() {
    if (!jsonInput.trim()) return;

    try {
      JSON.parse(jsonInput);
    } catch {
      setResponse("❌ Invalid JSON. Please check your syntax.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setResponse(`JSON received successfully.

AI analysis (Demo)

• Your JSON is valid.
• The AI will analyze each field.
• In the next step this response will come from OpenAI.`);
      setLoading(false);
    }, 1500);
  }

  function handleClear() {
    setJsonInput("");
    setResponse("");
  }

  function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    setJsonInput(e.target?.result as string);
  };

  reader.readAsText(file);
}

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">

        <ToolHeader
          title="JSON Explain"
          description="Paste your JSON and let AI explain every field."
        />

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="h-80 w-full resize-none rounded-xl bg-[#0A0A0A] p-5 outline-none"
          />

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={handleExplain}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Explain with AI"}
            </button>

            <button
              onClick={() => setJsonInput(exampleJson)}
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

       <div className="mt-4">
  <label className="inline-flex cursor-pointer items-center rounded-xl border border-zinc-700 px-5 py-3 transition hover:bg-zinc-800">
    📁 Upload JSON

    <input
      type="file"
      accept=".json"
      onChange={handleFileUpload}
      className="hidden"
    />
  </label>
</div>

        <ToolResult
          title="AI Response"
          content={response || "AI explanation will appear here..."}
        />

      </div>
    </main>
  );
}