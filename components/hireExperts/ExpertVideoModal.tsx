"use client";

import React, { useEffect } from "react";
import { X, Calendar, Star, Clock, Check } from "lucide-react";
import { Expert, getExpertVideo } from "./expertsData";
import { useLanguage } from "@/context/LanguageContext";

interface ExpertVideoModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (expert: Expert) => void;
}

export default function ExpertVideoModal({
  expert,
  isOpen,
  onClose,
  onBook,
}: ExpertVideoModalProps) {
  const { t } = useLanguage();

  // Escape key to close modal
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header: Playzone YouTube Channel Branding */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 border-b border-zinc-800/80 shrink-0">
          <a
            href="https://www.youtube.com/@playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity min-w-0"
          >
            {/* Red YouTube Brand Pill */}
            <div className="w-6 h-4.5 bg-[#FF0000] rounded-sm flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs">
              <svg className="w-2.5 h-2.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
                  @playzone.cricket
                </span>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#1877F2] text-white shrink-0">
                  <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium truncate">
                {t("Latest Cricket Videos, Reviews & Tips", "প্লেজোন অফিশিয়াল ক্রিকেট চ্যানেল")}
              </span>
            </div>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Widescreen YouTube Embed Screen */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoInfo.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={videoInfo.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Details & Actions Footer */}
        <div className="p-3.5 sm:p-4 bg-zinc-900/90 border-t border-zinc-800/80 flex flex-col gap-3 shrink-0">
          {/* Expert Info & Video Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-sm font-bold text-white">{expert.name}</span>
              {expert.verified && (
                <span
                  className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#84cc16] text-zinc-950 shrink-0"
                  title="Verified Expert"
                >
                  <Check className="w-2 h-2 stroke-[3]" />
                </span>
              )}
              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-xs text-[#84cc16] font-semibold">{expert.role}</span>
            </div>
            <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-1 leading-snug">
              {videoInfo.videoTitle}
            </h4>
            <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
              {expert.bio}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-zinc-800/60 text-xs">
            <div className="flex items-center gap-3 text-zinc-400">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">{expert.rating.toFixed(1)}</span>
                <span className="text-zinc-500">({expert.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{expert.experienceYears}+ Years</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-zinc-500">Rate:</span>
                <span className="font-bold text-[#84cc16]">৳{expert.price.toLocaleString()}</span>
                <span className="text-zinc-500">{expert.priceUnit}</span>
              </div>
            </div>

            {/* Price on mobile */}
            <div className="sm:hidden text-xs">
              <span className="font-bold text-[#84cc16]">৳{expert.price.toLocaleString()}</span>
              <span className="text-zinc-500">{expert.priceUnit}</span>
            </div>
          </div>

          {/* Action Button: Book Expert */}
          <div className="mt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook?.(expert);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#84cc16] hover:bg-[#74be10] active:scale-95 text-zinc-950 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs text-center"
            >
              <Calendar className="w-4 h-4 text-zinc-950" />
              <span>{t("Book This Expert", "বুক করুন")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
