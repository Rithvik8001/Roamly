import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.PPLX_API_KEY,
  baseURL: process.env.PPLX_BASE_URL,
});

export async function POST(request: Request) {
  try {
    if (!process.env.PPLX_API_KEY || !process.env.PPLX_BASE_URL) {
      return new Response(
        JSON.stringify({
          error: "Missing PPLX_API_KEY or PPLX_BASE_URL environment variable",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const input: string = body?.input ?? body?.prompt;

    if (!input || typeof input !== "string") {
      return new Response(JSON.stringify({ error: "Missing input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `You are an expert travel planner. Create a concise, practical, day-by-day travel itinerary based on the user's request. Infer missing details reasonably.
    User request: "${input}"
    Return well-structured markdown with:
      - Overview: trip summary and key tips
      - Day-by-day plan: bullets per day (morning/afternoon/evening)
      - Budget notes: rough ranges and savings tips
      - Logistics: transport and neighborhood suggestions`;

    const result = await streamText({
      model: openai.chat("sonar-pro"),
      messages: [
        {
          role: "system",
          content:
            "You are an expert travel planner. Only answer travel-related queries (destinations, itineraries, logistics, budgets, activities, seasons). If the request is not related to travel, reply exactly: 'I can't answer that—this assistant only handles travel planning.' Keep answers concise and highly actionable.",
        },
        { role: "user", content: prompt },
      ],
      providerOptions: {
        openai: {
          extraBody: { return_images: true, search_mode: "web" },
        },
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate itinerary" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
