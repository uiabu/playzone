"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CtaBannerSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <Link
        href="/category/pre-owned-gear"
        aria-label="Great Gear. Smarter Prices. Shop Pre-owned Cricket Gear"
        className="group relative block w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 select-none bg-black"
      >
        {/* Banner Graphic Image with auto height adjustment */}
        <Image
          src="/images/banners/pre_owned_cta_banner.png"
          alt="Great Gear. Smarter Prices. Quality pre-owned cricket gear at unbeatable value."
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
          <h2>GREAT GEAR. SMARTER PRICES.</h2>
          <p>Quality pre-owned cricket gear at unbeatable value.</p>
          <span>SHOP PRE-OWNED</span>
        </div>
      </Link>
    </section>
  );
}
