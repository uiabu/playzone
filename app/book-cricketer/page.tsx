"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  Search,
  Sparkles,
  Calendar,
  PhoneCall,
  Mail,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Users,
  Award,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  CRICKETERS_DATA,
  Cricketer,
  EVENT_TYPES,
} from "@/components/bookCricketer/cricketersData";
import CricketerCard from "@/components/bookCricketer/CricketerCard";
import CricketerProfileModal from "@/components/bookCricketer/CricketerProfileModal";
import CricketerBookingModal from "@/components/bookCricketer/CricketerBookingModal";

export default function BookCricketerPage() {
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

  // Filter logic
  const filteredCricketers = useMemo(() => {
    return CRICKETERS_DATA.filter((cricketer) => {
      // Tier filter
      if (selectedTier !== "All" && cricketer.tier !== selectedTier) {
        return false;
      }

      // Event suitability filter
      if (
        selectedEvent !== "All" &&
        !cricketer.suitableEvents.some((e) =>
          e.toLowerCase().includes(selectedEvent.toLowerCase())
        )
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const textToMatch = [
          cricketer.name,
          cricketer.bengaliName,
          cricketer.role,
          cricketer.tier,
          cricketer.shortBio,
          ...cricketer.specialties,
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

  return (
    <main className="min-h-screen bg-zinc-50 pb-20">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full bg-zinc-950 text-white overflow-hidden py-12 sm:py-16 md:py-20 border-b border-zinc-900">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#84cc16]/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-4"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[#84cc16] font-semibold">
              Book a Cricketer
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading & Pitch */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#84cc16] text-xs font-black tracking-wide uppercase">
                <Trophy className="w-4 h-4" />
                <span>PLAYZONE Official Cricket Concierge</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                PLAYZONE —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#84cc16] via-[#a3e635] to-amber-400">
                  Book a Cricketer
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-2xl leading-relaxed">
                বাংলাদেশী জাতীয় ক্রিকেটার ও লিজেন্ডদের বুকিং এবং অফিসিয়াল
                ইভেন্ট কোঅর্ডিনেশন প্ল্যাটফর্ম।
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                PLAYZONE হলো একটি নির্ভরযোগ্য বুকিং রিকোয়েস্ট ও কোঅর্ডিনেশন
                প্ল্যাটফর্ম। ক্রিকেটারদের ব্যস্ত আন্তর্জাতিক ও ঘরোয়া ম্যাচ
                শিডিউল থাকায় কোনো রিয়েল-টাইম ক্যালেন্ডার নয়—আপনি রিকোয়েস্ট
                পাঠাবেন, আমাদের টিম সরাসরি ক্রিকেটারের সাথে যোগাযোগ করে সময় ও
                সম্মানী নিশ্চিত করবে।
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-300 font-semibold">
                <span className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
                  কোনো অগ্রিম পেমেন্ট নেই (Zero Upfront)
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
                  <PhoneCall className="w-4 h-4 text-[#84cc16]" />
                  সরাসরি প্লেয়ার কোঅর্ডিনেশন
                </span>
                <span className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
                  <FileText className="w-4 h-4 text-[#84cc16]" />
                  অফিসিয়াল কোটেশন ও ইনভয়েস
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#cricketers-list"
                  className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#74d600] text-zinc-950 font-black text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse Cricketers (১ম ধাপ)</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsGeneralBookingOpen(true)}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-sm transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Submit Custom Request</span>
                </button>
              </div>
            </div>

            {/* Right Column: Top Star Avatars Preview Card */}
            <div className="lg:col-span-4 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-5 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Featured Cricket Icons
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#84cc16] bg-lime-950/60 px-2.5 py-0.5 rounded-full border border-lime-800">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {CRICKETERS_DATA.slice(0, 3).map((star) => (
                  <div
                    key={star.id}
                    onClick={() => setProfileModalCricketer(star)}
                    className="group/mini relative aspect-square rounded-2xl overflow-hidden bg-zinc-800 cursor-pointer border border-zinc-700 hover:border-[#84cc16] transition-all"
                  >
                    <Image
                      src={star.imageSrc}
                      alt={star.name}
                      fill
                      className="object-cover group-hover/mini:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <p className="text-[10px] font-black text-white truncate w-full leading-tight">
                        {star.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                কর্পোরেট গালা, টুর্নামেন্টের প্রধান অতিথি, ব্র্যান্ড ক্যাম্পেইন,
                কিংবা ক্রিকেট ক্লিনিকের জন্য সেরা আইকনদের বুক করুন।
              </p>

              <button
                type="button"
                onClick={() => setIsGeneralBookingOpen(true)}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request Any Bangladeshi Cricketer</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#84cc16]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. THE 4-STEP WORKFLOW SECTION ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#65a30d] bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
              The Playzone Booking Model
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-950 mt-2">
              বুকিং কীভাবে কাজ করে? (৪টি সহজ ধাপ)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              সরাসরি যোগাযোগ ও স্বচ্ছ প্রক্রিয়ায় আপনার পছন্দের ক্রিকেটারকে ইভেন্টে
              আমন্ত্রণ জানান।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="relative p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#84cc16] hover:bg-lime-50/30 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-zinc-950 font-black text-base flex items-center justify-center shadow-xs">
                    ১
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Step 1
                  </span>
                </div>
                <h3 className="text-base font-black text-zinc-900 leading-tight">
                  Browse Cricketers
                </h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  ক্রিকেটারদের profile, ছবি, পরিচিতি, ক্যারিয়ার স্ট্যাটস ও
                  অর্জিত সাফল্য দেখুন।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>প্রোফাইল এক্সপ্লোর করুন</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#84cc16] hover:bg-lime-50/30 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-[#84cc16] font-black text-base flex items-center justify-center shadow-xs">
                    ২
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Step 2
                  </span>
                </div>
                <h3 className="text-base font-black text-zinc-900 leading-tight">
                  Submit Booking Request
                </h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  Event type, তারিখ, স্থান, আনুমানিক বাজেট ও যোগাযোগের তথ্য দিয়ে
                  রিকোয়েস্ট সাবমিট করুন।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>কোনো ফি ছাড়াই রিকোয়েস্ট</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#84cc16] hover:bg-lime-50/30 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-base flex items-center justify-center shadow-xs">
                    ৩
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Step 3
                  </span>
                </div>
                <h3 className="text-base font-black text-zinc-900 leading-tight">
                  PLAYZONE Confirms
                </h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  আমাদের টিম ক্রিকেটারের সঙ্গে meeting, email বা ফোনে কথা বলে fee
                  ও availability নিশ্চিত করবে।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>সরাসরি প্লেয়ার ভেরিফিকেশন</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#84cc16] hover:bg-lime-50/30 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                    ৪
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Step 4
                  </span>
                </div>
                <h3 className="text-base font-black text-zinc-900 leading-tight">
                  Quote & Payment
                </h3>
                <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                  Customer-কে final quotation পাঠাবে। সম্মতিতে payment সম্পন্ন
                  করলে booking confirmed হবে।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 text-[11px] font-bold text-zinc-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>চূড়ান্ত কনফার্মেশন</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FILTER & CRICKETER DIRECTORY ================= */}
      <section id="cricketers-list" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Browse Available Cricketers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              জাতীয় লিজেন্ড, আন্তর্জাতিক তারকা এবং ঘরোয়া পারফর্মারদের তালিকা
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsGeneralBookingOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-[#84cc16] text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Request Other Cricketer</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by cricketer name, role, stats..."
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-zinc-500 focus:bg-white transition-all font-medium"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Event Filter Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 outline-none focus:border-zinc-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Event Types (সকল ইভেন্ট)</option>
                {EVENT_TYPES.map((evt, idx) => (
                  <option key={idx} value={evt}>
                    {evt}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-2 text-xs">
              <span className="text-zinc-500">
                Showing <strong>{filteredCricketers.length}</strong> of{" "}
                {CRICKETERS_DATA.length}
              </span>
              {(selectedTier !== "All" ||
                selectedEvent !== "All" ||
                searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier("All");
                    setSelectedEvent("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Tier Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs font-bold">
            <span className="text-zinc-400 uppercase text-[10px] tracking-wider shrink-0 mr-1">
              Category:
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
                    ? "bg-zinc-950 text-[#84cc16] shadow-xs"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                }`}
              >
                {tier}
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
          <div className="mt-10 py-16 px-4 text-center bg-white rounded-3xl border border-zinc-200 shadow-2xs">
            <Users className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900">
              No cricketers match your filter criteria.
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              ফিল্টার পরিবর্তন করুন বা যেকোনো ক্রিকেটারের জন্য কাস্টম রিকোয়েস্ট
              সাবমিট করুন।
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTier("All");
                  setSelectedEvent("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-900 text-xs font-bold transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsGeneralBookingOpen(true)}
                className="px-4 py-2 rounded-xl bg-zinc-950 text-[#84cc16] text-xs font-bold transition-colors cursor-pointer"
              >
                Submit Custom Request
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ================= 4. CUSTOM CRICKETER REQUEST BANNER ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-10 md:p-12 overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl relative z-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-[#84cc16] text-black text-[11px] font-black uppercase tracking-wider">
              Custom Coordination
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              তালিকায় পছন্দের ক্রিকেটার খুঁজে পাননি?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              যেকোনো বাংলাদেশী জাতীয় ক্রিকেটার, ঘরোয়া তারকা, কোচ বা ধারাভাষ্যকারের
              নাম জানিয়ে সরাসরি রিকোয়েস্ট পাঠান। আমাদের টিম ক্রিকেটারের অফিসিয়াল
              ম্যানেজমেন্টের সাথে আলোচনা করে সমাধান জানাবে।
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
                ২৪ ঘণ্টার মধ্যে রেসপন্স
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
                সম্পূর্ণ অফিশিয়াল প্রসেস
              </span>
            </div>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setIsGeneralBookingOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#84cc16] hover:bg-[#74d600] text-zinc-950 font-black text-sm transition-all duration-200 shadow-xl active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Custom Request (কাস্টম রিকোয়েস্ট)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= 5. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#65a30d]">
              Clarification & FAQs
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 mt-1">
              সাধারণ জিজ্ঞাসা (Frequently Asked Questions)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-zinc-700">
            <div className="p-4.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <h4 className="font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>ক্রিকেটারদের প্রাপ্যতা (Availability) আগে কেন দেখানো হয় না?</span>
              </h4>
              <p className="text-zinc-600 leading-relaxed text-xs">
                পেশাদার ক্রিকেটারদের আন্তর্জাতিক ট্যুর, বিসিবি ক্যাম্প, এবং লিগ
                ম্যাচের কারণে শিডিউল সর্বদা পরিবর্তনশীল। এজন্য ফিক্সড ক্যালেন্ডার না
                দেখিয়ে প্লেজোন আপনার ইভেন্টের তারিখ অনুযায়ী সরাসরি ক্রিকেটারের সঙ্গে
                কথা বলে কনফার্ম করে।
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <h4 className="font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>বুকিং রিকোয়েস্ট সাবমিট করার পর কী ঘটে?</span>
              </h4>
              <p className="text-zinc-600 leading-relaxed text-xs">
                প্লেজোন টিম ২৪-৪৮ ঘণ্টার মধ্যে ক্রিকেটারের সাথে সভা, ইমেইল বা ফোনে
                যোগাযোগ করে সম্মানী ও শিডিউল নিশ্চিত করে। এরপর আপনাকে চূড়ান্ত
                কোটেশন পাঠানো হয়। আপনি সম্মত হলে পেমেন্ট প্রসেস সম্পন্ন করে বুকিং চূড়ান্ত
                করা হয়।
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <h4 className="font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>কী ধরণের ইভেন্টে ক্রিকেটারদের আমন্ত্রণ জানানো যায়?</span>
              </h4>
              <p className="text-zinc-600 leading-relaxed text-xs">
                কর্পোরেট বার্ষিক গালা, টুর্নামেন্ট উদ্বোধন ও ট্রফি উন্মোচন, বাণিজ্যিক বিজ্ঞাপন
                ও ব্র্যান্ড অ্যাম্বাসেডর, স্কুল/কলেজ ক্রীড়া দিবসের প্রধান অতিথি,
                এবং ক্রিকেট একাডেমি মাস্টারক্লাস।
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <h4 className="font-bold text-zinc-950 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>কোনো অগ্রিম ফি বা গোপন খরচ আছে কি?</span>
              </h4>
              <p className="text-zinc-600 leading-relaxed text-xs">
                না! বুকিং রিকোয়েস্ট সাবমিট করার জন্য কোনো ফি নেওয়া হয় না। আপনি
                কোটেশন পছন্দ করে সম্মতি দেওয়ার পরই কেবল অফিসিয়াল চুক্তি ও পেমেন্ট
                গ্রহণ করা হয়।
              </p>
            </div>
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

