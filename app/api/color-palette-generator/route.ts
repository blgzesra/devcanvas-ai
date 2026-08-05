import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AI_MODEL } from "../../../lib/ai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    if (typeof theme !== "string" || !theme.trim()) {
      return NextResponse.json(
        {
          error: "Theme is required.",
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
          content:
            "Create a harmonious 5-color palette for the theme. Return exactly: Primary: #HEX, Secondary: #HEX, Accent: #HEX, Background: #HEX, Text: #HEX.",
        },
        {
          role: "user",
          content: theme,
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

    return NextResponse.json({ result: result || "No palette generated." });
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
