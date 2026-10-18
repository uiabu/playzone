"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface BatProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  price: string;
  badge: "NEW" | "PRE-OWNED - GRADE A";
  category: "top-picks" | "english-willow" | "kashmir-willow" | "pre-owned";
}

const BATS_DATA: BatProduct[] = [
  {
    id: "sg-player-edition",
    name: "SG English Willow Player Edition Cricket Bat",
    imageSrc: "/images/products/bats/sg_english_willow.png",
    rating: 4.8,
    reviewsCount: 120,
    price: "৳ 8,500",
    badge: "NEW",
    category: "english-willow",
  },
  {
    id: "kookaburra-shadow",
    name: "Kookaburra Shadow English Willow Bat",
    imageSrc: "/images/products/bats/kookaburra_shadow.png",
    rating: 4.5,
    reviewsCount: 189,
    price: "৳ 7,200",
    badge: "NEW",
    category: "english-willow",
  },
  {
    id: "mrf-genius-elite",
    name: "MRF Genius Elite Cricket Bat",
    imageSrc: "/images/products/bats/mrf_genius_elite.png",
    rating: 4.7,
    reviewsCount: 65,
    price: "৳ 6,800",
    badge: "NEW",
    category: "english-willow",
  },
  {
    id: "ss-ton-reserve",
    name: "SS TON Reserve Edition Cricket Bat",
    imageSrc: "/images/products/bats/ss_ton_reserve.png",
    rating: 4.5,
    reviewsCount: 98,
    price: "৳ 4,200",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
  },
  {
    id: "gm-icon-dxm",
    name: "GM Icon DXM Cricket Bat",
    imageSrc: "/images/products/bats/gm_icon_dxm.png",
    rating: 4.6,
    reviewsCount: 52,
    price: "৳ 2,900",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
  },
  // Additional items for Kashmir Willow filter
  {
    id: "dsc-krunch-kashmir",
    name: "DSC Krunch The Bull Kashmir Willow Bat",
    imageSrc: "/images/products/bats/sg_english_willow.png",
    rating: 4.4,
    reviewsCount: 76,
    price: "৳ 2,450",
    badge: "NEW",
    category: "kashmir-willow",
  },
  {
    id: "sg-scorer-kashmir",
    name: "SG Scorer Classic Kashmir Willow Bat",
    imageSrc: "/images/products/bats/mrf_genius_elite.png",
    rating: 4.3,
    reviewsCount: 84,
    price: "৳ 1,950",
    badge: "NEW",
    category: "kashmir-willow",
  },
];

type FilterCategory = "top-picks" | "english-willow" | "kashmir-willow" | "pre-owned";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "top-picks", label: "Top Picks" },
  { id: "english-willow", label: "English Willow" },
  { id: "kashmir-willow", label: "Kashmir Willow" },
  { id: "pre-owned", label: "Pre-owned" },
];

export default function ExclusiveProductsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("top-picks");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products based on active tab
  const displayedProducts =
    activeFilter === "top-picks"
      ? BATS_DATA.slice(0, 5) // Exactly matches the 5 cards in reference screenshot
      : BATS_DATA.filter((item) => item.category === activeFilter);

  // Horizontal scroll controls
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. SECTION HEADER: "Bats for Every Innings" + Prev/Next Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Bats</span>
          <span className="text-[#84cc16]">for Every Innings</span>
        </h2>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          {/* Previous (<) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous Bats"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-black hover:border-zinc-300 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next (>) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next Bats"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS: Top Picks, English Willow, Kashmir Willow, Pre-owned */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none mb-6">
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
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

      {/* 3. PRODUCT CARDS GRID (5 Cards Row) */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5 overflow-x-auto scrollbar-none pb-2"
      >
        {displayedProducts.map((bat) => (
          <Link
            key={bat.id}
            href={`/product/${bat.id}`}
            className="group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
          >
            {/* Bat Image Display Area */}
            <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/60 to-white">
              <Image
                src={bat.imageSrc}
                alt={bat.name}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Name */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[36px]">
                {bat.name}
              </h3>

              {/* Star Rating & Review Count */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5 text-[#84cc16]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(bat.rating)
                          ? "fill-[#84cc16] text-[#84cc16]"
                          : i < bat.rating
                          ? "fill-[#84cc16]/50 text-[#84cc16]"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-zinc-700">
                  {bat.rating}
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">
                  ({bat.reviewsCount})
                </span>
              </div>
            </div>

            {/* Price & Badge Strip */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-100">
              {/* BDT Price */}
              <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                {bat.price}
              </span>

              {/* Status Badge: NEW or PRE-OWNED - GRADE A */}
              {bat.badge === "NEW" ? (
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
