import React from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function Loading({
  text = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-3">
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="absolute inset-0 animate-ping rounded-full bg-primary-400/30"></div>
          <div className="relative rounded-full bg-primary-500"></div>
        </div>
        {text && (
          <span className="text-sm font-medium text-gray-300 animate-pulse">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
