import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    // Check if SHOW_BETS is enabled
    if (process.env.SHOW_BETS !== "true") {
      return NextResponse.json({ error: "SHOW_BETS is disabled" }, { status: 403 });
    }

    // Fetch all stored messages from Redis List
    const messages = await redis.lrange("messages", 0, -1);

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error in GET /api/get:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
