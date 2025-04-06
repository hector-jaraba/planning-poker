"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import Navbar from "@/components/layout/Navbar";
import EstimationCard from "@/components/sessions/EstimationCard";
import TaskList from "@/components/sessions/TaskList";
import JiraIntegration from "@/components/sessions/JiraIntegration";
import ShareSession from "@/components/sessions/ShareSession";
import AddTask from "@/components/sessions/AddTask";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import { Session } from "next-auth";
import ParticipantsList from "@/components/sessions/ParticipantsList";
import RevealEstimates from "@/components/sessions/RevealEstimates";
import Loading from "@/components/ui/Loading";

// Define types
interface Task {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  jiraId?: string;
  status: "pending" | "active" | "completed";
  revealed?: boolean;
  estimates: {
    userId: string;
    value: string | number;
    hasEstimate?: boolean;
  }[];
  aiEstimate?: string | number;
  finalEstimate?: string | number;
}

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

interface Participant {
  userId: string;
  name: string;
}

interface SessionData {
  _id: string;
  name: string;
  ownerId: string;
  participants: Participant[];
  tasks: Task[];
  estimationType: "fibonacci" | "tshirt";
  status: "active" | "completed";
  shareLink: string;
  admins: string[];
}

// Add type definition for session user with id
interface SessionWithId extends Omit<Session, "user"> {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export default function SessionPage() {
  const params = useParams<{ id: string }>();
  const sessionId = params?.id as string; // Safe assertion since the route ensures id
  const { data: session, status } = useSession() as {
    data: SessionWithId | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const { width, height } = useWindowSize();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedEstimate, setSelectedEstimate] = useState<
    string | number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [participants, setParticipants] = useState<Map<string, any>>(new Map());
  const [isAdmin, setIsAdmin] = useState(false);

  // Fibonacci sequence for estimation
  const fibonacciValues = [
    "?",
    "0",
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "∞",
  ];

  // T-shirt sizes for estimation
  const tshirtValues = ["?", "XS", "S", "M", "L", "XL", "XXL", "∞"];

  // Helper function to get task ID
  const getTaskId = (task: Task | null): string | undefined => {
    if (!task) return undefined;
    return task.id || task._id?.toString();
  };

  // Fetch session data
  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = `/auth/signin?callbackUrl=/sessions/${sessionId}`;
      return;
    }

