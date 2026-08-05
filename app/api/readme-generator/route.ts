import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AI_MODEL } from "../../../lib/ai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (typeof description !== "string" || !description.trim()) {
      return NextResponse.json(
        {
          error: "Repository description is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await client.chat.completions.create({
      model: AI_MODEL,
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "Write a polished README in Markdown for the project description. Include useful sections only when relevant.",
        },
        {
          role: "user",
          content: description,
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

    return NextResponse.json({ result: result || "No README generated." });
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
