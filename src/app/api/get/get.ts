import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data.json");

export async function GET() {
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContents));
  }

  return NextResponse.json([]);
}
