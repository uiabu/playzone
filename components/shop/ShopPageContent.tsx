"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  X,
  RotateCcw,
} from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";

const SHOP_CATEGORIES = [
  {
    id: "cricket-bats",
    name: "Cricket Bats",
    count: "11 Models",
    image: "/images/categories/cricket_bats.png",
    href: "/category/cricket-bats",
    desc: "English & Kashmir Willow",
  },
  {
    id: "batting",
    name: "Batting Gear",
    count: "8 Models",
    image: "/images/categories/batting_pads.png",
    href: "/category/batting",
    desc: "Pads, Gloves & Helmets",
  },
  {
    id: "bowling",
    name: "Bowling & Balls",
    count: "5 Models",
    image: "/images/categories/cricket_balls.png",
    href: "/category/bowling",
    desc: "Match Balls & Spikes",
  },
  {
    id: "wicketkeeping",
    name: "Wicketkeeping",
    count: "5 Models",
    image: "/images/categories/batting_gloves.png",
    href: "/category/wicketkeeping",
    desc: "Gloves, Pads & Inners",
  },
  {
    id: "shoes",
    name: "Cricket Footwear",
    count: "5 Models",
    image: "/images/categories/cricket_shoes.png",
    href: "/category/shoes",
    desc: "Metal Spikes & Turf Studs",
  },
  {
    id: "accessories",
    name: "Kit Bags & Training",
    count: "5 Models",
    image: "/images/products/shoes_bags/playzone_wheelie_bag.png",
    href: "/category/accessories",
    desc: "Wheelies, Duffles & Cones",
  },
];

const FILTER_CATEGORIES = [
  { id: "all", name: "All Categories", count: ALL_PRODUCTS.length },
  { id: "cricket-bats", name: "Cricket Bats", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "cricket-bats").length },
  { id: "batting", name: "Batting Gear & Protection", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "batting").length },
  { id: "bowling", name: "Bowling Gear & Balls", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "bowling").length },
  { id: "wicketkeeping", name: "Wicketkeeping", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "wicketkeeping").length },
  { id: "shoes", name: "Cricket Shoes & Spikes", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "shoes").length },
  { id: "accessories", name: "Kit Bags & Accessories", count: ALL_PRODUCTS.filter((p) => p.categorySlug === "accessories").length },
];

const ALL_BRANDS_LIST = [
  "SG Cricket",
  "Kookaburra",
  "MRF",
  "SS Sunridges",
  "Gray-Nicolls",
  "New Balance",
  "Adidas",
  "Asics",
  "Puma",
  "DSC",
  "RexAduro",
  "PLAYZONE",
];

