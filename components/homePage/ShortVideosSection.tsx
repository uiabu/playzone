"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  X,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  SHORT_VIDEOS,
  SHORT_CATEGORIES,
  MORE_CATEGORIES,
  ShortVideo,
  ShortCategory,
} from "./shortVideosData";

export default function ShortVideosSection() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ShortCategory>("all");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter videos based on category
  const filteredVideos = useMemo(() => {
    if (activeCategory === "all") {
      return SHORT_VIDEOS;
    }
    return SHORT_VIDEOS.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  // Handle like toggle
  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Close "More" dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };
    if (isMoreOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isMoreOpen]);

  // Scroll position monitor
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [updateScrollState, filteredVideos]);

  // Smooth scroll handler
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    let scrollAmount = 260;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const secondCard = firstCard?.nextElementSibling as HTMLElement | null;

    if (firstCard && secondCard) {
      scrollAmount = Math.round(
        secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left
      );
    } else if (firstCard) {
      scrollAmount = Math.round(firstCard.getBoundingClientRect().width + 16);
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount * 2 : scrollAmount * 2,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  // Switch category and scroll container back to start
  const handleSelectCategory = (cat: ShortCategory) => {
    setActiveCategory(cat);
    setIsMoreOpen(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Modal keyboard navigation (Escape to close, Left/Right for previous/next video)
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      } else if (e.key === "ArrowLeft") {
        const currIndex = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
        if (currIndex > 0) {
          setSelectedVideo(filteredVideos[currIndex - 1]);
        }
      } else if (e.key === "ArrowRight") {
        const currIndex = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
        if (currIndex < filteredVideos.length - 1) {
          setSelectedVideo(filteredVideos[currIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, filteredVideos]);

  const selectedIndex = selectedVideo
    ? filteredVideos.findIndex((v) => v.id === selectedVideo.id)
    : -1;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      {/* Light Mint/Green Tinted Outer Wrapper matching mockup */}
      <div className="w-full bg-[#f3f9eb] border border-[#d6ecba]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xs">
        {/* HEADER BAR: YouTube Icon + Title + Category Pills + Carousel Arrows */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 mb-4 sm:mb-5">
          {/* Left: YouTube Icon + Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Red YouTube Pill Icon */}
            <div className="w-8 h-6 sm:w-9 sm:h-6.5 bg-[#FF0000] rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-xs shrink-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-[28px] font-black tracking-tight flex items-center gap-1.5 leading-none">
              <span className="text-zinc-950">{t("Short", "শর্ট")}</span>
              <span className="text-[#84cc16]">{t("Videos", "ভিডিও")}</span>
            </h2>
          </div>

          {/* Middle & Right: Category Filter Pills + Carousel Arrows */}
          <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full lg:w-auto">
            {/* Category Pills (Horizontal scrollable on small screens) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 max-w-full">
              {SHORT_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelectCategory(category.id)}
                    className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                      isActive
                        ? "bg-[#84cc16] text-zinc-950 shadow-xs font-bold ring-2 ring-[#84cc16]/40"
                        : "bg-white border border-zinc-200/90 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 shadow-2xs"
                    }`}
                  >
                    {category.icon && <span className="text-xs">{category.icon}</span>}
                    <span>{language === "bn" ? category.labelBn : category.label}</span>
                  </button>
                );
              })}

              {/* "More ∨" Dropdown */}
              <div className="relative shrink-0" ref={moreDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isMoreOpen || activeCategory === "tips"
                      ? "bg-[#84cc16] text-zinc-950 shadow-xs font-bold"
                      : "bg-white border border-zinc-200/90 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 shadow-2xs"
                  }`}
                >
                  <span>{t("More", "আরও")}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* More Menu Flyout */}
                {isMoreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    {MORE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className={`w-full flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm text-left hover:bg-zinc-50 cursor-pointer font-medium transition-colors ${
                          activeCategory === cat.id
                            ? "text-[#84cc16] font-bold bg-[#f3f9eb]"
                            : "text-zinc-800"
                        }`}
                      >
                        {cat.icon && <span>{cat.icon}</span>}
                        <span>{language === "bn" ? cat.labelBn : cat.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Carousel Arrow Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-2">
              {/* Previous (<) */}
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Videos"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
                  canScrollLeft
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                    : "border border-zinc-200 bg-white text-zinc-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Next (>) */}
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next Videos"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
                  canScrollRight
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                    : "border border-zinc-200 bg-white text-zinc-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* VIDEOS CAROUSEL LIST */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-1 pt-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredVideos.map((video) => {
            const isLiked = !!likedVideos[video.id];
            const tagTop = language === "bn" ? video.tagTopBn : video.tagTop;
            const tagBottom = language === "bn" ? video.tagBottomBn : video.tagBottom;

            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                style={{ scrollSnapAlign: "start" }}
                className="group relative w-[165px] sm:w-[185px] md:w-[205px] lg:w-[218px] aspect-[9/14] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-black/10 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 select-none"
              >
                {/* Video High-Res Thumbnail Image */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 220px"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Top Shadow Gradient for Heart Icon */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom Shadow Gradient for Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

                {/* Top Right: Heart / Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, video.id)}
                  aria-label={isLiked ? "Unlike video" : "Like video"}
                  className="absolute top-2.5 right-2.5 z-10 p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isLiked ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                  />
                </button>

                {/* Center: Red YouTube Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-11 h-8 sm:w-12 sm:h-8.5 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all duration-300">
                    <svg
                      className="w-4 h-4 fill-white translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Left: Bold Category/Title Overlay */}
                <div className="absolute bottom-2.5 left-3 right-16 z-10 pointer-events-none">
                  <p className="text-[11px] sm:text-xs font-black tracking-wider text-white uppercase leading-tight line-clamp-1 drop-shadow-sm">
                    {tagTop}
                  </p>
                  <p className="text-xs sm:text-sm font-black tracking-wide text-[#84cc16] uppercase leading-tight line-clamp-1 drop-shadow-sm">
                    {tagBottom}
                  </p>
                </div>

                {/* Bottom Right: Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-xs text-[10px] sm:text-[11px] font-bold text-white px-1.5 py-0.5 rounded-md leading-none shadow-xs">
                    {video.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* YOUTUBE SHORTS FULLSCREEN MODAL PLAYER */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4.5 bg-[#FF0000] rounded-sm flex items-center justify-center text-white shrink-0">
                  <svg className="w-2.5 h-2.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  {selectedVideo.channelName}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 9:16 Vertical YouTube Shorts Embed */}
            <div className="relative w-full aspect-[9/16] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3.5 sm:p-4 bg-zinc-900 border-t border-zinc-800/80 flex flex-col gap-2.5">
              <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                {language === "bn" ? selectedVideo.titleBn : selectedVideo.title}
              </h3>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-800/60">
                {/* Prev / Next Video buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={selectedIndex <= 0}
                    onClick={() => {
                      if (selectedIndex > 0) {
                        setSelectedVideo(filteredVideos[selectedIndex - 1]);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{t("Prev", "পূর্ববর্তী")}</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedIndex >= filteredVideos.length - 1}
                    onClick={() => {
                      if (selectedIndex < filteredVideos.length - 1) {
                        setSelectedVideo(filteredVideos[selectedIndex + 1]);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{t("Next", "পরবর্তী")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Direct Link to YouTube */}
                <a
                  href={`https://youtube.com/shorts/${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#84cc16] hover:underline font-semibold"
                >
                  <span>{t("Watch on YouTube", "ইউটিউবে দেখুন")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
