"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Eye } from "lucide-react";
import { getProductViews } from "@/lib/productsData";

interface GearProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  viewsCount?: number;
  originalPrice?: string;
  price: string;
  badge: string;
  tags: ("offers" | "new-arrivals" | "pre-owned" | "combo-sets" | "trending" | "best-rated")[];
}

const GEAR_DATA: GearProduct[] = [
  // --- Offers / Best Deals ---
  {
    id: "ss-ton-english-bat",
    name: "SS TON English Willow Bat",
    imageSrc: "/images/products/featured_gear/ss_ton_bat.png",
    rating: 4.9,
    reviewsCount: 120,
    originalPrice: "৳ 7,500",
    price: "৳ 6,200",
    badge: "17% OFF",
    tags: ["offers", "trending", "best-rated"],
  },
  {
    id: "sg-cricket-helmet-pro",
    name: "SG Cricket Helmet Pro",
    imageSrc: "/images/products/featured_gear/sg_cricket_helmet.png",
    rating: 4.4,
    reviewsCount: 81,
    originalPrice: "৳ 6,000",
    price: "৳ 5,200",
    badge: "13% OFF",
    tags: ["offers"],
  },
  {
    id: "puma-cricket-spikes-shoes",
    name: "Puma Cricket Spikes Shoes",
    imageSrc: "/images/products/featured_gear/puma_cricket_spikes.png",
    rating: 4.6,
    reviewsCount: 37,
    originalPrice: "৳ 7,500",
    price: "৳ 6,500",
    badge: "12% OFF",
    tags: ["offers", "trending"],
  },
  {
    id: "kookaburra-aura-pro",
    name: "Kookaburra Aura Pro English Willow Bat",
    imageSrc: "/images/products/bats/kookaburra_bat.png",
    rating: 4.7,
    reviewsCount: 189,
    originalPrice: "৳ 8,800",
    price: "৳ 7,200",
    badge: "18% OFF",
    tags: ["offers", "trending", "best-rated"],
  },
  {
    id: "gray-nicolls-nova-players",
    name: "Gray-Nicolls Nova Players Cricket Bat",
    imageSrc: "/images/products/bats/gr_bat.png",
    rating: 4.6,
    reviewsCount: 64,
    originalPrice: "৳ 7,500",
    price: "৳ 6,500",
    badge: "13% OFF",
    tags: ["offers"],
  },
  {
    id: "dsc-split-44-batting-pads",
    name: "DSC Split 44 Lightweight Batting Pads",
    imageSrc: "/images/products/batting_essentials/dsc_pads.png",
    rating: 4.7,
    reviewsCount: 94,
    originalPrice: "৳ 5,400",
    price: "৳ 4,600",
    badge: "15% OFF",
    tags: ["offers"],
  },

  // --- New Arrivals ---
  {
    id: "kookaburra-pads-white",
    name: "Kookaburra Pro Batting Pads",
    imageSrc: "/images/products/featured_gear/kookaburra_batting_pads.png",
    rating: 4.8,
    reviewsCount: 58,
    price: "৳ 4,800",
    badge: "NEW",
    tags: ["new-arrivals", "best-rated"],
  },
  {
    id: "playzone-team-wheelie-kit",
    name: "PLAYZONE Team Wheelie Kit Bag",
    imageSrc: "/images/products/featured_gear/playzone_team_bag.png",
    rating: 4.4,
    reviewsCount: 91,
    price: "৳ 5,800",
    badge: "NEW",
    tags: ["new-arrivals"],
  },
  {
    id: "mrf-genius-grand-edition",
    name: "MRF Genius Grand Edition Cricket Bat",
    imageSrc: "/images/products/bats/mrf.png",
    rating: 4.9,
    reviewsCount: 215,
    price: "৳ 9,800",
    badge: "NEW",
    tags: ["new-arrivals", "trending", "best-rated"],
  },
  {
    id: "sg-savage-english-willow",
    name: "SG Savage Edition English Willow Bat",
    imageSrc: "/images/products/bats/sg_bat.png",
    rating: 4.8,
    reviewsCount: 124,
    price: "৳ 8,500",
    badge: "NEW",
    tags: ["new-arrivals", "trending", "best-rated"],
  },
  {
    id: "sg-test-batting-gloves",
    name: "SG Test Player Batting Gloves",
    imageSrc: "/images/products/batting_essentials/sg_gloves.png",
    rating: 4.8,
    reviewsCount: 110,
    price: "৳ 3,200",
    badge: "NEW",
    tags: ["new-arrivals"],
  },
  {
    id: "adidas-22yds-spikes",
    name: "Adidas 22YDS Match Spikes",
    imageSrc: "/images/products/shoes_bags/adidas_spikes.png",
    rating: 4.7,
    reviewsCount: 48,
    price: "৳ 7,800",
    badge: "NEW",
    tags: ["new-arrivals"],
  },

  // --- Pre-owned Gear ---
  {
    id: "ss-ton-reserve-preowned",
    name: "SS TON Reserve Edition Bat (Grade A)",
    imageSrc: "/images/products/bats/ss_ton.png",
    rating: 4.6,
    reviewsCount: 98,
    originalPrice: "৳ 8,500",
    price: "৳ 4,800",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned", "offers"],
  },
  {
    id: "sf-stanford-players-preowned",
    name: "SF Stanford Players Edition Bat (Grade A)",
    imageSrc: "/images/products/bats/sf_bat.png",
    rating: 4.5,
    reviewsCount: 52,
    originalPrice: "৳ 6,500",
    price: "৳ 3,600",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned", "offers"],
  },
  {
    id: "gray-nicolls-elite-helmet-preowned",
    name: "Gray-Nicolls Elite Cricket Helmet (Grade A)",
    imageSrc: "/images/products/batting_essentials/gray_nicolls_helmet.png",
    rating: 4.9,
    reviewsCount: 128,
    originalPrice: "৳ 6,000",
    price: "৳ 3,600",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned", "best-rated"],
  },
  {
    id: "new-balance-tc-pads-preowned",
    name: "New Balance TC 1260 Batting Pads (Grade A)",
    imageSrc: "/images/products/batting_essentials/new_balance_pads.png",
    rating: 4.8,
    reviewsCount: 86,
    originalPrice: "৳ 4,800",
    price: "৳ 2,900",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned"],
  },
  {
    id: "gray-nicolls-thigh-guard-preowned",
    name: "Gray-Nicolls All-in-One Thigh Guard (Grade A)",
    imageSrc: "/images/products/batting_essentials/gray_nicolls_thigh_guard_upscaled.png",
    rating: 4.6,
    reviewsCount: 72,
    originalPrice: "৳ 2,800",
    price: "৳ 1,800",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned"],
  },
  {
    id: "playzone-pro-wheelie-preowned-gear",
    name: "PLAYZONE Pro Tractor Wheelie Kit Bag (Grade A)",
    imageSrc: "/images/products/shoes_bags/playzone_wheelie_bag.png",
    rating: 4.8,
    reviewsCount: 31,
    originalPrice: "৳ 8,500",
    price: "৳ 4,600",
    badge: "PRE-OWNED - GRADE A",
    tags: ["pre-owned"],
  },

  // --- Combo Sets ---
  {
    id: "batting-protection-master-combo",
    name: "PLAYZONE Complete Batting Protection Combo (Pads + Gloves + Helmet)",
    imageSrc: "/images/categories/batting_pads.png",
    rating: 4.9,
    reviewsCount: 67,
    originalPrice: "৳ 14,500",
    price: "৳ 11,800",
    badge: "COMBO SAVE 19%",
    tags: ["combo-sets", "offers"],
  },
  {
    id: "master-bat-knocking-combo",
    name: "English Willow Bat Care & Linseed Knocking Combo Pack",
    imageSrc: "/images/products/bats/ceat_ton.png",
    rating: 4.7,
    reviewsCount: 42,
    originalPrice: "৳ 2,500",
    price: "৳ 1,950",
    badge: "COMBO PACK",
    tags: ["combo-sets"],
  },
  {
    id: "cricket-training-agility-set",
    name: "Cricket Training Agility Set (Cones + Ladder + Speed Hurdles)",
    imageSrc: "/images/categories/training_gear.png",
    rating: 4.8,
    reviewsCount: 53,
    originalPrice: "৳ 3,200",
    price: "৳ 2,450",
    badge: "COMBO PACK",
    tags: ["combo-sets"],
  },
  {
    id: "wicketkeeper-pro-combo-set",
    name: "Pro Wicketkeeping Kit (Gloves + Padded Inners + Legguards)",
    imageSrc: "/images/categories/wicketkeeping.png",
    rating: 4.7,
    reviewsCount: 38,
    originalPrice: "৳ 9,800",
    price: "৳ 7,900",
    badge: "COMBO SAVE 20%",
    tags: ["combo-sets", "offers"],
  },
  {
    id: "leather-match-balls-pack-6",
    name: "Regulation 4-Piece Leather Match Balls (Box of 6)",
    imageSrc: "/images/categories/cricket_balls.png",
    rating: 4.8,
    reviewsCount: 88,
    originalPrice: "৳ 6,000",
    price: "৳ 4,800",
    badge: "BOX COMBO",
    tags: ["combo-sets", "offers"],
  },
];

