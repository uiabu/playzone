"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
} from "lucide-react";

import { api } from "@/lib/api";

interface HeroSlide {
  id: string;
  imageSrc: string;
  alt: string;
  link: string;
  titleWhite: string;
  titleAccent: string;
  subtitle: string;
  ctaText: string;
}

const CRICKET_SLIDES: HeroSlide[] = [
  {
    id: "build-your-kit",
    imageSrc: "/images/hero/build_your_kits.png",
    alt: "Build Your Kit - Complete Cricket Sets & Equipment",
    link: "/category/shop-cricket",
    titleWhite: "BUILD YOUR",
    titleAccent: "KIT",
    subtitle: "Everything You Need for the Cricket Season.",
    ctaText: "BUILD YOUR KIT →",
  },
  {
    id: "cricket-bats",
    imageSrc: "/images/hero/hero_cricket_bats.png",
    alt: "Cricket Bats - Handcrafted English Willow & Kashmir Willow",
    link: "/category/cricket-bats",
    titleWhite: "CRICKET",
    titleAccent: "BATS",
    subtitle: "Premium English & Kashmir Willow Bats.",
    ctaText: "SHOP BATS →",
  },
  {
    id: "cricket-helmets",
    imageSrc: "/images/hero/hero_cricket_bats_helmets.png",
    alt: "Cricket Helmets - Elite Protection Trusted by Pros",
    link: "/category/batting",
    titleWhite: "CRICKET",
    titleAccent: "HELMETS",
    subtitle: "Titanium & Carbon Composite Protection.",
    ctaText: "VIEW HELMETS →",
  },
  {
    id: "cricket-pads",
    imageSrc: "/images/hero/hero_cricket_bats_pads.png",
    alt: "Cricket Pads - Lightweight High-Density Legguards",
    link: "/category/batting",
    titleWhite: "CRICKET",
    titleAccent: "PADS",
    subtitle: "High-Density Foam & Traditional Cane Pads.",
    ctaText: "EXPLORE PADS →",
  },
  {
    id: "cricket-shoes",
    imageSrc: "/images/hero/hero_cricket_bats_shoes.png",
    alt: "Cricket Shoes - Turf Spikes & Rubber Studs",
    link: "/category/shoes",
    titleWhite: "CRICKET",
    titleAccent: "SHOES",
    subtitle: "Engineered Grip for Bowlers & Batsmen.",
    ctaText: "SHOP SHOES →",
  },
];

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>(CRICKET_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadHeroBanners() {
      try {
        const res = await api.getBanners();
        if (res?.data && Array.isArray(res.data)) {
          const heroBanners = res.data.filter(
            (b: any) => b.type === "hero" && b.active
          );
          if (heroBanners.length > 0) {
            setSlides(
              heroBanners.map((b: any) => ({
                id: b.id,
                imageSrc: b.imageSrc,
                alt: b.title,
                link: b.buttonLink || "/category/cricket-bats",
                titleWhite: b.title,
                titleAccent: "",
                subtitle: b.subtitle || "",
                ctaText: b.buttonText || "SHOP NOW →",
              }))
            );
          }
        }
      } catch {
        // Fallback to default
      }
    }
    loadHeroBanners();
  }, []);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (totalSlides > 0 ? (prev + 1) % totalSlides : 0));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      totalSlides > 0 ? (prev - 1 + totalSlides) % totalSlides : 0
    );
  }, [totalSlides]);

  // Autoplay functionality (5.5 seconds)
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, totalSlides]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-4">
      {/* ========================================================= */}
      {/* 1. TOP HERO ROW: Carousel (Left) + 2 Stacked Cards (Right) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* --------------------------------------------------------- */}
        {/* LEFT COLUMN: CRICKET HERO CAROUSEL (lg:col-span-8) */}
        {/* --------------------------------------------------------- */}
        <div
          className="lg:col-span-8 relative rounded-2xl overflow-hidden shadow-lg border border-zinc-800/60 bg-[#0a0c10] aspect-[16/9] sm:aspect-[1.95/1] flex flex-col justify-between group select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isActive
                    ? "opacity-100 z-10 pointer-events-auto"
                    : "opacity-0 z-0 pointer-events-none"
                    }`}
                >
                  {/* Hero Banner Image */}
                  <Image
                    src={slide.imageSrc}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 68vw"
                    className="object-cover object-center"
                  />

                  {/* Clickable Overlay Link to Category */}
                  <Link
                    href={slide.link}
                    aria-label={slide.alt}
                    className="absolute inset-0 z-10"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Left Arrow (<) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-zinc-900 shadow-lg flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Navigation Controls: Right Arrow (>) */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-zinc-900 shadow-lg flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Bottom Indicator Pills (Centered) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full ${isActive
                    ? "w-8 bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.8)]"
                    : "w-3 bg-white/70 hover:bg-white"
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* RIGHT COLUMN: 2 PROMO CARDS (Side-by-side on mobile, stacked on lg) */}
        {/* --------------------------------------------------------- */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-2.5 sm:gap-3.5 lg:gap-4 justify-between">
          {/* CARD 1: HIRE EXPERTS */}
          <Link
            href="/hire-experts"
            className="group relative flex-1 aspect-[2/1] lg:aspect-auto lg:min-h-[175px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-zinc-800/40 bg-zinc-900"
          >
            <Image
              src="/images/hero/experts.png"
              alt="Hire Experts - For Training, Matches & Events"
              fill
              sizes="(max-width: 1024px) 50vw, 32vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Subtle interactive hover highlight */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
          </Link>

          {/* CARD 2: PRE-OWNED PICKS */}
          <Link
            href="/category/pre-owned-gear"
            className="group relative flex-1 aspect-[2/1] lg:aspect-auto lg:min-h-[175px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-zinc-800/40 bg-zinc-900"
          >
            <Image
              src="/images/hero/pre_owned_pick.png"
              alt="Pre-Owned Picks - Quality Gear. Bigger Value."
              fill
              sizes="(max-width: 1024px) 50vw, 32vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Subtle interactive hover highlight */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. BOTTOM HORIZONTAL SOCIAL MEDIA & COMMUNITY BAR (5 CHANNELS) */}
      {/* Visible only on lg+, hidden on mobile/tablet */}
      {/* ========================================================= */}
      <div className="hidden lg:block mt-4 bg-white rounded-2xl border border-zinc-200/90 shadow-xs px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 gap-3 sm:gap-0">
          {/* Channel 1: Facebook Page */}
          <a
            href="https://www.facebook.com/playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Playzone Facebook Page"
            className="flex items-center gap-3.5 justify-center sm:px-4 first:sm:pl-0 group transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Icon: Facebook with Lime Green Accent */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="17" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
                <circle cx="22" cy="22" r="13.5" fill="#a3e635" />
                <path
                  d="M24.5 15H22C19.8 15 18.5 16.5 18.5 18.8V21H16V24.5H18.5V31H22.5V24.5H25.2L25.8 21H22.5V19C22.5 18.2 22.9 17.8 23.8 17.8H25V15H24.5Z"
                  fill="#18181b"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Facebook Page
              </h4>
              <p className="text-xs text-zinc-500 font-medium truncate">
                @playzone.cricket
              </p>
            </div>
          </a>

          {/* Channel 2: Facebook Community Group */}
          <a
            href="https://www.facebook.com/groups/playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Playzone Cricket Community Group"
            className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Icon: Community Group with Lime Green Badge */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="7"
                  width="32"
                  height="30"
                  rx="8"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                <rect x="9.5" y="10.5" width="25" height="23" rx="5" fill="#a3e635" />
                <circle cx="22" cy="18" r="3.5" fill="#18181b" />
                <path
                  d="M16 29C16 25.5 18.5 24 22 24C25.5 24 28 25.5 28 29"
                  stroke="#18181b"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <circle cx="15.5" cy="19.5" r="2.5" fill="#18181b" />
                <path d="M12 28.5C12 26.5 13.5 25.2 15.5 25" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
                <circle cx="28.5" cy="19.5" r="2.5" fill="#18181b" />
                <path d="M32 28.5C32 26.5 30.5 25.2 28.5 25" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Cricket Group
              </h4>
              <p className="text-xs text-zinc-500 font-medium truncate">
                Join Community
              </p>
            </div>
          </a>

          {/* Channel 3: Instagram */}
          <a
            href="https://www.instagram.com/playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Playzone Instagram"
            className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Icon: Camera with Lime Lens */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7"
                  y="7"
                  width="30"
                  height="30"
                  rx="9"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                <circle cx="22" cy="22" r="7.5" fill="#a3e635" stroke="#18181b" strokeWidth="2.8" />
                <circle cx="22" cy="22" r="3" fill="#18181b" />
                <circle cx="29.5" cy="14.5" r="1.8" fill="#a3e635" stroke="#18181b" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Instagram
              </h4>
              <p className="text-xs text-zinc-500 font-medium truncate">
                @playzone.cricket
              </p>
            </div>
          </a>

          {/* Channel 4: TikTok */}
          <a
            href="https://www.tiktok.com/@playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Playzone TikTok"
            className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Icon: TikTok Note with Lime Green Circle */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="17" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
                <circle cx="22" cy="22" r="13.5" fill="#a3e635" />
                <path
                  d="M26.5 13C25.5 15.2 23.5 16.5 21 16.8V25.2C21 27.8 18.8 29.8 16.2 29.5C14 29.2 12.3 27.2 12.5 25C12.7 22.8 14.6 21.2 17 21.3V24C16 23.9 15.2 24.6 15.1 25.4C15 26.2 15.7 27 16.5 27C17.4 27 18.2 26.2 18.2 25.2V13H21.2C21.4 14.5 22.4 15.6 23.8 15.8V13H26.5Z"
                  fill="#18181b"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                TikTok
              </h4>
              <p className="text-xs text-zinc-500 font-medium truncate">
                @playzone.cricket
              </p>
            </div>
          </a>

          {/* Channel 5: YouTube */}
          <a
            href="https://www.youtube.com/@playzone.cricket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Playzone YouTube Channel"
            className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Icon: Screen with Lime Display & Play Arrow */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="10"
                  width="32"
                  height="24"
                  rx="7"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                <rect x="9" y="13" width="26" height="18" rx="4.5" fill="#a3e635" />
                <path
                  d="M19 17.5L27 22L19 26.5V17.5Z"
                  fill="#18181b"
                  stroke="#18181b"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                YouTube Channel
              </h4>
              <p className="text-xs text-zinc-500 font-medium truncate">
                @playzone.cricket
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
