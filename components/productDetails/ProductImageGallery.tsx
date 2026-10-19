"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Share2, ShieldCheck, Check, Sparkles, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export default function ProductImageGallery({
  images,
  productName,
  badge,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // If there's only 1 image provided, we create 3 perspective angles for the thumbnail strip
  const displayImages =
    images.length >= 3
      ? images
      : [images[0], images[0], images[0]];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/60 rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden p-6 sm:p-10 flex items-center justify-center group select-none">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
          {badge && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-xs ${
                badge.includes("PRE-OWNED")
                  ? "bg-zinc-900 text-white"
                  : badge.includes("OFF")
                  ? "bg-red-500 text-white"
                  : "bg-[#84cc16] text-black"
              }`}
            >
              {badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-zinc-200/80 text-[11px] font-bold text-zinc-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
            <span>100% Genuine</span>
          </span>
        </div>

        {/* Top Right Action Icons */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm border ${
              isLiked
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white/90 hover:bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isLiked ? "fill-rose-500" : ""
              }`}
            />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="relative w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-8 right-0 whitespace-nowrap bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-md animate-in fade-in">
                Link Copied!
              </span>
            )}
          </button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={displayImages[selectedImageIndex] || displayImages[0]}
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-center transition-all duration-300 group-hover:scale-108"
          />
        </div>

        {/* Subtle Watermark or Zoom Hint */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 bg-white/70 backdrop-blur-2xs px-2.5 py-1 rounded-full border border-zinc-200/60 pointer-events-none">
          <ZoomIn className="w-3 h-3" />
          <span>Tap / Hover to inspect</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex items-center gap-3">
        {displayImages.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;
          const label = idx === 0 ? "Front View" : idx === 1 ? "Profile Edge" : "Detail";
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative flex-1 aspect-[4/3] rounded-2xl overflow-hidden bg-white p-2.5 border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#84cc16] ring-2 ring-[#84cc16]/30 shadow-xs"
                  : "border-zinc-200/80 hover:border-zinc-300 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <span className="absolute bottom-1 right-2 text-[9px] font-semibold text-zinc-400">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
