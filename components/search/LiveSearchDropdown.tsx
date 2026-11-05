"use client";

import React, { forwardRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Flame, Tag, X, Sparkles, Check, Gift } from "lucide-react";
import { Product, ALL_PRODUCTS } from "@/lib/productsData";
import { Expert } from "@/components/hireExperts/expertsData";
import { useLanguage } from "@/context/LanguageContext";

interface LiveSearchDropdownProps {
  query: string;
  products: Product[];
  experts?: Expert[];
  totalCount: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: () => void;
  isMobile?: boolean;
}

const FEATURED_OFFERS = [
  {
    title: "Exclusive Cricket Willow Deal",
    titleBn: "এক্সক্লুসিভ উইলো ব্যাট অফার",
    discount: "৳ ৫০০ ছাড়!",
    code: "WELCOME500",
    badge: "SPECIAL OFFER",
    description: "৫,০০০ টাকার বেশি অর্ডারে সমগ্র বাংলাদেশে ইনস্ট্যান্ট ক্যাশব্যাক ও ফ্রি এক্সপ্রেস ডেলিভারি।",
    href: "/offers",
    image: "/images/categories/cricket_bats.png",
  },
  {
    title: "Sitewide 10% Discount",
    titleBn: "সকল পণ্যে ১০% বিশেষ ছাড়",
    discount: "১০% ফ্ল্যাট অফ",
    code: "PLAYZONE10",
    badge: "HOT DEAL",
    description: "সকল প্রিমিয়াম ক্রিকেট ব্যাট ও গিয়ারে অতিরিক্ত ১০% মূল্যছাড় পান।",
    href: "/offers",
    image: "/images/products/bats/ss_ton.png",
  },
  {
    title: "Batting Gear Combo Offer",
    titleBn: "ব্যাটিং গিয়ার কম্বো অফার",
    discount: "১৫% ছাড়!",
    code: "CRICKET10",
    badge: "FLASH DEAL",
    description: "প্যাড, গ্লাভস ও হেলমেট ক্রয়ে বিশেষ প্যাকেজ ডিসকাউন্ট।",
    href: "/offers",
    image: "/images/categories/batting_gloves.png",
  },
];

