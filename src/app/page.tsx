"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/sessions");
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="hero min-h-screen bg-gray-900">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2">
            <Image
              src="/planning-poker.png"
              alt="Planning Poker App"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-white">
              Planning Poker for Agile Teams
            </h1>
            <p className="py-6 text-gray-300">
              Streamline your sprint planning with our intuitive planning poker
              app. Estimate task complexity collaboratively with your team in
              real-time, all in one place.
            </p>
            {status === "authenticated" ? (
              <Link href="/sessions" className="btn btn-primary">
                Go to My Sessions
              </Link>
            ) : (
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signin" className="btn btn-primary">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-secondary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
