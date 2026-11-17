import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[70vh] w-full bg-[#090a0c] flex flex-col items-center justify-center px-4"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing glow background */}
        <div className="absolute -inset-4 bg-[#74d600]/10 rounded-full blur-xl animate-pulse" />

        {/* PlayZone Logo */}
        <div className="relative mb-6">
          <Image
            src="/images/playzone-logo-transparent-white.png"
            alt="PlayZone Loading"
            width={160}
            height={32}
            priority
            className="h-8 sm:h-9 w-auto object-contain opacity-90"
          />
        </div>

        {/* Custom Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-800 border-t-[#74d600] animate-spin" />
        </div>

        <p className="mt-4 text-xs font-medium tracking-wider uppercase text-zinc-400">
          Loading...
        </p>
      </div>
    </div>
  );
}
