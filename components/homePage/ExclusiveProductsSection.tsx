"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Eye } from "lucide-react";
import { getProductViews } from "@/lib/productsData";
import { useProducts } from "@/context/ProductsContext";
import ProductCardMedia from "@/components/products/ProductCardMedia";

interface BatProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  viewsCount?: number;
  price: string;
  badge: "NEW" | "PRE-OWNED - GRADE A";
  videoUrl?: string;
  category: "top-picks" | "english-willow" | "kashmir-willow" | "pre-owned";
  isTopPick?: boolean;
}

const BATS_DATA: BatProduct[] = [
  {
    id: "sg-savage-english-willow",
    name: "SG Savage Edition English Willow Bat",
    imageSrc: "/images/products/bats/sg_bat.png",
    rating: 4.8,
    reviewsCount: 124,
    price: "৳ 8,500",
    badge: "NEW",
    category: "english-willow",
    isTopPick: true,
  },
  {
    id: "kookaburra-aura-pro",
    name: "Kookaburra Aura Pro English Willow Bat",
    imageSrc: "/images/products/bats/kookaburra_bat.png",
    rating: 4.7,
    reviewsCount: 189,
    price: "৳ 7,200",
    badge: "NEW",
    category: "english-willow",
    isTopPick: true,
  },
  {
    id: "mrf-genius-grand-edition",
    name: "MRF Genius Grand Edition Cricket Bat",
    imageSrc: "/images/products/bats/mrf.png",
    rating: 4.9,
    reviewsCount: 215,
    price: "৳ 9,800",
    badge: "NEW",
    category: "english-willow",
    isTopPick: true,
  },
  {
    id: "ss-ton-reserve-edition",
    name: "SS TON Reserve Edition Cricket Bat",
    imageSrc: "/images/products/bats/ss_ton.png",
    rating: 4.6,
    reviewsCount: 98,
    price: "৳ 4,800",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
    isTopPick: true,
  },
  {
    id: "gm-diamond-limited-edition",
    name: "GM Diamond Limited Edition Cricket Bat",
    imageSrc: "/images/products/bats/gm_bat.png",
    rating: 4.6,
    reviewsCount: 76,
    price: "৳ 7,900",
    badge: "NEW",
    category: "english-willow",
    isTopPick: true,
  },
  {
    id: "gray-nicolls-nova-players",
    name: "Gray-Nicolls Nova Players Cricket Bat",
    imageSrc: "/images/products/bats/gr_bat.png",
    rating: 4.6,
    reviewsCount: 64,
    price: "৳ 6,500",
    badge: "NEW",
    category: "english-willow",
  },
  {
    id: "ceat-special-master",
    name: "CEAT Special Master English Willow Bat",
    imageSrc: "/images/products/bats/ceat_ton.png",
    rating: 4.5,
    reviewsCount: 88,
    price: "৳ 6,200",
    badge: "NEW",
    category: "english-willow",
  },
  {
    id: "sf-stanford-players-edition",
    name: "SF Stanford Players Edition Cricket Bat",
    imageSrc: "/images/products/bats/sf_bat.png",
    rating: 4.5,
    reviewsCount: 52,
    price: "৳ 3,600",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
  },
  {
    id: "dsc-split-44-kashmir",
    name: "DSC Split 44 Kashmir Willow Bat",
    imageSrc: "/images/products/bats/dsc_bat.png",
    rating: 4.4,
    reviewsCount: 86,
    price: "৳ 2,650",
    badge: "NEW",
    category: "kashmir-willow",
  },
  {
    id: "mb-malik-boom-kashmir",
    name: "MB Malik Boom Kashmir Willow Bat",
    imageSrc: "/images/products/bats/mb_bat.png",
    rating: 4.3,
    reviewsCount: 72,
    price: "৳ 2,200",
    badge: "NEW",
    category: "kashmir-willow",
  },
  {
    id: "mks-limited-edition-kashmir",
    name: "MKS Limited Edition Kashmir Willow Bat",
    imageSrc: "/images/products/bats/mks.png",
    rating: 4.2,
    reviewsCount: 49,
    price: "৳ 1,950",
    badge: "NEW",
    category: "kashmir-willow",
  },
  {
    id: "mrf-grand-edition-preowned",
    name: "MRF Grand Edition Cricket Bat (Grade A Pre-Owned)",
    imageSrc: "/images/products/bats/mrf_bat.png",
    rating: 4.8,
    reviewsCount: 76,
    price: "৳ 4,200",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
  },
  {
    id: "kookaburra-kahuna-preowned",
    name: "Kookaburra Kahuna Pro Bat (Grade A Pre-Owned)",
    imageSrc: "/images/products/bats/kookaburra_bat.png",
    rating: 4.7,
    reviewsCount: 68,
    price: "৳ 4,800",
    badge: "PRE-OWNED - GRADE A",
    category: "pre-owned",
  },
];

type FilterCategory = "top-picks" | "english-willow" | "kashmir-willow" | "pre-owned";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "top-picks", label: "All" },
  { id: "english-willow", label: "English Willow" },
  { id: "kashmir-willow", label: "Kashmir Willow" },
  { id: "pre-owned", label: "Pre-owned" },
];

export default function ExclusiveProductsSection() {
  const { getProductBySlugOrId } = useProducts();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("top-picks");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter products based on active tab
  // In 'top-picks', we show all bats starting with top picks so the user can slide through all products
  const displayedProducts =
    activeFilter === "top-picks"
      ? BATS_DATA
      : activeFilter === "pre-owned"
      ? BATS_DATA.filter(
          (item) => item.category === "pre-owned" || item.badge === "PRE-OWNED - GRADE A"
        )
      : BATS_DATA.filter((item) => item.category === activeFilter);

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
            disabled={!canScrollLeft}
            aria-label="Previous Bats"
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
            aria-label="Next Bats"
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

      {/* 2. FILTER PILLS: Top Picks, English Willow, Kashmir Willow, Pre-owned */}
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
        {displayedProducts.map((bat) => {
          const liveProduct = getProductBySlugOrId(bat.id);
          const resolvedVideoUrl = bat.videoUrl || liveProduct?.videoUrl;
          const resolvedImage = liveProduct?.images?.[0] || bat.imageSrc;

          return (
            <Link
              key={bat.id}
              href={`/product/${bat.id}`}
              className="flex-shrink-0 w-[86%] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
            >
              {/* Bat Image & Video Media Display Area */}
              <ProductCardMedia
                src={resolvedImage}
                alt={bat.name}
                videoUrl={resolvedVideoUrl}
                badge={bat.badge}
                className="mb-3"
              />

            {/* Product Name */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[36px]">
                {bat.name}
              </h3>

              {/* Star Rating, Review Count & Views */}
              <div className="flex items-center justify-between gap-1 mt-2">
                <div className="flex items-center gap-1 min-w-0">
                  <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
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
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0" title="Views">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{getProductViews(bat)}</span>
                </div>
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
          );
        })}
      </div>
    </section>
  );
}
