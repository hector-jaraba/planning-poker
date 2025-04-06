"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import PageTransitionIndicator from "./PageTransitionIndicator";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathnameRef = useRef(pathname);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Start transition
      setIsTransitioning(true);

      // After a short delay, end the transition
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);

      prevPathnameRef.current = pathname;
    }

    // Cleanup function
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Reset transition state when component unmounts
  useEffect(() => {
    return () => {
      setIsTransitioning(false);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <PageTransitionIndicator isVisible={isTransitioning} />
      <div className="relative">{children}</div>
    </>
  );
}
