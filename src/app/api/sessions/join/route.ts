import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import SessionModel from "@/models/Session";
import { connect } from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to database
    await connect();

    // Parse request body
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID or share link is required" },
        { status: 400 }
      );
    }

    // Find the session by ID or share link
    let planningSession;

    // Check if it's a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(sessionId)) {
      planningSession = await SessionModel.findById(sessionId);
    }

    // If not found by ID, try to find by share link
    if (!planningSession) {
      planningSession = await SessionModel.findOne({ shareLink: sessionId });
    }

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Add user to participants if not already included
    const userId = session.user.id;
    if (!planningSession.participants.includes(userId)) {
      planningSession.participants.push(userId);
      await planningSession.save();
    }

    return NextResponse.json({
      _id: planningSession._id,
      name: planningSession.name,
    });
  } catch (error) {
    console.error("Failed to join session:", error);
    return NextResponse.json(
      { message: "Failed to join session" },
      { status: 500 }
    );
  }
}
