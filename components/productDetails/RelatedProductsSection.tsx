"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Eye } from "lucide-react";
import { Product, getProductViews } from "@/lib/productsData";
import ProductCardMedia from "@/components/products/ProductCardMedia";

interface RelatedProductsSectionProps {
  products: Product[];
  currentCategory: string;
}

export default function RelatedProductsSection({
  products,
  currentCategory,
}: RelatedProductsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, [products, updateScrollState]);

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

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-zinc-200/80">
      {/* 1. Header with Title + Carousel Arrow Controls */}
      <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-black tracking-tight inline-flex items-center gap-2">
            <span className="text-zinc-950">Related</span>
            <span className="text-[#84cc16]">Cricket Gear</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            More top-rated products in {currentCategory}
          </p>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          {/* Previous (<) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Related Products"
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
            aria-label="Next Related Products"
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

      {/* 2. Side Scroll Product Cards Container (Matching Homepage Side-Scroll Style) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth scrollbar-none pb-2 snap-x snap-mandatory"
      >
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="flex-shrink-0 w-[86%] sm:w-[calc((100%-36px)/3)] md:w-[calc((100%-54px)/4)] lg:w-[calc((100%-72px)/5)] snap-start group bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
          >
            {/* Image Area with Video on Hover */}
            <ProductCardMedia
              src={item.images && item.images[0] ? item.images[0] : "/images/products/bats/sg_bat.png"}
              alt={item.name}
              videoUrl={item.videoUrl}
              badge={item.badge}
              className="mb-3"
            />

            {/* Title & Rating */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[36px]">
                {item.name}
              </h3>

              <div className="flex items-center justify-between gap-1 mt-2">
                <div className="flex items-center gap-1 min-w-0">
                  <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(item.rating)
                            ? "fill-[#84cc16] text-[#84cc16]"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-700">
                    {item.rating}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-normal">
                    ({item.reviewsCount})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0" title="Views">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{getProductViews(item)}</span>
                </div>
              </div>
            </div>

            {/* Price Strip */}
            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-1">
              <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight">
                ৳ {item.price.toLocaleString()}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  ৳ {item.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
