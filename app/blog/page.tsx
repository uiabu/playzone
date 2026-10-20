"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, User, Clock, ArrowRight } from "lucide-react";

const BLOG_ARTICLES = [
  {
    slug: "how-to-knock-in-english-willow-bat",
    title: "The Ultimate Guide: How to Properly Knock-in an English Willow Bat in Bangladesh",
    category: "Bat Care & Prep",
    readTime: "6 min read",
    date: "October 16, 2026",
    author: "Mahmudul Hasan (Master Bat-Maker)",
    imageSrc: "/images/products/bats/sg_bat.png",
    excerpt:
      "Why skipping the knocking-in process can ruin an expensive bat in your very first match. Learn the exact mallet techniques, oiling ratios, and pitch testing methods used by professionals.",
  },
  {
    slug: "choosing-cricket-spikes-for-turf-and-matting",
    title: "Metal Spikes vs. Rubber Studs: Which Cricket Shoes Are Best for Bangladeshi Grounds?",
    category: "Gear Advice",
    readTime: "5 min read",
    date: "October 10, 2026",
    author: "Shakib Al-Amin (Cricket Analyst)",
    imageSrc: "/images/products/shoes_bags/adidas_spikes.png",
    excerpt:
      "A complete breakdown of traction, knee impact, and outsole durability across Dhaka, Chittagong, and Sylhet pitch conditions.",
  },
  {
    slug: "pre-owned-cricket-bats-guide",
    title: "How to Buy a Pre-Owned English Willow Bat with Confidence",
    category: "Smart Buying",
    readTime: "4 min read",
    date: "October 04, 2026",
    author: "Tanvir Ahmed (First-Class Cricketer)",
    imageSrc: "/images/products/bats/ss_ton.png",
    excerpt:
      "Get test-grade willow at 50% of the retail price. How PLAYZONE evaluates handle flex, acoustic ping, and condition grading standards.",
  },
  {
    slug: "mastering-the-sidearm-throwdown",
    title: "How to Train with a Sidearm Thrower to Counter 140+ km/h Pace",
    category: "Coaching & Drills",
    readTime: "7 min read",
    date: "September 26, 2026",
    author: "Coach M. Rahman (BCB Level 3)",
    imageSrc: "/images/experts/sidearm_thrower.png",
    excerpt:
      "Modern batting demands fast hand speed. Here is how academy batsmen are using throwdown specialists to sharpen their back-foot defense and pull shots.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 font-medium"
        >
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 font-semibold">Cricket Blog & Masterclasses</span>
        </nav>

        {/* Heading */}
        <div className="mt-4">
          <span className="px-3 py-1 rounded-full bg-[#84cc16]/20 text-[#4d7c0f] font-black text-xs uppercase tracking-wider">
            PLAYZONE INSIGHTS
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight mt-2">
            Cricket Gear Guides & Expert Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
            In-depth guides, equipment reviews, bat maintenance tips, and batting drills from Bangladesh's premier cricket specialists.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {BLOG_ARTICLES.map((article) => (
            <div
              key={article.slug}
              className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative w-full aspect-[16/9] bg-zinc-100 overflow-hidden">
                <Image
                  src={article.imageSrc}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-zinc-900 group-hover:text-[#65a30d] transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-2 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 font-semibold">
                    By {article.author}
                  </span>
                  <Link
                    href="/category/shop-cricket"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#65a30d] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
