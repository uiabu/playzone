"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  Send,
  Building2,
  User,
  Phone,
  Mail,
  DollarSign,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  Cricketer,
  CRICKETERS_DATA,
  EVENT_TYPES,
  BUDGET_RANGES,
} from "./cricketersData";
import { websiteApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

interface CricketerBookingModalProps {
  cricketer: Cricketer | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CricketerBookingModal({
  cricketer,
  isOpen,
  onClose,
}: CricketerBookingModalProps) {
  const { t, language } = useLanguage();
  const [selectedCricketerId, setSelectedCricketerId] = useState<string>("");
  const [customCricketerName, setCustomCricketerName] = useState<string>("");
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [customEventType, setCustomEventType] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [backupDate, setBackupDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("2-3 Hours");
  const [venueLocation, setVenueLocation] = useState<string>("");
  const [city, setCity] = useState<string>("Dhaka");
  const [budgetRange, setBudgetRange] = useState<string>(BUDGET_RANGES[2]);
  const [organizationName, setOrganizationName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState("");

  // Sync selected cricketer from props
  useEffect(() => {
    if (cricketer) {
      setSelectedCricketerId(cricketer.id);
      setCustomCricketerName("");
    } else {
      setSelectedCricketerId(CRICKETERS_DATA[0].id);
    }
  }, [cricketer, isOpen]);

  if (!isOpen) return null;

  const activeCricketer = CRICKETERS_DATA.find(
    (c) => c.id === selectedCricketerId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `CRIC-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestId(ref);

    const payload = {
      id: ref,
      cricketerId: selectedCricketerId || "custom",
      cricketerName:
        selectedCricketerId === "custom"
          ? customCricketerName
          : activeCricketer?.name || "Unspecified",
      eventType: eventType === "Other Custom Event" ? customEventType : eventType,
      preferredDate,
      backupDate,
      duration,
      venue: `${venueLocation}, ${city}`,
      budgetRange,
      organizationName,
      contactName,
      contactPhone,
      contactEmail,
      eventDescription,
      status: "Coordination in Progress",
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage for transparent persistence
    try {
      const existing = JSON.parse(
        localStorage.getItem("playzone_cricketer_bookings") || "[]"
      );
      existing.unshift(payload);
      localStorage.setItem(
        "playzone_cricketer_bookings",
        JSON.stringify(existing)
      );
    } catch {
      // Ignore localStorage issues
    }

    try {
      await websiteApi.bookCricketer({
        cricketerId: payload.cricketerId,
        cricketerName: payload.cricketerName,
        eventType: payload.eventType,
        preferredDate: payload.preferredDate,
        backupDate: payload.backupDate,
        duration: payload.duration,
        venue: payload.venue,
        budgetRange: payload.budgetRange,
        organizationName: payload.organizationName,
        contactName: payload.contactName,
        contactPhone: payload.contactPhone,
        contactEmail: payload.contactEmail,
        eventDescription: payload.eventDescription,
      });
    } catch (apiErr) {
      console.warn("Backend cricketer booking fallback:", apiErr);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#84cc16]" />
            <div>
              <h3 className="text-base font-black text-zinc-900 leading-tight">
                {t("Invite a Cricketer — Invitation Request", "ক্রিকেটার ইনভাইট করুন — আমন্ত্রণ রিকোয়েস্ট")}
              </h3>
              <p className="text-[11px] text-zinc-500">
                {t("PLAYZONE Coordination & Verification Platform", "প্লেজোন কোঅর্ডিনেশন ও ভেরিফিকেশন প্ল্যাটফর্ম")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* ================= SUCCESS STATE WITH 4-STEP REASSURANCE ================= */
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                {t("Step 2 Completed: Request Submitted", "ধাপ ২ সম্পন্ন: রিকোয়েস্ট জমা হয়েছে")}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-zinc-950">
                {t("Request Submitted Successfully!", "রিকোয়েস্ট সফলভাবে জমা হয়েছে!")}
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                {t("Invitation Reference ID:", "ইনভাইটেশন রেফারেন্স আইডি:")}{" "}
                <strong className="text-zinc-900 font-mono text-sm">
                  {requestId}
                </strong>
              </p>
            </div>

            {/* Request Summary Card */}
            <div className="bg-zinc-50 rounded-2xl p-4.5 border border-zinc-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                <span className="text-zinc-500 font-medium">
                  {t("Selected Cricketer:", "নির্বাচিত ক্রিকেটার:")}
                </span>
                <span className="font-bold text-zinc-950">
                  {selectedCricketerId === "custom"
                    ? customCricketerName
                    : language === "bn"
                    ? activeCricketer?.bengaliName || activeCricketer?.name
                    : activeCricketer?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-medium">
                  {t("Event Type:", "ইভেন্টের ধরণ:")}
                </span>
                <span className="font-semibold text-zinc-800">{t(eventType)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-medium">
                  {t("Preferred Date:", "পছন্দের তারিখ:")}
                </span>
                <span className="font-semibold text-zinc-800">
                  {preferredDate || t("To be discussed", "আলোচনা সাপেক্ষে")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-medium">
                  {t("Venue & City:", "ভেন্যু ও শহর:")}
                </span>
                <span className="font-semibold text-zinc-800">
                  {venueLocation ? `${venueLocation}, ` : ""}
                  {t(city)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-medium">
                  {t("Contact Phone:", "যোগাযোগের ফোন:")}
                </span>
                <span className="font-bold text-zinc-950">{contactPhone}</span>
              </div>
            </div>

            {/* 4-Step Next Actions Visualizer */}
            <div className="text-left bg-zinc-900 text-white rounded-2xl p-4.5 space-y-3">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#84cc16]">
                {t("Next Steps", "পরবর্তী ধাপসমূহ (Next Steps)")}
              </p>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#84cc16] text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {t("Step 3: PLAYZONE Confirms", "ধাপ ৩: প্লেজোন নিশ্চিতকরণ")}
                    </p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      {t(
                        "Our team communicates directly with the cricketer or management via calls or meetings to lock the schedule and honorarium.",
                        "আমাদের টিম সরাসরি ক্রিকেটার বা তার ম্যানেজমেন্টের সাথে meeting, email বা ফোনে কথা বলে শিডিউল ও সম্মানীর বিষয়টি নিশ্চিত করবে।"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {t("Step 4: Quote & Advance Payment", "ধাপ ৪: কোটেশন ও অ্যাডভান্স পেমেন্ট")}
                    </p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      {t(
                        "You receive a final quote. Once time is mutually fixed, advance payment confirms your invitation officially.",
                        "আপনাকে ফাইনাল কোটেশন পাঠানো হবে। উভয় পক্ষের সুবিধাজনক টাইম ফিক্স করার পর অ্যাডভান্স পেমেন্ট সম্পন্ন হলে আমন্ত্রণ চূড়ান্ত হবে।"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-black text-[#84cc16] font-black text-sm transition-all shadow-md cursor-pointer"
            >
              {t("Done / OK", "ঠিক আছে / সম্পন্ন")}
            </button>
          </div>
        ) : (
          /* ================= BOOKING REQUEST FORM ================= */
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 overflow-y-auto space-y-5"
          >
            {/* Step Progress Tracker Pill */}
            <div className="p-3 rounded-2xl bg-lime-50/80 border border-lime-200 flex items-center gap-2 text-xs text-lime-900">
              <Sparkles className="w-4 h-4 text-lime-700 shrink-0" />
              <p className="leading-relaxed">
                <strong>{t("Zero Request Submission Fee!", "রিকোয়েস্ট সাবমিটে ফি নেই!")}</strong>{" "}
                {t(
                  "Our team checks cricketer availability, fixes mutually convenient timing, and provides a quotation. Advance payment confirms your invitation once schedule is locked.",
                  "আমাদের টিম ক্রিকেটারের প্রাপ্যতা ও সুবিধাজনক টাইম ফিক্স করে কোটেশন পাঠাবে। এরপর অ্যাডভান্স পেমেন্ট সম্পন্ন করে ইনভাইটেশন নিশ্চিত করতে হবে।"
                )}
              </p>
            </div>

            {/* 1. Cricketer Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                {t("1. Which cricketer would you like to invite? *", "১. কোন ক্রিকেটারকে আমন্ত্রণ জানাতে চান? *")}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={selectedCricketerId}
                  onChange={(e) => setSelectedCricketerId(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
                >
                  {CRICKETERS_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === "bn" ? c.bengaliName : c.name} ({t(c.role.split("&")[0].trim())})
                    </option>
                  ))}
                  <option value="custom">
                    {t("Other Cricketer (Enter Name)", "অন্য ক্রিকেটার (নাম লিখুন)")}
                  </option>
                </select>

                {selectedCricketerId === "custom" && (
                  <input
                    type="text"
                    required
                    value={customCricketerName}
                    onChange={(e) => setCustomCricketerName(e.target.value)}
                    placeholder={t("Enter cricketer name...", "ক্রিকেটারের নাম লিখুন...")}
                    className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  />
                )}
              </div>

              {activeCricketer && selectedCricketerId !== "custom" && (
                <div className="mt-2.5 flex items-center gap-3 p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-zinc-200">
                    <Image
                      src={activeCricketer.imageSrc}
                      alt={activeCricketer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">
                      {language === "bn" ? activeCricketer.bengaliName : activeCricketer.name}
                      <span className="text-zinc-500 font-normal ml-1">
                        ({language === "bn" ? activeCricketer.name : activeCricketer.bengaliName})
                      </span>
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {t(activeCricketer.role)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Event Type & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  {t("2. Event Type *", "২. ইভেন্টের ধরণ (Event Type) *")}
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
                >
                  {EVENT_TYPES.map((type, idx) => (
                    <option key={idx} value={type}>
                      {t(type)}
                    </option>
                  ))}
                </select>
                {eventType === "Other Custom Event" && (
                  <input
                    type="text"
                    required
                    value={customEventType}
                    onChange={(e) => setCustomEventType(e.target.value)}
                    placeholder={t("Specify event type...", "ইভেন্টের ধরণ নির্দিষ্ট করুন...")}
                    className="mt-2 w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  {t("Duration", "ইভেন্টের ব্যাপ্তি (Duration)")}
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
                >
                  <option value="1-2 Hours (Brief Appearance)">
                    {t("1-2 Hours (Brief Appearance / Trophy Handover)", "১-২ ঘণ্টা (সংক্ষিপ্ত উপস্থিতি / ট্রফি প্রদান)")}
                  </option>
                  <option value="Half Day (3-4 Hours)">
                    {t("Half Day (3-4 Hours / Masterclass & Session)", "অর্ধ দিন (৩-৪ ঘণ্টা / মাস্টারক্লাস ও সেশন)")}
                  </option>
                  <option value="Full Day Event">
                    {t("Full Day Event (Tournament & Gala)", "পূর্ণ দিন (টুর্নামেন্ট ও গালা)")}
                  </option>
                  <option value="Multiple Days / Campaign">
                    {t("Multiple Days / Commercial Campaign", "একাধিক দিন (বাণিজ্যিক ক্যাম্পেইন / শুটিং)")}
                  </option>
                </select>
              </div>
            </div>

            {/* 3. Dates: Preferred and Backup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t("Preferred Date *", "ইভেন্টের তারিখ (Preferred Date) *")}</span>
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{t("Backup Date (Optional)", "বিকল্প তারিখ (Backup Date) - ঐচ্ছিক")}</span>
                </label>
                <input
                  type="date"
                  value={backupDate}
                  onChange={(e) => setBackupDate(e.target.value)}
                  className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>
            </div>

            {/* 4. Location & City */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t("Venue Location *", "ভেন্যু বা স্থানের নাম (Venue Location) *")}</span>
                </label>
                <input
                  type="text"
                  required
                  value={venueLocation}
                  onChange={(e) => setVenueLocation(e.target.value)}
                  placeholder={t(
                    "e.g. Sher-e-Bangla Stadium / Radisson Blu / Club Ground",
                    "যেমন: শের-ই-বাংলা স্টেডিয়াম / রেডিসন ব্লু / ক্লাব গ্রাউন্ড"
                  )}
                  className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  {t("City / District", "শহর / জেলা (City)")}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
                >
                  <option value="Dhaka">{t("Dhaka", "ঢাকা (Dhaka)")}</option>
                  <option value="Chittagong">{t("Chittagong", "চট্টগ্রাম (Chittagong)")}</option>
                  <option value="Sylhet">{t("Sylhet", "সিলেট (Sylhet)")}</option>
                  <option value="Rajshahi">{t("Rajshahi", "রাজশাহী (Rajshahi)")}</option>
                  <option value="Khulna">{t("Khulna", "খুলনা (Khulna)")}</option>
                  <option value="Barisal">{t("Barisal", "বরিশাল (Barisal)")}</option>
                  <option value="Rangpur">{t("Rangpur", "রংপুর (Rangpur)")}</option>
                  <option value="Mymensingh">{t("Mymensingh", "ময়মনসিংহ (Mymensingh)")}</option>
                  <option value="Other District">{t("Other District", "অন্যান্য জেলা (Other)")}</option>
                </select>
              </div>
            </div>

            {/* 5. Budget Range & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t("Estimated Budget (BDT) *", "আনুমানিক বাজেট (Estimated Budget) *")}</span>
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full text-xs font-semibold bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16] cursor-pointer"
                >
                  {BUDGET_RANGES.map((b, idx) => (
                    <option key={idx} value={b}>
                      {t(b)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t("Organization / Club Name", "প্রতিষ্ঠান / ক্লাবের নাম (Organization Name)")}</span>
                </label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder={t(
                    "e.g. Acme Corp / BRAC University / Personal",
                    "যেমন: একমি কর্প / ব্র্যাক ইউনিভার্সিটি / ব্যক্তিগত"
                  )}
                  className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>
            </div>

            {/* 6. Contact Details */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                {t("Contact Information", "যোগাযোগের তথ্য (Contact Information)")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-zinc-400" />
                    <span>{t("Your Name *", "আপনার নাম *")}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={t("Full Name", "পূর্ণ নাম")}
                    className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-zinc-400" />
                    <span>{t("Mobile Number *", "মোবাইল নম্বর *")}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-zinc-400" />
                    <span>{t("Email Address *", "ইমেইল এড্রেস *")}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-xs bg-white border border-zinc-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  />
                </div>
              </div>
            </div>

            {/* 7. Special Requirements / Note */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                {t(
                  "Event Details & Notes",
                  "ইভেন্টের বিস্তারিত বা বিশেষ কোনো চাহিদা (Event Details & Notes)"
                )}
              </label>
              <textarea
                rows={2}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder={t(
                  "Cricketer's role in event (e.g., chief guest, speech, trophy handover, photo session)...",
                  "ইভেন্টে ক্রিকেটারের ভূমিকা (যেমন: প্রধান অতিথি, বক্তৃতা, ট্রফি প্রদান, ফটোসেশন ইত্যাদি)..."
                )}
                className="w-full text-xs bg-white border border-zinc-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
              />
            </div>

            {/* Footer Submit Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
              >
                {t("Cancel", "বাতিল")}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-5 rounded-xl bg-zinc-950 hover:bg-black text-[#84cc16] hover:text-[#9fe832] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting
                    ? t("Submitting Request...", "রিকোয়েস্ট পাঠানো হচ্ছে...")
                    : t(
                        "Submit Invitation Request (Complete Step 2)",
                        "আমন্ত্রণ রিকোয়েস্ট সাবমিট করুন (ধাপ ২)"
                      )}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
