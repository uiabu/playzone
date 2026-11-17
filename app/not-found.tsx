import React from "react";
import Link from "next/link";
import {
  Compass,
  ShoppingBag,
  ArrowRight,
  Home,
  Users,
  Building,
  Truck,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#090a0c] text-white flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-xl w-full text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-4 border border-[#74d600]/25">
          <Compass className="w-3.5 h-3.5" />
          <span>404 — Pitch Out of Bounds</span>
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
          The cricket gear, vertical, or page you are looking for does not exist, has been retired, or the URL address was mistyped.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-[#74d600]/10"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Cricket Store</span>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="pt-8 border-t border-zinc-800/80">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
            Popular Destinations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <Link
              href="/category/cricket-bats"
              className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center"
            >
              Cricket Bats
            </Link>
            <Link
              href="/hire-experts"
              className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center"
            >
              Hire Experts
            </Link>
            <Link
              href="/cricket-academies"
              className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center"
            >
              Academies
            </Link>
            <Link
              href="/track-order"
              className="p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all text-center"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
