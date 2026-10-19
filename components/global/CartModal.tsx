"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle2, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartModal() {
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
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon("");
    }
    setTimeout(() => setCouponFeedback(null), 3500);
  };

  const handleCheckout = () => {
    if (itemCount === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      clearCart();
      closeCart();
    }, 2500);
  };

  // Sample quick add for user demonstration
  const handleAddSampleItem = () => {
    addItem({
      id: "ss-ton-gladiator",
      name: "SS Gladiator Grade 1 English Willow",
      price: 18500,
      image: "/images/products/ss_gladiator.png",
      category: "English Willow Bat",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={closeCart}
    >
      <div
        className="relative w-full max-w-[480px] bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-zinc-100 p-6 sm:p-7 overflow-hidden transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Decorative Lime Accent at Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#84cc16] via-[#a3e635] to-[#74d600]" />

        {/* 1. HEADER: "Your Cart" + Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. SUBHEADER: "{N} Items" + "Clear All" */}
        <div className="flex items-center justify-between py-3 text-xs sm:text-sm font-semibold text-zinc-800">
          <span>{itemCount} Items</span>
          {itemCount > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* 3. CART ITEMS LIST / EMPTY STATE */}
        <div className="flex-1 overflow-y-auto min-h-[140px] max-h-[260px] py-2 space-y-3 pr-1 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-400">
              <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300 mb-3">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="text-sm font-bold text-zinc-700">Your cart is empty</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-[240px]">
                Explore Bangladesh&apos;s best cricket bats, gear, and essentials.
              </p>
              <button
                type="button"
                onClick={handleAddSampleItem}
                className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>+ Add Sample Bat to Test</span>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50/80 border border-zinc-100 hover:border-zinc-200 transition-all"
              >
                {/* Thumbnail Image */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white border border-zinc-100 shrink-0 p-1">
                  <Image
                    src={item.image || "/images/products/ss_gladiator.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {item.name}
                  </h4>
                  {item.category && (
                    <p className="text-[11px] text-zinc-400">{item.category}</p>
                  )}
                  <p className="text-xs sm:text-sm font-extrabold text-[#549900] mt-0.5">
                    ৳{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-5 h-5 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-zinc-800">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-5 h-5 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
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

        {/* 4. ORDER SUMMARY */}
        <div className="pt-3 border-t border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-900 mb-2.5">
            Order Summary
          </h3>

          {/* Coupon Input Pill Form */}
          <form onSubmit={handleApplyCoupon} className="mb-3">
            <div className="relative flex items-center w-full rounded-full border border-zinc-200 bg-white pl-4 pr-1 py-1 text-xs focus-within:border-zinc-400 transition-all">
              <input
                type="text"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                placeholder="Apply Coupon (e.g. PLAYZONE10)"
                className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs pr-2"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-black text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
              >
                Apply Coupon
              </button>
            </div>

            {/* Coupon Active Badge / Feedback */}
            {couponCode && (
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#4d8c00] bg-lime-50 px-3 py-1 rounded-lg border border-lime-200 font-semibold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Coupon {couponCode} applied</span>
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {couponFeedback && !couponCode && (
              <div
                className={`mt-1.5 text-[11px] flex items-center gap-1 font-semibold ${
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

          {/* Financial Totals */}
          <div className="space-y-1.5 text-xs text-zinc-600 mb-3">
            <div className="flex items-center justify-between">
              <span>Sub Total ({itemCount} items)</span>
              <span className="font-semibold text-zinc-900">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="font-semibold text-zinc-900">
                ৳{discount.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-sm font-black text-zinc-950">
              <span>Total Amount</span>
              <span className="text-base text-[#4d8c00] font-black">
                ৳{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Checkout Success Feedback */}
          {checkoutSuccess && (
            <div className="mb-2.5 p-2 bg-lime-50 border border-lime-200 rounded-xl text-xs text-[#4d8c00] font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#74d600]" />
              <span>Order placed successfully! Thank you.</span>
            </div>
          )}

          {/* 5. CONTINUE / CHECKOUT ACTION BUTTON (PLAYZONE NEON LIME GREEN) */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={itemCount === 0 || checkoutSuccess}
            className="w-full py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/25 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
