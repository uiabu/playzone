"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { EXPERTS_DATA, Expert } from "@/components/hireExperts/expertsData";
import ExpertCard from "@/components/hireExperts/ExpertCard";
import ProfileModal from "@/components/hireExperts/ProfileModal";
import BookingModal from "@/components/hireExperts/BookingModal";

type ExpertTabCategory =
  | "top-picks"
  | "coaching"
  | "practice"
  | "fitness"
  | "officials"
  | "analysis";

interface TabItem {
  id: ExpertTabCategory;
  label: string;
}

const EXPERT_TABS: TabItem[] = [
  { id: "top-picks", label: "Top Picks" },
  { id: "coaching", label: "Coaches" },
  { id: "practice", label: "Net Bowlers & Throwers" },
  { id: "fitness", label: "Fitness & Physio" },
  { id: "officials", label: "Match Officials" },
  { id: "analysis", label: "Video Analysis" },
];

export default function HireExpertsSection() {
  const [activeFilter, setActiveFilter] = useState<ExpertTabCategory>("top-picks");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Modals state
  const [selectedProfileExpert, setSelectedProfileExpert] = useState<Expert | null>(null);
  const [selectedBookingExpert, setSelectedBookingExpert] = useState<Expert | null>(null);

  // Filter experts based on active tab
  const displayedExperts = useMemo(() => {
    if (activeFilter === "top-picks") {
      return EXPERTS_DATA;
    }
    return EXPERTS_DATA.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Update left/right scrollability buttons
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
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
  }, [displayedExperts, updateScrollState]);

  // Horizontal scroll controls: precisely 1 card per click
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    let scrollAmount = 320; // fallback
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
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  // Tab switch handler: reset scroll position
  const handleFilterChange = (tabId: ExpertTabCategory) => {
    setActiveFilter(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. SECTION HEADER: "Hire Cricket Experts" + View All + Prev/Next Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
            <span className="text-zinc-950">Hire</span>
            <span className="text-[#84cc16]">Cricket Experts</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Book certified coaches, net bowlers, fitness trainers & specialist cricket professionals
          </p>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Previous (<) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Experts"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
              canScrollLeft
                ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                : "border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next (>) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Experts"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
              canScrollRight
                ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                : "border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS / TABS */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none mb-6">
        {EXPERT_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleFilterChange(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-900 font-medium"
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* View All Link right after Video Analysis */}
        <Link
          href="/hire-experts"
          className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap bg-zinc-100 text-zinc-700 hover:bg-[#84cc16] hover:text-white transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer ml-1"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3. EXPERTS CARDS SLIDER */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none pb-3 snap-x snap-mandatory"
      >
        {displayedExperts.map((expert) => (
          <div
            key={expert.id}
            className="flex-shrink-0 w-[275px] sm:w-[310px] md:w-[330px] snap-start flex flex-col"
          >
            <ExpertCard
              expert={expert}
              onViewProfile={(exp) => setSelectedProfileExpert(exp)}
              onBook={(exp) => setSelectedBookingExpert(exp)}
            />
          </div>
        ))}

        {/* Explore All Card at the end */}
        <Link
          href="/hire-experts"
          className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start bg-gradient-to-br from-zinc-900 via-zinc-900 to-black rounded-2xl border border-zinc-800 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center justify-center text-center group select-none hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-full bg-[#84cc16]/15 text-[#84cc16] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-white text-base">Explore All Experts</h3>
          <p className="text-zinc-400 text-xs mt-1.5 mb-5 max-w-[200px]">
            Browse all certified cricket coaches, trainers & match specialists
          </p>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#84cc16] text-white text-xs font-bold group-hover:bg-[#73b512] transition-colors shadow-xs">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Profile Detail Modal */}
      <ProfileModal
        expert={selectedProfileExpert}
        isOpen={!!selectedProfileExpert}
        onClose={() => setSelectedProfileExpert(null)}
        onBook={(exp) => {
          setSelectedProfileExpert(null);
          setSelectedBookingExpert(exp);
        }}
      />

      {/* Booking Form Modal */}
      <BookingModal
        expert={selectedBookingExpert}
        isOpen={!!selectedBookingExpert}
        onClose={() => setSelectedBookingExpert(null)}
      />
    </section>
  );
}
