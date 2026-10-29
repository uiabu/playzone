"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  ChevronRight,
  Share2,
  CheckCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Cricketer } from "./cricketersData";

interface CricketerCardProps {
  cricketer: Cricketer;
  onViewProfile: (cricketer: Cricketer) => void;
  onRequestBooking: (cricketer: Cricketer) => void;
}

export default function CricketerCard({
  cricketer,
  onViewProfile,
  onRequestBooking,
}: CricketerCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${url}#${cricketer.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTierColor = (tier: Cricketer["tier"]) => {
    switch (tier) {
      case "National Legend":
        return "bg-amber-500 text-white border-amber-400";
      case "Active International":
        return "bg-emerald-600 text-white border-emerald-500";
      case "Domestic / BPL Icon":
        return "bg-blue-600 text-white border-blue-500";
      case "Rising Talent":
        return "bg-purple-600 text-white border-purple-500";
      default:
        return "bg-zinc-800 text-white border-zinc-700";
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* 1. Player Image Area */}
      <div className="relative w-full aspect-[4/3] sm:h-64 bg-zinc-950 overflow-hidden">
        <Image
          src={cricketer.imageSrc}
          alt={`${cricketer.name} - ${cricketer.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Tier Badge */}
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs border ${getTierColor(
              cricketer.tier
            )}`}
          >
            {cricketer.tier}
          </span>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${cricketer.name}'s profile`}
            title="Share Link"
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer border border-white/10"
          >
            {copied ? (
              <CheckCircle className="w-3.5 h-3.5 text-lime-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Bottom Banner inside Image: Bangladeshi Name & Primary Tag */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10">
          <p className="text-xs font-semibold text-lime-400 font-sans tracking-wide">
            {cricketer.bengaliName}
          </p>
          <h3 className="text-lg sm:text-xl font-black text-white leading-tight drop-shadow-sm">
            {cricketer.name}
          </h3>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Role & Verification */}
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#84cc16] shrink-0" />
            <span className="line-clamp-1">{cricketer.role}</span>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-center">
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                Matches
              </p>
              <p className="text-xs sm:text-sm font-black text-zinc-900">
                {cricketer.stats.matches}
              </p>
            </div>
            {cricketer.stats.runs ? (
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Runs
                </p>
                <p className="text-xs sm:text-sm font-black text-zinc-900">
                  {cricketer.stats.runs}
                </p>
              </div>
            ) : cricketer.stats.wickets ? (
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Wickets
                </p>
                <p className="text-xs sm:text-sm font-black text-zinc-900">
                  {cricketer.stats.wickets}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Impact
                </p>
                <p className="text-xs sm:text-sm font-black text-zinc-900">Elite</p>
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                {cricketer.stats.centuries !== undefined
                  ? "100s"
                  : cricketer.stats.bestBowling
                  ? "Best"
                  : "Experience"}
              </p>
              <p className="text-xs sm:text-sm font-black text-amber-600">
                {cricketer.stats.centuries !== undefined
                  ? cricketer.stats.centuries
                  : cricketer.stats.bestBowling || "15+ yrs"}
              </p>
            </div>
          </div>

          {/* Short Bio */}
          <p className="mt-3 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {cricketer.shortBio}
          </p>

          {/* Suitable Events Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cricketer.suitableEvents.slice(0, 2).map((evt, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                <span className="line-clamp-1">{evt}</span>
              </span>
            ))}
            {cricketer.suitableEvents.length > 2 && (
              <span className="text-[10px] font-semibold text-zinc-400 px-1 py-0.5">
                +{cricketer.suitableEvents.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* 3. Bottom Coordination Notice & Actions */}
        <div className="pt-3 border-t border-zinc-100 space-y-2.5">
          {/* Coordination Transparency Badge */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
            <span className="flex items-center gap-1 text-zinc-700">
              <Trophy className="w-3.5 h-3.5 text-[#84cc16]" />
              <strong>PLAYZONE</strong> Coordination
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              On-Demand Fee & Schedule
            </span>
          </div>

          {/* Action Buttons: View Profile & Request Booking */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onViewProfile(cricketer)}
              className="w-full py-2.5 px-3 rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Profile & Stats</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              type="button"
              onClick={() => onRequestBooking(cricketer)}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-black text-[#84cc16] hover:text-[#9ae630] text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

