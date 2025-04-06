import React from "react";

export default function LoadingSpirit() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-16 w-16">
        {/* Spirit body */}
        <div className="absolute inset-0 animate-float">
          <div className="h-full w-full rounded-full bg-gradient-to-b from-purple-400/30 to-blue-400/30 blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-white/20"></div>
          </div>
        </div>
        {/* Spirit trail */}
        <div className="absolute -bottom-4 left-1/2 h-4 w-4 -translate-x-1/2 animate-trail">
          <div className="h-full w-full rounded-full bg-primary-400"></div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-400 animate-pulse">Loading...</div>
    </div>
  );
}