const LiveSearchDropdown = forwardRef<HTMLDivElement, LiveSearchDropdownProps>(
  function LiveSearchDropdown(
    {
      query,
      products,
      totalCount,
      isOpen,
      onClose,
      onSelectResult,
      isMobile = false,
    },
    ref
  ) {
    const { t, language } = useLanguage();

    // 1. EXACTLY 5 PRODUCTS WITH IMAGES
    const displayProducts = useMemo(() => {
      if (products.length >= 5) {
        return products.slice(0, 5);
      }
      // If fewer than 5 match, pad with other popular products from ALL_PRODUCTS
      const matchedIds = new Set(products.map((p) => p.id));
      const fallback = ALL_PRODUCTS.filter((p) => !matchedIds.has(p.id));
      return [...products, ...fallback].slice(0, 5);
    }, [products]);

    // 2. THE 6TH RESULT: SPECIAL OFFER CARD
    const featuredOffer = useMemo(() => {
      const lowerQuery = (query || "").toLowerCase();
      if (lowerQuery.includes("bat") || lowerQuery.includes("willow")) {
        return FEATURED_OFFERS[0];
      }
      if (lowerQuery.includes("pad") || lowerQuery.includes("glove") || lowerQuery.includes("gear")) {
        return FEATURED_OFFERS[2];
      }
      return FEATURED_OFFERS[1];
    }, [query]);

    if (!isOpen || !query.trim()) return null;

    // Mobile specific layout (Compact full-width list)
    if (isMobile) {
      return (
        <div
          ref={ref}
          role="listbox"
          aria-label="Mobile search suggestions"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#121215] text-white rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden backdrop-blur-xl animate-in fade-in duration-150 max-h-[75vh] flex flex-col"
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-zinc-400">{t("Results for", "ফলাফল")}</span>
              <span className="font-bold text-[#84cc16] truncate">&quot;{query}&quot;</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 5 Products + 1 Offer (Total 6 results) */}
          <div className="overflow-y-auto p-2.5 space-y-2">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => {
                  onClose();
                  onSelectResult?.();
                }}
                className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0 overflow-hidden p-1">
                  <Image
                    src={product.images[0] || "/images/products/bats/sg_bat.png"}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-200 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                    <span className="text-[#84cc16] font-bold">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    <span>•</span>
                    <span className="truncate">{product.category}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* 6th Result: Offer Card */}
            <Link
              href={featuredOffer.href}
              onClick={() => {
                onClose();
                onSelectResult?.();
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-lime-950/40 border border-amber-500/40 hover:border-[#84cc16] transition-all"
            >
              <div className="relative w-12 h-12 rounded-lg bg-zinc-950 border border-amber-500/30 shrink-0 overflow-hidden p-1">
                <Image
                  src={featuredOffer.image}
                  alt={featuredOffer.title}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-400 text-black">
                    {featuredOffer.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    {featuredOffer.discount}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-0.5">
                  {language === "bn" ? featuredOffer.titleBn : featuredOffer.title}
                </h4>
              </div>
            </Link>
          </div>

          {/* Mobile Footer */}
          <div className="p-2.5 bg-zinc-950 border-t border-zinc-800">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => {
                onClose();
                onSelectResult?.();
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-extrabold text-xs flex items-center justify-center gap-1.5"
            >
              <span>{t("View All Results", "সবগুলো ফলাফল দেখুন")} ({totalCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      );
    }

    // ================= DESKTOP FULL-WIDTH DROPDOWN =================
    return (
      <div
        ref={ref}
        role="listbox"
        aria-label="Search suggestions"
        className="absolute left-0 right-0 top-full w-full z-50 bg-[#0d0d10] text-white border-t border-b border-zinc-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-800/80 text-xs">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-zinc-400 font-medium">{t("Results for", "ফলাফল")}</span>
              <span className="font-bold text-white bg-zinc-800 px-3 py-1 rounded-full text-xs">
                &quot;{query}&quot;
              </span>
              <span className="text-[11px] font-semibold text-[#84cc16]">
                ({totalCount} {totalCount === 1 ? t("match", "মিল") : t("matches", "টি মিল পাওয়া গেছে")})
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-400 text-[11px] hidden sm:inline">
                {t("Showing 5 top products + 1 special offer", "৫টি সেরা পণ্য এবং ১টি স্পেশাল অফার")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  onClose();
                  onSelectResult?.();
                }}
                className="text-xs font-bold text-[#84cc16] hover:underline flex items-center gap-1"
              >
                <span>{t("View All Results", "সবগুলো ফলাফল দেখুন")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close search dropdown"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 6-RESULTS GRID: 5 PRODUCTS WITH IMAGES + 1 SPECIAL OFFER CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* 1 to 5: Products with Images */}
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => {
                  onClose();
                  onSelectResult?.();
                }}
                className="group flex flex-col p-3 rounded-2xl bg-[#151518] hover:bg-[#1f1f23] border border-zinc-800/90 hover:border-[#84cc16]/50 transition-all duration-200 shadow-sm hover:shadow-md relative overflow-hidden"
              >
                {/* Badge if available */}
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#84cc16] text-black shadow-xs">
                    {product.badge}
                  </span>
                )}

                {/* Product Thumbnail Image */}
                <div className="relative w-full aspect-square rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-center overflow-hidden mb-2.5 p-2">
                  <Image
                    src={product.images[0] || "/images/products/bats/sg_bat.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <h4 className="text-xs font-bold text-zinc-100 group-hover:text-[#84cc16] transition-colors line-clamp-2 leading-snug mb-1">
                  {product.name}
                </h4>

                {/* Category & Rating */}
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-auto pt-1">
                  <span className="truncate">{product.category}</span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-semibold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{product.rating}</span>
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-[#84cc16]">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-[10px] text-zinc-500 line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors">
                    View →
                  </span>
                </div>
              </Link>
            ))}

            {/* 6th Slot: Special Offer Card */}
            <Link
              href={featuredOffer.href}
              onClick={() => {
                onClose();
                onSelectResult?.();
              }}
              className="group flex flex-col p-3 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#18181b] to-lime-950/40 hover:from-amber-950/60 hover:to-lime-950/60 border border-amber-500/40 hover:border-[#84cc16] transition-all duration-200 shadow-md hover:shadow-lg relative overflow-hidden"
            >
              {/* Offer Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-[#84cc16] text-black shadow-xs">
                  <Flame className="w-3 h-3" />
                  <span>{featuredOffer.badge}</span>
                </span>
                <span className="text-xs font-black text-amber-300">
                  {featuredOffer.discount}
                </span>
              </div>

              {/* Offer Image */}
              <div className="relative w-full aspect-square rounded-xl bg-zinc-950/90 border border-amber-500/30 flex items-center justify-center overflow-hidden mb-2.5 p-2">
                <Image
                  src={featuredOffer.image}
                  alt={featuredOffer.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-contain p-2 group-hover:scale-108 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                    {t("Special Offer", "স্পেশাল অফার")}
                  </span>
                </div>
              </div>

              {/* Offer Title */}
              <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-1">
                {language === "bn" ? featuredOffer.titleBn : featuredOffer.title}
              </h4>

              {/* Offer Description */}
              <p className="text-[10px] text-zinc-300 line-clamp-2 leading-snug mb-2">
                {featuredOffer.description}
              </p>

              {/* Offer Coupon Code & Action */}
              <div className="mt-auto pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-500/40">
                  {featuredOffer.code}
                </span>
                <span className="text-[11px] font-extrabold text-[#84cc16] group-hover:translate-x-0.5 transition-transform">
                  Claim →
                </span>
              </div>
            </Link>
          </div>

          {/* Footer Bar */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-zinc-400 text-[11px]">
              {t("Search result: 5 products + 1 offer deal", "সার্চ ফলাফল: ৫টি পণ্য এবং ১টি অফার ডিল")}
            </span>
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={() => {
                onClose();
                onSelectResult?.();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-black font-extrabold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>{t("View all results", "সকল ফলাফল দেখুন")} ({totalCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default LiveSearchDropdown;
