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
      {/* 2. BOTTOM HORIZONTAL TRUST BAR (4 CRICKET SERVICE HIGHLIGHTS) */}
      {/* Visible only on lg+, hidden on mobile/tablet */}
      {/* ========================================================= */}
      <div className="hidden lg:block mt-4 bg-white rounded-2xl border border-zinc-200/90 shadow-xs px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 gap-3 sm:gap-0 ">
          {/* Feature 1: Inspected Pre-owned Gear */}
          <div className="flex items-center gap-3.5 justify-center sm:px-4 first:sm:pl-0 group">
            {/* Icon: Magnifier with Lime Checkmark */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Magnifier Glass Circle */}
                <circle
                  cx="19"
                  cy="19"
                  r="13"
                  stroke="#18181b"
                  strokeWidth="3.2"
                />
                {/* Handle */}
                <path
                  d="M28.5 28.5L38 38"
                  stroke="#18181b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Green Checkmark Circle Inside */}
                <circle cx="19" cy="19" r="8" fill="#a3e635" />
                <path
                  d="M15.5 19L18 21.5L23 16.5"
                  stroke="#18181b"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Inspected Pre-owned Gear
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                Quality checked by experts
              </p>
            </div>
          </div>

          {/* Feature 2: Fast Bangladesh Delivery */}
          <div className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group">
            {/* Icon: Delivery Truck with Lime Cargo Box */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Green Cargo Box */}
                <rect
                  x="6"
                  y="12"
                  width="18"
                  height="16"
                  rx="2"
                  fill="#a3e635"
                  stroke="#18181b"
                  strokeWidth="3"
                />
                {/* Truck Cabin */}
                <path
                  d="M24 16H30L36 22V28H24V16Z"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Front Windshield */}
                <path
                  d="M26 19H29L33 23H26V19Z"
                  fill="#18181b"
                />
                {/* Left Wheel */}
                <circle cx="13" cy="30" r="4" fill="#18181b" />
                <circle cx="13" cy="30" r="1.5" fill="#ffffff" />
                {/* Right Wheel */}
                <circle cx="31" cy="30" r="4" fill="#18181b" />
                <circle cx="31" cy="30" r="1.5" fill="#ffffff" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Fast Bangladesh Delivery
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                Nationwide shipping
              </p>
            </div>
          </div>

          {/* Feature 3: Secure Payments */}
          <div className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group">
            {/* Icon: Shield with Lime Checkmark */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield Outline */}
                <path
                  d="M22 6L9 11V21C9 29.5 14.5 37 22 39C29.5 37 35 29.5 35 21V11L22 6Z"
                  fill="#ffffff"
                  stroke="#18181b"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Lime Green Center Shield */}
                <path
                  d="M22 10L13 14V21C13 27 16.8 32.5 22 34C27.2 32.5 31 27 31 21V14L22 10Z"
                  fill="#a3e635"
                />
                {/* Checkmark */}
                <path
                  d="M17 21.5L20.5 25L27 18.5"
                  stroke="#18181b"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Secure Payments
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                bKash, Nagad, Cards
              </p>
            </div>
          </div>

          {/* Feature 4: Easy Support */}
          <div className="flex items-center gap-3.5 justify-center sm:px-4 pt-3 sm:pt-0 group">
            {/* Icon: Headphone with Lime Earcups */}
            <div className="w-11 h-11 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 44 44"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Headset Arc */}
                <path
                  d="M10 24V21C10 14.37 15.37 9 22 9C28.63 9 34 14.37 34 21V24"
                  stroke="#18181b"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Left Earcup */}
                <rect
                  x="7"
                  y="22"
                  width="7"
                  height="12"
                  rx="3.5"
                  fill="#a3e635"
                  stroke="#18181b"
                  strokeWidth="2.5"
                />
                {/* Right Earcup */}
                <rect
                  x="30"
                  y="22"
                  width="7"
                  height="12"
                  rx="3.5"
                  fill="#a3e635"
                  stroke="#18181b"
                  strokeWidth="2.5"
                />
                {/* Microphone Wire */}
                <path
                  d="M33 30C33 35 28 37 25 37H23"
                  stroke="#18181b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Microphone Tip */}
                <circle cx="21" cy="37" r="2.5" fill="#a3e635" stroke="#18181b" strokeWidth="2" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-zinc-900 font-bold text-sm tracking-tight leading-snug group-hover:text-[#65a30d] transition-colors">
                Easy Support
              </h4>
              <p className="text-xs text-zinc-500 font-medium">
                We&apos;re here to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
