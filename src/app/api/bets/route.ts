import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface Bet {
  betId: number;
  option: string;
  wager: number;
  odds: string;
}

interface StoredBet {
  bettorName: string;
  bets: Bet[];
  timestamp: string;
}

export async function GET() {
  try {
    const bets: StoredBet[] = await redis.lrange("bets", 0, -1); // Get stored bets directly

    return NextResponse.json(bets, { status: 200 });
  } catch (error) {
    console.error("Error fetching bets:", error);
    return NextResponse.json({ error: "Failed to load bets" }, { status: 500 });
  }
}
