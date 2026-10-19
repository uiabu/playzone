"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Award,
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

const SHOP_BRANDS = [
  "All Brands",
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
];

export default function ShopPageContent() {
  const { addItem, openCart } = useCart();
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (!product.categorySlug.includes(selectedCategory) && !product.category.toLowerCase().includes(selectedCategory)) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== "All Brands") {
        if (!product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

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

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        {/* 1. Shop Superstore Hero Banner */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-10 text-white">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BANGLADESH'S #1 CRICKET STORE</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Playzone Cricket Superstore
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                Explore our full catalog of authentic English & Kashmir willow bats, test-grade batting pads, gloves, match leather balls, and spike footwear.
              </p>
            </div>

            {/* Quick Search & Trust Pills */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 space-y-3 min-w-[280px]">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 34+ cricket gear..."
                  className="w-full pl-9 pr-3 py-2 bg-black/50 border border-white/20 rounded-xl text-xs text-white placeholder-zinc-400 outline-none focus:border-[#84cc16]"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>100% Genuine</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>24h Dhaka Delivery</span>
                </span>
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

        {/* 2. Shop Category Visual Cards (1-Click Jump to Category Details) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Browse by Cricket Category
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Select a department to view specialized gear, guides, and models
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {SHOP_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className="group bg-white rounded-2xl border border-zinc-200/90 p-3.5 text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 select-none"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="80px"
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-[#65a30d] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-zinc-400 mt-0.5 block">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Brand Showcase Bar */}
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider shrink-0 mr-2">
            Brands:
          </span>
          {SHOP_BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>

        {/* 4. Complete Store Catalog Header & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-zinc-200/80">
          <div>
            <h2 className="text-base sm:text-lg font-black text-zinc-950">
              {filteredProducts.length} Cricket Products
            </h2>
            <p className="text-xs text-zinc-500">
              Showing all authentic gear in the Playzone Superstore
            </p>
          </div>

          <div className="flex items-center gap-2">
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
            </select>
          </div>
        </div>

        {/* 5. Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
      </div>
    </main>
  );
}