type FilterType = "offers" | "new-arrivals" | "pre-owned" | "combo-sets" | "trending" | "best-rated";

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: "offers", label: "Offers" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "pre-owned", label: "Pre-owned" },
  { id: "combo-sets", label: "Combo Sets" },
  { id: "trending", label: "Trending" },
  { id: "best-rated", label: "Best Rated" },
];

export default function FeaturedCricketGearSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("offers");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter products by selected tab tag
  const displayedProducts = GEAR_DATA.filter((item) =>
    item.tags.includes(activeFilter)
  );

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

  // Horizontal scroll controls: precisely 1 product card per click
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
  };

  const handleFilterChange = (tabId: FilterType) => {
    setActiveFilter(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
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
            disabled={!canScrollLeft}
            aria-label="Previous Gear"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
              canScrollLeft
                ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                : "border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Gear"
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

      {/* 2. FILTER PILLS: Offers, New Arrivals, Pre-owned Gear, Combo Sets, Trending, Best Rated */}
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

      {/* 3. PRODUCT CARDS SLIDER (Flex Row with Smooth Horizontal Scrolling) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth scrollbar-none pb-2 snap-x snap-mandatory"
      >
        {displayedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="flex-shrink-0 w-[86%] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
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

              {/* Star Rating, Review Count & Views */}
              <div className="flex items-center justify-between gap-1 mt-2">
                <div className="flex items-center gap-1 min-w-0">
                  <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
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
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0" title="Views">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{getProductViews(product)}</span>
                </div>
              </div>
            </div>

            {/* Price & Badge */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-zinc-100">
              <div>
                <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight block">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-zinc-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs tracking-wider shrink-0 ${
                  product.badge.includes("PRE-OWNED")
                    ? "bg-zinc-900 text-white"
                    : product.badge.includes("OFF") || product.badge.includes("SAVE")
                    ? "bg-red-500 text-white"
                    : product.badge.includes("TRENDING") || product.badge.includes("HOT")
                    ? "bg-amber-500 text-white"
                    : "bg-[#a3e635] text-black"
                }`}
              >
                {product.badge}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
