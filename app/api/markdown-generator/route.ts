import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AI_MODEL, aiErrorResponse } from "../../../lib/ai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { markdown } = await req.json();

    if (typeof markdown !== "string" || !markdown.trim()) {
      return NextResponse.json(
        {
          error: "Markdown is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.3,
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: "Improve the markdown for clarity and structure. Return valid markdown only.",
        },
        {
          role: "user",
          content: markdown,
        },
      ],
    });

    const choice = response.choices[0];
    const content = choice?.message?.content;
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

    const truncated = choice?.finish_reason === "length";

    return NextResponse.json({
      result: result || (truncated ? "" : "No markdown generated."),
      truncated,
    });
  } catch (error) {
    console.error(error);

    return aiErrorResponse(error);
  }
}