    if (status === "authenticated" && sessionId) {
      setIsLoading(true);
      fetch(`/api/sessions/${sessionId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch session");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched session data:", {
            id: data._id,
            taskCount: data.tasks.length,
            tasks: data.tasks.map((t: any) => ({
              id: t.id || t._id,
              title: t.title,
              status: t.status,
            })),
          });

          setSessionData(data);
          // Set the first active task if available
          const activeTask = data.tasks.find(
            (t: Task) => t.status === "active"
          );

          if (activeTask) {
            console.log("Found active task:", {
              id: getTaskId(activeTask),
              title: activeTask.title,
            });
          } else {
            console.log("No active task found in session data");
          }

          setActiveTask(activeTask || null);
        })
        .catch((err) => {
          setError(err.message || "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [sessionId, status]);

  // Initialize socket connection
  useEffect(() => {
    if (sessionData && session) {
      try {
        // Use a fallback ID for test users
        const userId =
          session.user.id ||
          (session.user.email === "test@example.com"
            ? "test-user-1"
            : "unknown-user");

        console.log("Using userId for socket:", userId);

        // Connect directly to the socket server - use only polling for stability
        const socketIO = io({
          path: "/api/socketio",
          query: {
            sessionId: sessionData._id,
            userId: userId,
            username: session.user.name || session.user.email,
          },
          transports: ["polling"], // Use only polling for more stable connections
          reconnectionAttempts: 10,
          reconnectionDelay: 1000,
          timeout: 20000,
          forceNew: true, // Force a new connection each time
        });

        socketIO.on("connect", () => {
          console.log("Connected to socket server successfully");

          // Immediately send a ping to test connection
          socketIO.emit("ping", { message: "Client connected" });

          // Request session refresh to ensure we have latest data
          socketIO.emit("refresh_session");
        });

        socketIO.on("connect_error", (err) => {
          console.error("Socket connection error:", err.message, err);
          // Try to reconnect after error
          setTimeout(() => {
            console.log("Attempting to reconnect socket...");
            socketIO.connect();
          }, 3000);
        });

        // Set active task event responses
        socketIO.on("set_active_task_received", (data) => {
          console.log("Server acknowledged set_active_task:", data);
        });

        socketIO.on("set_active_task_success", (data) => {
          console.log("Task set as active successfully:", data);
        });

        socketIO.on("set_active_task_error", (data) => {
          console.error("Error setting task as active:", data.error);
        });

        socketIO.on("session_update", (updatedSession: SessionData) => {
          console.log("Received session update", {
            taskCount: updatedSession.tasks.length,
            hasActiveTask: updatedSession.tasks.some(
              (t) => t.status === "active"
            ),
            taskStates: updatedSession.tasks.map((t) => ({
              id: t.id || t._id?.toString(),
              title: t.title,
              status: t.status,
              estimates: t.estimates?.length || 0,
              revealed: t.revealed,
            })),
            estimateCount:
              updatedSession.tasks.find((t) => t.status === "active")?.estimates
                ?.length || 0,
          });

          // If we already have session data, check if we need to preserve the revealed state
          if (sessionData) {
            // Create a clean copy of the updated session
            const processedSession = JSON.parse(JSON.stringify(updatedSession));

            // Track task status transitions
            sessionData.tasks.forEach((existingTask) => {
              const existingTaskId =
                existingTask.id || existingTask._id?.toString();
              const updatedTask = processedSession.tasks.find(
                (t) =>
                  t.id === existingTaskId ||
                  t._id?.toString() === existingTaskId
              );

              if (updatedTask && existingTask.status !== updatedTask.status) {
                console.log(
                  `Task status transition: "${updatedTask.title}" ${existingTask.status} -> ${updatedTask.status}`
                );

                // Check for incorrect state transition from pending to completed without being active
                if (
                  existingTask.status === "pending" &&
                  updatedTask.status === "completed"
                ) {
                  console.warn(
                    `Preventing incorrect transition from pending to completed for task: ${updatedTask.title}`
                  );
                  updatedTask.status = "pending";
                }
              }
            });

            // Go through the tasks in the current session data
            sessionData.tasks.forEach((existingTask) => {
              const existingTaskId =
                existingTask.id || existingTask._id?.toString();

              // If this task exists in the updated session and was revealed locally, keep it revealed
              if (existingTask.revealed === true && existingTaskId) {
                const matchingTask = processedSession.tasks.find(
                  (t) =>
                    t.id === existingTaskId ||
                    t._id?.toString() === existingTaskId
                );

                if (matchingTask) {
                  console.log(
                    `Preserving revealed=true for task ${existingTaskId}`
                  );
                  matchingTask.revealed = true;

                  // Also preserve the full estimate values for revealed tasks
                  if (
                    existingTask.estimates &&
                    existingTask.estimates.length > 0
                  ) {
                    console.log(
                      `Preserving ${existingTask.estimates.length} estimates for task ${existingTaskId}`
                    );

                    // Create a map of existing estimates by userId for quick lookup
                    const existingEstimatesMap = new Map();
                    existingTask.estimates.forEach((est) => {
                      const userId = est.userId?.toString();
                      if (userId) {
                        existingEstimatesMap.set(userId, est);
                      }
                    });

                    // Update the matching task's estimates with the full values from existing task
                    matchingTask.estimates = matchingTask.estimates.map(
                      (est) => {
                        const userId = est.userId?.toString();
                        const existingEst = existingEstimatesMap.get(userId);

                        if (
                          existingEst &&
                          existingEst.value !== undefined &&
                          existingEst.value !== null
                        ) {
                          return {
                            ...est,
                            value: existingEst.value,
                            hasEstimate: true,
                          };
                        }
                        return est;
                      }
                    );
                  }
                }
              }
            });

            // Update the processed session data
            setSessionData(processedSession);

            // Update active task
            const active = processedSession.tasks.find(
              (t) => t.status === "active"
            );
            if (active) {
              console.log(
                "Active task found:",
                active.title,
                "with",
                active.estimates?.length || 0,
                "estimates"
              );

              // Check if user has already estimated this task
              const userEstimate = active.estimates?.find(
                (e) => e.userId === userId || e.userId === "test-user-1"
              );

              if (userEstimate) {
                console.log("User already estimated with:", userEstimate.value);
                setSelectedEstimate(userEstimate.value);
              } else {
                setSelectedEstimate(null);
              }

              // Update active task state
              setActiveTask(active);

              // Check for consensus
              checkConsensus(active, processedSession.participants.length);
            } else {
              console.log("No active task found in updated session");
              setSelectedEstimate(null);
              setActiveTask(null);
            }
          } else {
            // First time receiving session data, just set it directly
            setSessionData(updatedSession);

            // Find active task
            const active = updatedSession.tasks.find(
              (t) => t.status === "active"
            );

            if (active) {
              console.log(
                "Active task found:",
                active.title,
                "with",
                active.estimates?.length || 0,
                "estimates"
              );

              // Check if user has already estimated this task
              const userEstimate = active.estimates?.find(
                (e) => e.userId === userId || e.userId === "test-user-1"
              );

              if (userEstimate) {
                console.log("User already estimated with:", userEstimate.value);
                setSelectedEstimate(userEstimate.value);
              } else {
                setSelectedEstimate(null);
              }

              // Update active task state
              setActiveTask(active);

              // Check for consensus
              checkConsensus(active, updatedSession.participants.length);
            } else {
              console.log("No active task found in updated session");
              setSelectedEstimate(null);
              setActiveTask(null);
            }
          }
        });

        socketIO.on("estimates_revealed", (data) => {
          console.log(
            "Estimates revealed for task:",
            data.taskId,
            data.estimates
          );

          // Find the active task and update its revealed status locally
          if (sessionData) {
            const updatedSessionData = JSON.parse(JSON.stringify(sessionData));
            const task = updatedSessionData.tasks.find(
              (t) => t.id === data.taskId || t._id?.toString() === data.taskId
            );

            if (task) {
              // Mark task as revealed
              task.revealed = true;

              // Make sure all estimates have their full values when revealed
              if (data.estimates && Array.isArray(data.estimates)) {
                console.log("Updating estimates data with:", data.estimates);

                // IMPORTANT: Directly replace the estimates with the server data
                task.estimates = data.estimates.map((est) => ({
                  userId: est.userId,
                  value: est.value,
                  hasEstimate: true,
                }));
              }

              setSessionData(updatedSessionData);

              // If this is the active task, update it with the revealed data
              if (
                activeTask &&
                (activeTask.id === data.taskId ||
                  activeTask._id?.toString() === data.taskId)
              ) {
                console.log("Updating active task with revealed estimates");
                setActiveTask({
                  ...activeTask,
                  revealed: true,
                  estimates: task.estimates,
                });
              }
            }
          }
        });

        socketIO.on("estimates_hidden", (data) => {
          console.log("Estimates hidden for task:", data.taskId);

          // Find the active task and update its revealed status locally
          if (sessionData) {
            const updatedSessionData = { ...sessionData };
            const task = updatedSessionData.tasks.find(
              (t) => t.id === data.taskId || t._id?.toString() === data.taskId
            );

            if (task) {
              // Update task's revealed status
              task.revealed = false;

              // Mask the estimates except for the user's own estimate
              task.estimates = task.estimates.map((est) => {
                const isCurrentUser =
                  est.userId === userId || est.userId === "test-user-1";
                const hasEstimateValue =
                  est.value !== undefined && est.value !== null;

                return {
                  userId: est.userId,
                  hasEstimate: hasEstimateValue,
                  // Only preserve value for current user and ensure it's never null
                  value: isCurrentUser && hasEstimateValue ? est.value : "-",
                };
              });

              setSessionData(updatedSessionData);

              // If this is the active task, update it
              if (
                activeTask &&
                (activeTask.id === data.taskId ||
                  activeTask._id?.toString() === data.taskId)
              ) {
                const updatedTask = {
                  ...activeTask,
                  revealed: false,
                  estimates: task.estimates, // Copy the updated estimates
                };
                setActiveTask(updatedTask);
              }
            }
          }
        });

        socketIO.on("task_completed", (data) => {
          console.log(
            "Task completed:",
            data.taskId,
            "with final estimate:",
            data.finalEstimate
          );

          // Find the task and update its status locally
          if (sessionData) {
            const updatedSessionData = JSON.parse(JSON.stringify(sessionData));
            const task = updatedSessionData.tasks.find(
              (t) => t.id === data.taskId || t._id?.toString() === data.taskId
            );

            if (task) {
              // Mark task as completed
              task.status = "completed";
              task.finalEstimate = data.finalEstimate;
              task.revealed = true;

              console.log("Updated session data:", updatedSessionData);

              // Check if all tasks are completed
              const allTasksCompleted = updatedSessionData.tasks.every(
                (t) => t.status === "completed"
              );

              // If all tasks are completed, mark the session as completed
              if (allTasksCompleted) {
                console.log(
                  "All tasks completed, marking session as completed"
                );
                updatedSessionData.status = "completed";
              } else {
                // Find the next pending task to set as active
                const nextPendingTask = updatedSessionData.tasks.find(
                  (t) => t.status === "pending"
                );

                if (nextPendingTask) {
                  console.log(
                    `Setting next task as active: ${nextPendingTask.title}`
                  );
                  nextPendingTask.status = "active";

                  // If we have a socket connection, emit the set_active_task event
                  if (socketIO && isAdmin) {
                    const nextTaskId =
                      nextPendingTask.id || nextPendingTask._id?.toString();
                    if (nextTaskId) {
                      console.log(
                        `Emitting set_active_task for next task: ${nextTaskId}`
                      );

                      // Use setTimeout to ensure the task_completed event is processed first
                      setTimeout(() => {
                        socketIO.emit("set_active_task", {
                          taskId: nextTaskId,
                        });
                      }, 100);
                    }
                  }
                }
              }

              // Update the session data first
              setSessionData(updatedSessionData);

              // If this is the active task, update it
              if (
                activeTask &&
                (activeTask.id === data.taskId ||
                  activeTask._id?.toString() === data.taskId)
              ) {
                setActiveTask({
                  ...activeTask,
                  status: "completed",
                  finalEstimate: data.finalEstimate,
                  revealed: true,
                });
              }
            }
          }
        });

        socketIO.on("disconnect", (reason) => {
          console.log("Disconnected from socket server. Reason:", reason);
        });

        // Add this handler for participants
        socketIO.on("participants_update", (participantsList: any[]) => {
          console.log("Received participants update:", participantsList);
          const participantsMap = new Map();
          participantsList.forEach((p) => {
            participantsMap.set(p.userId, p);
          });
          setParticipants(participantsMap);
        });

        socketIO.on("error", (error) => {
          console.error("Socket error:", error);
          // You might want to show this error to the user in the UI
        });

        setSocket(socketIO);

        return () => {
          console.log("Cleaning up socket connection");
          socketIO.off("connect");
          socketIO.off("connect_error");
          socketIO.off("set_active_task_received");
          socketIO.off("set_active_task_success");
          socketIO.off("set_active_task_error");
          socketIO.off("session_update");
          socketIO.off("estimates_revealed");
          socketIO.off("estimates_hidden");
          socketIO.off("task_completed");
          socketIO.off("disconnect");
          socketIO.off("participants_update");
          socketIO.off("error");
          socketIO.disconnect();
        };
      } catch (err) {
        console.error("Error setting up socket:", err);
      }
    }
  }, [sessionData?._id, session]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!params?.id) return;

      try {
        const response = await fetch(`/api/sessions/${params.id}/admins`);
        const data = await response.json();

        if (data.admins) {
          const user = session?.user as SessionUser;
          const userId = user?.id || user?.email;
          setIsAdmin(
            data.ownerId === userId ||
              data.admins.some((adminId: string) => adminId === userId)
          );
        }
      } catch (error) {
        console.error("Failed to check admin status:", error);
      }
    };

    if (session?.user) {
      checkAdminStatus();
    }
  }, [session, params?.id]);

  // Function to submit an estimate
  const submitEstimate = (value: string | number) => {
    // Use fallback ID for test users
    const userId =
      session?.user?.id ||
      (session?.user?.email === "test@example.com" ? "test-user-1" : null);

    const activeTaskId = getTaskId(activeTask);

    console.log("Attempting to submit estimate:", {
      value,
      activeTaskId,
      userId,
      hasSocket: !!socket,
    });

    if (!activeTask || !activeTaskId || !userId) {
      console.error("Cannot submit estimate: No active task or user ID");
      return;
    }

    setSelectedEstimate(value);

    if (socket) {
      try {
        const data = {
          taskId: activeTaskId,
          value,
        };

        console.log("Emitting submit_estimate event with data:", data);
        socket.emit("submit_estimate", data);

        // Also listen for errors
        socket.once("error", (error: any) => {
          console.error("Socket error after estimate submission:", error);
        });

        // Confirm receipt
        socket.emit("ping", { message: "Submitted estimate" });
      } catch (error) {
        console.error("Error submitting estimate:", error);
      }
    } else {
      console.error("Socket not connected, cannot submit estimate");
    }
  };

  // Check if all participants have the same estimate
  const checkConsensus = (task: Task | null, participantCount: number) => {
    if (!task || task.estimates.length < participantCount) return;

    const distinctValues = new Set(task.estimates.map((e) => e.value));

    if (distinctValues.size === 1 && task.estimates.length >= 2) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Set task as active
  const setTaskAsActive = (taskId: string) => {
    console.log("RAW taskId:", taskId, typeof taskId);
    console.log("Attempting to set task as active:", taskId, {
      isAdmin,
      hasSocket: !!socket,
      userId: session?.user?.id || session?.user?.email,
      socketConnected: socket?.connected,
    });

    // Validate taskId
    if (!taskId) {
      console.error("Cannot set task as active: Invalid task ID");
      return;
    }

    // For test users, we'll bypass the admin check if they have test@example.com email
    const isTestUser = session?.user?.email === "test@example.com";

    if ((!isAdmin && !isTestUser) || !socket) {
      console.warn(
        "Cannot set task as active: user is not admin or socket not connected"
      );
      return;
    }

    // Make sure the socket is connected
    if (!socket.connected) {
      console.error("Socket is not connected. Attempting to reconnect...");
      socket.connect();

      // Wait for the socket to connect before emitting
      socket.once("connect", () => {
        console.log("Socket reconnected, now emitting set_active_task event");
        emitSetActiveTask(taskId);
      });

      return;
    }

    emitSetActiveTask(taskId);
  };

  // Helper function to emit the set_active_task event
  const emitSetActiveTask = (taskId: string) => {
    console.log("Emitting set_active_task event");
    try {
      const payload = {
        taskId,
        // Add flag to preserve previous task status
        preservePreviousStatus: true,
      };
      console.log("Emitting with payload:", payload);
      socket.emit("set_active_task", payload);

      // Also send a ping to verify socket is working
      socket.emit("ping", { message: "After setting task" });
    } catch (err) {
      console.error("Error emitting set_active_task:", err);
    }
  };

  // Set final estimate
  const setFinalEstimate = (taskId: string, estimate: string | number) => {
    if (!isAdmin || !socket) return;

    socket.emit("set_final_estimate", { taskId, estimate });
  };

  // Helper function to determine if an estimate should be visible
  const shouldShowEstimateValue = (estimate: any, activeTask: Task | null) => {
    // Always show if it's the user's own estimate
    if (estimate.userId === session?.user?.id) return true;

    // Show if estimates have been revealed
    if (activeTask?.revealed) return true;

    // Otherwise hide it
    return false;
  };

  // Helper function to get username for an estimate
  const getUsernameForEstimate = (userId: string): string => {
    const participant = participants.get(userId);
    if (participant?.username) {
      return participant.username;
    }
    // Fallbacks if no participant data
    if (userId === session?.user?.id) {
      return session.user.name || "You";
    }
    return `User ${userId.slice(0, 6)}`;
  };

  // Debug logging for activeTask and estimates
  useEffect(() => {
    if (activeTask) {
      console.log("Active task state updated:", {
        id: getTaskId(activeTask),
        title: activeTask.title,
        revealed: activeTask.revealed,
        estimateCount: activeTask.estimates.length,
        estimates: activeTask.estimates.map((e) => ({
          userId: e.userId,
          value: e.value,
          hasEstimate: e.hasEstimate,
        })),
      });
    }
  }, [activeTask]);

  const handleMakeAdmin = async (userId: string) => {
    if (!socket || !params?.id) return;

    socket.emit("make_admin", {
      sessionId: params.id,
      userId,
    });
  };

  const handleRemoveAdmin = async (userId: string) => {
    if (!socket || !params?.id) return;

    socket.emit("remove_admin", {
      sessionId: params.id,
      userId,
    });
  };

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Error</h2>
          <p className="text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {sessionData && (
          <div className="mb-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold text-white">
                {sessionData.name}
              </h1>
              <ShareSession
                sessionId={sessionId}
                shareLink={sessionData.shareLink}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Participants List */}
              <div className="lg:col-span-1">
                <ParticipantsList
                  socket={socket}
                  activeTaskId={getTaskId(activeTask) || null}
                  sessionData={sessionData}
                  isAdmin={isAdmin}
                />

                {/* Task List & Management */}
                <div className="rounded-lg bg-gray-800 p-4 shadow-md">
                  <h2 className="mb-4 text-xl font-bold text-white">Tasks</h2>
                  <TaskList
                    tasks={sessionData.tasks}
                    activeTaskId={getTaskId(activeTask)}
                    setActiveTask={setTaskAsActive}
                    isAdmin={!!isAdmin}
                  />
                  {isAdmin && (
                    <AddTask sessionId={sessionData._id} socket={socket} />
                  )}
                </div>

                {/* JIRA Integration (Admin only) */}
                {isAdmin && (
                  <div className="mt-6 rounded-lg bg-gray-800 p-4 shadow-md">
                    <h2 className="mb-4 text-xl font-bold text-white">
                      JIRA Integration
                    </h2>
                    <JiraIntegration
                      sessionId={sessionData._id}
                      socket={socket}
                    />
                  </div>
                )}
              </div>

              {/* Active Task & Estimation */}
              <div className="lg:col-span-3">
                {activeTask ? (
                  <div className="rounded-lg bg-gray-800 p-6 shadow-md">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white">
                        {activeTask.title}
                      </h3>
                      {activeTask.description && (
                        <p className="mt-2 text-gray-300">
                          {activeTask.description}
                        </p>
                      )}
                      {activeTask.jiraId && (
                        <div className="mt-2 rounded-md bg-primary-900 p-2 text-sm">
                          <span className="font-semibold">JIRA ID:</span>{" "}
                          {activeTask.jiraId}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 text-lg font-semibold text-white">
                        Estimation
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(sessionData.estimationType === "fibonacci"
                          ? fibonacciValues
                          : tshirtValues
                        ).map((value) => (
                          <EstimationCard
                            key={value}
                            value={value}
                            selected={selectedEstimate === value}
                            onClick={() => submitEstimate(value)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 mt-6">
                      <h4 className="mb-3 text-lg font-semibold text-white">
                        Team Estimates
                      </h4>
                      {activeTask.finalEstimate && (
                        <div className="mb-4 p-3 rounded-md bg-lime-800 text-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold">
                                Final Estimate:
                              </span>{" "}
                              {activeTask.finalEstimate}
                            </div>
                            <div className="text-sm bg-lime-700 rounded-md px-2 py-1">
                              Completed
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        {activeTask.estimates.length > 0 ? (
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {activeTask.estimates.map((estimate) => (
                              <div
                                key={estimate.userId}
                                className={`rounded-md p-3 text-center transition-colors ${
                                  activeTask.revealed
                                    ? "bg-lime-700" // Green when estimates are revealed
                                    : estimate.hasEstimate ||
                                      estimate.value !== undefined
                                    ? "bg-primary-700" // Blue when user has estimated but not revealed
                                    : "bg-gray-700" // Gray when no estimate
                                }`}
                              >
                                <div className="font-medium text-white">
                                  {getUsernameForEstimate(estimate.userId)}
                                </div>
                                <div className="mt-1 text-xl font-bold text-white">
                                  {
                                    activeTask.revealed
                                      ? estimate.value !== null &&
                                        estimate.value !== undefined
                                        ? estimate.value.toString() // Convert to string to ensure consistency
                                        : "-"
                                      : estimate.hasEstimate ||
                                        estimate.value !== undefined
                                      ? "?" // Question mark for hidden estimates
                                      : "-" // Dash for no estimate
                                  }
                                </div>
                              </div>
                            ))}
                            {activeTask.aiEstimate && (
                              <div className="rounded-md bg-primary-900 p-3 text-center">
                                <div className="font-medium text-white">
                                  AI Suggestion
                                </div>
                                <div className="mt-1 text-xl font-bold text-green-400">
                                  {activeTask.aiEstimate}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-400">
                            No estimates yet. Be the first to estimate!
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Admin Tools */}
                    {isAdmin && (
                      <div className="border-t border-gray-700 pt-4">
                        <h4 className="mb-2 text-lg font-semibold text-white">
                          Admin Tools
                        </h4>

                        {/* Move the RevealEstimates button here */}
                        <RevealEstimates
                          socket={socket}
                          activeTaskId={getTaskId(activeTask) || null}
                          isAdmin={!!isAdmin}
                          activeTask={activeTask}
                        />

                        {/* Only show these controls if estimates are revealed and task is not completed */}
                        {activeTask.estimates.length > 0 &&
                          activeTask.revealed &&
                          activeTask.status !== "completed" &&
                          !activeTask.finalEstimate && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              <div className="mr-2 text-gray-300">
                                Set final estimate:
                              </div>
                              {(sessionData.estimationType === "fibonacci"
                                ? fibonacciValues
                                : tshirtValues
                              ).map((value) => (
                                <button
                                  key={`final-${value}`}
                                  onClick={() =>
                                    setFinalEstimate(
                                      getTaskId(activeTask) || "",
                                      value
                                    )
                                  }
                                  className={`rounded-md px-3 py-1 text-sm ${
                                    activeTask.finalEstimate === value
                                      ? "bg-lime-700 text-white"
                                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                  }`}
                                >
                                  {value}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center rounded-lg bg-gray-800 p-6 shadow-md">
                    <p className="text-center text-lg text-gray-400">
                      Select a task to start estimation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
