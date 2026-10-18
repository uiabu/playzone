"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowLeftRight,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Package,
} from "lucide-react";

interface SubCategoryGroup {
  title: string;
  items: string[];
}

interface CategoryItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subcategories?: SubCategoryGroup[];
}

const CATEGORIES: CategoryItem[] = [
  {
    name: "Shop Cricket",
    href: "/category/shop-cricket",
    hasDropdown: true,
    subcategories: [
      {
        title: "Popular Categories",
        items: [
          "English Willow Bats",
          "Batting Pads & Gloves",
          "Cricket Helmets",
          "Leather Match Balls",
          "Wicket Keeping Gear",
          "Spikes & Cricket Shoes",
          "Wheelie & Duffle Bags",
        ],
      },
      {
        title: "Featured Collections",
        items: [
          "International Match Kit",
          "Tournament Ready Combos",
          "Club & Academy Packs",
          "Custom Knocked-In Bats",
        ],
      },
    ],
  },
  {
    name: "New Gear",
    href: "/category/new-gear",
    hasDropdown: false,
  },
  {
    name: "Pre-owned Gear",
    href: "/category/pre-owned-gear",
    hasDropdown: false,
  },
  {
    name: "Bats",
    href: "/category/cricket-bats",
    hasDropdown: true,
    subcategories: [
      {
        title: "By Willow & Type",
        items: [
          "English Willow Bats",
          "Kashmir Willow Bats",
          "Tennis / Tape Ball Bats",
          "Junior & Youth Bats",
          "Ready to Play Knocked Bats",
        ],
      },
      {
        title: "Top Brands",
        items: [
          "SS Sunridges",
          "SG Cricket",
          "Kookaburra",
          "MRF",
          "Gray-Nicolls",
          "New Balance",
          "DSC",
        ],
      },
    ],
  },
  {
    name: "Batting",
    href: "/category/batting",
    hasDropdown: true,
    subcategories: [
      {
        title: "Batting Protection",
        items: [
          "Batting Gloves",
          "Batting Legguards & Pads",
          "Cricket Helmets",
          "Dual Thigh Guards",
          "Chest & Arm Guards",
          "Abdominal Guards",
        ],
      },
      {
        title: "Inners & Under-Gear",
        items: [
          "Chamois Padded Inners",
          "Batting Grip Bands",
          "Anti-Abrasion Base Layers",
        ],
      },
    ],
  },
  {
    name: "Bowling",
    href: "/category/bowling",
    hasDropdown: true,
    subcategories: [
      {
        title: "Cricket Balls",
        items: [
          "Red 4-Piece Leather Balls",
          "White Match Leather Balls",
          "Pink Day/Night Balls",
          "Heavy Tennis & Tape Balls",
          "Training Wind & Reaction Balls",
        ],
      },
      {
        title: "Bowling Gear & Aids",
        items: [
          "Bowling Spikes & Boots",
          "Pitch Markers & Target Mats",
          "Ball Mallet & Polish Cloth",
        ],
      },
    ],
  },
  {
    name: "Wicketkeeping",
    href: "/category/wicketkeeping",
    hasDropdown: true,
    subcategories: [
      {
        title: "Keeper's Gear",
        items: [
          "Wicket Keeping Gloves",
          "Wicket Keeping Pads",
          "Padded Inner Gloves",
          "Chamois Leather Inners",
          "Keeper Helmets & Caps",
        ],
      },
    ],
  },
  {
    name: "Shoes",
    href: "/category/shoes",
    hasDropdown: true,
    subcategories: [
      {
        title: "Footwear Categories",
        items: [
          "Full Metal Spikes (Turf)",
          "Rubber Studs (Matting/Hard Ground)",
          "All-Rounder Performance Shoes",
          "Indoor & Turf Trainers",
          "Technical Cricket Socks",
        ],
      },
    ],
  },
  {
    name: "Accessories",
    href: "/category/accessories",
    hasDropdown: true,
    subcategories: [
      {
        title: "Bat Maintenance",
        items: [
          "Replacement Grips",
          "Grip Cones & Applicators",
          "Extratec Anti-Scuff Sheets",
          "Raw Linseed Oil & Wax",
          "Wooden Mallets",
        ],
      },
      {
        title: "Training & Essentials",
        items: [
          "Target Stumps & Bails",
          "Scorebooks & Counter Clickers",
          "Bat Towels & Wristbands",
        ],
      },
    ],
  },
  {
    name: "Deals",
    href: "/deals",
    hasDropdown: true,
    subcategories: [
      {
        title: "Special Offers",
        items: [
          "Clearance Bats (Up to 40% Off)",
          "Combo Bundle Discounts",
          "Seasonal Gear Blowout",
          "Free Shipping Deals",
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Cart item count (defaults to 0 matching screenshot)
  const cartCount = 0;

  const toggleCategoryDropdown = (catName: string) => {
    setActiveCategory(activeCategory === catName ? null : catName);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* 1. TOP MAIN BAR (Deep Solid Black) */}
      <div className="bg-[#000000] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2 gap-3 lg:gap-8">
            {/* Logo: Playzone Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center transition-opacity hover:opacity-90 select-none py-1"
              >
                <Image
                  src="/images/playzone-logo-transparent-white.png"
                  alt="Playzone"
                  width={180}
                  height={34}
                  priority
                  className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Search Input Bar with Search Icon on the RIGHT */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for cricket bats, shoes, gloves..."
                  className="w-full bg-[#1c1c1f] text-white placeholder-zinc-400 text-sm rounded-full pl-5 pr-11 py-2.5 outline-none border border-zinc-800 focus:border-zinc-500 focus:bg-[#232326] transition-all"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-300 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Action Links: Blog, Track Order, Deals (Yellow), Compare, Cart, User */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Blog */}
              <Link
                href="/blog"
                className="text-white hover:text-yellow-400 font-medium text-sm transition-colors hidden sm:inline-block"
              >
                Blog
              </Link>

              {/* Pre-order */}
              <Link
                href="/pre-order"
                className="text-white hover:text-yellow-400 font-medium text-sm transition-colors hidden sm:inline-block whitespace-nowrap"
              >
                Pre-order
              </Link>

              {/* Offers (Vibrant Yellow / Gold) */}
              <Link
                href="/offers"
                className="text-[#facc15] hover:text-[#fde047] font-bold text-sm transition-colors"
              >
                Offers
              </Link>

              {/* Compare */}
              <Link
                href="/compare"
                className="flex items-center gap-1.5 text-white hover:text-yellow-400 font-medium text-sm transition-colors hidden md:flex"
              >
                <ArrowLeftRight className="w-4 h-4 text-zinc-300" />
                <span>Compare</span>
              </Link>

              {/* Shopping Cart Button (Bordered Circle with Neon Green Badge) */}
              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center transition-all bg-black hover:bg-zinc-800"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                {/* Neon Lime Green Badge with '0' */}
                <span className="absolute -top-1.5 -right-1.5 bg-[#84cc16] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </Link>

              {/* User Account Button (Bordered Circle with User Icon) */}
              <Link
                href="/account"
                aria-label="User Account"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center transition-all bg-black hover:bg-zinc-800"
              >
                <User className="w-4 h-4 text-white" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden text-white p-1.5 rounded-md hover:bg-zinc-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (visible on small devices) with icon on right */}
          <div className="block md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cricket bats, shoes, gloves..."
                className="w-full bg-[#1c1c1f] text-white placeholder-zinc-400 text-sm rounded-full pl-4 pr-10 py-2 outline-none border border-zinc-800 focus:border-zinc-500 transition-all"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CATEGORY BAR (White Background - Desktop) */}
      <nav className="bg-white border-b border-zinc-200/90 hidden lg:block text-zinc-900">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between gap-1 xl:gap-2 text-xs xl:text-[13px] font-semibold py-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="relative group">
                <Link
                  href={cat.href}
                  className="flex items-center gap-1 py-1 px-1.5 rounded text-zinc-800 hover:text-yellow-600 transition-colors whitespace-nowrap"
                >
                  <span>{cat.name}</span>
                  {cat.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-yellow-600 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu on Hover */}
                {cat.hasDropdown && cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full pt-1.5 hidden group-hover:block z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-zinc-100 p-4 min-w-[260px] animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="flex gap-6">
                        {cat.subcategories.map((sub, idx) => (
                          <div key={idx} className="space-y-1 min-w-[150px]">
                            <p className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">
                              {sub.title}
                            </p>
                            <ul className="space-y-1.5">
                              {sub.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={`${cat.href}/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                    className="block text-xs text-zinc-600 hover:text-yellow-600 hover:translate-x-1 transition-all py-0.5"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 3. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Quick Links inside mobile drawer */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-zinc-50 border-b border-zinc-100 text-sm font-semibold">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-yellow-600"
            >
              Blog
            </Link>
            <Link
              href="/pre-order"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-yellow-600"
            >
              Pre-order
            </Link>
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-yellow-50 border border-yellow-200 text-center text-yellow-700 font-bold flex items-center justify-center gap-1.5"
            >
              <span>Offers</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-yellow-600 flex items-center justify-center gap-1.5"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Compare</span>
            </Link>
          </div>

          {/* Categories Accordion */}
          <div className="py-2 px-4 divide-y divide-zinc-100">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 py-2">
              Cricket Categories
            </p>
            {CATEGORIES.map((cat) => {
              const isExpanded = activeCategory === cat.name;
              return (
                <div key={cat.name} className="py-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-zinc-800 hover:text-yellow-600 flex-1"
                    >
                      {cat.name}
                    </Link>
                    {cat.hasDropdown && cat.subcategories && (
                      <button
                        type="button"
                        onClick={() => toggleCategoryDropdown(cat.name)}
                        className="p-1 text-zinc-500 hover:text-zinc-800"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-yellow-600" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {isExpanded && cat.subcategories && (
                    <div className="mt-2 pl-3 border-l-2 border-yellow-500 space-y-3 py-1">
                      {cat.subcategories.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                            {sub.title}
                          </p>
                          {sub.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={`${cat.href}/${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs text-zinc-600 hover:text-yellow-600 py-0.5"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
