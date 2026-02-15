"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-32 text-center">
        <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          SOMETHING WENT WRONG
        </p>
        <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
          Unexpected error
        </h1>
        <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
          We encountered an unexpected problem. Please try again or return to
          the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:bg-gray-100 transition-colors"
          >
            GO HOME
          </a>
        </div>
      </div>
    </main>
  );
}
