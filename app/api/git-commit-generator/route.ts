import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { changes } = await req.json();

    if (typeof changes !== "string" || !changes.trim()) {
      return NextResponse.json(
        {
          error: "Changes description is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.chat.completions.create({
      model: "qwen/qwen3-coder:free",
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer. Generate a Conventional Commit message for the described changes. Return only a concise commit message with a valid type and short summary. Prefer types like feat, fix, docs, refactor, chore, style, perf, test, build, ci. If needed, include a short body after a blank line.",
        },
        {
          role: "user",
          content: changes,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    const result =
      Array.isArray(content)
        ? content
            .map((part) =>
              typeof part === "string" ? part : part?.text || ""
            )
            .join("")
        : typeof content === "string"
          ? content
          : "";

    return NextResponse.json({ result: result || "No commit message generated." });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
