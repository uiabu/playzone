import React from "react";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery | PLAYZONE Bangladesh",
  description: "Cricket gear shipping rates, delivery timelines, and courier details across Bangladesh.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Nationwide Logistics</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Shipping & Delivery Information
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Fast, secure delivery of authentic cricket equipment and pre-owned gear across all 64 districts of Bangladesh.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Inside Dhaka */}
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Zone 1</span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#74d600]/20 text-[#a3e635]">
                Fastest
              </span>
            </div>
            <h2 className="text-xl font-black text-white">Inside Dhaka City</h2>
            <p className="text-xs text-zinc-400 mt-1">Direct from our Dhaka fulfillment center</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#a3e635]">৳80</span>
              <span className="text-xs text-zinc-500">Flat Delivery Fee</span>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#74d600]" />
                <span>Estimated: <strong>24 – 48 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#74d600]" />
                <span>Cash on Delivery (COD) Available</span>
              </div>
            </div>
          </div>

          {/* Outside Dhaka */}
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Zone 2</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300">
                All 63 Districts
              </span>
            </div>
            <h2 className="text-xl font-black text-white">Outside Dhaka (Nationwide)</h2>
            <p className="text-xs text-zinc-400 mt-1">Chattogram, Sylhet, Rajshahi, Khulna, etc.</p>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#a3e635]">৳150</span>
              <span className="text-xs text-zinc-500">Flat Delivery Fee</span>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#74d600]" />
                <span>Estimated: <strong>48 – 72 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#74d600]" />
                <span>Cash on Delivery (COD) Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Packaging Details */}
        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#74d600]" />
            <span>Cricket Gear Packaging Standards</span>
          </h2>
          <p>
            Cricket bats and delicate protection equipment are packed in multi-wall rigid corrugated boxes with industrial bubble wrap to prevent surface impact, handle strain, or toe damage during transit.
          </p>
          <p>
            All packages are dispatched via trusted courier partners including <strong>Steadfast Courier</strong> and <strong>Pathao Courier</strong>, with real-time tracking IDs provided via SMS once handed over to the courier.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/track-order"
            className="px-6 py-3 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md"
          >
            Track Existing Order
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all"
          >
            Shop Cricket Gear
          </Link>
        </div>
      </div>
    </div>
  );
}
