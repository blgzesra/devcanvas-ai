import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { json } = await req.json();

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `
You are a senior software engineer.

Explain this JSON in a beginner-friendly way.

JSON:

${json}
`,
    });

    return NextResponse.json({
      result: response.output_text,
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