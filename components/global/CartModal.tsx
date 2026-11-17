"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartModal() {
  const router = useRouter();
  const { t } = useLanguage();
  const {
    items,
    itemCount,
    subtotal,
    discount,
    total,
    couponCode,
    isCartOpen,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Lock body scroll and attach Escape key listener when drawer is open
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = await applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon("");
    }
    setTimeout(() => setCouponFeedback(null), 3500);
  };

  const handleCheckout = () => {
    if (itemCount === 0) return;
    closeCart();
    router.push("/checkout");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-300 select-none"
      onClick={closeCart}
    >
      {/* Right-Side Slide-Over Drawer Container */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex max-w-full pl-6 sm:pl-10 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-[460px] bg-white shadow-2xl flex flex-col h-full border-l border-zinc-200 animate-in slide-in-from-right duration-300 ease-out">
          {/* Subtle Decorative Lime Top Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#84cc16] via-[#a3e635] to-[#74d600] shrink-0" />

          {/* 1. DRAWER HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                {t("cart.title", "আপনার ক্রিকেট ব্যাগ")}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#84cc16] text-zinc-950 text-xs font-black shadow-2xs">
                {itemCount}
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="w-9 h-9 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. SUBHEADER (When items exist): Items count + Clear All */}
          {itemCount > 0 && (
            <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-50/80 border-b border-zinc-100 text-xs font-bold text-zinc-700 shrink-0">
              <span>
                {itemCount} {t("cart.items", "টি পণ্য")}
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-zinc-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t("Clear All", "সব মুছুন")}</span>
              </button>
            </div>
          )}

          {/* 3. SCROLLABLE CART ITEMS LIST / EMPTY STATE */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 scrollbar-thin">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-zinc-400">
                <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300 mb-4 shadow-2xs">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-black text-zinc-900">
                  {t("cart.empty", "আপনার শপিং ব্যাগটি খালি রয়েছে")}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-[260px] leading-relaxed">
                  {t(
                    "cart.emptyDesc",
                    "আসল ক্রিকেট ব্যাট, সুরক্ষা গিয়ার ও ব্যবহৃত সরঞ্জাম দেখুন।"
                  )}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-[280px]">
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      router.push("/shop");
                    }}
                    className="w-full px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
                  >
                    {t("Shop Cricket Gear", "ক্রিকেট পণ্য কিনুন")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeCart();
                      router.push("/pre-owned");
                    }}
                    className="w-full px-5 py-2.5 rounded-full bg-lime-100 hover:bg-lime-200 text-zinc-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {t("Explore Pre-Owned", "ব্যবহৃত গিয়ার দেখুন")}
                  </button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50/80 border border-zinc-100 hover:border-zinc-200 transition-all"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-zinc-100 shrink-0 p-1">
                    <Image
                      src={item.image || "/images/products/bats/ss_ton.png"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {item.condition === "pre-owned" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pre-Owned
                        </span>
                      )}
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                        {item.name}
                      </h4>
                    </div>
                    {item.category && (
                      <p className="text-[11px] text-zinc-400 line-clamp-1">
                        {item.category}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm font-black text-[#549900] mt-0.5">
                      ৳{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-zinc-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      disabled={
                        item.maxStock !== undefined &&
                        item.quantity >= item.maxStock
                      }
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      title={
                        item.maxStock !== undefined &&
                        item.quantity >= item.maxStock
                          ? "Max stock reached"
                          : "Increase quantity"
                      }
                      className="w-5 h-5 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 4. DRAWER FOOTER (STICKY AT BOTTOM) */}
          <div className="border-t border-zinc-100 bg-white px-6 py-4 space-y-3 shrink-0 shadow-[0_-8px_25px_rgba(0,0,0,0.05)]">
            {/* Order Summary Heading */}
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">
              {t("Order Summary", "অর্ডার বিবরণী")}
            </h3>

            {/* Coupon Input Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="relative flex items-center w-full rounded-full border border-zinc-200 bg-white pl-4 pr-1 py-1 text-xs focus-within:border-zinc-400 transition-all">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder={t(
                    "Apply Coupon (e.g. PLAYZONE10)",
                    "কুপন কোড লিখুন (যেমন PLAYZONE10)"
                  )}
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs pr-2"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                >
                  {t("Apply", "প্রয়োগ করুন")}
                </button>
              </div>

              {/* Coupon Active Badge */}
              {couponCode && (
                <div className="flex items-center justify-between text-[11px] text-[#4d8c00] bg-lime-50 px-3 py-1 rounded-lg border border-lime-200 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>
                      {t("Coupon", "কুপন")} {couponCode}{" "}
                      {t("applied", "প্রযুক্ত হয়েছে")}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    {t("Remove", "বাতিল")}
                  </button>
                </div>
              )}

              {/* Coupon Error/Success Notice */}
              {couponFeedback && !couponCode && (
                <div
                  className={`text-[11px] flex items-center gap-1 font-semibold ${
                    couponFeedback.success ? "text-[#4d8c00]" : "text-red-500"
                  }`}
                >
                  {couponFeedback.success ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  <span>{couponFeedback.message}</span>
                </div>
              )}
            </form>

            {/* Subtotal, Discount & Total Payable */}
            <div className="space-y-1.5 text-xs text-zinc-600 pt-1">
              <div className="flex items-center justify-between">
                <span>
                  {t("cart.subtotal", "সাবটোটাল")} ({itemCount}{" "}
                  {t("cart.items", "টি পণ্য")})
                </span>
                <span className="font-semibold text-zinc-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-[#549900]">
                  <span>{t("cart.discount", "ছাড়")}</span>
                  <span className="font-bold">
                    -৳{discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-sm font-black text-zinc-950">
                <span>{t("cart.total", "মোট প্রদেয় মূল্য")}</span>
                <span className="text-base text-[#4d8c00] font-black">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 5. PROCEED TO CHECKOUT ACTION BUTTON (PLAYZONE NEON LIME GREEN) */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={itemCount === 0}
              className="w-full py-3.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/25 cursor-pointer mt-1"
            >
              <span>{t("cart.checkout", "চেকআউটে যান")}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Micro Trust Points */}
            <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-zinc-400 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#84cc16]" />
                Cash on Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#84cc16]" />
                100% Genuine Gear
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
