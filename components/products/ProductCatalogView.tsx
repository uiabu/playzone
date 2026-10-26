"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronsRight,
  ShoppingCart,
  Check,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Eye,
} from "lucide-react";
import { ALL_PRODUCTS, Product, getProductViews } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import ProductCardMedia from "./ProductCardMedia";

export interface CatalogFilterState {
  category: string;
  condition: "all" | "new" | "pre-owned";
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number | null;
  inStockOnly: boolean;
  searchQuery: string;
}

interface ProductCatalogViewProps {
  initialCategory?: string;
  initialCondition?: "all" | "new" | "pre-owned";
  isDealsPage?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  bannerImage?: string;
  bannerAlt?: string;
}

const BRANDS = [
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

const CATEGORIES = [
  { id: "all", label: "All Categories" },
  { id: "cricket-bats", label: "Cricket Bats" },
  { id: "batting", label: "Batting Gear & Pads" },
  { id: "bowling", label: "Bowling Gear & Balls" },
  { id: "shoes", label: "Cricket Shoes & Spikes" },
  { id: "accessories", label: "Kit Bags & Training" },
];

export default function ProductCatalogView({
  initialCategory = "all",
  initialCondition = "all",
  isDealsPage = false,
  pageTitle,
  pageSubtitle,
  bannerImage = "/images/banners/pre_owned_cta_banner.png",
  bannerAlt = "Shop Authentic Cricket Gear in Bangladesh",
}: ProductCatalogViewProps) {
  const { addItem, openCart } = useCart();
  const { products: contextProducts } = useProducts();
  const sourceProducts =
    contextProducts && contextProducts.length > 0
      ? contextProducts
      : ALL_PRODUCTS;

  const [filters, setFilters] = useState<CatalogFilterState>({
    category: initialCategory,
    condition: initialCondition,
    brands: [],
    minPrice: 500,
    maxPrice: 15000,
    minRating: null,
    inStockOnly: false,
    searchQuery: "",
  });

  const [sortBy, setSortBy] = useState<string>("recommended");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  // Collapsible sidebar groups
  const [openSections, setOpenSections] = useState({
    category: true,
    condition: true,
    brand: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: initialCategory,
      condition: initialCondition,
      brands: [],
      minPrice: 500,
      maxPrice: 15000,
      minRating: null,
      inStockOnly: false,
      searchQuery: "",
    });
    setCurrentPage(1);
  };

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return sourceProducts.filter((product) => {
      // Deals page filter
      if (isDealsPage && !product.discountPercent && !product.badge?.includes("OFF")) {
        return false;
      }

      // Category filter
      if (filters.category !== "all") {
        const cat = filters.category.toLowerCase();
        const matchesSlug = product.categorySlug.toLowerCase().includes(cat);
        const matchesCategory = product.category.toLowerCase().includes(cat);
        const matchesId = product.id.toLowerCase().includes(cat);
        if (!matchesSlug && !matchesCategory && !matchesId) return false;
      }

      // Condition filter
      if (filters.condition === "new" && product.badge?.includes("PRE-OWNED")) {
        return false;
      }
      if (
        filters.condition === "pre-owned" &&
        !product.badge?.includes("PRE-OWNED")
      ) {
        return false;
      }

      // Brand filter
      if (
        filters.brands.length > 0 &&
        !filters.brands.some(
          (b) =>
            product.brand.toLowerCase().includes(b.toLowerCase()) ||
            b.toLowerCase().includes(product.brand.toLowerCase())
        )
      ) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating !== null && product.rating < filters.minRating) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(q);
        const inBrand = product.brand.toLowerCase().includes(q);
        const inDesc = product.shortDescription.toLowerCase().includes(q);
        if (!inName && !inBrand && !inDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0; // Default recommended
    });
  }, [filters, sortBy, isDealsPage]);

  // Derived Title & Subtitle if not provided
  const displayTitle =
    pageTitle ||
    (isDealsPage
      ? "Special Deals & Clearance Offers"
      : filters.condition === "pre-owned"
      ? "Pre-Owned Cricket Gear"
      : filters.category !== "all"
      ? `${CATEGORIES.find((c) => c.id === filters.category)?.label || filters.category} in Bangladesh`
      : "Shop Professional Cricket Gear");

  const displaySubtitle =
    pageSubtitle ||
    (isDealsPage
      ? "Up to 45% off on genuine English willow bats, protection pads, gloves, shoes and accessories."
      : filters.condition === "pre-owned"
      ? "Quality-graded pre-owned cricket bats and protection gear sold directly by PLAYZONE as-is at unbeatable prices."
      : "Find authentic English willow bats, pads, gloves, leather balls, and cricket shoes with express delivery.");

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
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
    setAddedItemToast(product.name);
    setTimeout(() => setAddedItemToast(null), 2500);
  };

  return (
    <main className="min-h-screen bg-white pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 1. Panoramic Top Banner */}
        <div className="relative w-full aspect-[4.8/1] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-zinc-200/80 bg-zinc-950">
          <Image
            src={bannerImage}
            alt={bannerAlt}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
          />
        </div>

        {/* 2. Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mt-5 text-xs text-zinc-500 font-medium"
        >
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link
            href="/category/shop-cricket"
            className="hover:text-zinc-900 transition-colors"
          >
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 font-semibold truncate">
            {displayTitle}
          </span>
        </nav>

        {/* 3. Heading & Subtitle */}
        <div className="mt-3">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-zinc-950 font-serif md:font-sans">
            {displayTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-3xl">
            {displaySubtitle}
          </p>
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-zinc-800 shadow-2xs hover:bg-zinc-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {(filters.brands.length > 0 ||
              filters.category !== "all" ||
              filters.condition !== "all" ||
              filters.minRating !== null) && (
              <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
            )}
          </button>
          <span className="text-xs text-zinc-500">
            {filteredProducts.length} items found
          </span>
        </div>

        {/* 4. Main Body: Sidebar + Grid */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Desktop Sidebar (Left) */}
          <aside className="hidden lg:block w-[270px] shrink-0 sticky top-24 bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs">
            {/* Header: Filters + Clear All */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-black text-zinc-950">Filters</h3>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="divide-y divide-zinc-100 space-y-4">
              {/* Service Category */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleSection("category")}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
                >
                  <span>Category</span>
                  {openSections.category ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openSections.category && (
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => {
                      const isSelected = filters.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              category: cat.id,
                            }))
                          }
                          className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-zinc-950 text-white font-bold"
                              : "text-zinc-600 hover:bg-zinc-100"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Condition (All / New / Pre-Owned) */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleSection("condition")}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
                >
                  <span>Gear Condition</span>
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
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, condition: cond }))
                        }
                        className={`py-1.5 text-center capitalize rounded-lg transition-all cursor-pointer ${
                          filters.condition === cond
                            ? "bg-white text-zinc-950 shadow-xs"
                            : "text-zinc-500 hover:text-zinc-900"
                        }`}
                      >
                        {cond === "all" ? "All" : cond}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleSection("brand")}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
                >
                  <span>Brands</span>
                  {openSections.brand ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openSections.brand && (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {BRANDS.map((brand) => {
                      const checked = filters.brands.includes(brand);
                      return (
                        <label
                          key={brand}
                          className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleBrandToggle(brand)}
                            className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                          />
                          <span>{brand}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleSection("price")}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
                >
                  <span>Price Range (BDT)</span>
                  {openSections.price ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openSections.price && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-400 font-bold block mb-1">
                          MIN (৳)
                        </span>
                        <input
                          type="number"
                          value={filters.minPrice}
                          onChange={(e) =>
                            setFilters((p) => ({
                              ...p,
                              minPrice: Number(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-2 py-1 border border-zinc-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 font-bold block mb-1">
                          MAX (৳)
                        </span>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) =>
                            setFilters((p) => ({
                              ...p,
                              maxPrice: Number(e.target.value) || 15000,
                            }))
                          }
                          className="w-full px-2 py-1 border border-zinc-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => toggleSection("rating")}
                  className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
                >
                  <span>Customer Rating</span>
                  {openSections.rating ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openSections.rating && (
                  <div className="space-y-2">
                    {[4.8, 4.5, 4.0].map((star) => {
                      const checked = filters.minRating === star;
                      return (
                        <label
                          key={star}
                          className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="rating"
                            checked={checked}
                            onChange={() =>
                              setFilters((p) => ({
                                ...p,
                                minRating: checked ? null : star,
                              }))
                            }
                            className="w-3.5 h-3.5 accent-[#84cc16]"
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
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="w-full py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-extrabold text-xs transition-colors cursor-pointer text-center"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 font-bold text-xs border border-zinc-200 transition-colors cursor-pointer text-center"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Right Main Grid */}
          <div className="flex-1 w-full min-w-0">
            {/* Results Header: Count & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-200/80">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                  {filteredProducts.length} Cricket Products Found
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Showing 1 – {filteredProducts.length} of {filteredProducts.length} results
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-zinc-500 whitespace-nowrap">
                  Sort By
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 rounded-lg px-3 py-1.5 pr-8 hover:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer shadow-2xs"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                  <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Added Toast Notification */}
            {addedItemToast && (
              <div className="mt-4 p-3 rounded-xl bg-lime-50 border border-lime-300 text-xs font-bold text-[#4d7c0f] flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Added "{addedItemToast}" to your cart!</span>
                </div>
                <button
                  type="button"
                  onClick={openCart}
                  className="underline text-black font-extrabold cursor-pointer"
                >
                  View Cart
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
                  >
                    {/* Media Display Area with Video on Hover */}
                    <ProductCardMedia
                      src={product.images && product.images[0] ? product.images[0] : "/images/products/bats/sg_bat.png"}
                      alt={product.name}
                      videoUrl={product.videoUrl}
                      badge={product.badge}
                      className="mb-3"
                    />

                    {/* Brand & Stock */}
                    <div>
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
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0" title="Views">
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{getProductViews(product)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action Button */}
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

                      {/* Quick Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAddToCart(product, e)}
                        title="Add to Cart"
                        className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#84cc16] text-zinc-700 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-12 py-16 px-4 text-center bg-white rounded-2xl border border-zinc-200/80">
                <p className="text-sm font-semibold text-zinc-800">
                  No cricket products match your filter selections.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-10 pt-6 border-t border-zinc-200/80 flex items-center justify-between flex-wrap gap-4 text-xs font-medium text-zinc-600">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5 mx-auto">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-amber-500 text-white shadow-xs cursor-pointer"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-semibold bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70 cursor-pointer"
                >
                  2
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Hire Experts Cross-Promotion Strip */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
              CRICKET EXPERTS FOR COACHING & MATCHES
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Hire Experienced Coaches, Umpires & Video Analysts
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Browse registered cricket professionals in Dhaka, Chittagong, Sylhet and across Bangladesh.
            </p>
          </div>
          <Link
            href="/hire-experts"
            className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm shrink-0 whitespace-nowrap"
          >
            Hire Cricket Experts →
          </Link>
        </div>
      </div>
    </main>
  );
}
