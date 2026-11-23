"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  Share2,
  Heart,
  User,
  Layers,
  Home,
  Check,
} from "lucide-react";
import { Expert, getExpertProfileViews, getExpertVideo } from "./expertsData";
import ShareExpertModal from "./ShareExpertModal";

interface ProfileModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (expert: Expert) => void;
}

// Helper to get category/tag icons matching the UI mockup
function getTagIcon(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("batting")) return "🏏";
  if (t.includes("bowling") || t.includes("ball")) return "🎾";
  if (t.includes("throw") || t.includes("sidearm")) return "🎯";
  if (t.includes("youth") || t.includes("junior")) return "👥";
  if (t.includes("fitness") || t.includes("strength") || t.includes("agility")) return "💪";
  if (t.includes("physio") || t.includes("rehab") || t.includes("injury")) return "🩺";
  if (t.includes("repair") || t.includes("willow") || t.includes("craft")) return "🛠️";
  if (t.includes("umpire") || t.includes("official") || t.includes("field")) return "🏏";
  if (t.includes("video") || t.includes("media") || t.includes("photo") || t.includes("4k")) return "🎥";
  return "✨";
}

export default function ProfileModal({ expert, isOpen, onClose, onBook }: ProfileModalProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !expert) return null;

  const videoInfo = getExpertVideo(expert);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#f8fafc] rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. TOP VIDEO HEADER: Standard, natural YouTube iframe as requested ("ager motoi kore daw iframe e jevabe thake") */}
        <div className="relative w-full aspect-video bg-black overflow-hidden shrink-0 border-b border-zinc-900">
          {/* Close Button Only (Top Right) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <iframe
            src={`https://www.youtube.com/embed/${videoInfo.youtubeVideoId}?autoplay=1&rel=0`}
            title={videoInfo.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* 2. SCROLLABLE CONTENT BODY (Redesigned matching exact user mockup) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* TOP CARD: Expert Header & Booking Card (Stacked vertically for optimal breathing room) */}
          <div className="relative bg-white rounded-3xl p-4 sm:p-6 border border-zinc-200/80 shadow-xs overflow-hidden">
            {/* Soft decorative green corner glow / wave (per mockup) */}
            <div className="absolute top-0 right-0 w-72 h-44 bg-gradient-to-l from-lime-100/50 via-lime-50/20 to-transparent pointer-events-none rounded-3xl" />

            <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
              {/* Upper Section: Avatar + Expert Details (Full width, spacious) */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
                {/* Avatar with Squircle green border and verified check badge */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl p-0.5 border-2 border-[#84cc16] shadow-xs shrink-0 bg-white">
                  <div className="relative w-full h-full rounded-[14px] sm:rounded-[20px] overflow-hidden bg-zinc-100">
                    <Image
                      src={expert.imageSrc}
                      alt={expert.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  </div>
                  {/* Green Circular Verified Badge on bottom-right of avatar */}
                  {expert.verified && (
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#84cc16] text-white flex items-center justify-center border-2 border-white shadow-xs"
                      title="Verified Expert"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Name, Role & Stats */}
                <div className="min-w-0 flex-1 space-y-1">
                  {/* Expert Name */}
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight leading-tight">
                    {expert.name}
                  </h3>

                  {/* Subtitle / Role */}
                  <p className="text-xs sm:text-sm font-semibold text-zinc-600">
                    {expert.role}
                  </p>

                  {/* Rating, Location, Experience, Views */}
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 pt-0.5 text-xs text-zinc-500">
                    <div className="flex items-center gap-1 font-bold text-zinc-900">
                      <Star className="w-3.5 h-3.5 fill-lime-500 text-lime-500 shrink-0" />
                      <span className="text-lime-700">{expert.rating.toFixed(1)}</span>
                      <span className="text-zinc-400 font-normal">({expert.reviewsCount} reviews)</span>
                    </div>
                    <span className="text-zinc-300">|</span>
                    <span className="flex items-center gap-1 text-zinc-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                      <span>{expert.location}</span>
                    </span>
                    <span className="text-zinc-300">|</span>
                    <span className="flex items-center gap-1 text-zinc-600 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                      <span>{expert.experienceYears}+ years</span>
                    </span>
                    <span className="text-zinc-300">|</span>
                    <span className="flex items-center gap-1 text-zinc-600 font-medium">
                      <Eye className="w-3.5 h-3.5 text-lime-600 shrink-0" />
                      <span>{getExpertProfileViews(expert)} views</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div className="w-full h-px bg-zinc-100" />

              {/* Lower Section: Hire Rate & Actions (Full width strip) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    HIRE RATE
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                      ৳{expert.price.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-500 font-normal">
                      {expert.priceUnit}
                    </span>
                  </div>
                </div>

                {/* Actions: Book Now + Share + Favorite */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBook(expert);
                    }}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#74be10] active:scale-95 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 text-zinc-950 shrink-0" />
                    <span>Book Now</span>
                    <span className="font-bold text-zinc-950">→</span>
                  </button>

                  {/* Share Button */}
                  <button
                    type="button"
                    onClick={() => setIsShareOpen(true)}
                    className="w-10 h-10 rounded-xl border border-zinc-200/90 bg-white hover:bg-zinc-50 active:scale-95 text-zinc-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
                    title="Share Profile"
                    aria-label="Share Profile"
                  >
                    <Share2 className="w-4 h-4 text-zinc-700" />
                  </button>

                  {/* Favorite / Heart Button */}
                  <button
                    type="button"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`w-10 h-10 rounded-xl border border-zinc-200/90 bg-white hover:bg-zinc-50 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0 ${
                      isFavorited ? "text-red-500 fill-red-500" : "text-zinc-700"
                    }`}
                    title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                    aria-label="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: 2x2 Grid of Cards (Per Mockup) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Card 1: About the Expert */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/70 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900">
                  About the Expert
                </h4>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {expert.fullBio}
              </p>
            </div>

            {/* Card 2: Specializations */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/70 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-zinc-900">
                  Specializations
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {expert.tags.map((tag, idx) => {
                  const isSecond = idx % 2 === 1;
                  return (
                    <span
                      key={idx}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                        isSecond
                          ? "bg-purple-50 text-purple-950 border-purple-200/70"
                          : "bg-lime-50 text-zinc-900 border-lime-200/80"
                      }`}
                    >
                      <span className="text-sm">{getTagIcon(tag)}</span>
                      <span>{tag}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Availability (with faint decorative watermark icon) */}
            <div className="bg-gradient-to-r from-lime-50/70 via-lime-50/30 to-white rounded-2xl p-4 sm:p-4.5 border border-lime-200/60 shadow-xs flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-lime-100 flex items-center justify-center text-lime-700 shrink-0">
                  <Calendar className="w-4.5 h-4.5 text-lime-700" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                    Availability
                  </h5>
                  <p className="text-xs text-zinc-600 font-medium mt-0.5">
                    {expert.availableDays.join(", ")}
                  </p>
                </div>
              </div>
              {/* Faint Calendar watermark icon on right */}
              <Calendar className="w-10 h-10 text-lime-300/40 pointer-events-none shrink-0" />
            </div>

            {/* Card 4: Service Mode (with faint decorative watermark icon) */}
            <div className="bg-gradient-to-r from-purple-50/70 via-purple-50/30 to-white rounded-2xl p-4 sm:p-4.5 border border-purple-200/60 shadow-xs flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-purple-700" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-zinc-900">
                    Service Mode
                  </h5>
                  <p className="text-xs text-zinc-600 font-medium mt-0.5 capitalize">
                    {expert.serviceModes
                      .map((m) =>
                        m === "ground"
                          ? "At Ground/Academy"
                          : m === "home"
                            ? "At Home"
                            : "Online Consultation"
                      )
                      .join(", ")}
                  </p>
                </div>
              </div>
              {/* Faint Home watermark icon on right */}
              <Home className="w-10 h-10 text-purple-300/40 pointer-events-none shrink-0" />
            </div>
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
