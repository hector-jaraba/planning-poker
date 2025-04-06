"use client";

import React, { useEffect, useState } from "react";

interface PageTransitionIndicatorProps {
  isVisible: boolean;
}

export default function PageTransitionIndicator({
  isVisible,
}: PageTransitionIndicatorProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible) {
      setShouldRender(true);
    } else {
      // Add a small delay before hiding to allow the animation to complete
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 600); // Slightly longer than the animation duration
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="h-2 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 animate-progress"
        onAnimationEnd={() => {
          // If the animation ends and isVisible is false, hide the component
          if (!isVisible) {
            setShouldRender(false);
          }
        }}
      ></div>
    </div>
  );
}
