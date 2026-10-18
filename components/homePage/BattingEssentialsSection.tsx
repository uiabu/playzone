"use client";

import React, { useState, useRef } from "react";
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
  badge: "NEW";
  category: "batting-gloves" | "batting-pads" | "helmets" | "thigh-guards" | "chest-guards";
}

const ESSENTIALS_DATA: EssentialProduct[] = [
  {
    id: "sg-test-batting-gloves",
    name: "SG Test Batting Gloves",
    imageSrc: "/images/products/batting_essentials/sg_test_gloves.png",
    rating: 4.7,
    reviewsCount: 110,
    price: "৳ 3,200",
    badge: "NEW",
    category: "batting-gloves",
  },
  {
    id: "ss-sunrise-batting-pads",
    name: "SS Sunrise Batting Pads",
    imageSrc: "/images/products/batting_essentials/ss_sunrise_pads.png",
    rating: 4.6,
    reviewsCount: 92,
    price: "৳ 4,500",
    badge: "NEW",
    category: "batting-pads",
  },
  {
    id: "shrey-master-class-helmet",
    name: "Shrey Master Class Cricket Helmet",
    imageSrc: "/images/products/batting_essentials/shrey_helmet.png",
    rating: 4.7,
    reviewsCount: 74,
    price: "৳ 5,800",
    badge: "NEW",
    category: "helmets",
  },
  {
    id: "kookaburra-thigh-guard",
    name: "Kookaburra Thigh Guard",
    imageSrc: "/images/products/batting_essentials/kookaburra_thigh_guard.png",
    rating: 4.5,
    reviewsCount: 61,
    price: "৳ 2,200",
    badge: "NEW",
    category: "thigh-guards",
  },
  {
    id: "sg-chest-guard",
    name: "SG Chest Guard",
    imageSrc: "/images/products/batting_essentials/sg_chest_guard.png",
    rating: 4.4,
    reviewsCount: 38,
    price: "৳ 3,000",
    badge: "NEW",
    category: "chest-guards",
  },
];

type FilterCategory =
  | "all"
  | "batting-gloves"
  | "batting-pads"
  | "helmets"
  | "thigh-guards"
  | "chest-guards";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "batting-gloves", label: "Batting Gloves" },
  { id: "batting-pads", label: "Batting Pads" },
  { id: "helmets", label: "Helmets" },
  { id: "thigh-guards", label: "Thigh Guards" },
  { id: "chest-guards", label: "Chest Guards" },
];

export default function BattingEssentialsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedProducts =
    activeFilter === "all"
      ? ESSENTIALS_DATA
      : ESSENTIALS_DATA.filter((item) => item.category === activeFilter);

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
      {/* 1. SECTION HEADER: "Batting Essentials" + Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Batting</span>
          <span className="text-[#84cc16]">Essentials</span>
        </h2>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous Essentials"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-black hover:border-zinc-300 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next Essentials"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS: All, Batting Gloves, Batting Pads, Helmets, Thigh Guards, Chest Guards */}
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

      {/* 3. PRODUCT CARDS GRID (5 Cards) */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5 overflow-x-auto scrollbar-none pb-2"
      >
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
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

            {/* Price & NEW Badge */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-100">
              <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                {product.price}
              </span>
              <span className="bg-[#a3e635] text-black text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md shadow-2xs tracking-wider">
                {product.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
