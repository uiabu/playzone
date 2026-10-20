"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  active: boolean;
  type: string;
}

export default function CtaBannerSection() {
  const [banner, setBanner] = useState<BannerData>({
    id: "default",
    title: "GREAT GEAR. SMARTER PRICES.",
    subtitle: "Every pre-owned bat undergoes our strict 12-point acoustic ping & structural inspection.",
    buttonText: "Browse Pre-Owned",
    buttonLink: "/category/pre-owned-gear",
    imageSrc: "/images/banners/pre_owned_cta_banner.png",
    active: true,
    type: "cta",
  });

  useEffect(() => {
    async function loadBanner() {
      try {
        const res = await api.getBanners();
        if (res?.data && Array.isArray(res.data)) {
          // Find first active CTA banner or first active banner
          const activeCta =
            res.data.find((b: BannerData) => b.active && b.type === "cta") ||
            res.data.find((b: BannerData) => b.active);
          if (activeCta) {
            setBanner(activeCta);
          }
        }
      } catch {
        // Fallback to default
      }
    }
    loadBanner();
  }, []);

  if (!banner.active) return null;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <Link
        href={banner.buttonLink || "/category/pre-owned-gear"}
        aria-label={`${banner.title}. ${banner.subtitle}`}
        className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 select-none bg-black"
      >
        {/* Banner Graphic Image with auto height adjustment */}
        <Image
          src={banner.imageSrc || "/images/banners/pre_owned_cta_banner.png"}
          alt={banner.title}
          width={2170}
          height={725}
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
          priority
        />

        {/* Subtle interactive hover sheen */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />

        {/* Accessible screen reader text */}
        <div className="sr-only">
          <h2>{banner.title}</h2>
          <p>{banner.subtitle}</p>
          <span>{banner.buttonText}</span>
        </div>
      </Link>
    </section>
  );
}
