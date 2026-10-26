"use client";

import React from "react";
import Image from "next/image";
import { AlumniRecord } from "@/lib/academiesData";

interface AlumniSectionProps {
  alumni: AlumniRecord[];
}

export default function AlumniSection({ alumni }: AlumniSectionProps) {
  if (!alumni || alumni.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {alumni.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300"
        >
          {/* Alumni Photo */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
            <Image
              src={item.photo || "/images/experts/head_coach.jpg"}
              alt={item.name}
              fill
              sizes="72px"
              className="object-cover object-top"
            />
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-base font-black text-zinc-950 truncate">
              {item.name}
            </h4>
            <p className="text-xs font-semibold text-zinc-600 truncate mt-0.5">
              {item.team || item.achievement || "Bangladesh National Team"}
            </p>
            <p className="text-[11px] text-zinc-400 font-medium truncate mt-0.5">
              {item.year || "Academy Batch Alumnus"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
