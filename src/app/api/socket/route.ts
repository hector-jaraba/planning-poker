import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: NextRequest) {
  // Redirect to the new Socket.io implementation
  return NextResponse.json({
    status: "Socket.io is now integrated into Next.js",
    info: "Socket.io server is running through the /api/socketio route",
    usage: "Simply run 'npm run dev' to start both Next.js and Socket.io",
  });
}