export default function ShopPageContent() {
  const { addItem, openCart } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [condition, setCondition] = useState<"all" | "new" | "pre-owned">("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recommended");

  // Mobile Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Collapsible Accordion Sections State
  const [openSections, setOpenSections] = useState({
    search: true,
    category: true,
    condition: true,
    brand: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setCondition("all");
    setMinPrice(0);
    setMaxPrice(25000);
    setMinRating(null);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (condition !== "all" ? 1 : 0) +
    (minRating !== null ? 1 : 0) +
    (minPrice > 0 || maxPrice < 25000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        const matchesSlug = product.categorySlug === selectedCategory;
        const matchesCat = product.category.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!matchesSlug && !matchesCat) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(
          (b) => product.brand.toLowerCase() === b.toLowerCase()
        );
        if (!matchesBrand) return false;
      }

      // Condition filter
      if (condition === "new" && product.badge?.includes("PRE-OWNED")) {
        return false;
      }
      if (condition === "pre-owned" && !product.badge?.includes("PRE-OWNED")) {
        return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (minRating !== null && product.rating < minRating) {
        return false;
      }

      // In Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0;
    });
  }, [
    selectedCategory,
    selectedBrands,
    condition,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    searchQuery,
    sortBy,
  ]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
    });
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  // Reusable Filter Sidebar Content (used in both desktop sidebar and mobile drawer)
  const renderFilterControls = () => (
    <div className="space-y-4">
      {/* Search Input */}
      <div>
        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
          Search Products
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type name, brand..."
            className="w-full pl-8 pr-7 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#84cc16]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Category</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.category && (
          <div className="space-y-1">
            {FILTER_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className={`text-[10px] ml-1 shrink-0 ${isSelected ? "text-zinc-400" : "text-zinc-400"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Gear Condition (All / New / Pre-Owned) */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("condition")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Condition</span>
          {openSections.condition ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.condition && (
          <div className="grid grid-cols-3 gap-1 bg-zinc-100 p-1 rounded-xl text-xs font-bold">
            {(["all", "new", "pre-owned"] as const).map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => setCondition(cond)}
                className={`py-1.5 text-center text-xs rounded-lg transition-all cursor-pointer ${
                  condition === cond
                    ? "bg-white text-zinc-950 font-bold shadow-2xs"
                    : "text-zinc-500 hover:text-zinc-900 font-medium"
                }`}
              >
                {cond === "all" ? "All" : cond === "new" ? "New" : "Pre-owned"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brands Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("brand")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>
            Brands {selectedBrands.length > 0 && `(${selectedBrands.length})`}
          </span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.brand && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {ALL_BRANDS_LIST.map((brand) => {
              const checked = selectedBrands.includes(brand);
              const count = ALL_PRODUCTS.filter(
                (p) => p.brand.toLowerCase() === brand.toLowerCase()
              ).length;
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium select-none py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{brand}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">{count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Price Range (BDT)</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.price && (
          <div className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 font-bold block mb-1">
                  MIN (৳)
                </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg text-xs outline-none focus:border-[#84cc16]"
                />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-bold block mb-1">
                  MAX (৳)
                </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(0, Number(e.target.value) || 25000))}
                  className="w-full px-2.5 py-1.5 border border-zinc-200 rounded-lg text-xs outline-none focus:border-[#84cc16]"
                />
              </div>
            </div>

            {/* Quick Price Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: "< ৳3k", min: 0, max: 3000 },
                { label: "৳3k - ৳7k", min: 3000, max: 7000 },
                { label: "৳7k+", min: 7000, max: 25000 },
              ].map((bracket, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setMinPrice(bracket.min);
                    setMaxPrice(bracket.max);
                  }}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
                >
                  {bracket.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customer Rating Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Customer Rating</span>
          {openSections.rating ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.rating && (
          <div className="space-y-1.5">
            {[4.8, 4.5, 4.0].map((star) => {
              const checked = minRating === star;
              return (
                <label
                  key={star}
                  className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer font-medium select-none py-0.5"
                >
                  <input
                    type="radio"
                    name="shop-rating"
                    checked={checked}
                    onChange={() => setMinRating(checked ? null : star)}
                    className="w-3.5 h-3.5 accent-[#84cc16] cursor-pointer"
                  />
                  <div className="flex items-center gap-0.5 text-[#84cc16]">
                    <Star className="w-3 h-3 fill-[#84cc16]" />
                  </div>
                  <span>{star} & above</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* In-Stock Only Toggle */}
      <div className="pt-3 border-t border-zinc-100">
        <label className="flex items-center justify-between text-xs text-zinc-800 font-bold cursor-pointer select-none">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-7">
        {/* 1. Shop Superstore Hero Banner */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-9 text-white">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BANGLADESH'S #1 CRICKET STORE</span>
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Playzone Cricket Store
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                Explore our full catalog of authentic English & Kashmir willow bats, test-grade batting pads, gloves, match leather balls, and spike footwear.
              </p>
            </div>

            {/* Trust Pills */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2 min-w-[240px]">
              <div className="flex items-center gap-2 text-xs text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
                <span className="font-semibold">100% Genuine Cricket Gear</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-200">
                <Truck className="w-4 h-4 text-[#84cc16]" />
                <span className="font-semibold">24h Express Delivery in Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Alert */}
        {addedToast && (
          <div className="p-4 rounded-2xl bg-lime-50 border border-lime-300 text-xs sm:text-sm font-bold text-[#4d7c0f] flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4d7c0f]" />
              <span>Added "{addedToast}" to your cart!</span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="underline text-black font-extrabold cursor-pointer"
            >
              View Cart →
            </button>
          </div>
        )}

        {/* 2. Shop Category Visual Cards */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight">
              Browse by Cricket Department
            </h2>
            <Link
              href="/hire-experts"
              className="text-xs font-bold text-[#65a30d] hover:underline flex items-center gap-1"
            >
              <span>Need coaching? Hire Experts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {SHOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`group rounded-2xl border p-3 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 select-none cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-zinc-950 text-white border-zinc-900"
                    : "bg-white text-zinc-900 border-zinc-200/90"
                }`}
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="64px"
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3
                  className={`font-bold text-xs transition-colors ${
                    selectedCategory === cat.id ? "text-[#a3e635]" : "text-zinc-900 group-hover:text-[#65a30d]"
                  }`}
                >
                  {cat.name}
                </h3>
                <span
                  className={`text-[10px] mt-0.5 block ${
                    selectedCategory === cat.id ? "text-zinc-400" : "text-zinc-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Main Catalog Layout: SIDEBAR FILTER + PRODUCT GRID */}
        <div className="flex flex-col lg:flex-row gap-6 items-start pt-2">
          {/* Desktop Left Sticky Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24 bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#84cc16]" />
                <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#84cc16] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Filter Controls */}
            {renderFilterControls()}
          </aside>

          {/* Right Main Catalog Content */}
          <div className="flex-1 w-full min-w-0">
            {/* Active Filters Bar */}
            {activeFilterCount > 0 && (
              <div className="flex items-center flex-wrap gap-2 mb-4 p-2.5 bg-zinc-100/80 rounded-xl">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Active Filters:
                </span>
                {selectedCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                  >
                    <span>
                      {FILTER_CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                    </span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                )}
                {selectedBrands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBrandToggle(b)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                  >
                    <span>{b}</span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                ))}
                {condition !== "all" && (
                  <button
                    type="button"
                    onClick={() => setCondition("all")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer capitalize shadow-2xs"
                  >
                    <span>{condition}</span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                )}
                {minRating !== null && (
                  <button
                    type="button"
                    onClick={() => setMinRating(null)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                  >
                    <span>★ {minRating}+</span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                )}
                {(minPrice > 0 || maxPrice < 25000) && (
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(0);
                      setMaxPrice(25000);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                  >
                    <span>৳{minPrice.toLocaleString()} - ৳{maxPrice.toLocaleString()}</span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                )}
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                  >
                    <span>"{searchQuery}"</span>
                    <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 ml-auto cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Header: Count, Mobile Trigger, Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 mb-4 border-b border-zinc-200/80">
              <div>
                <h2 className="text-base sm:text-lg font-black text-zinc-950">
                  {filteredProducts.length} Cricket Products
                </h2>
                <p className="text-xs text-zinc-500">
                  Showing verified cricket gear matching your side filters
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {/* Mobile Filter Drawer Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs font-bold text-zinc-800 shadow-2xs hover:bg-zinc-50 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#84cc16] text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <span className="text-xs text-zinc-500">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-zinc-200 text-xs font-bold text-zinc-800 rounded-lg px-3 py-1.5 outline-none cursor-pointer shadow-2xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Savings</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                      />

                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-2xs ${
                            product.badge.includes("PRE-OWNED")
                              ? "bg-zinc-900 text-white"
                              : product.badge.includes("OFF")
                              ? "bg-red-500 text-white"
                              : "bg-[#84cc16] text-black"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px] mt-0.5">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-0.5 text-[#84cc16]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-[#84cc16] text-[#84cc16]"
                                  : "text-zinc-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-700">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight block">
                          ৳ {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-zinc-400 line-through">
                            ৳ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        title="Add to Cart"
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#84cc16] text-zinc-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 px-4 text-center bg-white rounded-2xl border border-zinc-200/80 mt-4 space-y-3">
                <p className="text-base font-bold text-zinc-800">
                  No cricket products found matching your active filters.
                </p>
                <p className="text-xs text-zinc-500">
                  Try unchecking some brands, broadening the price range, or clearing the search.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Mobile Slide-Over Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileFilterOpen(false)}
            />

            {/* Slide-over panel */}
            <div className="relative ml-0 mr-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#84cc16]" />
                  <h3 className="font-black text-sm text-zinc-950 uppercase tracking-wider">
                    Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#84cc16] text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filters */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {renderFilterControls()}
              </div>

              {/* Bottom Sticky Action Buttons */}
              <div className="p-4 border-t border-zinc-200 bg-white grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="py-2.5 rounded-xl border border-zinc-200 font-bold text-xs text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#73b512] font-black text-xs text-white shadow-xs transition-colors"
                >
                  Show {filteredProducts.length} Items
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
