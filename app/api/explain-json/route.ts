import OpenAI from "openai";
import { NextResponse } from "next/server";

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
      model: "qwen/qwen3-coder:free",
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer. Explain JSON in a beginner-friendly way.",
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