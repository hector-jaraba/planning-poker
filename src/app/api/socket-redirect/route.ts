import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  return NextResponse.json({
    message: "The Socket.IO server is available at /api/socketio",
    instructions:
      "This planning poker app uses Socket.IO for real-time functionality",
    status: "online",
  });
}
