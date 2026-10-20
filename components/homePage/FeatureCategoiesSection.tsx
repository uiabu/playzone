"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  alt: string;
}

const CRICKET_CATEGORIES: CategoryItem[] = [
  // --- Row 1: Bats, Balls, Pads, Gloves, Helmets, Shoes ---
  {
    id: "cricket-bats",
    name: "Cricket Bats",
    href: "/category/cricket-bats",
    imageSrc: "/images/categories/cricket_bats.png",
    alt: "Cricket Bats - English & Kashmir Willow",
  },
  {
    id: "cricket-balls",
    name: "Cricket Balls",
    href: "/category/bowling",
    imageSrc: "/images/categories/cricket_balls.png",
    alt: "Cricket Balls - Match Leather & Training",
  },
  {
    id: "batting-pads",
    name: "Batting Pads",
    href: "/category/batting",
    imageSrc: "/images/categories/batting_pads.png",
    alt: "Batting Pads - Protection Legguards",
  },
  {
    id: "batting-gloves",
    name: "Batting Gloves",
    href: "/category/batting",
    imageSrc: "/images/categories/batting_gloves.png",
    alt: "Batting Gloves - Premium Protection",
  },
  {
    id: "helmets",
    name: "Helmets",
    href: "/category/batting",
    imageSrc: "/images/categories/helmets.png",
    alt: "Cricket Helmets - Grille Face Protection",
  },
  {
    id: "cricket-shoes",
    name: "Cricket Shoes",
    href: "/category/shoes",
    imageSrc: "/images/categories/cricket_shoes.png",
    alt: "Cricket Shoes - Spikes & Rubber Studs",
  },

  // --- Row 2: Thigh Guards, Wicketkeeping, Stumps, Kit Bags, Jerseys, Training Gear ---
  {
    id: "thigh-guards",
    name: "Thigh Guards",
    href: "/category/batting",
    imageSrc: "/images/categories/thigh_guards.png",
    alt: "Combo Thigh Guards & Body Armour",
  },
  {
    id: "wicketkeeping",
    name: "Wicketkeeping",
    href: "/category/wicketkeeping",
    imageSrc: "/images/categories/wicketkeeping.png",
    alt: "Wicketkeeping Gloves & Pads",
  },
  {
    id: "stumps",
    name: "Stumps",
    href: "/category/accessories",
    imageSrc: "/images/categories/stumps.png",
    alt: "Cricket Stumps & Bails",
  },
  {
    id: "kit-bags",
    name: "Kit Bags",
    href: "/category/accessories",
    imageSrc: "/images/categories/kit_bags.png",
    alt: "Playzone Cricket Kit Bags & Duffles",
  },
  {
    id: "jerseys",
    name: "Jerseys",
    href: "/category/clothing",
    imageSrc: "/images/categories/jerseys.png",
    alt: "Cricket Match Jerseys & Team Kits",
  },
  {
    id: "training-gear",
    name: "Training Gear",
    href: "/category/training",
    imageSrc: "/images/categories/training_gear.png",
    alt: "Cricket Training & Agility Equipment",
  },
];

const ROW_1_CATEGORIES: CategoryItem[] = CRICKET_CATEGORIES.slice(0, 6);
const ROW_2_CATEGORIES: CategoryItem[] = CRICKET_CATEGORIES.slice(6, 12);

function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link
      href={category.href}
      className="group flex-shrink-0 snap-start w-[calc((100vw-32px-24px)/4)] sm:w-[calc((100vw-48px-36px)/4)] md:w-[130px] lg:w-auto flex flex-col items-center justify-start text-center p-1 sm:p-2 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xs select-none"
    >
      {/* Category Product Image Container */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center mb-1.5 sm:mb-2.5 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={category.imageSrc}
          alt={category.alt}
          fill
          sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 140px"
          className="object-contain object-center drop-shadow-xs"
        />
      </div>

      {/* Category Label */}
      <span className="text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors leading-tight text-center tracking-tight line-clamp-2 min-h-[28px] sm:min-h-[32px] flex items-center justify-center">
        {category.name}
      </span>
    </Link>
  );
}

export default function FeatureCategoiesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [updateScrollState]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = Math.round(container.clientWidth * 0.75);
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header: "Featured Categories" + Carousel Arrow Buttons */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Featured</span>
          <span className="text-[#84cc16]">Categories</span>
        </h2>

        {/* Carousel Arrow Buttons for Mobile / Tablet Slider */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous categories"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
              canScrollLeft
                ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                : "border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next categories"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
              canScrollRight
                ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                : "border border-zinc-200 bg-white text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories: 2 Rows slider on mobile (4 per row in view), 2 Rows grid of 6 on Desktop */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:overflow-visible snap-x snap-mandatory"
      >
        <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-9 min-w-max lg:min-w-0 pr-4 sm:pr-0">
          {/* Row 1 */}
          <div className="flex lg:grid lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-start">
            {ROW_1_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex lg:grid lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-start">
            {ROW_2_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
