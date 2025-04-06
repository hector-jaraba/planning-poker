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
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                    estimationType === "fibonacci"
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "bg-gray-800 hover:bg-gray-700/50"
                  }`}
                  onClick={() => setEstimationType("fibonacci")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`rounded-xl p-2.5 transition-colors duration-300 ${
                          estimationType === "fibonacci"
                            ? "bg-primary/20 text-primary"
                            : "bg-gray-700 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          <path d="M8 7h8" />
                          <path d="M8 12h8" />
                          <path d="M8 17h8" />
                        </svg>
                      </div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          estimationType === "fibonacci"
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        Fibonacci
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 5, 8, 13, 21].map((num) => (
                          <span
                            key={num}
                            className={`rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                              estimationType === "fibonacci"
                                ? "bg-primary/20 text-primary"
                                : "bg-gray-700 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                            }`}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          estimationType === "fibonacci"
                            ? "text-gray-300"
                            : "text-gray-500 group-hover:text-gray-400"
                        }`}
                      >
                        Perfect for complex tasks with varying levels of
                        uncertainty
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                    estimationType === "tshirt"
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "bg-gray-800 hover:bg-gray-700/50"
                  }`}
                  onClick={() => setEstimationType("tshirt")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="relative p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`rounded-xl p-2.5 transition-colors duration-300 ${
                          estimationType === "tshirt"
                            ? "bg-primary/20 text-primary"
                            : "bg-gray-700 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H5v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                          <path d="M12 4v16" />
                          <path d="M8 4v16" />
                          <path d="M16 4v16" />
                        </svg>
                      </div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          estimationType === "tshirt"
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        T-Shirt Sizes
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                          <span
                            key={size}
                            className={`rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-300 ${
                              estimationType === "tshirt"
                                ? "bg-primary/20 text-primary"
                                : "bg-gray-700 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary"
                            }`}
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          estimationType === "tshirt"
                            ? "text-gray-300"
                            : "text-gray-500 group-hover:text-gray-400"
                        }`}
                      >
                        Great for quick, relative size comparisons
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
