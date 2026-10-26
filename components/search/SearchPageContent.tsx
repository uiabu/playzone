"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  X,
  Star,
  Eye,
  ShoppingCart,
  SlidersHorizontal,
  Package,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { ALL_PRODUCTS, Product, getProductViews } from "@/lib/productsData";
import { EXPERTS_DATA, Expert, getExpertProfileViews } from "@/components/hireExperts/expertsData";
import { searchEverything } from "@/lib/searchService";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import ProductCardMedia from "@/components/products/ProductCardMedia";
import ExpertCard from "@/components/hireExperts/ExpertCard";
import ProfileModal from "@/components/hireExperts/ProfileModal";
import BookingModal from "@/components/hireExperts/BookingModal";

const POPULAR_SUGGESTIONS = [
  "English Willow",
  "Cricket Balls",
  "Batting Pads",
  "Batting Coach",
  "Bowling Shoes",
  "Pre-owned Gear",
  "Net Bowler",
  "Kit Bags",
];

type SearchTab = "all" | "products" | "experts";
type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialTab = (searchParams.get("tab") as SearchTab) || "all";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Expert Modals
  const [selectedProfileExpert, setSelectedProfileExpert] = useState<Expert | null>(null);
  const [selectedBookingExpert, setSelectedBookingExpert] = useState<Expert | null>(null);

  const { addItem } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with searchParams if URL changes
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    const tab = searchParams.get("tab") as SearchTab;
    if (tab && (tab === "all" || tab === "products" || tab === "experts")) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Live real-time search on type
  const searchResults = useMemo(() => {
    return searchEverything(query);
  }, [query]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...searchResults.products];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list; // relevance
  }, [searchResults.products, sortBy]);

  // Sort experts
  const sortedExperts = useMemo(() => {
    const list = [...searchResults.experts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchResults.experts, sortBy]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    // Update URL query string smoothly without reload
    const params = new URLSearchParams(window.location.search);
    if (val.trim()) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0] || "/images/products/bats/sg_bat.png",
      category: product.category,
    });
    setToastMessage(`Added "${product.name}" to your cart!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-zinc-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Search Area */}
      <section className="bg-gradient-to-b from-[#0a0c10] via-black to-[#111317] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200 font-medium">Search</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Search <span className="text-[#84cc16]">Playzone</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
              Instantly find authentic cricket gear, bats, accessories, and cricket coaching experts.
            </p>

            {/* Interactive Search Input Box */}
            <div className="relative mt-6">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search for bats, leather balls, coaches, spikes, gloves..."
                className="w-full bg-[#1c1c20] text-white placeholder-zinc-400 text-sm sm:text-base rounded-2xl pl-12 pr-12 py-3.5 sm:py-4 outline-none border border-zinc-700/80 focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all shadow-lg"
              />
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-xs font-semibold text-zinc-400">Popular:</span>
              {POPULAR_SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQueryChange(item)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    query.toLowerCase() === item.toLowerCase()
                      ? "bg-[#84cc16] text-black border-[#84cc16] font-bold"
                      : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-zinc-700 font-medium"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Bar with Tabs and Sorter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          {/* Tabs: All, Products, Experts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              All Results ({searchResults.totalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "products"
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              <Package className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>Products ({sortedProducts.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("experts")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "experts"
                  ? "bg-zinc-950 text-white shadow-xs"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-lime-600" />
              <span>Cricket Experts ({sortedExperts.length})</span>
            </button>
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-semibold hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-800 outline-none focus:border-[#84cc16] cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Query Summary Text */}
        {query.trim() && (
          <div className="mt-4 mb-2 text-xs sm:text-sm text-zinc-600">
            Showing results matching &quot;<span className="font-bold text-zinc-900">{query}</span>&quot;
          </div>
        )}

        {/* Empty State */}
        {searchResults.totalCount === 0 && (
          <div className="mt-12 py-16 px-4 text-center bg-white rounded-3xl border border-zinc-200/80 shadow-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">
              No matching cricket products or experts found
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try checking for spelling errors or search for popular terms like bats, balls, or coaches.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {POPULAR_SUGGESTIONS.slice(0, 4).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQueryChange(item)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 font-medium text-zinc-700 transition-colors"
                >
                  Search &quot;{item}&quot;
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS: PRODUCTS SECTION */}
        {(activeTab === "all" || activeTab === "products") && sortedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#84cc16]" />
                <span>Cricket Products</span>
                <span className="text-xs font-bold text-zinc-400">({sortedProducts.length})</span>
              </h2>
              {activeTab === "all" && sortedProducts.length > 5 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="text-xs font-bold text-[#65a30d] hover:underline"
                >
                  View all products →
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
              {(activeTab === "all" ? sortedProducts.slice(0, 10) : sortedProducts).map(
                (product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-2xl border border-zinc-200/90 shadow-xs hover:shadow-md transition-all duration-300 p-3.5 flex flex-col justify-between hover:-translate-y-1 select-none"
                  >
                    {/* Product Media with Video on Hover */}
                    <ProductCardMedia
                      src={product.images && product.images[0] ? product.images[0] : "/images/products/bats/sg_bat.png"}
                      alt={product.name}
                      videoUrl={product.videoUrl}
                      badge={product.badge}
                      className="mb-3"
                    />

                    {/* Title & Brand */}
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px] mt-0.5">
                        {product.name}
                      </h3>

                      {/* Ratings & Views */}
                      <div className="flex items-center justify-between gap-1 mt-2">
                        <div className="flex items-center gap-1 min-w-0">
                          <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
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
                          <span className="text-[11px] text-zinc-400">
                            ({product.reviewsCount})
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0"
                          title="Views"
                        >
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{getProductViews(product)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Add to Cart Button */}
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
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#84cc16] text-zinc-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {/* RESULTS: EXPERTS SECTION */}
        {(activeTab === "all" || activeTab === "experts") && sortedExperts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#84cc16]" />
                <span>Cricket Experts</span>
                <span className="text-xs font-bold text-zinc-400">({sortedExperts.length})</span>
              </h2>
              {activeTab === "all" && sortedExperts.length > 4 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("experts")}
                  className="text-xs font-bold text-[#65a30d] hover:underline"
                >
                  View all experts →
                </button>
              )}
            </div>

            {/* Experts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4.5">
              {(activeTab === "all" ? sortedExperts.slice(0, 5) : sortedExperts).map((expert) => (
                <div key={expert.id} className="flex flex-col">
                  <ExpertCard
                    expert={expert}
                    onViewProfile={(exp) => setSelectedProfileExpert(exp)}
                    onBook={(exp) => setSelectedBookingExpert(exp)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Expert Profile Details Modal */}
      <ProfileModal
        expert={selectedProfileExpert}
        isOpen={!!selectedProfileExpert}
        onClose={() => setSelectedProfileExpert(null)}
        onBook={(exp) => {
          setSelectedProfileExpert(null);
          setSelectedBookingExpert(exp);
        }}
      />

      {/* Expert Booking Modal */}
      <BookingModal
        expert={selectedBookingExpert}
        isOpen={!!selectedBookingExpert}
        onClose={() => setSelectedBookingExpert(null)}
      />
    </div>
  );
}
