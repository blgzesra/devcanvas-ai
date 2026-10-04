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
      max_tokens: 800,
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

    const choice = response.choices[0];

    return NextResponse.json({
      result: choice?.message?.content ?? "No response.",
      truncated: choice?.finish_reason === "length",
    });
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