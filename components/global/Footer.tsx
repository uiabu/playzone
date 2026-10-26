"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sun, ChevronDown, CheckCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Dark Mode");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3500);
    }
  };

  return (
    <footer className="relative w-full bg-[#000000] text-zinc-300 overflow-hidden border-t border-zinc-900 select-none">
      {/* ================= BACKGROUND CRICKET GRAPHICS & GLOWS ================= */}
      {/* Left side ambient glow & cricket stumps silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 top-0 w-80 md:w-96 overflow-hidden"
      >
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle decorative cricket stumps watermark */}
        <svg
          viewBox="0 0 200 300"
          className="absolute -left-6 bottom-4 h-64 w-auto opacity-20 text-[#a3e635]"
          fill="none"
          stroke="currentColor"
        >
          {/* Stumps */}
          <rect x="50" y="70" width="8" height="190" rx="3" fill="currentColor" opacity="0.4" />
          <rect x="75" y="70" width="8" height="190" rx="3" fill="currentColor" opacity="0.5" />
          <rect x="100" y="70" width="8" height="190" rx="3" fill="currentColor" opacity="0.4" />
          {/* Bails */}
          <rect x="46" y="63" width="35" height="5" rx="2" fill="currentColor" opacity="0.7" />
          <rect x="73" y="63" width="37" height="5" rx="2" fill="currentColor" opacity="0.7" />
          {/* Ground & brush splatters */}
          <path
            d="M10 260 Q 60 250, 110 260 T 190 255"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="4 6"
            opacity="0.3"
          />
          <path
            d="M5 270 Q 70 255, 140 272"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
          {/* Splash particles */}
          <circle cx="35" cy="180" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="42" cy="120" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="120" cy="140" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="130" cy="200" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Right side ambient glow & cricket ball silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 top-0 w-80 md:w-96 overflow-hidden"
      >
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#a3e635]/8 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle decorative cricket ball watermark */}
        <svg
          viewBox="0 0 240 240"
          className="absolute -right-8 bottom-6 h-60 w-auto opacity-20 text-[#a3e635]"
          fill="none"
        >
          {/* Ball outline */}
          <circle cx="120" cy="120" r="90" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
          <circle cx="120" cy="120" r="87" fill="#0c0d10" opacity="0.5" />
          {/* Stitched Seam */}
          <path
            d="M60 70 C 95 105, 145 135, 180 170"
            stroke="currentColor"
            strokeWidth="3.5"
            opacity="0.6"
          />
          {/* Stitches */}
          <path
            d="M65 67 L 72 74 M 78 79 L 85 86 M 92 92 L 99 99 M 106 105 L 113 112 M 120 118 L 127 125 M 134 131 L 141 138 M 148 144 L 155 151 M 162 157 L 169 164 M 175 169 L 182 176"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Particles */}
          <circle cx="45" cy="100" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="80" cy="40" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="195" cy="110" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="160" cy="210" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* ================= MAIN FOOTER CONTENT ================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* 1. BRAND COLUMN */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3">
            {/* Logo: /images/playzone-logo-transparent-white.png */}
            <Link href="/" className="inline-block transition-opacity hover:opacity-90 py-0.5">
              <Image
                src="/images/playzone-logo-transparent-white.png"
                alt="Playzone"
                width={190}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>

            {/* Brand Bio */}
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs font-normal">
              Gear up for every innings. New and pre-owned cricket equipment for every player in Bangladesh.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {/* Facebook Page */}
              <a
                href="https://www.facebook.com/playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                title="Facebook Page (@playzone.cricket)"
                className="w-9 h-9 rounded-full bg-[#111113] border border-zinc-800 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                </svg>
              </a>

              {/* Facebook Community Group */}
              <a
                href="https://www.facebook.com/groups/playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Group"
                title="Join Facebook Cricket Group"
                className="w-9 h-9 rounded-full bg-[#111113] border border-zinc-800 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram (@playzone.cricket)"
                className="w-9 h-9 rounded-full bg-[#111113] border border-zinc-800 hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok (@playzone.cricket)"
                className="w-9 h-9 rounded-full bg-[#111113] border border-zinc-800 hover:border-white hover:bg-black hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.17 1.17 2.12 2.34 2.37.74.17 1.54.12 2.25-.17.8-.32 1.43-.97 1.73-1.76.22-.54.3-1.12.29-1.7V.02z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@playzone.cricket"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube (@playzone.cricket)"
                className="w-9 h-9 rounded-full bg-[#111113] border border-zinc-800 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white text-zinc-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2. COMPANY COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">COMPANY</h4>
            <div className="w-6 h-0.5 bg-[#a3e635] mt-1.5 mb-4 rounded-full" />
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors block py-0.5">
                  About PLAYZONE
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors block py-0.5">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors block py-0.5">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors block py-0.5">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/pre-owned" className="hover:text-white transition-colors block py-0.5">
                  Pre-Owned Gear
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors block py-0.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. CUSTOMER SERVICE COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">CUSTOMER SERVICE</h4>
            <div className="w-6 h-0.5 bg-[#a3e635] mt-1.5 mb-4 rounded-full" />
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors block py-0.5">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors block py-0.5">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors block py-0.5">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors block py-0.5">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors block py-0.5">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors block py-0.5">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. SHOP CATEGORIES COLUMN */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">SHOP CATEGORIES</h4>
            <div className="w-6 h-0.5 bg-[#a3e635] mt-1.5 mb-4 rounded-full" />
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/category/cricket-bats" className="hover:text-white transition-colors block py-0.5">
                  Cricket Bats
                </Link>
              </li>
              <li>
                <Link href="/category/batting-gear" className="hover:text-white transition-colors block py-0.5">
                  Batting Gear
                </Link>
              </li>
              <li>
                <Link href="/category/bowling-gear" className="hover:text-white transition-colors block py-0.5">
                  Bowling Gear
                </Link>
              </li>
              <li>
                <Link href="/category/wicketkeeping" className="hover:text-white transition-colors block py-0.5">
                  Wicketkeeping
                </Link>
              </li>
              <li>
                <Link href="/category/cricket-shoes" className="hover:text-white transition-colors block py-0.5">
                  Cricket Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-white transition-colors block py-0.5">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors block py-0.5">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/hire-experts" className="text-[#a3e635] hover:text-white transition-colors block py-0.5 font-semibold">
                  Hire Cricket Experts
                </Link>
              </li>
              <li>
                <Link href="/cricket-academies" className="text-[#a3e635] hover:text-white transition-colors block py-0.5 font-semibold">
                  Cricket Academies
                </Link>
              </li>
              <li>
                <Link href="/foundation" className="text-[#a3e635] hover:text-white transition-colors block py-0.5 font-semibold">
                  PLAYZONE Foundation
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. NEWSLETTER COLUMN */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">NEWSLETTER</h4>
            <div className="w-6 h-0.5 bg-[#a3e635] mt-1.5 mb-4 rounded-full" />
            <p className="text-xs sm:text-sm text-zinc-400 mb-3.5 leading-relaxed">
              Get exclusive deals, new arrivals and cricket updates.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
              <div className="relative flex items-center w-full rounded-full bg-[#121215] border border-zinc-800 focus-within:border-zinc-600 transition-colors pl-4 pr-1.5 py-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 outline-none pr-2 font-normal"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-8 h-8 rounded-full bg-[#a3e635] hover:bg-[#84cc16] active:scale-95 text-black flex items-center justify-center shrink-0 transition-transform cursor-pointer font-bold shadow-[0_0_12px_rgba(163,230,53,0.35)]"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {subscribed && (
                <div className="absolute left-0 -bottom-6 flex items-center gap-1.5 text-xs text-[#a3e635] animate-fade-in">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>

            {/* Checkbox */}
            <div
              onClick={() => setConsent(!consent)}
              className="flex items-start gap-2.5 mt-4 cursor-pointer select-none group max-w-sm"
            >
              <div
                className={`w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors mt-0.5 ${
                  consent ? "bg-[#a3e635] text-black" : "bg-zinc-800 border border-zinc-700"
                }`}
              >
                {consent && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-[11px] sm:text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors leading-snug">
                Yes, I&apos;d like to receive updates and offers from PLAYZONE.
              </span>
            </div>

            {/* Theme Selector Pill */}
            <div className="mt-5 relative inline-block">
              <button
                type="button"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121215] border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium">Theme</span>
                </div>
                <span className="text-zinc-600">|</span>
                <div className="flex items-center gap-1 text-zinc-200">
                  <span>{currentTheme}</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
                </div>
              </button>

              {themeMenuOpen && (
                <div className="absolute left-0 bottom-full mb-2 w-36 rounded-xl bg-[#18181b] border border-zinc-700 shadow-xl py-1 z-30">
                  {["Dark Mode", "Light Mode", "System Default"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setCurrentTheme(t);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        currentTheme === t
                          ? "text-[#a3e635] font-semibold bg-zinc-800/60"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <span>{t}</span>
                      {currentTheme === t && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR (COPYRIGHT, PAYMENT, LEGAL) ================= */}
        <div className="border-t border-zinc-900 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-zinc-400">
          {/* Left: Copyright */}
          <div className="font-normal text-zinc-400 tracking-wide text-center md:text-left">
            © 2026 PLAYZONE. All rights reserved.
          </div>

          {/* Right Group: Payment Badges + Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            {/* Accepted Payment Methods */}
            <div className="flex items-center">
              <Image
                src="/images/footer/payment_methods.png"
                alt="Accepted Payments: bKash, Nagad, Visa, Mastercard, American Express"
                width={220}
                height={36}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>

            <span className="text-zinc-700 hidden sm:inline select-none">|</span>

            {/* Legal Links */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-zinc-700 select-none">|</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-zinc-700 select-none">|</span>
              <Link href="/returns-policy" className="hover:text-white transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
