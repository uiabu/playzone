"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ShoppingCart,
  Zap,
  Award,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts, Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";
import ProductImageGallery from "@/components/productDetails/ProductImageGallery";
import ProductReviewsSection from "@/components/productDetails/ProductReviewsSection";
import RelatedProductsSection from "@/components/productDetails/RelatedProductsSection";

type ActiveTab = "specs" | "description" | "care" | "reviews";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";

  const product = useMemo(() => {
    return getProductBySlug(slug);
  }, [slug]);

  const relatedProducts = useMemo(() => {
    return getRelatedProducts(slug, 10);
  }, [slug]);

  // Cart context
  const { addItem, openCart } = useCart();

  // Variant States
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ""
  );
  const [selectedWeight, setSelectedWeight] = useState<string>(
    product?.weights?.[0] || ""
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<ActiveTab>("specs");
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center border border-zinc-200 shadow-md">
          <h2 className="text-xl font-bold text-zinc-900">Product Not Found</h2>
          <p className="text-xs text-zinc-500 mt-2">
            The requested cricket gear is currently unavailable or has been relocated.
          </p>
          <Link
            href="/"
            className="mt-5 inline-block px-5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold"
          >
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // Calculate dynamic extra services price
  const extraServicesTotal = (product.extraServices || [])
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const finalUnitPrice = product.price + extraServicesTotal;
  const totalPrice = finalUnitPrice * quantity;

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedSize || "std"}-${selectedWeight || "std"}`,
        name: `${product.name}${selectedSize ? ` (${selectedSize})` : ""}`,
        price: finalUnitPrice,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
      },
      quantity
    );

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 1. Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 font-medium overflow-x-auto pb-1"
        >
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-zinc-900 transition-colors whitespace-nowrap"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="text-zinc-800 font-semibold truncate max-w-[280px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2. Main Product Showcase (2-Column Grid) */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery (5 cols on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Product Info & Purchase Engine (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Brand & Stock Pill */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-black tracking-wide uppercase">
                  {product.brand}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#65a30d]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Authorized Dealer</span>
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock ({product.stockCount} Available)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings & SKU Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pb-3 border-b border-zinc-200/80">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5 text-[#84cc16]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-[#84cc16] text-[#84cc16]"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-zinc-900 ml-1">
                  {product.rating}
                </span>
                <span className="text-zinc-400">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              <span className="text-zinc-300">•</span>
              <span className="text-zinc-500 font-medium">
                SKU: <span className="text-zinc-800 font-mono font-semibold">{product.id.toUpperCase()}</span>
              </span>
            </div>

            {/* Pricing Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                  ৳ {finalUnitPrice.toLocaleString()}
                </span>

                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-zinc-400 line-through font-medium">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}

                {product.discountPercent && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-red-100 text-red-700 text-xs font-black tracking-wide">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* 0% EMI Note */}
              <p className="text-xs text-zinc-500 flex items-center gap-1.5 pt-1">
                <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                <span>0% EMI starting at ৳{Math.round(finalUnitPrice / 6).toLocaleString()}/month on select credit cards.</span>
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variant Option: Sizes / Handle */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 uppercase tracking-wider">
                    Size / Handle
                  </span>
                  <span className="text-zinc-500 font-medium">
                    Selected: <strong className="text-zinc-900">{selectedSize}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-zinc-950 text-white shadow-xs"
                            : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Variant Option: Weight */}
            {product.weights && product.weights.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 uppercase tracking-wider">
                    Weight Selection
                  </span>
                  <span className="text-zinc-500 font-medium">
                    Selected: <strong className="text-zinc-900">{selectedWeight}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((wt) => {
                    const isSelected = selectedWeight === wt;
                    return (
                      <button
                        key={wt}
                        type="button"
                        onClick={() => setSelectedWeight(wt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-zinc-950 text-white shadow-xs"
                            : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        {wt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extra Custom Services Add-ons */}
            {product.extraServices && product.extraServices.length > 0 && (
              <div className="space-y-2.5 pt-2 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>Match-Ready Prep Services</span>
                  </span>
                  <span className="text-[11px] text-zinc-400">Optional</span>
                </div>

                <div className="space-y-2">
                  {product.extraServices.map((service) => {
                    const isChecked = selectedServices.includes(service.id);
                    return (
                      <label
                        key={service.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-white border-[#84cc16] shadow-2xs"
                            : "bg-white/70 border-zinc-200 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleService(service.id)}
                            className="w-4 h-4 rounded text-[#84cc16] accent-[#84cc16] cursor-pointer"
                          />
                          <span className="font-medium text-zinc-800">
                            {service.label}
                          </span>
                        </div>
                        <span className="font-bold text-zinc-900">
                          +৳ {service.price.toLocaleString()}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons Strip */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between sm:justify-start border border-zinc-200 rounded-xl bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-bold text-base"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stockCount, q + 1))
                    }
                    disabled={quantity >= product.stockCount}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer font-bold text-base"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    Add to Cart • ৳ {totalPrice.toLocaleString()}
                  </span>
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-none py-3.5 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:bg-black text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Toast Feedback */}
              {addedToast && (
                <div className="p-3 rounded-xl bg-lime-50 border border-lime-300 text-xs font-bold text-[#4d7c0f] flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} item(s) to your shopping cart!</span>
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
            </div>

            {/* 4 Trust & Guarantee Badges Grid */}
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-zinc-200/80">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-zinc-200/70">
                <ShieldCheck className="w-4 h-4 text-[#84cc16] shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-zinc-900 font-bold">100% Genuine</strong>
                  <span className="text-zinc-500">Official Brand</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-zinc-200/70">
                <Truck className="w-4 h-4 text-[#84cc16] shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-zinc-900 font-bold">Fast Delivery</strong>
                  <span className="text-zinc-500">Dhaka in 24h</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-zinc-200/70">
                <RotateCcw className="w-4 h-4 text-[#84cc16] shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-zinc-900 font-bold">7-Day Return</strong>
                  <span className="text-zinc-500">Hassle-Free</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-zinc-200/70">
                <CreditCard className="w-4 h-4 text-[#84cc16] shrink-0" />
                <div className="text-[11px] leading-tight">
                  <strong className="block text-zinc-900 font-bold">COD Available</strong>
                  <span className="text-zinc-500">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Cross-Sell Banner: Connect with Hire Experts */}
        <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 text-white border border-zinc-800 shadow-md">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
                🏏 PLAYZONE EXPERT NETWORK
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Looking for Coaching or Net Practice with this gear?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                Hire BCB accredited cricket coaches, net practice partners, sidearm throwers, and match video analysts across Bangladesh.
              </p>
            </div>
            <Link
              href="/hire-experts"
              className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm transition-all shadow-md shrink-0 whitespace-nowrap"
            >
              Browse 245+ Cricket Experts →
            </Link>
          </div>
        </div>

        {/* 4. Tabbed Deep Dive Section (Specifications, Description, Care Guide, Reviews) */}
        <section className="mt-12 bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex border-b border-zinc-200/80 overflow-x-auto scrollbar-none bg-zinc-50/60 px-4 sm:px-6">
            {[
              { id: "specs", label: "Specifications" },
              { id: "description", label: "Detailed Description" },
              { id: "care", label: "Cricket Care & Knocking" },
              { id: "reviews", label: `Customer Reviews (${product.reviewsCount})` },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`py-4 px-5 text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap border-b-2 -mb-px cursor-pointer ${
                    isActive
                      ? "border-[#84cc16] text-zinc-950 bg-white"
                      : "border-transparent text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8">
            {/* Tab 1: Specifications */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black text-zinc-950">
                    Product Specifications
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Verified technical specifications for {product.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2.5 border-b border-zinc-100 text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-zinc-500">
                        {spec.label}
                      </span>
                      <span className="font-bold text-zinc-900 text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2.5 border-b border-zinc-100 text-xs sm:text-sm">
                    <span className="font-semibold text-zinc-500">Warranty</span>
                    <span className="font-bold text-zinc-900 text-right">
                      {product.warranty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-zinc-100 text-xs sm:text-sm">
                    <span className="font-semibold text-zinc-500">Delivery in Dhaka</span>
                    <span className="font-bold text-zinc-900 text-right">
                      {product.deliveryDaysDhaka}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-zinc-100 text-xs sm:text-sm">
                    <span className="font-semibold text-zinc-500">Nationwide Delivery</span>
                    <span className="font-bold text-zinc-900 text-right">
                      {product.deliveryDaysNationwide}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Detailed Description */}
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black text-zinc-950">
                    About this Gear
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
                    {product.description}
                  </p>
                </div>

                {product.highlights && product.highlights.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
                      Key Performance Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/70"
                        >
                          <Check className="w-4 h-4 text-[#84cc16] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Cricket Care & Knocking */}
            {activeTab === "care" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black text-zinc-950">
                    Cricket Gear Maintenance & Care
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Essential tips from PLAYZONE master bat-makers to maximize longevity and performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Knocking-in & Oiling
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Raw English Willow requires at least 4-6 hours of gentle mallet knocking around the edges and toe before facing leather balls. Apply a teaspoon of raw linseed oil twice a season.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Moisture & Storage
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Never store your bat or pads in a damp car trunk or direct sunlight. High humidity in Bangladesh can warp willow and compromise glove leather palms. Store in a cool, padded kit bag.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900">
                      Anti-Scuff Protection
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Applying an Extratec clear face sheet prevents surface grain cracks from seaming balls and extends the warranty lifespan of your cricket blade significantly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === "reviews" && (
              <ProductReviewsSection
                reviews={product.reviews}
                rating={product.rating}
                reviewsCount={product.reviewsCount}
                productName={product.name}
              />
            )}
          </div>
        </section>

        {/* 5. Related Products Grid */}
        <RelatedProductsSection
          products={relatedProducts}
          currentCategory={product.category}
        />
      </div>
    </main>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc]/70 p-6 sm:p-10">
      <div className="max-w-[1440px] mx-auto animate-pulse space-y-6">
        <div className="h-4 bg-zinc-200 rounded w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 aspect-square bg-zinc-200 rounded-3xl" />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 bg-zinc-200 rounded w-32" />
            <div className="h-8 bg-zinc-200 rounded w-3/4" />
            <div className="h-12 bg-zinc-200 rounded w-48" />
            <div className="h-20 bg-zinc-200 rounded w-full" />
            <div className="h-12 bg-zinc-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent />
    </Suspense>
  );
}
