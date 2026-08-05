import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        {
          error: "Prompt is required.",
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
            "You are a senior software engineer. Generate a precise regex pattern for the user's requirement. Explain the pattern in a developer-friendly way with examples when helpful. Return the regex and a clear explanation.",
        },
        {
          role: "user",
          content: prompt,
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

    return NextResponse.json({ result: result || "No regex generated." });
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
