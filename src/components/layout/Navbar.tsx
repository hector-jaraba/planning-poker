"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 px-4 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-xl font-semibold">
          <span className="mr-2">🃏</span>
          <span>Planning Poker</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 fill-current text-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/sessions" className="text-gray-300 hover:text-white">
            Sessions
          </Link>
          <Link
            href="/sessions/create"
            className="text-gray-300 hover:text-white"
          >
            Create Session
          </Link>
          <Link
            href="/sessions/join"
            className="text-gray-300 hover:text-white"
          >
            Join Session
          </Link>
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                {session?.user?.name || session?.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-md bg-red-700 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signup"
                className="rounded-md bg-gray-700 px-3 py-1 text-sm font-medium text-white hover:bg-gray-600"
              >
                Sign Up
              </Link>
              <button
                onClick={() => signIn()}
                className="rounded-md bg-blue-700 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <div className="flex flex-col space-y-3 pb-3 pt-2">
            <Link
              href="/sessions"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sessions
            </Link>
            <Link
              href="/sessions/create"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Session
            </Link>
            <Link
              href="/sessions/join"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Session
            </Link>
            {status === "authenticated" ? (
              <div className="flex flex-col space-y-3 px-3 py-2">
                <span className="text-gray-300">
                  {session?.user?.name || session?.user?.email}
                </span>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-md bg-red-700 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 px-3 py-2">
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-gray-700 px-3 py-1 text-center text-sm font-medium text-white hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <button
                  onClick={() => {
                    signIn();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-md bg-blue-700 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
