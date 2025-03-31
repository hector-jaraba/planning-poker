import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import SessionModel from "@/models/Session";
import { connect } from "@/lib/db";

// Simulated JIRA issues (for MVP - in a real app this would connect to JIRA API)
const mockJiraIssues = [
  {
    id: "PROJ-1",
    title: "Implement user authentication",
    description: "Create user login and registration functionality",
  },
  {
    id: "PROJ-2",
    title: "Design landing page",
    description: "Create responsive landing page with marketing content",
  },
  {
    id: "PROJ-3",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
  },
  {
    id: "PROJ-4",
    title: "Integrate payment gateway",
    description: "Connect with Stripe API for payment processing",
  },
  {
    id: "PROJ-5",
    title: "Implement email notifications",
    description: "Send emails for important user events",
  },
];

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { sessionId, projectKey } = body;

    if (!sessionId || !projectKey) {
      return NextResponse.json(
        { message: "Session ID and Project Key are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connect();

    // Get session by ID
    const planningSession = await SessionModel.findById(sessionId);

    if (!planningSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check if user is the owner (admin)
    const userId = session.user.id;
    if (planningSession.ownerId.toString() !== userId) {
      return NextResponse.json(
        { message: "Only the session owner can import tasks" },
        { status: 403 }
      );
    }

    // For MVP, use mock JIRA data
    // In a real app, this would call the JIRA API

    // Filter issues containing the project key
    const filteredIssues = mockJiraIssues.map((issue) => ({
      ...issue,
      id: issue.id.replace("PROJ", projectKey),
    }));

    // Add tasks to the session
    const newTasks = filteredIssues.map((issue) => ({
      title: issue.title,
      description: issue.description,
      jiraId: issue.id,
      status: "pending",
      estimates: [],
    }));

    // Add each task to the session
    planningSession.tasks.push(...newTasks);
    await planningSession.save();

    return NextResponse.json({
      message: "Tasks imported successfully",
      count: newTasks.length,
    });
  } catch (error) {
    console.error("Failed to import JIRA tasks:", error);
    return NextResponse.json(
      { message: "Failed to import JIRA tasks" },
      { status: 500 }
    );
  }
}
