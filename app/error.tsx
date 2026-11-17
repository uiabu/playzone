"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, HelpCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for observability
    console.error("PlayZone Unhandled App Error:", error);
  }, [error]);

  return (
    <main className="min-h-[75vh] bg-[#090a0c] text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-[#111216] border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 mb-4">
          <AlertCircle className="w-7 h-7 stroke-[2.2]" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          Something Went Wrong
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
          We encountered an unexpected glitch while rendering this cricket page. You can try reloading or return safely to the home store.
        </p>

        {error.digest && (
          <div className="mb-6 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-500">
            Error Digest: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs transition-all shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-zinc-700 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
