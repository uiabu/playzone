"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface GearProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  originalPrice?: string;
  price: string;
  badge: "17% OFF" | "13% OFF" | "12% OFF" | "NEW";
  category: "best-deals" | "new-arrivals";
}

const GEAR_DATA: GearProduct[] = [
  {
    id: "ss-ton-english-bat",
    name: "SS TON English Willow Bat",
    imageSrc: "/images/products/featured_gear/ss_ton_bat.png",
    rating: 4.9,
    reviewsCount: 120,
    originalPrice: "৳ 7,500",
    price: "৳ 6,200",
    badge: "17% OFF",
    category: "best-deals",
  },
  {
    id: "sg-cricket-helmet-pro",
    name: "SG Cricket Helmet",
    imageSrc: "/images/products/featured_gear/sg_cricket_helmet.png",
    rating: 4.4,
    reviewsCount: 81,
    originalPrice: "৳ 6,000",
    price: "৳ 5,200",
    badge: "13% OFF",
    category: "best-deals",
  },
  {
    id: "kookaburra-pads-white",
    name: "Kookaburra Batting Pads",
    imageSrc: "/images/products/featured_gear/kookaburra_batting_pads.png",
    rating: 4.8,
    reviewsCount: 58,
    price: "৳ 4,800",
    badge: "NEW",
    category: "new-arrivals",
  },
  {
    id: "puma-cricket-spikes-shoes",
    name: "Puma Cricket Spikes",
    imageSrc: "/images/products/featured_gear/puma_cricket_spikes.png",
    rating: 4.6,
    reviewsCount: 37,
    originalPrice: "৳ 7,500",
    price: "৳ 6,500",
    badge: "12% OFF",
    category: "best-deals",
  },
  {
    id: "playzone-team-wheelie-kit",
    name: "PLAYZONE Team Kit Bag",
    imageSrc: "/images/products/featured_gear/playzone_team_bag.png",
    rating: 4.4,
    reviewsCount: 91,
    price: "৳ 5,800",
    badge: "NEW",
    category: "new-arrivals",
  },
];

type FilterType = "best-deals" | "new-arrivals";

export default function FeaturedCricketGearSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("best-deals");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // In screenshot, all 5 items are displayed under "Best Deals"
  const displayedProducts =
    activeFilter === "best-deals"
      ? GEAR_DATA
      : GEAR_DATA.filter((item) => item.category === "new-arrivals");

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
      {/* 1. SECTION HEADER: "Featured Cricket Gear" + Navigation Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Featured</span>
          <span className="text-[#84cc16]">Cricket Gear</span>
        </h2>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous Gear"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-black hover:border-zinc-300 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next Gear"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS: Best Deals, New Arrivals */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none mb-6">
        <button
          type="button"
          onClick={() => setActiveFilter("best-deals")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeFilter === "best-deals"
              ? "bg-zinc-950 text-white shadow-xs"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-900 font-medium"
          }`}
        >
          Best Deals
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("new-arrivals")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
            activeFilter === "new-arrivals"
              ? "bg-zinc-950 text-white shadow-xs"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-900 font-medium"
          }`}
        >
          New Arrivals
        </button>
      </div>

      {/* 3. PRODUCT CARDS GRID (5 Cards Row) */}
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
            {/* Realistic Product Image Area */}
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

            {/* Price & Discount/NEW Badge */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-100">
              {/* Pricing (Original Strikethrough + Discounted Price) */}
              <div className="flex items-center gap-1.5 min-w-0">
                {product.originalPrice && (
                  <span className="line-through text-zinc-400 text-xs sm:text-[13px] font-semibold">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                  {product.price}
                </span>
              </div>

              {/* Badge: 17% OFF / 13% OFF / 12% OFF / NEW */}
              <span className="bg-[#a3e635] text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs tracking-wider whitespace-nowrap">
                {product.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
