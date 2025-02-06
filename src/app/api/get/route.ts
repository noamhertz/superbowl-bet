import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    // Fetch all stored messages
    const messages = await redis.lrange("messages", 0, -1);

    // Parse JSON messages
    const parsedMessages = messages.map((msg: string) => JSON.parse(msg));

    return NextResponse.json(parsedMessages);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
