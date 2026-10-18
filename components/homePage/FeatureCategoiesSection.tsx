"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  alt: string;
}

const CRICKET_CATEGORIES: CategoryItem[] = [
  // --- Row 1: Bats, Balls, Pads, Gloves, Helmets, Shoes ---
  {
    id: "cricket-bats",
    name: "Cricket Bats",
    href: "/category/cricket-bats",
    imageSrc: "/images/categories/cricket_bats.png",
    alt: "Cricket Bats - English & Kashmir Willow",
  },
  {
    id: "cricket-balls",
    name: "Cricket Balls",
    href: "/category/bowling",
    imageSrc: "/images/categories/cricket_balls.png",
    alt: "Cricket Balls - Match Leather & Training",
  },
  {
    id: "batting-pads",
    name: "Batting Pads",
    href: "/category/batting",
    imageSrc: "/images/categories/batting_pads.png",
    alt: "Batting Pads - Protection Legguards",
  },
  {
    id: "batting-gloves",
    name: "Batting Gloves",
    href: "/category/batting",
    imageSrc: "/images/categories/batting_gloves.png",
    alt: "Batting Gloves - Premium Protection",
  },
  {
    id: "helmets",
    name: "Helmets",
    href: "/category/batting",
    imageSrc: "/images/categories/helmets.png",
    alt: "Cricket Helmets - Grille Face Protection",
  },
  {
    id: "cricket-shoes",
    name: "Cricket Shoes",
    href: "/category/shoes",
    imageSrc: "/images/categories/cricket_shoes.png",
    alt: "Cricket Shoes - Spikes & Rubber Studs",
  },

  // --- Row 2: Thigh Guards, Wicketkeeping, Stumps, Kit Bags, Jerseys, Training Gear ---
  {
    id: "thigh-guards",
    name: "Thigh Guards",
    href: "/category/batting",
    imageSrc: "/images/categories/thigh_guards.png",
    alt: "Combo Thigh Guards & Body Armour",
  },
  {
    id: "wicketkeeping",
    name: "Wicketkeeping",
    href: "/category/wicketkeeping",
    imageSrc: "/images/categories/wicketkeeping.png",
    alt: "Wicketkeeping Gloves & Pads",
  },
  {
    id: "stumps",
    name: "Stumps",
    href: "/category/accessories",
    imageSrc: "/images/categories/stumps.png",
    alt: "Cricket Stumps & Bails",
  },
  {
    id: "kit-bags",
    name: "Kit Bags",
    href: "/category/accessories",
    imageSrc: "/images/categories/kit_bags.png",
    alt: "Playzone Cricket Kit Bags & Duffles",
  },
  {
    id: "jerseys",
    name: "Jerseys",
    href: "/category/clothing",
    imageSrc: "/images/categories/jerseys.png",
    alt: "Cricket Match Jerseys & Team Kits",
  },
  {
    id: "training-gear",
    name: "Training Gear",
    href: "/category/training",
    imageSrc: "/images/categories/training_gear.png",
    alt: "Cricket Training & Agility Equipment",
  },
];

export default function FeatureCategoiesSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header: "Featured Categories" */}
      <div className="mb-6 sm:mb-8 text-left">
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight inline-flex items-center gap-2">
          <span className="text-zinc-950">Featured</span>
          <span className="text-[#84cc16]">Categories</span>
        </h2>
      </div>

      {/* Categories Grid (2 Rows of 6 = 12 Items on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 items-start">
        {CRICKET_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex flex-col items-center justify-start text-center p-2 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xs"
          >
            {/* Category Product Image Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-28 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={category.imageSrc}
                alt={category.alt}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                className="object-contain object-center drop-shadow-xs"
              />
            </div>

            {/* Category Label */}
            <span className="text-xs sm:text-sm md:text-[15px] font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors leading-tight text-center tracking-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
