"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const errorMessage = searchParams.get("error");
    setError(errorMessage || "An authentication error occurred");
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Authentication Error
        </h2>

        <div className="mb-6 rounded-md bg-red-500 p-4 text-white">
          <p>{error}</p>
        </div>

        <div className="flex justify-center">
          <Link href="/auth/signin" className="btn btn-primary">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
