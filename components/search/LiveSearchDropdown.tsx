"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Check, ArrowRight, UserCheck, Package, ExternalLink } from "lucide-react";
import { Product, getProductViews } from "@/lib/productsData";
import { Expert, getExpertProfileViews } from "@/components/hireExperts/expertsData";

interface LiveSearchDropdownProps {
  query: string;
  products: Product[];
  experts: Expert[];
  totalCount: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: () => void;
}

export default function LiveSearchDropdown({
  query,
  products,
  experts,
  totalCount,
  isOpen,
  onClose,
  onSelectResult,
}: LiveSearchDropdownProps) {
  if (!isOpen || !query.trim()) return null;

  const displayProducts = products.slice(0, 4);
  const displayExperts = experts.slice(0, 3);
  const hasResults = products.length > 0 || experts.length > 0;

  return (
    <div
      role="listbox"
      aria-label="Search suggestions"
      className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#141416] text-white rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Header with Search Query & Counts */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span>Results for</span>
          <span className="font-bold text-white max-w-[200px] truncate">&quot;{query}&quot;</span>
        </div>
        <span className="text-[11px] font-semibold text-[#84cc16]">
          {totalCount} {totalCount === 1 ? "match" : "matches"}
        </span>
      </div>

      {!hasResults ? (
        <div className="p-8 text-center">
          <p className="text-sm font-semibold text-zinc-300">
            No cricket products or experts match &quot;{query}&quot;
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            Try searching for &quot;Willow&quot;, &quot;Leather Ball&quot;, &quot;Coach&quot;, or &quot;Spikes&quot;
          </p>
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => {
              onClose();
              onSelectResult?.();
            }}
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-[#84cc16] hover:underline"
          >
            <span>Open search page anyway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin divide-y divide-zinc-800/80">
          {/* Section 1: PRODUCTS */}
          {products.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>Cricket Products ({products.length})</span>
                </span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&tab=products`}
                  onClick={() => {
                    onClose();
                    onSelectResult?.();
                  }}
                  className="text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-1.5">
                {displayProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      onClose();
                      onSelectResult?.();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/70 transition-all group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src={product.images[0] || "/images/products/bats/sg_bat.png"}
                        alt={product.name}
                        fill
                        sizes="44px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#84cc16] transition-colors truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                        <span className="text-[#84cc16] font-bold">
                          ৳ {product.price.toLocaleString()}
                        </span>
                        <span>•</span>
                        <span className="truncate">{product.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                        </span>
                      </div>
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#84cc16]/20 text-[#84cc16] shrink-0 hidden sm:inline-block">
                        {product.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: EXPERTS */}
          {experts.length > 0 && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-lime-400" />
                  <span>Cricket Experts ({experts.length})</span>
                </span>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&tab=experts`}
                  onClick={() => {
                    onClose();
                    onSelectResult?.();
                  }}
                  className="text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-1.5">
                {displayExperts.map((expert) => (
                  <Link
                    key={expert.id}
                    href={`/hire-experts`}
                    onClick={() => {
                      onClose();
                      onSelectResult?.();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-800/70 transition-all group"
                  >
                    {/* Avatar */}
                    <div className="relative w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src={expert.imageSrc}
                        alt={expert.name}
                        fill
                        sizes="44px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#84cc16] transition-colors truncate">
                          {expert.name}
                        </h4>
                        {expert.verified && (
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#84cc16] text-black shrink-0">
                            <Check className="w-2 h-2 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                        <span className="text-zinc-300 font-medium truncate">{expert.role}</span>
                        <span>•</span>
                        <span className="truncate">{expert.location}</span>
                        <span>•</span>
                        <span className="text-[#84cc16] font-bold">
                          ৳ {expert.price.toLocaleString()}
                          <span className="text-[10px] text-zinc-400 font-normal">
                            {expert.priceUnit}
                          </span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white shrink-0 hidden sm:inline-flex items-center gap-1">
                      <span>Hire</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer: View all results page link */}
      <div className="p-2.5 bg-zinc-950 border-t border-zinc-800/80 text-center">
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          onClick={() => {
            onClose();
            onSelectResult?.();
          }}
          className="inline-flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-black font-extrabold text-xs sm:text-sm transition-all shadow-xs"
        >
          <span>View all {totalCount} results for &quot;{query}&quot;</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
