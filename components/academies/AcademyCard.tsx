"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Check,
  CircleDot,
  Radio,
  Clock,
} from "lucide-react";
import { Academy, calculateYearsOfOperation } from "@/lib/academiesData";

interface AcademyCardProps {
  academy: Academy;
  onApply?: (academy: Academy) => void;
  onContact?: (academy: Academy) => void;
}

export default function AcademyCard({
  academy,
}: AcademyCardProps) {
  const yearsActive = calculateYearsOfOperation(academy.establishedYear);

  const coachPhoto =
    academy.headCoachPhoto ||
    (academy.coaches && academy.coaches[0]?.photo) ||
    "/images/experts/head_coach.jpg";

  const coachSubtext =
    academy.headCoachSubtext ||
    (academy.coaches && academy.coaches[0]?.qualifications?.[0]) ||
    academy.headCoachRole ||
    "Certified Coach";

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-zinc-200/90 hover:border-zinc-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* 1. COVER IMAGE & BADGES */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-900">
        <Image
          src={academy.coverImage}
          alt={academy.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Top-Left Floating Logo */}
        <div className="absolute top-3.5 left-3.5 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 border border-white/90 shadow-md z-10 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={academy.logo}
              alt={`${academy.name} Logo`}
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Verified Badge */}
        {academy.isVerified && (
          <div className="absolute bottom-3 right-3.5 z-10">
            <span
              title="Verified Cricket Academy by PLAYZONE"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#1d4ed8] text-white shadow-md"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Verified</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. ACADEMY DETAILS */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link
            href={`/cricket-academies/${academy.slug}`}
            className="block group/link"
          >
            <h3 className="text-base sm:text-lg font-black text-zinc-950 group-hover/link:text-[#65a30d] transition-colors line-clamp-1 leading-snug">
              {academy.name}
            </h3>
          </Link>

          {/* Location */}
          <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">
              {academy.location.upazila ? `${academy.location.upazila}, ` : ""}
              {academy.location.district}
            </span>
          </p>

          {/* Established */}
          <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>
              Est. {academy.establishedYear} • {yearsActive} years
            </span>
          </p>

          {/* Head Coach Mini Box */}
          {academy.headCoachName && (
            <div className="mt-3.5 p-2.5 rounded-2xl bg-zinc-50/90 border border-zinc-100 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200">
                <Image
                  src={coachPhoto}
                  alt={academy.headCoachName}
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Head Coach
                </div>
                <div className="text-xs font-black text-zinc-900 truncate">
                  {academy.headCoachName}
                </div>
                <div className="text-[11px] text-zinc-500 font-medium truncate">
                  ({coachSubtext})
                </div>
              </div>
            </div>
          )}

          {/* Training Focus Pills */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {academy.availableTrainingTypes.slice(0, 3).map((type) => (
              <span
                key={type}
                className="text-xs font-semibold text-zinc-700 bg-zinc-100/90 px-3 py-1 rounded-lg"
              >
                {type}
              </span>
            ))}
            {academy.availableTrainingTypes.length > 3 && (
              <span className="text-xs font-medium text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-lg">
                +{academy.availableTrainingTypes.length - 3}
              </span>
            )}
          </div>

          {/* Status Line */}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold">
            {academy.admissionStatus === "Open" ? (
              <>
                <CircleDot className="w-3.5 h-3.5 text-[#65a30d]" />
                <span className="text-[#65a30d]">Admission Open</span>
              </>
            ) : academy.admissionStatus === "Closed" ? (
              <>
                <CircleDot className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600">Admission Closed</span>
              </>
            ) : (
              <>
                <CircleDot className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-500">Contact for Admission</span>
              </>
            )}
          </div>
        </div>

        {/* 3. ACTIONS: Single Full-Width "View Academy →" Button (No admission button on card) */}
        <div className="mt-4 pt-3 border-t border-zinc-100">
          <Link
            href={`/cricket-academies/${academy.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-zinc-950 bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.98] transition-all duration-200 shadow-xs hover:shadow text-center cursor-pointer"
          >
            <span>View Academy →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
