"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Clock,
  Tag,
  Copy,
  Check,
  Star,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Gift,
  Percent,
} from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";

type OfferTab = "all" | "flash" | "pre-owned" | "bats" | "gear";

const COUPONS = [
  {
    code: "WELCOME500",
    discount: "৳ 500 OFF",
    minSpend: "On orders over ৳ 5,000",
    badge: "FLAT DISCOUNT",
    description: "Applicable on all English willow bats and gear kits.",
  },
  {
    code: "PLAYZONE10",
    discount: "10% OFF",
    minSpend: "No minimum spend",
    badge: "SITEWIDE",
    description: "Get 10% instant discount on your complete cart value.",
  },
  {
    code: "CRICKET10",
    discount: "10% OFF",
    minSpend: "On Batting Gear",
    badge: "POPULAR",
    description: "Extra 10% off on all batting pads, gloves, and helmets.",
  },
];

export default function OffersPageContent() {
  const { addItem, openCart, applyCoupon } = useCart();
  const [activeTab, setActiveTab] = useState<OfferTab>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Flash Sale Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 43,
    seconds: 28,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCoupon = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      const res = applyCoupon(code);
      setToastMessage(res.message);
      setTimeout(() => {
        setCopiedCode(null);
        setToastMessage(null);
      }, 3000);
    }
  };

  const dealProducts = useMemo(() => {
    // Collect all products with discounts or special badges
    const discounted = ALL_PRODUCTS.filter(
      (p) =>
        (p.discountPercent && p.discountPercent > 0) ||
        p.originalPrice ||
        p.badge?.includes("OFF") ||
        p.badge?.includes("PRE-OWNED")
    );

    if (activeTab === "flash") {
      return discounted.filter(
        (p) => (p.discountPercent && p.discountPercent >= 20) || p.badge?.includes("PRE-OWNED")
      );
    }
    if (activeTab === "pre-owned") {
      return discounted.filter((p) => p.badge?.includes("PRE-OWNED"));
    }
    if (activeTab === "bats") {
      return discounted.filter((p) => p.categorySlug === "cricket-bats");
    }
    if (activeTab === "gear") {
      return discounted.filter((p) => p.categorySlug !== "cricket-bats");
    }
    return discounted;
  }, [activeTab]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
    });
    setToastMessage(`Added "${product.name}" to cart at discounted deal price!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        {/* 1. Panoramic Deals Banner with Live Countdown */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-10 text-white">
          {/* Ambient Glows */}
          <div className="absolute -left-10 top-0 w-72 h-72 bg-[#a3e635]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-xs font-black uppercase tracking-wider">
                <Flame className="w-4 h-4 text-[#a3e635] animate-bounce" />
                <span>SUPER CRICKET OFFERS & CLEARANCE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Save Up to <span className="text-[#a3e635]">45% OFF</span> on Pro Cricket Gear
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Genuine English willow bats, certified pre-owned masterclasses, test-level protection, and cricket spikes with manufacturer warranties.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-center min-w-[280px] shrink-0">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>FLASH SALE ENDS IN</span>
              </span>
              <div className="flex items-center justify-center gap-2 text-white">
                <div className="bg-black/60 px-3 py-2 rounded-xl min-w-[54px] border border-white/10">
                  <span className="text-2xl font-black text-[#a3e635] block leading-none">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400">Hours</span>
                </div>
                <span className="text-xl font-black text-zinc-400">:</span>
                <div className="bg-black/60 px-3 py-2 rounded-xl min-w-[54px] border border-white/10">
                  <span className="text-2xl font-black text-white block leading-none">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400">Mins</span>
                </div>
                <span className="text-xl font-black text-zinc-400">:</span>
                <div className="bg-black/60 px-3 py-2 rounded-xl min-w-[54px] border border-white/10">
                  <span className="text-2xl font-black text-amber-400 block leading-none">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-lime-50 border border-lime-300 text-xs sm:text-sm font-bold text-[#4d7c0f] flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4d7c0f]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="underline text-black font-extrabold cursor-pointer"
            >
              View Cart →
            </button>
          </div>
        )}

        {/* 2. Three Interactive Voucher Coupon Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-black text-zinc-950 flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#84cc16]" />
              <span>Claim Exclusive Voucher Coupons</span>
            </h2>
            <span className="text-xs text-zinc-400">Tap to copy & apply directly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.code}
                  className="relative bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#84cc16]/15 text-[#4d7c0f] uppercase tracking-wider">
                        {coupon.badge}
                      </span>
                      <span className="text-xs font-bold text-zinc-400">
                        {coupon.minSpend}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-zinc-950 tracking-tight">
                      {coupon.discount}
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <div className="font-mono font-black text-xs text-zinc-800 bg-zinc-100 px-3 py-1.5 rounded-lg border border-dashed border-zinc-300">
                      {coupon.code}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCoupon(coupon.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCopied
                          ? "bg-[#84cc16] text-white"
                          : "bg-zinc-900 hover:bg-black text-white"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy & Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Interactive Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 pt-2">
          {[
            { id: "all", label: "All Special Offers", count: dealProducts.length },
            { id: "flash", label: "🔥 Big Clearance (20%+ OFF)" },
            { id: "pre-owned", label: "Certified Pre-Owned Deals" },
            { id: "bats", label: "Cricket Bats on Sale" },
            { id: "gear", label: "Pads, Shoes & Accessories" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as OfferTab)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4. Deals Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {dealProducts.map((product) => {
            const savings =
              product.originalPrice && product.originalPrice > product.price
                ? product.originalPrice - product.price
                : null;

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
              >
                {/* Media area */}
                <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px"
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    {product.discountPercent ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-xs">
                        {product.discountPercent}% OFF
                      </span>
                    ) : product.badge ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-zinc-900 text-white shadow-xs">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px]">
                    {product.name}
                  </h3>

                  {/* Ratings */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <div className="flex items-center gap-0.5 text-[#84cc16]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-[#84cc16] text-[#84cc16]"
                              : "text-zinc-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-700">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  {/* Stock / Limited claim bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 mb-1">
                      <span className="flex items-center gap-1 text-amber-600">
                        <Flame className="w-3 h-3" />
                        <span>Selling Fast</span>
                      </span>
                      <span>Only {product.stockCount} left</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                        style={{
                          width: `${Math.min(92, 100 - product.stockCount * 4)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-base sm:text-lg font-black text-zinc-950 tracking-tight block">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="py-1.5 px-3 rounded-lg bg-[#84cc16] hover:bg-[#73b512] text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Claim</span>
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 5. Special Combo Bundles Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase text-[#4d7c0f] tracking-wider">
                MEGA SAVER PACKS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Tournament Match Combo Kit
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Complete kit bundle: SG English Willow Bat + DSC Pads + SG Gloves + Helmet
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-zinc-400 line-through block">
                Total Individual Value: ৳ 19,900
              </span>
              <div className="flex items-baseline sm:justify-end gap-2">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  Combo: ৳ 15,500
                </span>
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-black">
                  Save ৳ 4,400
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { name: "SG Savage English Bat", img: "/images/products/bats/sg_bat.png" },
              { name: "DSC Split Batting Pads", img: "/images/products/batting_essentials/dsc_pads.png" },
              { name: "SG Test Batting Gloves", img: "/images/products/batting_essentials/sg_gloves.png" },
              { name: "Gray-Nicolls Elite Helmet", img: "/images/products/batting_essentials/gray_nicolls_helmet.png" },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-50 p-3 rounded-2xl border border-zinc-200/70 text-center space-y-2">
                <div className="relative w-full aspect-square">
                  <Image src={item.img} alt={item.name} fill className="object-contain" />
                </div>
                <p className="text-xs font-bold text-zinc-800 truncate">{item.name}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/product/sg-savage-english-willow"
              className="py-3 px-6 rounded-xl bg-zinc-950 hover:bg-black text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Combo Details</span>
              <ArrowRight className="w-4 h-4 text-[#84cc16]" />
            </Link>
          </div>
        </div>

        {/* 6. Cross-sell to Hire Experts */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
              HIRE CRICKET EXPERTS IN BANGLADESH
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Pair Your New Gear with 1-on-1 Coaching
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Book certified batting coaches, throwdown operators, match umpires, and fitness trainers.
            </p>
          </div>
          <Link
            href="/hire-experts"
            className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-md"
          >
            Find Cricket Experts →
          </Link>
        </div>
      </div>
    </main>
  );
}
