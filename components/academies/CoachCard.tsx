"use client";

import React from "react";
import Image from "next/image";
import { CoachProfile } from "@/lib/academiesData";

interface CoachCardProps {
  coach: CoachProfile;
}

export default function CoachCard({ coach }: CoachCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300">
      {/* Coach Photo */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
        <Image
          src={coach.photo || "/images/experts/head_coach.jpg"}
          alt={coach.name}
          fill
          sizes="80px"
          className="object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h4 className="text-sm sm:text-base font-black text-zinc-950 truncate">
          {coach.name}
        </h4>
        <p className="text-xs font-semibold text-zinc-500 mb-2">
          {coach.role}
        </p>

        {/* Bullet Specs */}
        <ul className="space-y-1 text-xs text-zinc-600 font-medium">
          {coach.qualifications.slice(0, 3).map((q, idx) => (
            <li key={idx} className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] shrink-0" />
              <span className="truncate">{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
