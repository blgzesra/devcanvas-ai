import OpenAI from "openai";
import { NextResponse } from "next/server";

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
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "system",
          content:
            "You are a UI/UX designer. Generate a harmonious color palette for the requested theme. Return exactly five hex colors with labels in this format: Primary: #HEX, Secondary: #HEX, Accent: #HEX, Background: #HEX, Text: #HEX. Ensure the colors work well together and are realistic for a modern web app.",
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
