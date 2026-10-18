"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface ShoeBagProduct {
  id: string;
  name: string;
  imageSrc: string;
  rating: number;
  reviewsCount: number;
  price: string;
  badge: "NEW";
  category: "cricket-shoes" | "kit-bags" | "backpacks" | "accessories";
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
];

type FilterCategory = "all" | "cricket-shoes" | "kit-bags" | "backpacks" | "accessories";

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cricket-shoes", label: "Cricket Shoes" },
  { id: "kit-bags", label: "Kit Bags" },
  { id: "backpacks", label: "Backpacks" },
  { id: "accessories", label: "Accessories" },
];

export default function ShoesKitBagsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeFilter);

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
            aria-label="Previous Items"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-black hover:border-zinc-300 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next Items"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. FILTER PILLS: All, Cricket Shoes, Kit Bags, Backpacks, Accessories */}
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
