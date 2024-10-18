import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

const privateKey = process.env.PRIVATE_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || crypto.randomUUID();
  const expire =
    searchParams.get("expire") ||
    (Math.floor(Date.now() / 1000) + 2400).toString();
  if (!privateKey) {
    return NextResponse.json(
      {
        error: "Private key not set in environment variables",
      },
      { status: 500 }
    );
  }
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    token,
    expire,
    signature,
  });
}
