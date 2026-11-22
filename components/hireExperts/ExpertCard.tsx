"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  Check,
  Share2,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { Expert, getExpertProfileViews } from "./expertsData";
import ShareExpertModal from "./ShareExpertModal";
import { useLanguage } from "@/context/LanguageContext";

interface ExpertCardProps {
  expert: Expert;
  onViewProfile: (expert: Expert) => void;
  onBook: (expert: Expert) => void;
  onWatchVideo?: (expert: Expert) => void;
}

// Helper to determine the green badge over the image
function getRoleBadge(role: string, expertType?: string) {
  const r = (expertType || role).toLowerCase();
  if (r.includes("batting")) return { icon: "🏏", label: "Batting Coach" };
  if (r.includes("bowling") || r.includes("fast")) return { icon: "⚾", label: "Bowling Coach" };
  if (r.includes("thrower") || r.includes("sidearm")) return { icon: "🎯", label: "Sidearm Thrower" };
  if (r.includes("umpire") || r.includes("official")) return { icon: "🏏", label: "Cricket Umpire" };
  if (r.includes("physio") || r.includes("fitness")) return { icon: "💪", label: "Fitness & Physio" };
  if (r.includes("repair")) return { icon: "🛠️", label: "Gear Repairer" };
  if (r.includes("video") || r.includes("commentator")) return { icon: "🎥", label: "Media & Video" };
  return { icon: "👤", label: "Coach" };
}

export default function ExpertCard({
  expert,
  onViewProfile,
  onBook,
  onWatchVideo,
}: ExpertCardProps) {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const roleBadge = getRoleBadge(expert.role, expert.expertType);

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden select-none">
      {/* Top Media Area - Clickable to View Profile */}
      <div
        onClick={() => onViewProfile(expert)}
        className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer"
        title={t("View Profile", "প্রোফাইল দেখুন")}
      >
        <Image
          src={expert.imageSrc}
          alt={`${expert.name} - ${expert.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Green Role Pill Badge over image (Bottom Left) */}
        <div className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-800/95 backdrop-blur-md text-white text-[11px] font-bold shadow-xs border border-white/20">
          <span className="text-xs leading-none">{roleBadge.icon}</span>
          <span>{roleBadge.label}</span>
        </div>

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
      <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Name and Verified Badge - Clickable to View Profile */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onViewProfile(expert)}
              className="text-left font-bold text-zinc-950 text-sm sm:text-base leading-snug hover:text-[#84cc16] transition-colors cursor-pointer"
              title={t("View Profile", "প্রোফাইল দেখুন")}
            >
              {expert.name}
            </button>
            {expert.verified && (
              <span
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#84cc16] text-zinc-950 shrink-0 shadow-2xs"
                title="Verified Expert"
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Subtitle / Role */}
          <p className="text-zinc-500 text-xs sm:text-[13px] leading-tight mt-0.5 font-medium">
            {expert.role}
          </p>

          {/* Rating, Experience, and Profile Views / Clients */}
          <div className="flex items-center gap-3 mt-2.5 text-xs text-zinc-600">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-zinc-900">
                {expert.rating.toFixed(1)}
              </span>
              <span className="text-zinc-400 font-normal">({expert.reviewsCount})</span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-1 text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{expert.experienceYears}+ Years</span>
            </div>

            {/* Clients / Views */}
            <div className="flex items-center gap-1 text-zinc-500">
              <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{getExpertProfileViews(expert)}</span>
            </div>
          </div>

          {/* Bio snippet */}
          <p className="mt-2.5 text-xs text-zinc-500 leading-relaxed line-clamp-2 min-h-[34px]">
            {expert.bio}
          </p>

          {/* Category / Skill Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {expert.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Price Row */}
          <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-baseline gap-1 text-xs text-zinc-500">
            <span>From</span>
            <span className="font-black text-zinc-950 text-sm sm:text-base">
              ৳{expert.price.toLocaleString()}
            </span>
            <span className="text-zinc-400">{expert.priceUnit}</span>
          </div>

          {/* Action Buttons: Book Now + Watch Video */}
          <div className="mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onBook(expert)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#84cc16] hover:bg-[#74be10] active:scale-95 text-zinc-950 font-black text-xs sm:text-sm text-center transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-zinc-950 shrink-0" />
              <span>{t("Book Now", "বুক করুন")}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onWatchVideo) {
                  onWatchVideo(expert);
                } else {
                  window.open(
                    `https://www.youtube.com/watch?v=${expert.youtubeVideoId || "pe-sBpdLGBw"}`,
                    "_blank"
                  );
                }
              }}
              aria-label={`Watch ${expert.name}'s coaching video`}
              title={t("Watch Session Video", "সেশন ভিডিও দেখুন")}
              className="w-11 sm:w-12 h-10 rounded-xl bg-zinc-100 hover:bg-zinc-200/90 active:scale-95 border border-zinc-200/80 flex items-center justify-center transition-all shadow-2xs cursor-pointer shrink-0 group/yt"
            >
              <div className="w-6 h-4.5 bg-[#FF0000] rounded-[5px] flex items-center justify-center text-white shadow-xs group-hover/yt:scale-110 transition-transform">
                <svg className="w-2.5 h-2.5 fill-white translate-x-0.2" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
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
