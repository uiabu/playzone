"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, Heart, Check, Eye, Share2 } from "lucide-react";
import { Expert, getExpertProfileViews } from "./expertsData";
import ShareExpertModal from "./ShareExpertModal";

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
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Top Media Area - Adjusted Height/Aspect Ratio with Head Alignment & No Hover Scale */}
      <div className="relative w-full aspect-[4/3] sm:h-52 bg-zinc-100 overflow-hidden">
        <Image
          src={expert.imageSrc}
          alt={`${expert.name} - ${expert.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />

        {/* Action Buttons (Top Right): Share to Social Media & Favorite */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {/* Social Share Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            aria-label="Share expert card on social media"
            title="Share to Social Media"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Wishlist / Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer ${
              isLiked
                ? "bg-rose-500 text-white"
                : "bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                isLiked ? "fill-white" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-3.5 flex flex-col flex-1">
        {/* Name and Role */}
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold text-zinc-900 text-sm sm:text-sm leading-snug">
            {expert.name}
          </h3>
          {expert.verified && (
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#84cc16] text-white shrink-0"
              title="Verified Expert"
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}
        </div>
        <p className="text-zinc-600 text-xs sm:text-[13px] leading-tight mt-0.5 font-normal">
          {expert.role}
        </p>

        {/* Rating, Location and Profile Views */}
        <div className="flex items-center justify-between gap-1.5 mt-2 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 min-w-0">
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
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium shrink-0" title="Profile views">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>{getExpertProfileViews(expert)}</span>
          </div>
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

      {/* Social Media Share Modal */}
      <ShareExpertModal
        expert={expert}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
