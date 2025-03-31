"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";

export default function CreateSession() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionName, setSessionName] = useState("");
  const [estimationType, setEstimationType] = useState<"fibonacci" | "tshirt">(
    "fibonacci"
  );
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/auth/signin?callbackUrl=/sessions/create");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError("");

    if (!sessionName.trim()) {
      setError("Session name is required");
      setIsCreating(false);
      return;
    }

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sessionName,
          estimationType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create session");
      }

      // Redirect to the new session
      router.push(`/sessions/${data._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-white">
            Create a New Session
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
            <div className="mb-4">
              <label
                htmlFor="sessionName"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Session Name
              </label>
              <input
                type="text"
                id="sessionName"
                className="input input-bordered w-full"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
                disabled={isCreating}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="estimationType"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Estimation Method
              </label>
              <select
                id="estimationType"
                className="select select-bordered w-full"
                value={estimationType}
                onChange={(e) =>
                  setEstimationType(e.target.value as "fibonacci" | "tshirt")
                }
                disabled={isCreating}
              >
                <option value="fibonacci">
                  Fibonacci (1, 2, 3, 5, 8, 13, 21)
                </option>
                <option value="tshirt">
                  T-Shirt Sizes (XS, S, M, L, XL, XXL)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isCreating ? "loading" : ""
              }`}
              disabled={isCreating}
            >
              Create Session
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
