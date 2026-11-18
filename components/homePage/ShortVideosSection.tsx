"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  ExternalLink,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import {
  SHORT_VIDEOS,
  SHORT_CATEGORIES,
  ShortVideo,
  ShortCategory,
  ShortVideoProduct,
} from "./shortVideosData";

export default function ShortVideosSection() {
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<ShortCategory>("all");
  const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter videos based on category
  const filteredVideos = useMemo(() => {
    if (activeCategory === "all") {
      return SHORT_VIDEOS;
    }
    return SHORT_VIDEOS.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  // Handle like toggle
  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Add to cart from video
  const handleAddToCart = (e: React.MouseEvent, product: ShortVideoProduct) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    });
    setToastMessage(
      language === "bn"
        ? `"${product.nameBn || product.name}" কার্টে যোগ হয়েছে!`
        : `Added "${product.name}" to cart!`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll position monitor
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        container.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [updateScrollState, filteredVideos]);

  // Smooth scroll handler
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    let scrollAmount = 260;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const secondCard = firstCard?.nextElementSibling as HTMLElement | null;

    if (firstCard && secondCard) {
      scrollAmount = Math.round(
        secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left
      );
    } else if (firstCard) {
      scrollAmount = Math.round(firstCard.getBoundingClientRect().width + 16);
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount * 2 : scrollAmount * 2,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 350);
  };

  // Switch category and scroll container back to start
  const handleSelectCategory = (cat: ShortCategory) => {
    setActiveCategory(cat);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Modal keyboard navigation (Escape to close, Left/Right for previous/next video)
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      } else if (e.key === "ArrowLeft") {
        const currIndex = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
        if (currIndex > 0) {
          setSelectedVideo(filteredVideos[currIndex - 1]);
        }
      } else if (e.key === "ArrowRight") {
        const currIndex = filteredVideos.findIndex((v) => v.id === selectedVideo.id);
        if (currIndex < filteredVideos.length - 1) {
          setSelectedVideo(filteredVideos[currIndex + 1]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, filteredVideos]);

  const selectedIndex = selectedVideo
    ? filteredVideos.findIndex((v) => v.id === selectedVideo.id)
    : -1;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-zinc-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-[#84cc16] text-zinc-950 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-zinc-100">{toastMessage}</span>
        </div>
      )}

      {/* Light Mint/Green Tinted Outer Wrapper */}
      <div className="w-full bg-[#f3f9eb] border border-[#d6ecba]/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xs">
        {/* HEADER BAR: YouTube Icon + @playzone.cricket + Category Pills + Carousel Arrows */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 mb-4 sm:mb-5">
          {/* Left: YouTube Icon + @playzone.cricket */}
          <a
            href="https://www.youtube.com/@playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer"
            title={t("Visit PlayZone YouTube Channel", "প্লেজোন ইউটিউব চ্যানেল দেখুন")}
          >
            {/* Red YouTube Pill Icon */}
            <div className="w-8 h-6 sm:w-9 sm:h-6.5 bg-[#FF0000] rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 group-hover:shadow-[0_0_14px_rgba(255,0,0,0.5)] transition-all">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5">
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-black tracking-tight leading-none text-zinc-950 group-hover:text-[#FF0000] transition-colors">
                @playzone.cricket
              </h2>
              {/* Verified Badge */}
              <span className="inline-flex items-center justify-center w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-blue-500 text-white shrink-0 shadow-xs">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
            </div>
          </a>

          {/* Middle & Right: Category Filter Pills + Carousel Arrows */}
          <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full lg:w-auto">
            {/* Category Pills (Horizontal scrollable on small screens) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 max-w-full">
              {SHORT_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelectCategory(category.id)}
                    className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                      isActive
                        ? "bg-[#84cc16] text-zinc-950 shadow-xs font-bold ring-2 ring-[#84cc16]/40"
                        : "bg-white border border-zinc-200/90 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 shadow-2xs"
                    }`}
                  >
                    {category.icon && <span className="text-xs">{category.icon}</span>}
                    <span>{language === "bn" ? category.labelBn : category.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Arrow Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-2">
              {/* Previous (<) */}
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Videos"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
                  canScrollLeft
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                    : "border border-zinc-200 bg-white text-zinc-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Next (>) */}
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next Videos"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 ${
                  canScrollRight
                    ? "bg-zinc-950 text-white hover:bg-zinc-800 cursor-pointer"
                    : "border border-zinc-200 bg-white text-zinc-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* VIDEOS CAROUSEL LIST */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-1 pt-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filteredVideos.map((video) => {
            const isLiked = !!likedVideos[video.id];
            const tagTop = language === "bn" ? video.tagTopBn : video.tagTop;
            const tagBottom = language === "bn" ? video.tagBottomBn : video.tagBottom;

            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                style={{ scrollSnapAlign: "start" }}
                className="group relative w-[170px] sm:w-[190px] md:w-[208px] lg:w-[220px] aspect-[9/15] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-black/10 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 select-none flex flex-col justify-between"
              >
                {/* Video Thumbnail Background */}
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 220px"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Top Shadow Gradient */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/75 via-black/30 to-transparent pointer-events-none" />

                {/* Bottom Shadow Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/75 to-transparent pointer-events-none" />

                {/* Top Bar: Duration Badge & Heart/Like Button */}
                <div className="relative z-10 p-2.5 flex items-center justify-between">
                  <span className="bg-black/70 backdrop-blur-xs text-[10px] sm:text-[11px] font-bold text-white px-2 py-0.5 rounded-md leading-none shadow-xs">
                    {video.duration}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, video.id)}
                    aria-label={isLiked ? "Unlike video" : "Like video"}
                    className="p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isLiked ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Center: Red YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-11 h-8 sm:w-12 sm:h-8.5 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all duration-300">
                    <svg
                      className="w-4 h-4 fill-white translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Content: Titles + Product Link Pill */}
                <div className="relative z-10 p-2.5 sm:p-3 space-y-2">
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-black tracking-wider text-white uppercase leading-tight line-clamp-1 drop-shadow-sm">
                      {tagTop}
                    </p>
                    <p className="text-xs sm:text-[13px] font-black tracking-wide text-[#84cc16] uppercase leading-tight line-clamp-1 drop-shadow-sm">
                      {tagBottom}
                    </p>
                  </div>

                  {/* Product Link Pill (Direct link to product) */}
                  <Link
                    href={`/product/${video.product.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    title={t("View featured product", "পণ্যটি দেখুন")}
                    className="w-full flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 active:scale-95 border border-white/20 text-white backdrop-blur-md transition-all shadow-md group/prod"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="relative w-5 h-5 shrink-0 rounded-md overflow-hidden bg-white/10">
                        <Image
                          src={video.product.image}
                          alt={video.product.name}
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-white truncate max-w-[85px] sm:max-w-[100px]">
                        {language === "bn" && video.product.nameBn
                          ? video.product.nameBn
                          : video.product.name}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-extrabold text-[#84cc16] shrink-0">
                      ৳{video.product.price.toLocaleString()}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* YOUTUBE SHORTS FULLSCREEN MODAL PLAYER ("video will be play here") */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[430px] max-h-[92vh] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/95 border-b border-zinc-800/80 shrink-0">
              <a
                href="https://www.youtube.com/@playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
              >
                <div className="w-6 h-4.5 bg-[#FF0000] rounded-sm flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-2.5 h-2.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
                  {selectedVideo.channelName}
                </span>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white shrink-0">
                  <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Container for Video + Product */}
            <div className="overflow-y-auto scrollbar-none flex-1 flex flex-col">
              {/* 9:16 Vertical YouTube Shorts Embed - Video plays right here */}
              <div className="relative w-full aspect-[9/16] max-h-[50vh] sm:max-h-[52vh] bg-black shrink-0">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* PRODUCT LINK ACCORDING TO VIDEO */}
              <div className="p-3.5 sm:p-4 bg-zinc-900 border-t border-zinc-800/80 flex flex-col gap-3 shrink-0">
                {/* Product Box */}
                <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-3">
                  <Link
                    href={`/product/${selectedVideo.product.slug}`}
                    onClick={() => setSelectedVideo(null)}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 group/img block"
                  >
                    <Image
                      src={selectedVideo.product.image}
                      alt={selectedVideo.product.name}
                      fill
                      sizes="64px"
                      className="object-cover group-hover/img:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#84cc16] uppercase tracking-wider block">
                      {selectedVideo.product.category}
                    </span>
                    <Link
                      href={`/product/${selectedVideo.product.slug}`}
                      onClick={() => setSelectedVideo(null)}
                      className="text-xs sm:text-sm font-bold text-white truncate leading-snug hover:text-[#84cc16] transition-colors block"
                    >
                      {language === "bn" && selectedVideo.product.nameBn
                        ? selectedVideo.product.nameBn
                        : selectedVideo.product.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm sm:text-base font-extrabold text-[#84cc16]">
                        ৳{selectedVideo.product.price.toLocaleString()}
                      </span>
                      {selectedVideo.product.originalPrice && (
                        <span className="text-[11px] text-zinc-500 line-through">
                          ৳{selectedVideo.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart + View Product */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, selectedVideo.product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-zinc-700"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>{t("Add to Cart", "কার্টে যোগ করুন")}</span>
                  </button>

                  <Link
                    href={`/product/${selectedVideo.product.slug}`}
                    onClick={() => setSelectedVideo(null)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#84cc16] hover:bg-[#74be10] active:scale-95 text-zinc-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs text-center"
                  >
                    <span>{t("View Product", "পণ্যটি দেখুন")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Footer Controls: Prev / Next Video buttons & YouTube Link */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800/60 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={selectedIndex <= 0}
                      onClick={() => {
                        if (selectedIndex > 0) {
                          setSelectedVideo(filteredVideos[selectedIndex - 1]);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>{t("Prev", "পূর্ববর্তী")}</span>
                    </button>

                    <button
                      type="button"
                      disabled={selectedIndex >= filteredVideos.length - 1}
                      onClick={() => {
                        if (selectedIndex < filteredVideos.length - 1) {
                          setSelectedVideo(filteredVideos[selectedIndex + 1]);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{t("Next", "পরবর্তী")}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <a
                    href={`https://youtube.com/shorts/${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>{t("YouTube Channel", "ইউটিউব")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
