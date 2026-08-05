import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AI_MODEL } from "../../../lib/ai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { json } = await req.json();

    if (!json || typeof json !== "string") {
      return NextResponse.json(
        {
          error: "JSON is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.3,
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: "Explain the JSON in beginner-friendly terms.",
        },
        {
          role: "user",
          content: json,
        },
      ],
    });

    return NextResponse.json({
      result: response.choices[0]?.message?.content ?? "No response.",
    });
  } catch (error: unknown) {
    console.error("OPENROUTER ERROR:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : typeof error === "string"
            ? error
            : JSON.stringify(error, null, 2);

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}