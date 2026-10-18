"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Gift,
  ArrowLeftRight,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface SubCategoryGroup {
  title: string;
  items: string[];
}

interface CategoryItem {
  name: string;
  href: string;
  subcategories?: SubCategoryGroup[];
}

const CATEGORIES: CategoryItem[] = [
  {
    name: "Cricket Bats",
    href: "/category/cricket-bats",
    subcategories: [
      {
        title: "By Willow & Type",
        items: [
          "English Willow Bats",
          "Kashmir Willow Bats",
          "Tennis / Tape Ball Bats",
          "Junior & Youth Bats",
          "Knocked-in & Ready to Play",
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
    name: "Batting Protection",
    href: "/category/batting-protection",
    subcategories: [
      {
        title: "Protective Gear",
        items: [
          "Batting Gloves",
          "Batting Pads & Legguards",
          "Cricket Helmets",
          "Combo & Dual Thigh Guards",
          "Arm & Chest Guards",
          "Abdominal Guards (Boxes)",
        ],
      },
    ],
  },
  {
    name: "Wicket Keeping",
    href: "/category/wicket-keeping",
    subcategories: [
      {
        title: "Keeper's Gear",
        items: [
          "Wicket Keeping Gloves",
          "Wicket Keeping Pads",
          "Padded Inner Gloves",
          "Chamois Leather Inners",
          "Keeper Helmets",
        ],
      },
    ],
  },
  {
    name: "Cricket Balls",
    href: "/category/cricket-balls",
    subcategories: [
      {
        title: "Match & Training Balls",
        items: [
          "Red Leather Match Balls (4-Piece)",
          "White & Pink Leather Balls",
          "Club & School Match Balls",
          "Heavy Tennis & Tape Balls",
          "Poly & Wind Training Balls",
        ],
      },
    ],
  },
  {
    name: "Shoes & Spikes",
    href: "/category/cricket-shoes",
    subcategories: [
      {
        title: "Cricket Footwear",
        items: [
          "Full Metal Spike Shoes",
          "Half Spikes (All-Rounder)",
          "Rubber Stud Turf Shoes",
          "Indoor & Training Shoes",
          "Cricket Socks & Spikes Keys",
        ],
      },
    ],
  },
  {
    name: "Clothing & Kits",
    href: "/category/cricket-clothing",
    subcategories: [
      {
        title: "Apparel & Whites",
        items: [
          "Cricket Match Whites & Trousers",
          "T20 & Customized Team Jerseys",
          "Compression Baselayers",
          "Broad Brim Sun Hats & Caps",
          "Tracksuits & Warmup Sweaters",
        ],
      },
    ],
  },
  {
    name: "Kit Bags",
    href: "/category/kit-bags",
    subcategories: [
      {
        title: "Luggage & Storage",
        items: [
          "Wheelie Kit Bags (Full Size)",
          "Duffle Bags with Bat Compartments",
          "Stand-Up Pro Bags",
          "Junior & Academy Bags",
          "Padded Single & Double Bat Covers",
        ],
      },
    ],
  },
  {
    name: "Training & Equipment",
    href: "/category/training-equipment",
    subcategories: [
      {
        title: "Field & Coaching Gear",
        items: [
          "Wooden Match Stumps & Bails",
          "Spring-Loaded Practice Stumps",
          "Automatic Bowling Machines",
          "Batting Tees & Hanging Balls",
          "Catching Bats & Rebounders",
          "Agility Ladders & Cones",
        ],
      },
    ],
  },
  {
    name: "Accessories & Care",
    href: "/category/accessories-care",
    subcategories: [
      {
        title: "Bat Care & Repairs",
        items: [
          "Bat Knocking Mallets",
          "Raw Linseed Oil & Wax",
          "Anti-Scuff & Extratec Sheets",
          "Octopus & Chevron Bat Grips",
          "Wooden Grip Application Cones",
          "Bat Toe Guards & Resin",
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = 0;

  const toggleCategoryDropdown = (name: string) => {
    setActiveCategory((prev) => (prev === name ? null : name));
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* 1. TOP MAIN BAR (Dark / Black) */}
      <div className="bg-[#050505] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-2 gap-3 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2 group transition-opacity hover:opacity-90"
              >
                <div className="relative h-9 w-36 sm:h-10 sm:w-44 flex items-center">
                  <Image
                    src="/playzone-logo-transparent.png"
                    alt="Playzone Logo"
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Search Input Bar (Center) */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cricket bats, balls, pads, shoes, gear..."
                  className="w-full bg-[#272727] text-white placeholder-zinc-400 text-sm rounded-full pl-10 pr-4 py-2.5 outline-none border border-transparent focus:border-zinc-500 focus:bg-[#2f2f2f] transition-all"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Right Actions & Navigation Links */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Blog / Cricket Guides */}
              <Link
                href="/blog"
                className="text-white hover:text-amber-500 font-semibold text-sm transition-colors hidden sm:inline-block"
              >
                Blog
              </Link>

              {/* Pre-order Link */}
              <Link
                href="/pre-order"
                className="text-white hover:text-amber-500 font-semibold text-sm transition-colors hidden sm:inline-block whitespace-nowrap"
              >
                Pre-order
              </Link>

              {/* Offers with Gift Icon */}
              <Link
                href="/offers"
                className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 font-semibold text-sm transition-colors"
              >
                <Gift className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                <span>Offers</span>
              </Link>

              {/* Compare */}
              <Link
                href="/compare"
                className="flex items-center gap-1.5 text-white hover:text-amber-500 font-semibold text-sm transition-colors hidden md:flex"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Compare</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-700/80 hover:border-zinc-500 flex items-center justify-center transition-all bg-zinc-900/40 hover:bg-zinc-800"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                <span className="absolute -top-1 -right-1 bg-amber-500 hover:bg-amber-600 text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              </Link>

              {/* User Account Button */}
              <Link
                href="/account"
                aria-label="User Account"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-700/80 hover:border-zinc-500 flex items-center justify-center transition-all bg-zinc-900/40 hover:bg-zinc-800"
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

          {/* Mobile Search Bar (visible on small devices) */}
          <div className="block md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cricket gear, bats, pads..."
                className="w-full bg-[#272727] text-white placeholder-zinc-400 text-sm rounded-full pl-10 pr-4 py-2 outline-none border border-transparent focus:border-zinc-500 transition-all"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CATEGORY BAR (White Background - Desktop) */}
      <nav className="bg-white border-b border-zinc-200/90 hidden lg:block text-zinc-900">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between gap-1 xl:gap-2 text-[13px] font-medium py-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="relative group">
                <Link
                  href={cat.href}
                  className="flex items-center gap-1 py-1 px-1.5 rounded hover:text-amber-600 transition-colors whitespace-nowrap"
                >
                  <span>{cat.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-600 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu on Hover */}
                {cat.subcategories && cat.subcategories.length > 0 && (
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
                                    className="block text-xs text-zinc-600 hover:text-amber-600 hover:translate-x-1 transition-all py-0.5"
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

      {/* 3. MOBILE DRAWER NAVIGATION (Open when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 shadow-xl max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Quick Links inside mobile drawer */}
          <div className="grid grid-cols-2 gap-2 p-4 bg-zinc-50 border-b border-zinc-100 text-sm font-semibold">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-amber-600"
            >
              Blog
            </Link>
            <Link
              href="/pre-order"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-amber-600"
            >
              Pre-order
            </Link>
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-amber-50 border border-amber-200 text-center text-amber-600 flex items-center justify-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              <span>Offers</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-white border border-zinc-200 text-center text-zinc-800 hover:text-amber-600 flex items-center justify-center gap-1.5"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Compare</span>
            </Link>
          </div>

          {/* Categories Accordion */}
          <div className="py-2 px-4 divide-y divide-zinc-100">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 py-2">
              Browse Cricket Gear
            </p>
            {CATEGORIES.map((cat) => {
              const isExpanded = activeCategory === cat.name;
              return (
                <div key={cat.name} className="py-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-zinc-800 hover:text-amber-600 flex-1"
                    >
                      {cat.name}
                    </Link>
                    {cat.subcategories && (
                      <button
                        type="button"
                        onClick={() => toggleCategoryDropdown(cat.name)}
                        className="p-1 text-zinc-500 hover:text-zinc-800"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-amber-600" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {isExpanded && cat.subcategories && (
                    <div className="mt-2 pl-3 border-l-2 border-amber-500 space-y-3 py-1">
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
                              className="block text-xs text-zinc-600 hover:text-amber-600 py-0.5"
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
