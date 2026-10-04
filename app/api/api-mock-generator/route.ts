import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AI_MODEL, aiErrorResponse } from "../../../lib/ai";

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
          error: "API description is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.3,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content:
            "Generate a realistic JSON API mock for the described endpoint. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
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
      result: result || (truncated ? "" : "No API mock generated."),
      truncated,
    });
  } catch (error) {
    console.error(error);

    return aiErrorResponse(error);
  }
}
