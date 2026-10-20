"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

interface PlayerReview {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  videoTitle: string;
  quote: string;
}

const PLAYER_REVIEWS: PlayerReview[] = [
  {
    id: "tamim-iqbal",
    name: "Tamim Iqbal",
    role: "Former Captain, Bangladesh",
    imageSrc: "/images/reviews/tamim_iqbal.jpg",
    videoTitle: "Tamim Iqbal tests Playzone Grade 1 English Willow Bats",
    quote: "The punch and balance of these bats is top class. Perfect ping off the middle.",
  },
  {
    id: "mushfiqur-rahim",
    name: "Mushfiqur Rahim",
    role: "Wicketkeeper Batter, Bangladesh",
    imageSrc: "/images/reviews/mushfiqur_rahim.jpg",
    videoTitle: "Mushfiqur Rahim reviews Playzone Lightweight Keeping Gear",
    quote: "Flexibility and palm padding are essential behind the stumps. Playzone nailed it.",
  },
  {
    id: "mahmudullah-riyad",
    name: "Mahmudullah Riyad",
    role: "Experienced All-rounder, Bangladesh",
    imageSrc: "/images/reviews/mahmudullah_riyad.jpg",
    videoTitle: "Mahmudullah Riyad on match preparation with Playzone gear",
    quote: "Reliable equipment gives you the confidence to execute under high match pressure.",
  },
  {
    id: "mohammad-ashraful",
    name: "Mohammad Ashraful",
    role: "Former National Cricketer, Bangladesh",
    imageSrc: "/images/reviews/mohammad_ashraful.jpg",
    videoTitle: "Mohammad Ashraful on leather match balls and seam quality",
    quote: "The seam retention and shine durability of these match balls are outstanding.",
  },
  {
    id: "shakib-al-hasan",
    name: "Shakib Al Hasan",
    role: "Former Captain, Bangladesh",
    imageSrc: "/images/reviews/shakib_al_hasan.jpg",
    videoTitle: "Shakib Al Hasan unboxes Playzone Pro Wheelie Kit Bag",
    quote: "Plenty of room for all my match bats, pads, and gear. Built tough for touring.",
  },
];

export default function VideoReviewSection() {
  const [activePlayer, setActivePlayer] = useState<PlayerReview | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = React.useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  React.useEffect(() => {
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
  }, [updateScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    let scrollAmount = 280;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
    if (firstCard && secondCard) {
      scrollAmount = Math.round(
        secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left
      );
    } else if (firstCard) {
      scrollAmount = Math.round(firstCard.getBoundingClientRect().width + 18);
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
    setActiveSlide((prev) =>
      direction === "left" ? Math.max(0, prev - 1) : Math.min(PLAYER_REVIEWS.length - 1, prev + 1)
    );
  };

  return (
    <section className="relative w-full bg-[#050806] text-white py-14 sm:py-20 select-none overflow-hidden border-t border-zinc-800/80">
      {/* Background Image: review-bg-image.png */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/reviews/review-bg-image.png"
          alt="Trusted by Bangladesh's Top Cricketers Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle vignette overlay to ensure text and card contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
      </div>

      {/* Stadium Atmospheric Lighting Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-[#84cc16]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-[#84cc16]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Inner Centered Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER: "Trusted by Bangladesh's Top Cricketers" */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            <span>Trusted by </span>
            <span className="text-[#84cc16]">Bangladesh&apos;s </span>
            <span>Top Cricketers</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed">
            See what Bangladesh&apos;s cricket stars say about PLAYZONE gear.
            <br className="hidden sm:inline" />
            <span className="text-zinc-400 font-medium"> Real players. Real reviews. Real performance.</span>
          </p>
        </div>

        {/* 2. CAROUSEL & CARDS CONTAINER */}
        <div className="relative">
          {/* Left Arrow Button (<) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Player Review"
            className={`absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
              canScrollLeft
                ? "bg-white text-zinc-950 shadow-xl hover:bg-zinc-100 hover:scale-105 active:scale-95 cursor-pointer opacity-100"
                : "bg-white/40 text-zinc-400 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button (>) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Player Review"
            className={`absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
              canScrollRight
                ? "bg-white text-zinc-950 shadow-xl hover:bg-zinc-100 hover:scale-105 active:scale-95 cursor-pointer opacity-100"
                : "bg-white/40 text-zinc-400 cursor-not-allowed opacity-40"
            }`}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* 5 Video Cards Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth scrollbar-none pb-4 snap-x snap-mandatory"
          >
            {PLAYER_REVIEWS.map((player) => (
              <div
                key={player.id}
                onClick={() => setActivePlayer(player)}
                className="flex-shrink-0 w-[calc((100%-14px)/2)] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start group relative cursor-pointer flex flex-col justify-between rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-700/60 bg-gradient-to-b from-zinc-900/90 to-[#070b09] shadow-xl hover:border-[#84cc16]/70 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Player Photo with Play Button Overlay */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                  <Image
                    src={player.imageSrc}
                    alt={player.name}
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Icon in Center */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-xs border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#84cc16] group-hover:border-[#84cc16] group-hover:text-black transition-all shadow-lg text-white">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Player Details (Bottom Bar) */}
                <div className="p-3.5 sm:p-4 text-center bg-black/70 backdrop-blur-sm border-t border-zinc-800/80">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#84cc16] transition-colors leading-snug">
                    {player.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5 line-clamp-1">
                    {player.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Indicator Dots (5 Dots with first active pill) */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {PLAYER_REVIEWS.map((_, dotIdx) => {
              const isActive = dotIdx === activeSlide;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    setActiveSlide(dotIdx);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({
                        left: dotIdx * 240,
                        behavior: "smooth",
                      });
                    }
                  }}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-7 bg-[#84cc16] shadow-[0_0_8px_rgba(132,204,22,0.8)]"
                      : "w-2 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. VIDEO MODAL POP-UP */}
      {activePlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePlayer(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg">
                  {activePlayer.name}
                </h3>
                <p className="text-xs text-[#84cc16] font-semibold">
                  {activePlayer.role}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePlayer(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display Screen */}
            <div className="relative w-full aspect-video bg-black flex flex-col items-center justify-center p-6 text-center">
              <div className="relative w-20 h-20 rounded-full bg-[#84cc16]/20 border border-[#84cc16] flex items-center justify-center mb-4 text-[#84cc16] animate-pulse">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
              <h4 className="text-white font-bold text-lg max-w-md">
                {activePlayer.videoTitle}
              </h4>
              <p className="text-zinc-400 text-sm italic max-w-md mt-2">
                &ldquo;{activePlayer.quote}&rdquo;
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-[#84cc16] text-black font-extrabold text-xs px-4 py-2 rounded-full">
                <span>EXCLUSIVE CRICKETER REVIEW</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
