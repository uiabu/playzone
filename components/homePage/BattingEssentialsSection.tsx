"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface EssentialProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  price: string;
  badge: "NEW" | "PRE-OWNED - GRADE A";
  category: "batting-gloves" | "batting-pads" | "helmets" | "thigh-guards" | "guards";
  isPreOwned?: boolean;
}

const ESSENTIALS_DATA: EssentialProduct[] = [
  {
    id: "sg-test-batting-gloves",
    name: "SG Test Batting Gloves",
    imageSrc: "/images/products/batting_essentials/sg_gloves.png",
    rating: 4.8,
    reviewsCount: 110,
    price: "৳ 3,200",
    badge: "NEW",
    category: "batting-gloves",
  },
  {
    id: "dsc-split-batting-pads",
    name: "DSC Split 44 Batting Pads",
    imageSrc: "/images/products/batting_essentials/dsc_pads.png",
    rating: 4.7,
    reviewsCount: 94,
    price: "৳ 4,600",
    badge: "NEW",
    category: "batting-pads",
  },
  {
    id: "gray-nicolls-elite-helmet",
    name: "Gray-Nicolls Elite Cricket Helmet",
    imageSrc: "/images/products/batting_essentials/gray_nicolls_helmet.png",
    rating: 4.9,
    reviewsCount: 128,
    price: "৳ 3,600",
    badge: "PRE-OWNED - GRADE A",
    category: "helmets",
    isPreOwned: true,
  },
  {
    id: "gray-nicolls-thigh-guard",
    name: "Gray-Nicolls All-in-One Thigh Guard",
    imageSrc: "/images/products/batting_essentials/gray_nicolls_thigh_guard_upscaled.png",
    rating: 4.6,
    reviewsCount: 72,
    price: "৳ 1,800",
    badge: "PRE-OWNED - GRADE A",
    category: "thigh-guards",
    isPreOwned: true,
  },
  {
    id: "new-balance-tc-batting-pads",
    name: "New Balance TC 1260 Batting Pads",
    imageSrc: "/images/products/batting_essentials/new_balance_pads.png",
    rating: 4.8,
    reviewsCount: 86,
    price: "৳ 2,900",
    badge: "PRE-OWNED - GRADE A",
    category: "batting-pads",
    isPreOwned: true,
  },
  {
    id: "new-balance-inner-gloves",
    name: "New Balance Cotton Padded Inner Gloves",
    imageSrc: "/images/products/batting_essentials/new_balance_inner_gloves.png",
    rating: 4.5,
    reviewsCount: 64,
    price: "৳ 850",
    badge: "NEW",
    category: "batting-gloves",
  },
  {
    id: "sg-test-arm-guard",
    name: "SG Test Player Arm Guard",
    imageSrc: "/images/products/batting_essentials/sg_test_arm_guard.png",
    rating: 4.5,
    reviewsCount: 43,
    price: "৳ 1,450",
    badge: "NEW",
    category: "guards",
  },
  {
    id: "sg-abdominal-guard",
    name: "SG Pro Abdominal Guard",
    imageSrc: "/images/products/batting_essentials/sg_abdominal_guard.png",
    rating: 4.6,
    reviewsCount: 58,
    price: "৳ 650",
    badge: "NEW",
    category: "guards",
  },
];

type FilterCategory =
  | "all"
  | "batting-gloves"
  | "batting-pads"
  | "helmets"
  | "thigh-guards"
  | "guards"
  | "pre-owned";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "batting-gloves", label: "Batting Gloves" },
  { id: "batting-pads", label: "Batting Pads" },
  { id: "helmets", label: "Helmets" },
  { id: "thigh-guards", label: "Thigh Guards" },
  { id: "guards", label: "Guards" },
  { id: "pre-owned", label: "Pre-owned" },
];

export default function BattingEssentialsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter products based on active tab
  const displayedProducts =
    activeFilter === "all"
      ? ESSENTIALS_DATA
      : activeFilter === "pre-owned"
      ? ESSENTIALS_DATA.filter(
          (item) => item.badge === "PRE-OWNED - GRADE A" || item.isPreOwned
        )
      : activeFilter === "guards"
      ? ESSENTIALS_DATA.filter(
          (item) => item.category === "guards" || item.category === "thigh-guards"
        )
      : ESSENTIALS_DATA.filter((item) => item.category === activeFilter);

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
  }, [displayedProducts, updateScrollState]);

  // Horizontal scroll controls: precisely 1 product card in/out per click
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    let scrollAmount = 280; // fallback
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
  };

  // Tab switch handler: reset scroll position
  const handleFilterChange = (tabId: FilterCategory) => {
    setActiveFilter(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. SECTION HEADER: "Batting Essentials" + Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Batting</span>
          <span className="text-[#84cc16]">Essentials</span>
        </h2>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          {/* Previous (<) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Essentials"
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
            aria-label="Next Essentials"
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

      {/* 2. FILTER PILLS */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none mb-6">
        {FILTER_TABS.map((tab) => {
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
      </div>

      {/* 3. PRODUCT CARDS SLIDER (5 Cards Visible Row on Desktop) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth scrollbar-none pb-2 snap-x snap-mandatory"
      >
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="flex-shrink-0 w-[calc((100%-14px)/2)] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
          >
            {/* Product Image Area */}
            <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/60 to-white">
              <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Title */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[36px]">
                {product.name}
              </h3>

              {/* Star Rating & Review Count */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5 text-[#84cc16]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#84cc16] text-[#84cc16]"
                          : i < product.rating
                          ? "fill-[#84cc16]/50 text-[#84cc16]"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-zinc-700">
                  {product.rating}
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">
                  ({product.reviewsCount})
                </span>
              </div>
            </div>

            {/* Price & Badge Strip */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-100">
              <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                {product.price}
              </span>
              {product.badge === "NEW" ? (
                <span className="bg-[#a3e635] text-black text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-2xs tracking-wider">
                  NEW
                </span>
              ) : (
                <span className="bg-[#bef264] text-black text-[9px] font-bold uppercase px-2 py-0.5 rounded-md shadow-2xs tracking-tight">
                  PRE-OWNED - GRADE A
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
