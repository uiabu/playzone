"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Product } from "@/lib/productsData";

interface RelatedProductsSectionProps {
  products: Product[];
  currentCategory: string;
}

export default function RelatedProductsSection({
  products,
  currentCategory,
}: RelatedProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-zinc-200/80">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
            Related Cricket Gear
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            More top-rated products in {currentCategory}
          </p>
        </div>
        <Link
          href="/category/shop-cricket"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-800 hover:text-[#65a30d] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of related cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="group bg-white rounded-2xl border border-zinc-200/80 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
          >
            {/* Image Area */}
            <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/60 to-white">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
              />

              {item.badge && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-zinc-900 text-white shadow-2xs">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Title & Rating */}
            <div className="flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[36px]">
                {item.name}
              </h3>

              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5 text-[#84cc16]">
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
              </div>
            </div>

            {/* Price Strip */}
            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
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
