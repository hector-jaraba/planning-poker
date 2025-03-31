"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface Session {
  _id: string;
  name: string;
  status: "active" | "completed";
  tasks: any[];
  estimationType: "fibonacci" | "tshirt";
  createdAt: string;
  updatedAt: string;
}

export default function SessionsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
      fetch("/api/sessions")
        .then((res) => {
          console.log("Sessions API response status:", res.status);
          if (!res.ok) {
            console.error(
              "Failed to fetch sessions:",
              res.status,
              res.statusText
            );
            throw new Error(
              `Failed to fetch sessions: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log(`Fetched ${data.length} sessions:`, data);
          setSessions(data);
        })
        .catch((err) => {
          console.error("Error fetching sessions:", err);
          setError(err.message || "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader">Loading...</div>
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
          <div className="flex items-center justify-center py-8">
            <div className="loader">Loading sessions...</div>
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
            {sessions.map((session) => (
              <div
                key={session._id}
                className="rounded-lg bg-gray-800 p-6 shadow-md transition-transform hover:scale-[1.02]"
              >
                <h2 className="mb-2 text-xl font-semibold text-white">
                  {session.name}
                </h2>
                <div className="mb-4 flex flex-wrap gap-3">
                  <span
                    className={`badge ${
                      session.status === "active"
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {session.status === "active" ? "Active" : "Completed"}
                  </span>
                  <span className="badge badge-primary">
                    {session.estimationType === "fibonacci"
                      ? "Fibonacci"
                      : "T-Shirt Sizes"}
                  </span>
                  <span className="badge badge-secondary">
                    {session.tasks.length} Tasks
                  </span>
                </div>
                <div className="mb-4 text-sm text-gray-400">
                  Created: {new Date(session.createdAt).toLocaleString()}
                </div>
                <Link
                  href={`/sessions/${session._id}`}
                  className="btn btn-primary w-full"
                >
                  Open Session
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
