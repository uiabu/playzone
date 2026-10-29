"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Trophy,
  Award,
  Sparkles,
  Calendar,
  Globe2,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Clock,
  Send,
} from "lucide-react";
import { Cricketer } from "./cricketersData";

interface CricketerProfileModalProps {
  cricketer: Cricketer | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestBooking: (cricketer: Cricketer) => void;
}

export default function CricketerProfileModal({
  cricketer,
  isOpen,
  onClose,
  onRequestBooking,
}: CricketerProfileModalProps) {
  if (!isOpen || !cricketer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Top Hero / Banner */}
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden">
            <Image
              src={cricketer.imageSrc}
              alt={cricketer.name}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

            {/* Content Over Header */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#84cc16] text-black">
                  {cricketer.tier}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
                  Verified Playzone Partner
                </span>
              </div>
              <p className="text-sm font-semibold text-lime-400">
                {cricketer.bengaliName}
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {cricketer.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                {cricketer.role}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* 1. Career Statistics Strip */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Career Snapshot & Stats</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                  <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                    Total Matches
                  </p>
                  <p className="text-base sm:text-lg font-black text-zinc-900 mt-0.5">
                    {cricketer.stats.matches}
                  </p>
                </div>

                {cricketer.stats.runs && (
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                      International Runs
                    </p>
                    <p className="text-base sm:text-lg font-black text-zinc-900 mt-0.5">
                      {cricketer.stats.runs}
                    </p>
                  </div>
                )}

                {cricketer.stats.wickets && (
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                      Wickets
                    </p>
                    <p className="text-base sm:text-lg font-black text-zinc-900 mt-0.5">
                      {cricketer.stats.wickets}
                    </p>
                  </div>
                )}

                {cricketer.stats.centuries !== undefined && (
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                      Centuries (100s)
                    </p>
                    <p className="text-base sm:text-lg font-black text-amber-600 mt-0.5">
                      {cricketer.stats.centuries}
                    </p>
                  </div>
                )}

                {cricketer.stats.fifties !== undefined && (
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                      Fifties (50s)
                    </p>
                    <p className="text-base sm:text-lg font-black text-zinc-800 mt-0.5">
                      {cricketer.stats.fifties}
                    </p>
                  </div>
                )}

                {cricketer.stats.bestBowling && (
                  <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">
                      Best Bowling
                    </p>
                    <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">
                      {cricketer.stats.bestBowling}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Biography & Career Background */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2">
                Biography & Profile
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {cricketer.fullBio}
              </p>
            </div>

            {/* 3. Career Highlights & Historic Milestones */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#84cc16]" />
                <span>Historic Milestones & Achievements</span>
              </h3>
              <div className="space-y-2">
                {cricketer.careerHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-zinc-700 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#84cc16] shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Event Suitability */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ideal Event Types & Appearances</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {cricketer.suitableEvents.map((evt, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800 bg-amber-50/80 border border-amber-200/60 px-3 py-1.5 rounded-xl"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{evt}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Booking Workflow Reassurance Notice */}
            <div className="p-4 rounded-2xl bg-zinc-900 text-white space-y-2 border border-zinc-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#84cc16]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  How PLAYZONE Booking Works
                </h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                ক্রিকেটারদের আন্তর্জাতিক ও ঘরোয়া সূচির কারণে কোনো ফিক্সড ক্যালেন্ডার নেই।
                আপনি রিকোয়েস্ট সাবমিট করার পর আমাদের টিম সরাসরি ক্রিকেটার বা তার
                ম্যানেজমেন্টের সাথে কথা বলে প্রাপ্যতা (Availability) এবং চূড়ান্ত
                কোটেশন নিশ্চিত করবে।
              </p>
              <div className="flex items-center gap-4 pt-1 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#84cc16]" />
                  কোনো অগ্রিম পেমেন্ট নেই
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#84cc16]" />
                  অফিসিয়াল প্লেজোন কোঅর্ডিনেশন
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 bg-white flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onRequestBooking(cricketer);
            }}
            className="flex-1 py-3 px-5 rounded-xl bg-zinc-950 hover:bg-black text-[#84cc16] hover:text-[#9fe832] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Request Booking with {cricketer.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

