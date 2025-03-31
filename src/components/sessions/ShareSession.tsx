"use client";

import { useState } from "react";

interface ShareSessionProps {
  sessionId: string;
  shareLink: string;
}

export default function ShareSession({
  sessionId,
  shareLink,
}: ShareSessionProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${baseUrl}/sessions/join?code=${shareLink || sessionId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex w-full max-w-md items-center rounded-md bg-gray-700 px-3 py-2">
        <input
          type="text"
          value={fullUrl}
          readOnly
          className="w-full bg-transparent text-sm text-gray-300 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="ml-2 rounded-md bg-blue-800 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
