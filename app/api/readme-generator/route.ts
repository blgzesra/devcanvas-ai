import OpenAI from "openai";
import { NextResponse } from "next/server";

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
      model: "qwen/qwen3-coder:free",
      messages: [
        {
          role: "system",
          content:
            "You are a senior technical writer and developer. Generate a polished, professional README for a software project based on the user's description. Include sections such as Overview, Features, Tech Stack, Getting Started, Usage, and Project Structure when relevant. Return only the README content in Markdown.",
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
