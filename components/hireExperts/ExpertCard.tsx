"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, Heart, Check } from "lucide-react";
import { Expert } from "./expertsData";

interface ExpertCardProps {
  expert: Expert;
  onViewProfile: (expert: Expert) => void;
  onBook: (expert: Expert) => void;
}

export default function ExpertCard({
  expert,
  onViewProfile,
  onBook,
}: ExpertCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top Media Area */}
      <div className="relative w-full aspect-[16/11] bg-zinc-100 overflow-hidden">
        <Image
          src={expert.imageSrc}
          alt={`${expert.name} - ${expert.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Verification Checkmark Badge (Bottom Left) */}
        {expert.verified && (
          <div
            className="absolute bottom-2.5 left-2.5 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#84cc16] text-white flex items-center justify-center shadow-md ring-2 ring-white"
            title="Verified Expert"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        )}

        {/* Wishlist / Favorite Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isLiked
              ? "bg-rose-500 text-white"
              : "bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isLiked ? "fill-white" : ""
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Name and Role */}
        <h3 className="font-semibold text-zinc-900 text-sm sm:text-[15px] leading-snug">
          {expert.name}
        </h3>
        <p className="text-zinc-600 text-xs sm:text-[13px] leading-tight mt-0.5 font-normal">
          {expert.role}
        </p>

        {/* Rating and Location */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-500">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
          <span className="font-semibold text-zinc-800">
            {expert.rating.toFixed(1)}
          </span>
          <span className="text-zinc-400">({expert.reviewsCount})</span>
          <span className="text-zinc-300">•</span>
          <span className="flex items-center gap-0.5 truncate text-zinc-600">
            <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
            {expert.location}
          </span>
        </div>

        {/* Bio snippet */}
        <p className="mt-2 text-xs text-zinc-500 leading-relaxed line-clamp-2 min-h-[34px]">
          {expert.bio}
        </p>

        {/* Category / Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {expert.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[11px] font-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price Row */}
        <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-baseline gap-1 text-xs text-zinc-500">
          <span>From</span>
          <span className="font-bold text-zinc-900 text-sm sm:text-base">
            ৳ {expert.price.toLocaleString()}
          </span>
          <span className="text-zinc-400">{expert.priceUnit}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewProfile(expert)}
            className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-white font-medium text-xs sm:text-[13px] text-center transition-all shadow-xs"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => onBook(expert)}
            className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 font-medium text-xs sm:text-[13px] text-center transition-all"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
