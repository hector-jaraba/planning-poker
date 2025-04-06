"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import LoadingSpirit from "@/components/ui/LoadingSpirit";

interface Session {
  _id: string;
  name: string;
  status: "active" | "completed";
  tasks: any[];
  estimationType: "fibonacci" | "tshirt";
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: string;
}

export default function SessionsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/sessions");
    }
  }, [status, router]);

  // Fetch sessions
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      console.log("Auth status is authenticated, fetching sessions");
      fetchSessions();
    }
  }, [status]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch sessions");
      }
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch sessions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete session");
      }

      // Remove the deleted session from the state
      setSessions((prevSessions) =>
        prevSessions.filter((s) => s._id !== sessionId)
      );
      setDeleteSessionId(null);
    } catch (error) {
      console.error("Error deleting session:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete session"
      );
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <LoadingSpirit />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-white">My Sessions</h1>
          <div className="flex gap-4">
            <Link href="/sessions/create" className="btn btn-primary">
              Create New Session
            </Link>
            <Link href="/sessions/join" className="btn btn-secondary">
              Join Session
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <LoadingSpirit />
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-500 p-4 text-white">
            Error: {error}
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-lg bg-gray-800 p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold text-white">
              No sessions found
            </h2>
            <p className="mb-6 text-gray-300">
              Create a new session or join an existing one.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/sessions/create" className="btn btn-primary">
                Create Session
              </Link>
              <Link href="/sessions/join" className="btn btn-secondary">
                Join Session
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((sessionItem) => (
              <div
                key={sessionItem._id}
                className="rounded-lg bg-gray-800 p-6 shadow-md transition-transform hover:scale-[1.02]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {sessionItem.name}
                  </h2>
                  {sessionItem.ownerId ===
                    (session?.user as SessionUser)?.id && (
                    <button
                      onClick={() => setDeleteSessionId(sessionItem._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete session"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="mb-4 flex flex-wrap gap-3">
                  <span
                    className={`badge ${
                      sessionItem.status === "active"
                        ? "bg-lime-500 text-white"
                        : "bg-gray-600 text-white"
                    } px-3 py-1 text-sm font-medium`}
                  >
                    {sessionItem.status === "active"
                      ? "In Progress"
                      : "Completed"}
                  </span>
                  <span className="badge badge-primary">
                    {sessionItem.estimationType === "fibonacci"
                      ? "Fibonacci"
                      : "T-Shirt Sizes"}
                  </span>
                  {sessionItem.tasks.length > 0 && (
                    <span className="badge badge-info">
                      {
                        sessionItem.tasks.filter(
                          (task) => task.status === "completed"
                        ).length
                      }{" "}
                      / {sessionItem.tasks.length} Completed
                    </span>
                  )}
                </div>
                <div className="mb-4 text-sm text-gray-400">
                  Created:{" "}
                  {sessionItem.createdAt &&
                  !isNaN(new Date(sessionItem.createdAt).getTime())
                    ? new Date(sessionItem.createdAt).toLocaleString()
                    : "Recently created"}
                </div>
                <Link
                  href={`/sessions/${sessionItem._id}`}
                  className="btn btn-primary w-full"
                >
                  Open Session
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteSessionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-white">
              Delete Session
            </h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete this session? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteSessionId(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSession(deleteSessionId)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
