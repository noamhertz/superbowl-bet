import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { bettorName, bets } = await req.json();

    // Validate inputs
    if (!bettorName || typeof bettorName !== "string" || !Array.isArray(bets) || bets.length < 1) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Validate each bet
    for (const bet of bets) {
      if (
        typeof bet.betId !== "number" ||
        typeof bet.option !== "string" ||
        typeof bet.wager !== "number" ||
        typeof bet.odds !== "string"
      ) {
        return NextResponse.json({ error: "Invalid bet format" }, { status: 400 });
      }
    }

    const timestamp = new Date().toISOString();

    // Store bets in Redis
    const betData = {
      bettorName,
      bets, // Now includes odds
      timestamp,
    };

    // LPUSH adds new entries to a "bets" list
    await redis.lpush("bets", JSON.stringify(betData));

    return NextResponse.json({ success: true, data: betData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
