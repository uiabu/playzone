"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import { useCart } from "@/context/CartContext";
import { searchEverything } from "@/lib/searchService";
import LiveSearchDropdown from "@/components/search/LiveSearchDropdown";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Package,
  ArrowRight,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";

interface MegaMenuPromo {
  title: string;
  subtitle: string;
  badge?: string;
  image: string;
  href: string;
}

interface SubCategoryGroup {
  title: string;
  items: string[];
}

interface CategoryItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subcategories?: SubCategoryGroup[];
  promos?: MegaMenuPromo[];
}

const CATEGORIES: CategoryItem[] = [
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
    name: "Hire Experts",
    href: "/hire-experts",
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
    promos: [
      {
        title: "Pro English Willow",
        subtitle: "Hand-selected Grade 1 & 2 willow with explosive sweet spots.",
        badge: "TOP WILLOW",
        image: "/images/categories/cricket_bats.png",
        href: "/category/cricket-bats",
      },
      {
        title: "Pre-Owned Willow Bats",
        subtitle: "Seasoned match-ready willow at 40%-50% discount. Graded A+, A, B.",
        badge: "PRE-OWNED",
        image: "/images/products/bats/ss_ton.png",
        href: "/pre-owned",
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
    promos: [
      {
        title: "Test Batting Gloves",
        subtitle: "Split-finger high-density foam with Pittards leather palm.",
        badge: "TEST SPEC",
        image: "/images/categories/batting_gloves.png",
        href: "/category/batting",
      },
      {
        title: "Cricket Helmets & Pads",
        subtitle: "High-tensile steel face grilles and lightweight foam cane pads.",
        badge: "SAFETY FIRST",
        image: "/images/categories/helmets.png",
        href: "/category/batting",
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
    promos: [
      {
        title: "Match Leather Balls",
        subtitle: "Alum tanned 4-piece leather balls for maximum swing and seam.",
        badge: "TOURNAMENT",
        image: "/images/categories/cricket_balls.png",
        href: "/category/bowling",
      },
      {
        title: "Target Stumps & Aids",
        subtitle: "Spring return stumps and coaching accessories for bowling drills.",
        badge: "TRAINING",
        image: "/images/categories/stumps.png",
        href: "/category/bowling",
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
    promos: [
      {
        title: "Pro Keeping Gloves",
        subtitle: "Octopus rubber grip catch pocket with flexible ergonomic cuffs.",
        badge: "PRO SPEC",
        image: "/images/categories/wicketkeeping.png",
        href: "/category/wicketkeeping",
      },
      {
        title: "Lightweight Keeping Pads",
        subtitle: "Ultra-compact ergonomic leg guards for agile stump movements.",
        badge: "COMFORT",
        image: "/images/categories/batting_pads.png",
        href: "/category/wicketkeeping",
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
    promos: [
      {
        title: "Pro Cricket Spikes",
        subtitle: "Full metal spikes and rubber studs for maximum pitch traction.",
        badge: "MAX TRACTION",
        image: "/images/categories/cricket_shoes.png",
        href: "/category/shoes",
      },
      {
        title: "Turf & Bowling Boots",
        subtitle: "High impact cushioning engineered for subcontinental turf.",
        badge: "POPULAR",
        image: "/images/products/shoes_bags/adidas_spikes.png",
        href: "/category/shoes",
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
        title: "Kit & Essentials",
        items: [
          "Target Stumps & Bails",
          "Scorebooks & Counter Clickers",
          "Bat Towels & Wristbands",
        ],
      },
    ],
    promos: [
      {
        title: "Pro Wheelie Kit Bags",
        subtitle: "Spacious compartments with heavy duty wheels for full player kits.",
        badge: "HEAVY DUTY",
        image: "/images/categories/kit_bags.png",
        href: "/category/accessories",
      },
      {
        title: "Bat Care & Accessories",
        subtitle: "Linseed oil, knocking mallets, and face sheets for long willow life.",
        badge: "MAINTENANCE",
        image: "/images/categories/training_gear.png",
        href: "/category/accessories",
      },
    ],
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpenDesktop, setIsSearchOpenDesktop] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const closeMegaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryMouseEnter = (catName: string) => {
    if (closeMegaTimeoutRef.current) {
      clearTimeout(closeMegaTimeoutRef.current);
      closeMegaTimeoutRef.current = null;
    }
    setActiveMegaCategory(catName);
  };

  const handleCategoryMouseLeave = () => {
    closeMegaTimeoutRef.current = setTimeout(() => {
      setActiveMegaCategory(null);
    }, 220);
  };

  const activeCategoryData = useMemo(() => {
    return CATEGORIES.find((c) => c.name === activeMegaCategory && c.hasDropdown) || null;
  }, [activeMegaCategory]);

  const [displayedCategoryData, setDisplayedCategoryData] = useState<CategoryItem | null>(null);

  useEffect(() => {
    if (activeCategoryData) {
      setDisplayedCategoryData(activeCategoryData);
    }
  }, [activeCategoryData]);

  const isMegaOpen = Boolean(activeMegaCategory && activeCategoryData);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { openCart, itemCount } = useCart();

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Live search results on-type
  const liveResults = useMemo(() => {
    return searchEverything(searchQuery);
  }, [searchQuery]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpenDesktop(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpenMobile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      router.push("/search");
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setIsSearchOpenDesktop(false);
    setIsSearchOpenMobile(false);
  };

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
            <div ref={desktopSearchRef} className="flex-1 max-w-2xl hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpenDesktop(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setIsSearchOpenDesktop(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsSearchOpenDesktop(false);
                  }}
                  placeholder="Search for cricket bats, shoes, gloves..."
                  className="w-full bg-[#1c1c1f] text-white placeholder-zinc-400 text-sm rounded-full pl-5 pr-16 py-2.5 outline-none border border-zinc-800 focus:border-zinc-500 focus:bg-[#232326] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpenDesktop(false);
                    }}
                    aria-label="Clear search"
                    className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-300 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              {/* Live Search Dropdown On-Type */}
              <LiveSearchDropdown
                query={searchQuery}
                products={liveResults.products}
                experts={liveResults.experts}
                totalCount={liveResults.totalCount}
                isOpen={isSearchOpenDesktop && !!searchQuery.trim()}
                onClose={() => setIsSearchOpenDesktop(false)}
                onSelectResult={() => setIsSearchOpenDesktop(false)}
              />
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

              {/* Hire Experts */}
              <Link
                href="/hire-experts"
                className="text-white hover:text-[#a3e635] font-semibold text-sm transition-colors hidden sm:inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Hire Experts</span>
                <span className="bg-[#84cc16] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none uppercase tracking-wider">
                  New
                </span>
              </Link>

              {/* Offers (Vibrant Yellow / Gold) */}
              <Link
                href="/offers"
                className="text-[#facc15] hover:text-[#fde047] font-bold text-sm transition-colors"
              >
                Offers
              </Link>

              {/* Shopping Cart Button (Bordered Circle with Neon Green Badge) */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping Cart (${itemCount} items)`}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center transition-all bg-black hover:bg-zinc-800 text-white cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                {/* Neon Lime Green Badge with item count */}
                <span className="absolute -top-1.5 -right-1.5 bg-[#84cc16] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              </button>

              {/* User Account / Sign In Button (Bordered Circle with User Icon) */}
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                aria-label="Sign In or User Account"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white flex items-center justify-center transition-all bg-black hover:bg-zinc-800 text-white cursor-pointer"
              >
                <User className="w-4 h-4 text-white" />
              </button>

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
          <div ref={mobileSearchRef} className="block md:hidden pb-3 pt-1 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpenMobile(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setIsSearchOpenMobile(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchOpenMobile(false);
                }}
                placeholder="Search for cricket bats, shoes, gloves..."
                className="w-full bg-[#1c1c1f] text-white placeholder-zinc-400 text-sm rounded-full pl-4 pr-16 py-2 outline-none border border-zinc-800 focus:border-zinc-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpenMobile(false);
                  }}
                  aria-label="Clear search"
                  className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-300 p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile On-type Live Search Dropdown */}
            <LiveSearchDropdown
              query={searchQuery}
              products={liveResults.products}
              experts={liveResults.experts}
              totalCount={liveResults.totalCount}
              isOpen={isSearchOpenMobile && !!searchQuery.trim()}
              onClose={() => setIsSearchOpenMobile(false)}
              onSelectResult={() => setIsSearchOpenMobile(false)}
            />
          </div>
        </div>
      </div>

      {/* 2. BOTTOM CATEGORY BAR (White Background - Desktop with Smooth Mega Menu) */}
      <nav
        className="bg-white border-b border-zinc-200/90 hidden lg:block text-zinc-900 relative"
        onMouseLeave={handleCategoryMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ul className="flex items-center justify-between gap-1 xl:gap-2 text-xs xl:text-[13px] font-semibold py-2">
            {CATEGORIES.map((cat) => {
              const isCurrentRoute = Boolean(
                pathname === cat.href ||
                (cat.href !== "/" && pathname.startsWith(cat.href)) ||
                (cat.name === "Bats" && (pathname.includes("bats") || pathname.includes("cricket-bats"))) ||
                (cat.name === "Pre-owned Gear" && (pathname.includes("pre-owned") || pathname.includes("used"))) ||
                (cat.name === "Hire Experts" && pathname.includes("hire-experts")) ||
                (cat.name === "Protective Gear" && (pathname.includes("protective") || pathname.includes("pads") || pathname.includes("gloves") || pathname.includes("helmets"))) ||
                (cat.name === "Cricket Balls" && pathname.includes("balls")) ||
                (cat.name === "Wicket Keeping" && pathname.includes("wicket-keeping")) ||
                (cat.name === "Footwear" && (pathname.includes("shoes") || pathname.includes("footwear"))) ||
                (cat.name === "Kit Bags & Accessories" && (pathname.includes("kit-bags") || pathname.includes("accessories")))
              );
              const isHovered = activeMegaCategory === cat.name;
              const isActive = isHovered || isCurrentRoute;

              return (
                <li
                  key={cat.name}
                  className="py-0.5"
                  onMouseEnter={() => handleCategoryMouseEnter(cat.name)}
                >
                  <Link
                    href={cat.href}
                    className={`group flex items-center gap-1.5 py-1.5 px-2.5 transition-colors duration-200 whitespace-nowrap cursor-pointer select-none bg-transparent ${
                      isActive
                        ? "text-[#65a30d] font-bold"
                        : "text-zinc-800 hover:text-[#65a30d] font-semibold"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-all duration-200 ${
                          isHovered ? "rotate-180" : ""
                        } ${
                          isActive
                            ? "text-[#65a30d]"
                            : "text-zinc-400 group-hover:text-[#65a30d]"
                        }`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* DESKTOP MEGA MENU PANEL WITH IMAGES & SMOOTH TRANSITIONS */}
          {displayedCategoryData && displayedCategoryData.hasDropdown && (
            <div
              className={`absolute left-4 right-4 top-full z-50 pt-2 select-none transition-all duration-300 ease-out ${
                isMegaOpen
                  ? "opacity-100 translate-y-0 visible pointer-events-auto"
                  : "opacity-0 -translate-y-2 invisible pointer-events-none"
              }`}
              onMouseEnter={() => {
                if (closeMegaTimeoutRef.current) {
                  clearTimeout(closeMegaTimeoutRef.current);
                  closeMegaTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleCategoryMouseLeave}
            >
              {/* Invisible hit-bridge so mouse movement over pt-2 gap never drops hover */}
              <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

              <div className="relative bg-white rounded-3xl shadow-2xl border border-zinc-200/90 p-6 xl:p-7 overflow-hidden transition-all duration-300">
                {/* Top Lime Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#74d600] via-[#a3e635] to-[#549900]" />

                <div className="grid grid-cols-12 gap-8 items-start">
                  {/* Left: Subcategory Groups (7 cols) */}
                  <div className="col-span-7 grid grid-cols-2 gap-8">
                    {displayedCategoryData.subcategories?.map((sub, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                            {sub.title}
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#74d600]" />
                        </div>
                        <ul className="space-y-1">
                          {sub.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href={`${displayedCategoryData.href}?sub=${encodeURIComponent(item)}`}
                                onClick={() => setActiveMegaCategory(null)}
                                className="group/link flex items-center justify-between py-1.5 px-2.5 rounded-xl text-xs font-medium text-zinc-600 hover:text-[#549900] hover:bg-lime-50/70 hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                <span className="group-hover/link:text-[#549900] transition-colors duration-200">
                                  {item}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#549900] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 ease-out" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Right: Featured Promo Cards with High-Res Images (5 cols) */}
                  <div className="col-span-5 grid grid-cols-2 gap-4 border-l border-zinc-100 pl-8">
                    {displayedCategoryData.promos?.map((promo, pIdx) => (
                      <Link
                        key={pIdx}
                        href={promo.href}
                        onClick={() => setActiveMegaCategory(null)}
                        className="group/promo flex flex-col justify-between p-3.5 rounded-2xl bg-gradient-to-b from-zinc-50/70 to-white border border-zinc-200/80 hover:border-[#74d600] hover:shadow-xl hover:shadow-lime-500/10 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
                      >
                        <div>
                          {/* Image Container with Floating Badge */}
                          <div className="relative w-full h-32 rounded-xl bg-white border border-zinc-100 p-2 overflow-hidden flex items-center justify-center mb-3 group-hover/promo:scale-[1.02] transition-transform duration-300 ease-out">
                            <Image
                              src={promo.image}
                              alt={promo.title}
                              fill
                              className="object-contain p-1 group-hover/promo:scale-105 transition-transform duration-300 ease-out"
                            />
                            {promo.badge && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-zinc-950 text-[#84cc16] border border-zinc-800 shadow-xs">
                                {promo.badge}
                              </span>
                            )}
                          </div>

                          <h5 className="text-xs font-black text-zinc-950 group-hover/promo:text-[#549900] transition-colors duration-200 leading-tight mb-1">
                            {promo.title}
                          </h5>
                          <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                            {promo.subtitle}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] font-extrabold text-[#549900]">
                          <span>Explore Collection</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/promo:translate-x-1 transition-transform duration-200" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Info & Quick-View Bar */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5 font-medium hover:text-zinc-700 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-[#74d600]" />
                      100% Genuine Gear
                    </span>
                    <span className="flex items-center gap-1.5 font-medium hover:text-zinc-700 transition-colors">
                      <Truck className="w-4 h-4 text-[#74d600]" />
                      24h Dhaka Delivery (৳80)
                    </span>
                    <span className="flex items-center gap-1.5 font-medium hover:text-zinc-700 transition-colors">
                      <Zap className="w-4 h-4 text-[#74d600]" />
                      Cash on Delivery Across Bangladesh
                    </span>
                  </div>

                  <Link
                    href={displayedCategoryData.href}
                    onClick={() => setActiveMegaCategory(null)}
                    className="text-xs font-black text-zinc-900 hover:text-[#549900] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Browse All {displayedCategoryData.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
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
              href="/hire-experts"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-lime-50 border border-lime-300 text-center text-lime-800 font-bold flex items-center justify-center gap-1.5"
            >
              <span>🏏 Hire Experts</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center text-white hover:text-[#74d600] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({itemCount})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="p-2.5 rounded-xl bg-[#74d600] text-zinc-950 font-bold text-center hover:bg-[#65c200] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
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
                      className="text-sm font-semibold text-zinc-800 hover:text-[#65a30d] transition-colors flex-1"
                    >
                      {cat.name}
                    </Link>
                    {cat.hasDropdown && cat.subcategories && (
                      <button
                        type="button"
                        onClick={() => toggleCategoryDropdown(cat.name)}
                        className="p-1 text-zinc-500 hover:text-[#65a30d] transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#65a30d]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {isExpanded && cat.subcategories && (
                    <div className="mt-2 pl-3 border-l-2 border-[#65a30d] space-y-3 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                      {cat.subcategories.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide">
                            {sub.title}
                          </p>
                          {sub.items.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={`${cat.href}?sub=${encodeURIComponent(item)}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs text-zinc-600 hover:text-[#65a30d] hover:translate-x-1 transition-all duration-200 py-0.5"
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

      {/* Sign In / Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
}
