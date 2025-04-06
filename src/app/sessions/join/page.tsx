"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";

export default function JoinSession() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [sessionLink, setSessionLink] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const [autoJoinAttempted, setAutoJoinAttempted] = useState(false);

  // Check for code parameter in URL on mount
  useEffect(() => {
    if (status === "authenticated" && searchParams && !autoJoinAttempted) {
      const code = searchParams.get("code");
      if (code) {
        console.log("Found session code in URL:", code);
        setSessionLink(code);
        setAutoJoinAttempted(true);

        // Auto-join after a short delay to ensure the component is fully mounted
        const timer = setTimeout(() => {
          joinSession(code);
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, status, autoJoinAttempted]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      const currentUrl =
        typeof window !== "undefined" ? window.location.href : "/sessions/join";
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(currentUrl)}`);
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }

  // Function to join a session
  const joinSession = async (sessionIdOrCode: string) => {
    if (!sessionIdOrCode.trim()) {
      setError("Session link is required");
      return;
    }

    setIsJoining(true);
    setError("");

    try {
      // Extract the session ID or code from the link
      let sessionId;

      // If it's a full URL
      if (sessionIdOrCode.includes("/")) {
        try {
          const url = new URL(sessionIdOrCode);
          const pathParts = url.pathname.split("/");
          sessionId = pathParts[pathParts.length - 1];

          // Also check for code parameter in case it's a join URL
          const urlParams = new URLSearchParams(url.search);
          const codeParam = urlParams.get("code");
          if (codeParam) {
            sessionId = codeParam;
          }
        } catch (err) {
          // If URL parsing fails, just use the raw input
          sessionId = sessionIdOrCode;
        }
      } else {
        // Assume it's just the code
        sessionId = sessionIdOrCode;
      }

      console.log("Joining session with ID:", sessionId);

      // Join the session
      const response = await fetch(`/api/sessions/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join session");
      }

      // Redirect to the session
      console.log("Successfully joined session, redirecting to:", data._id);
      router.push(`/sessions/${data._id}`);
    } catch (err) {
      console.error("Error joining session:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsJoining(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await joinSession(sessionLink);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-white">
            Join a Session
          </h1>

          {error && (
            <div className="mb-4 rounded-md bg-red-500 p-3 text-white">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-gray-800 p-6 shadow-md"
          >
            <div className="mb-6">
              <label
                htmlFor="sessionLink"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Session Link or Code
              </label>
              <input
                type="text"
                id="sessionLink"
                className="input input-bordered w-full"
                value={sessionLink}
                onChange={(e) => setSessionLink(e.target.value)}
                placeholder="Enter session code"
                required
                disabled={isJoining}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${isJoining ? "loading" : ""}`}
              disabled={isJoining}
            >
              {isJoining ? "Joining..." : "Join Session"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
