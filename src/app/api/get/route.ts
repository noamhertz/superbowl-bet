import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    if (process.env.SHOW_BETS !== "true") {
      console.warn("SHOW_BETS is disabled. Returning 403.");
      return NextResponse.json({ error: "SHOW_BETS is disabled" }, { status: 403 });
    }

    const messages = await redis.lrange("messages", 0, -1);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error in GET /api/get:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
