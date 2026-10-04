import { NextResponse } from "next/server";
import { RateLimitError } from "openai";

export const AI_MODEL = "openrouter/free";

// Maps an OpenRouter/SDK error to a client-safe response. Rate limits (429)
// get a retry hint; everything else stays generic so no upstream details leak.
export function aiErrorResponse(error: unknown) {
  if (error instanceof RateLimitError) {
    return NextResponse.json(
      {
        error:
          "The free AI model is busy right now. Please try again in a minute.",
      },
      {
        status: 429,
      }
    );
  }

  return NextResponse.json(
    {
      error: "Something went wrong.",
    },
    {
      status: 500,
    }
  );
}
