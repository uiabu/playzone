"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Users, Sparkles, UserPlus } from "lucide-react";
import {
  EXPERTS_DATA,
  Expert,
  ExpertType,
  EXPERT_TYPES,
  getExpertType,
} from "@/components/hireExperts/expertsData";
import ExpertCard from "@/components/hireExperts/ExpertCard";
import ProfileModal from "@/components/hireExperts/ProfileModal";
import BookingModal from "@/components/hireExperts/BookingModal";
import JoinExpertModal from "@/components/hireExperts/JoinExpertModal";

type ExpertFilterId =
  | "all"
  | "coaches"
  | "bowlers-throwers"
  | "fitness-physio"
  | "match-officials"
  | "gear-repairs"
  | "broadcast-video";

interface TabItem {
  id: ExpertFilterId;
  label: string;
  types?: ExpertType[];
}

const EXPERT_TABS: TabItem[] = [
  { id: "all", label: "Top Picks" },
  { id: "coaches", label: "Coaches", types: ["Cricket Coach"] },
  {
    id: "bowlers-throwers",
    label: "Net Bowlers & Throwers",
    types: ["Net Bowler", "Sidearm Thrower"],
  },
  {
    id: "fitness-physio",
    label: "Fitness & Physio",
    types: ["Fitness Trainer", "Sports Physio"],
  },
  {
    id: "match-officials",
    label: "Match Officials",
    types: ["Cricket Umpire", "Cricket Scorer"],
  },
  {
    id: "gear-repairs",
    label: "Bat & Gear Repairs",
    types: ["Bat Repairer", "Gear Repairer"],
  },
  {
    id: "broadcast-video",
    label: "Broadcast & Video",
    types: ["Commentator", "Match Videographer"],
  },
];

export default function HireExpertsSection() {
  const [activeFilter, setActiveFilter] = useState<ExpertFilterId>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Modals state
  const [selectedProfileExpert, setSelectedProfileExpert] = useState<Expert | null>(null);
  const [selectedBookingExpert, setSelectedBookingExpert] = useState<Expert | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const activeTabItem = EXPERT_TABS.find((t) => t.id === activeFilter);

  // Filter experts based on active tab
  const displayedExperts = useMemo(() => {
    if (activeFilter === "all") {
      return EXPERTS_DATA;
    }
    const currentTab = EXPERT_TABS.find((t) => t.id === activeFilter);
    if (!currentTab?.types) {
      return EXPERTS_DATA;
    }
    return EXPERTS_DATA.filter((item) =>
      currentTab.types!.includes(getExpertType(item))
    );
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
  const handleFilterChange = (tabId: ExpertFilterId) => {
    setActiveFilter(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. SECTION HEADER: "Hire Cricket Experts" + Action & Carousel Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Hire</span>
          <span className="text-[#84cc16]">Cricket Experts</span>
        </h2>

        {/* Action: Join as Expert Button + Carousel Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-black bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 transition-all duration-200 shadow-xs cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join as Expert</span>
          </button>

          {/* Carousel Arrow Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
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
      </div>

      {/* 2. FILTER PILLS / TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        {EXPERT_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleFilterChange(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-900 font-medium"
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* 12. JOIN AS EXPERT PILL */}
        <button
          type="button"
          onClick={() => setIsJoinModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-black whitespace-nowrap bg-[#84cc16] hover:bg-[#74d600] text-zinc-950 transition-all duration-200 shadow-xs hover:shadow active:scale-95 cursor-pointer ml-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+ Join as Expert</span>
        </button>

        {/* View All Link */}
        <Link
          href="/hire-experts"
          className="inline-flex items-center gap-1 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer ml-1"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3. EXPERTS CARDS SLIDER */}
      {displayedExperts.length === 0 ? (
        <div className="w-full py-12 px-6 rounded-3xl bg-zinc-50 border border-dashed border-zinc-300 text-center flex flex-col items-center justify-center my-4">
          <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/20 flex items-center justify-center text-[#65a30d] mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-900 mb-1">
            Be the first expert in {activeTabItem?.label || "this category"} on PLAYZONE
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mb-4">
            We are actively onboarding verified cricket professionals across Bangladesh.
          </p>
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] text-zinc-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            Apply as {activeTabItem?.types?.[0] || "Expert"}
          </button>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth scrollbar-none pb-2 snap-x snap-mandatory"
        >
          {displayedExperts.map((expert) => (
            <div
              key={expert.id}
              className="flex-shrink-0 w-[86%] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start flex flex-col"
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
            className="flex-shrink-0 w-[86%] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start bg-gradient-to-br from-zinc-900 via-zinc-900 to-black rounded-2xl border border-zinc-800 shadow-xs hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center justify-center text-center group select-none hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-full bg-[#84cc16]/15 text-[#84cc16] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-white text-base">Explore All Experts</h3>
            <p className="text-zinc-400 text-xs mt-1.5 mb-5 max-w-[200px]">
              Browse registered cricket coaches, trainers & match specialists
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#84cc16] text-white text-xs font-bold group-hover:bg-[#73b512] transition-colors shadow-xs">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      )}

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

      {/* Join as Expert Application Modal */}
      <JoinExpertModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        defaultExpertType={activeTabItem?.types?.[0] || "Cricket Coach"}
      />
    </section>
  );
}
