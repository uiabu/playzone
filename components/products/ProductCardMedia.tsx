"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ProductCardMediaProps {
  src: string;
  alt: string;
  videoUrl?: string;
  badge?: string;
  aspectRatio?: string; // e.g., "aspect-[4/3]"
  className?: string;
  priority?: boolean;
}

export function extractYoutubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function ProductCardMedia({
  src,
  alt,
  videoUrl,
  badge,
  aspectRatio = "aspect-[4/3]",
  className = "",
  priority = false,
}: ProductCardMediaProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isDataUrlOrExternal =
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40 select-none ${className}`}
    >
      {/* Base Product Image with Smooth Hover Zoom */}
      {isDataUrlOrExternal ? (
        <img
          src={imgError ? "/images/products/bats/sg_bat.png" : src}
          alt={alt}
          className={`w-full h-full object-contain p-2 transition-transform duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
          onError={() => setImgError(true)}
        />
      ) : (
        <Image
          src={imgError ? "/images/products/bats/sg_bat.png" : src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
          className={`object-contain object-center transition-transform duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
          onError={() => setImgError(true)}
        />
      )}

      {/* Promotional Badge (Top Left) */}
      {badge && (
        <span
          className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-2xs pointer-events-none ${
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
    </div>
  );
}
