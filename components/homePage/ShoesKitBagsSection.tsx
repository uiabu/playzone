"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Eye } from "lucide-react";
import { getProductViews } from "@/lib/productsData";

interface ShoeBagProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  viewsCount?: number;
  originalPrice?: string;
  price: string;
  badge: "NEW" | "PRE-OWNED - GRADE A" | "12% OFF" | "POPULAR";
  category: "cricket-shoes" | "kit-bags" | "backpacks" | "accessories" | "pre-owned";
  isPreOwned?: boolean;
}

const PRODUCTS: ShoeBagProduct[] = [
  {
    id: "adidas-22yds-spikes",
    name: "Adidas 22YDS Spikes",
    imageSrc: "/images/products/shoes_bags/adidas_spikes.png",
    rating: 4.7,
    reviewsCount: 48,
    price: "৳ 7,800",
    badge: "NEW",
    category: "cricket-shoes",
  },
  {
    id: "nb-ck4020-shoes",
    name: "New Balance CK4020 Cricket Shoes",
    imageSrc: "/images/products/shoes_bags/nb_cricket_shoes.png",
    rating: 4.6,
    reviewsCount: 32,
    price: "৳ 6,900",
    badge: "NEW",
    category: "cricket-shoes",
  },
  {
    id: "playzone-pro-wheelie-bag",
    name: "PLAYZONE Pro Wheelie Cricket Kit Bag",
    imageSrc: "/images/products/shoes_bags/playzone_wheelie_bag.png",
    rating: 4.8,
    reviewsCount: 45,
    price: "৳ 8,500",
    badge: "NEW",
    category: "kit-bags",
  },
  {
    id: "playzone-pro-wheelie-preowned",
    name: "PLAYZONE Pro Wheelie (Grade A Pre-Owned)",
    imageSrc: "/images/products/shoes_bags/playzone_wheelie_bag.png",
    rating: 4.8,
    reviewsCount: 31,
    originalPrice: "৳ 8,500",
    price: "৳ 4,600",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
    isPreOwned: true,
  },
  {
    id: "nb-ck4020-preowned",
    name: "New Balance CK4020 Turf Spikes (Pre-Owned)",
    imageSrc: "/images/products/shoes_bags/nb_cricket_shoes.png",
    rating: 4.7,
    reviewsCount: 22,
    originalPrice: "৳ 6,900",
    price: "৳ 3,900",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
    isPreOwned: true,
  },
  {
    id: "ss-duffle-kit-bag",
    name: "SS Duffle Cricket Bag",
    imageSrc: "/images/products/shoes_bags/ss_duffle_bag.png",
    rating: 4.4,
    reviewsCount: 89,
    price: "৳ 4,200",
    badge: "NEW",
    category: "kit-bags",
  },
  {
    id: "gray-nicolls-backpack",
    name: "Gray-Nicolls Backpack",
    imageSrc: "/images/products/shoes_bags/gn_backpack.png",
    rating: 4.8,
    reviewsCount: 31,
    price: "৳ 3,800",
    badge: "NEW",
    category: "backpacks",
  },
  {
    id: "ss-duffle-preowned",
    name: "SS Duffle Bag (Grade A Pre-Owned)",
    imageSrc: "/images/products/shoes_bags/ss_duffle_bag.png",
    rating: 4.5,
    reviewsCount: 41,
    originalPrice: "৳ 4,200",
    price: "৳ 2,400",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
    isPreOwned: true,
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
    category: "cricket-shoes",
  },
  {
    id: "playzone-team-bag",
    name: "PLAYZONE Team Duffle Bag",
    imageSrc: "/images/products/featured_gear/playzone_team_bag.png",
    rating: 4.4,
    reviewsCount: 54,
    price: "৳ 5,800",
    badge: "POPULAR",
    category: "kit-bags",
  },
];

type FilterCategory = "all" | "cricket-shoes" | "kit-bags" | "pre-owned" | "backpacks" | "accessories";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cricket-shoes", label: "Cricket Shoes" },
  { id: "kit-bags", label: "Kit Bags" },
  { id: "pre-owned", label: "Pre-owned" },
  { id: "backpacks", label: "Backpacks" },
  { id: "accessories", label: "Accessories" },
];

export default function ShoesKitBagsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayedProducts =
    activeFilter === "all"
      ? PRODUCTS
      : activeFilter === "pre-owned"
      ? PRODUCTS.filter((item) => item.category === "pre-owned" || item.isPreOwned)
      : PRODUCTS.filter((item) => item.category === activeFilter);

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

  // Horizontal scroll controls: precisely 1 card per click
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

  const handleFilterChange = (tabId: FilterCategory) => {
    setActiveFilter(tabId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. SECTION HEADER: "Shoes & Kit Bags" + Navigation Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Shoes &</span>
          <span className="text-[#84cc16]">Kit Bags</span>
        </h2>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Items"
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
            aria-label="Next Items"
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

      {/* 2. FILTER PILLS: All, Cricket Shoes, Kit Bags, Pre-owned Gear, Backpacks, Accessories */}
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
                    : product.badge.includes("OFF")
                    ? "bg-red-500 text-white"
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
