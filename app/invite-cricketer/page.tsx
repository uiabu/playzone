"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Trophy,
  ShieldCheck,
  Search,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Users,
  FileText,
  CalendarCheck,
  X,
} from "lucide-react";
import {
  CRICKETERS_DATA,
  Cricketer,
  EVENT_TYPES,
} from "@/components/inviteCricketer/cricketersData";
import CricketerCard from "@/components/inviteCricketer/CricketerCard";
import CricketerProfileModal from "@/components/inviteCricketer/CricketerProfileModal";
import CricketerBookingModal from "@/components/inviteCricketer/CricketerBookingModal";
import { useLanguage } from "@/context/LanguageContext";

const FAQS = [
  {
    qEn: "Why isn't cricketer calendar availability shown beforehand?",
    qBn: "ক্রিকেটারদের শিডিউল আগে কেন ক্যালেন্ডারে দেখানো হয় না?",
    aEn: "National cricketers frequently adjust schedules due to international tours, BCB training camps, and franchise leagues. Rather than maintaining a rigid calendar, PLAYZONE verifies availability directly with the player for your specific event date.",
    aBn: "পেশাদার ক্রিকেটারদের আন্তর্জাতিক ট্যুর, বিসিবি ক্যাম্প এবং লিগ ম্যাচের কারণে শিডিউল সর্বদা পরিবর্তনশীল। এজন্য ফিক্সড ক্যালেন্ডার না রেখে প্লেজোন আপনার ইভেন্টের তারিখ অনুযায়ী সরাসরি ক্রিকেটারের সঙ্গে কথা বলে নিশ্চিত করে।",
  },
  {
    qEn: "What happens after submitting an invitation request?",
    qBn: "আমন্ত্রণ রিকোয়েস্ট সাবমিট করার পর কী ঘটে?",
    aEn: "Within 24–48 hours, the PLAYZONE concierge coordinates directly with the cricketer's management to confirm schedule and honorarium. We provide an official quotation for your review before any advance payment is made.",
    aBn: "২৪-৪৮ ঘণ্টার মধ্যে প্লেজোন টিম ক্রিকেটারের ম্যানেজমেন্টের সঙ্গে কথা বলে সময় ও সম্মানী নিশ্চিত করে। এরপর আপনাকে একটি অফিসিয়াল কোটেশন পাঠানো হয়। আপনি সম্মত হলে পেমেন্ট প্রসেস সম্পন্ন করে আমন্ত্রণ চূড়ান্ত করা হয়।",
  },
  {
    qEn: "What event types can cricketers be invited for?",
    qBn: "কী ধরণের ইভেন্টে ক্রিকেটারদের আমন্ত্রণ জানানো যায়?",
    aEn: "Corporate galas, tournament inaugurations & trophy unveils, commercial shoots, school/college sports days, youth coaching clinics, and motivational keynote sessions.",
    aBn: "কর্পোরেট বার্ষিক অনুষ্ঠান, টুর্নামেন্ট উদ্বোধন ও ট্রফি উন্মোচন, বাণিজ্যিক বিজ্ঞাপন ও ফটোশুট, স্কুল/কলেজ ক্রীড়া দিবসের প্রধান অতিথি, এবং ক্রিকেট ক্লিনিক বা অনুপ্রেরণামূলক সেশন।",
  },
  {
    qEn: "How are payments and confirmation handled?",
    qBn: "পেমেন্ট ও বুকিং কনফার্মেশন কীভাবে সম্পন্ন হয়?",
    aEn: "Submitting an invitation request is 100% free with zero upfront charges. Once the cricketer confirms their availability and you approve the official quote, an advance payment officially reserves the date.",
    aBn: "আমন্ত্রণ রিকোয়েস্ট সাবমিট করতে কোনো ফি লাগে না। ক্রিকেটার সময় ও শিডিউল কনফার্ম করলে এবং আপনি কোটেশন অনুমোদন করলে অ্যাডভান্স পেমেন্টের মাধ্যমে বুকিং চূড়ান্ত হয়।",
  },
];

function InviteCricketerContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // Filters
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [profileModalCricketer, setProfileModalCricketer] =
    useState<Cricketer | null>(null);
  const [bookingModalCricketer, setBookingModalCricketer] =
    useState<Cricketer | null>(null);
  const [isGeneralBookingOpen, setIsGeneralBookingOpen] =
    useState<boolean>(false);

  // FAQ Accordion state (first FAQ open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Auto-open modal if ?cricketer= or ?id= param is present in URL
  useEffect(() => {
    const q = searchParams.get("cricketer") || searchParams.get("id");
    if (!q) return;
    const normalized = q.trim().toLowerCase();
    const found = CRICKETERS_DATA.find(
      (c) =>
        c.id?.toLowerCase() === normalized ||
        c.name?.toLowerCase() === normalized ||
        c.bengaliName?.toLowerCase() === normalized
    );
    if (found) {
      setProfileModalCricketer(found);
    }
  }, [searchParams]);

  // Filter logic
  const filteredCricketers = useMemo(() => {
    return CRICKETERS_DATA.filter((cricketer) => {
      // Tier filter
      if (selectedTier !== "All" && cricketer.tier !== selectedTier) {
        return false;
      }

      // Event type filter
      if (
        selectedEvent !== "All" &&
        !cricketer.suitableEvents.includes(selectedEvent)
      ) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const textToMatch = [
          cricketer.name,
          cricketer.bengaliName,
          cricketer.role,
          cricketer.tier,
          ...(cricketer.specialties || []),
          ...(cricketer.suitableEvents || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!textToMatch.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [selectedTier, selectedEvent, searchQuery]);

  const hasActiveFilters =
    selectedTier !== "All" || selectedEvent !== "All" || searchQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedTier("All");
    setSelectedEvent("All");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen bg-zinc-50 pb-20 select-none" data-no-translate="true">
      {/* ================= 1. CLEAN HIGH-IMPACT HERO ================= */}
      <section className="relative w-full bg-zinc-950 text-white overflow-hidden py-10 sm:py-14 border-b border-zinc-900">
        {/* Subtle Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#74d600]/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-zinc-400 font-medium"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t("Home", "হোম")}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[#a3e635] font-semibold">
              {t("Invite a Cricketer", "ক্রিকেটার ইনভাইট")}
            </span>
          </nav>

          {/* Headline & Description */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#a3e635] text-xs font-black tracking-wide uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>{t("PLAYZONE Cricket Concierge", "প্লেজোন ক্রিকেট কনসিয়ার্জ")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t("Invite Bangladesh's", "আপনার ইভেন্টে আমন্ত্রণ জানান")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-emerald-400 to-[#74d600]">
                {t("Cricket Icons", "জাতীয় ক্রিকেটারদের")}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              {t(
                "Official coordination for national legends, international stars, and prominent performers. Submit a free request, and our concierge coordinates availability, schedule, and honorarium directly with the cricketer.",
                "জাতীয় লিজেন্ড, আন্তর্জাতিক তারকা এবং ঘরোয়া পারফর্মারদের ইভেন্টে আমন্ত্রণ জানানোর অফিসিয়াল প্ল্যাটফর্ম। কোনো অগ্রিম ফি ছাড়া রিকোয়েস্ট পাঠান—আমাদের টিম সরাসরি ক্রিকেটারের সাথে সময় ও সম্মানী নিশ্চিত করবে।"
              )}
            </p>
          </div>

          {/* Quick Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pt-2 text-xs text-zinc-300">
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium line-clamp-1">{t("Direct Coordination", "সরাসরি কোঅর্ডিনেশন")}</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium line-clamp-1">{t("100% Verified Players", "১০০% ভেরিফাইড প্লেয়ার")}</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-3.5 py-2 rounded-xl">
              <FileText className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium line-clamp-1">{t("Official Quotation", "অফিসিয়াল কোটেশন")}</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800/80 px-3.5 py-2 rounded-xl">
              <CalendarCheck className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium line-clamp-1">{t("Pay After Date Fixed", "শিডিউল ফিক্সের পর পেমেন্ট")}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#cricketers-catalog"
              className="px-5 py-3 rounded-xl bg-[#74d600] hover:bg-[#65c200] text-black font-black text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{t("Browse Available Cricketers ↓", "ক্রিকেটারদের তালিকা দেখুন ↓")}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsGeneralBookingOpen(true)}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t("Request Any Other Player", "অন্য যেকোনো ক্রিকেটার রিকোয়েস্ট")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. STREAMLINED 4-STEP HOW IT WORKS ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-zinc-200/80">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#549900]">
                {t("Transparent Process", "স্বচ্ছ ও নির্ভরযোগ্য প্রক্রিয়া")}
              </span>
              <h2 className="text-base sm:text-lg font-black text-zinc-950">
                {t("How to Invite a Cricketer in 4 Steps", "কীভাবে আমন্ত্রণ জানাবেন? ৪টি সহজ ধাপ")}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsGeneralBookingOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#549900] hover:underline cursor-pointer"
            >
              <span>{t("Submit Direct Request →", "সরাসরি রিকোয়েস্ট পাঠান →")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-zinc-950 text-[#a3e635] text-xs font-black flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h3 className="text-xs font-bold text-zinc-900">
                  {t("Select Cricketer", "ক্রিকেটার বাছাই")}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  {t(
                    "Browse verified icons, career stats, and suitable event categories.",
                    "তালিকা থেকে পছন্দের ক্রিকেটার ও তাদের উপযুক্ত ইভেন্ট দেখুন।"
                  )}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-zinc-950 text-[#a3e635] text-xs font-black flex items-center justify-center shrink-0">
                02
              </span>
              <div>
                <h3 className="text-xs font-bold text-zinc-900">
                  {t("Free Request", "বিনামূল্যে রিকোয়েস্ট")}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  {t(
                    "Provide event date, location, purpose, and your contact info with zero fees.",
                    "ইভেন্টের তারিখ, স্থান ও বাজেট দিয়ে বিনামূল্যে রিকোয়েস্ট পাঠান।"
                  )}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-zinc-950 text-[#a3e635] text-xs font-black flex items-center justify-center shrink-0">
                03
              </span>
              <div>
                <h3 className="text-xs font-bold text-zinc-900">
                  {t("We Coordinate", "প্লেজোন কোঅর্ডিনেশন")}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  {t(
                    "Our team directly contacts the player to confirm schedule and honorarium.",
                    "আমাদের টিম সরাসরি ক্রিকেটারের সাথে কথা বলে শিডিউল নিশ্চিত করে।"
                  )}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#74d600] text-black text-xs font-black flex items-center justify-center shrink-0">
                04
              </span>
              <div>
                <h3 className="text-xs font-bold text-zinc-900">
                  {t("Confirmed Booking", "চূড়ান্ত বুকিং")}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                  {t(
                    "Review official quote, mutually fix time, and confirm with advance payment.",
                    "অফিসিয়াল কোটেশন রিভিউ করে অ্যাডভান্স পেমেন্টে ডেট কনফার্ম করুন।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FILTER & CRICKETER DIRECTORY ================= */}
      <section id="cricketers-catalog" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              {t("Available Cricketers & Legends", "উপলব্ধ ক্রিকেটার ও লিজেন্ড")} ({filteredCricketers.length})
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t(
                "Click on any cricketer to view career stats, biography, and send an invitation request.",
                "পরিসংখ্যান ও বিস্তারিত দেখতে এবং আমন্ত্রণ রিকোয়েস্ট পাঠাতে যেকোনো ক্রিকেটারের কার্ডে ক্লিক করুন।"
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGeneralBookingOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-[#a3e635] text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("Request Custom Cricketer", "অন্য খেলোয়াড় রিকোয়েস্ট")}</span>
          </button>
        </div>

        {/* Clean Filter Controls Bar */}
        <div className="mt-5 bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  "Search by cricketer name, role, stats...",
                  "ক্রিকেটারের নাম, ভূমিকা বা স্ট্যাটস খুঁজুন..."
                )}
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-8 py-2.5 outline-hidden focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-[#74d600] transition-all font-medium placeholder:text-zinc-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Event Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 outline-hidden focus:bg-white focus:border-zinc-400 focus:ring-2 focus:ring-[#74d600] transition-all cursor-pointer"
              >
                <option value="All">{t("All Event Types", "সকল ইভেন্ট ক্যাটাগরি")}</option>
                {EVENT_TYPES.map((evt, idx) => (
                  <option key={idx} value={evt}>
                    {t(evt)}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Status & Reset */}
            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 text-xs">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  {t("Reset Filters", "রিসেট করুন")}
                </button>
              )}
            </div>
          </div>

          {/* Tier Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs font-bold">
            <span className="text-zinc-400 uppercase text-[10px] tracking-wider shrink-0 mr-1">
              {t("Category", "ক্যাটাগরি")}:
            </span>
            {[
              "All",
              "National Legend",
              "Active International",
              "Domestic / BPL Icon",
              "Rising Talent",
            ].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedTier === tier
                    ? "bg-zinc-950 text-[#a3e635] shadow-2xs font-extrabold"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                }`}
              >
                {t(tier)}
              </button>
            ))}
          </div>
        </div>

        {/* Cricketers Grid */}
        {filteredCricketers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {filteredCricketers.map((cricketer) => (
              <CricketerCard
                key={cricketer.id}
                cricketer={cricketer}
                onViewProfile={(c) => setProfileModalCricketer(c)}
                onRequestBooking={(c) => setBookingModalCricketer(c)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 py-14 px-4 text-center bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-3">
            <Users className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900">
              {t(
                "No cricketers match your filter criteria.",
                "আপনার ফিল্টারের সাথে কোনো ক্রিকেটার মেলেনি।"
              )}
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {t(
                "Try clearing your search or submit a custom request for any player.",
                "ফিল্টার রিসেট করুন বা পছন্দের ক্রিকেটারের জন্য কাস্টম রিকোয়েস্ট পাঠান।"
              )}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold transition-colors cursor-pointer"
              >
                {t("Clear Filters", "ফিল্টার রিসেট")}
              </button>
              <button
                type="button"
                onClick={() => setIsGeneralBookingOpen(true)}
                className="px-4 py-2 rounded-xl bg-zinc-950 text-[#a3e635] text-xs font-bold transition-colors cursor-pointer"
              >
                {t("Submit Custom Request", "কাস্টম রিকোয়েস্ট পাঠান")}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ================= 4. CLEAN CUSTOM CRICKETER REQUEST BANNER ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#74d600] text-black text-[10px] font-black uppercase tracking-wider">
              {t("Custom Coordination", "কাস্টম কোঅর্ডিনেশন")}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {t(
                "Didn't find your desired player in the directory?",
                "তালিকায় পছন্দের খেলোয়াড় খুঁজে পাননি?"
              )}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {t(
                "We coordinate officially with all active national players, historic legends, coaches, and commentators across Bangladesh. Submit their name and event date for a direct response within 24 hours.",
                "যেকোনো বাংলাদেশী জাতীয় ক্রিকেটার, সাবেক লিজেন্ড, কোচ বা ধারাভাষ্যকারের জন্য রিকোয়েস্ট পাঠান। আমাদের টিম ২৪ ঘণ্টার মধ্যে তাদের ম্যানেজমেন্টের সাথে কথা বলে সমাধান জানাবে।"
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGeneralBookingOpen(true)}
            className="shrink-0 px-6 py-3 rounded-xl bg-[#74d600] hover:bg-[#65c200] text-black font-black text-xs sm:text-sm transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("Submit Custom Invitation Request", "কাস্টম আমন্ত্রণ রিকোয়েস্ট পাঠান")}</span>
          </button>
        </div>
      </section>

      {/* ================= 5. FREQUENTLY ASKED QUESTIONS (ACCORDION) ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-5">
          <div className="text-center max-w-md mx-auto space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#549900]">
              {t("Help & Clarification", "সহায়তা ও সাধারণ জিজ্ঞাসা")}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
              {t("Frequently Asked Questions", "সাধারণ জিজ্ঞাসা (FAQs)")}
            </h3>
          </div>

          <div className="divide-y divide-zinc-100 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3 sm:py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group"
                  >
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#549900] transition-colors flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#74d600] shrink-0" />
                      <span>{language === "bn" ? faq.qBn : faq.qEn}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="pt-2 pl-6 text-xs text-zinc-600 leading-relaxed animate-in fade-in duration-200">
                      {language === "bn" ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= MODALS ================= */}
      {/* 1. Cricketer Profile Modal */}
      <CricketerProfileModal
        cricketer={profileModalCricketer}
        isOpen={Boolean(profileModalCricketer)}
        onClose={() => setProfileModalCricketer(null)}
        onRequestBooking={(c) => {
          setProfileModalCricketer(null);
          setBookingModalCricketer(c);
        }}
      />

      {/* 2. Specific Cricketer Booking Modal */}
      <CricketerBookingModal
        cricketer={bookingModalCricketer}
        isOpen={Boolean(bookingModalCricketer)}
        onClose={() => setBookingModalCricketer(null)}
      />

      {/* 3. General / Custom Cricketer Booking Modal */}
      <CricketerBookingModal
        cricketer={null}
        isOpen={isGeneralBookingOpen}
        onClose={() => setIsGeneralBookingOpen(false)}
      />
    </main>
  );
}

export default function InviteCricketerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-[#74d600] animate-spin" />
            <p className="mt-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Loading Cricketer Directory...
            </p>
          </div>
        </div>
      }
    >
      <InviteCricketerContent />
    </Suspense>
  );
}
