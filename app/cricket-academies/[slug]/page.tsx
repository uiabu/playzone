"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Play,
  Users,
  Compass,
  Phone,
  Mail,
  CheckCircle2,
  ChevronLeft,
  AlertCircle,
  FileText,
  BadgeCheck,
  Video,
  Award,
  CircleDollarSign,
  Layers,
} from "lucide-react";
import {
  Academy,
  calculateYearsOfOperation,
  INITIAL_ACADEMIES,
} from "@/lib/academiesData";
import CoachCard from "@/components/academies/CoachCard";
import AlumniSection from "@/components/academies/AlumniSection";
import ContactAcademyModal from "@/components/academies/ContactAcademyModal";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "coaches", label: "Coaches" },
  { id: "alumni", label: "Alumni" },
  { id: "facilities", label: "Facilities" },
  { id: "admission", label: "Admission" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Location" },
];

function AcademyProfileContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [academy, setAcademy] = useState<Academy | null>(() => {
    return INITIAL_ACADEMIES.find((a) => a.slug === slug) || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(
    null
  );
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // References for smooth scrolling
  const overviewRef = useRef<HTMLElement>(null);
  const coachesRef = useRef<HTMLElement>(null);
  const alumniRef = useRef<HTMLElement>(null);
  const facilitiesRef = useRef<HTMLElement>(null);
  const admissionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);

  const scrollToSection = (tabId: string) => {
    setActiveTab(tabId);
    const map: Record<string, React.RefObject<HTMLElement | null>> = {
      overview: overviewRef,
      coaches: coachesRef,
      alumni: alumniRef,
      facilities: facilitiesRef,
      admission: admissionRef,
      gallery: galleryRef,
      location: locationRef,
    };
    const target = map[tabId]?.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (!slug) return;
    async function fetchAcademy() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/academies/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setAcademy(json.data);
          }
        }
      } catch (err) {
        console.warn("Using local academy fallback:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAcademy();
  }, [slug]);

  if (isLoading && !academy) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#84cc16] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500 font-semibold">
            Loading cricket academy profile...
          </p>
        </div>
      </div>
    );
  }

  if (!academy) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-zinc-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-zinc-900">
            Academy Not Found
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            The requested cricket academy profile could not be located.
          </p>
          <Link
            href="/cricket-academies"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Academy Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const yearsActive = calculateYearsOfOperation(academy.establishedYear);

  return (
    <div className="min-h-screen bg-[#fafbfa] pb-20">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <span className="text-zinc-400">&gt;</span>
          <Link
            href="/cricket-academies"
            className="hover:text-zinc-900 transition-colors"
          >
            Cricket Academies
          </Link>
          <span className="text-zinc-400">&gt;</span>
          <span className="text-zinc-900 font-bold truncate">
            {academy.name}
          </span>
        </div>
      </div>

      {/* 2. COVER BANNER & HERO HEADER */}
      <section className="relative bg-zinc-900">
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 md:h-[340px] w-full overflow-hidden bg-zinc-950">
          <Image
            src={academy.coverImage}
            alt={academy.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        </div>

        {/* Hero Content Overlay (Logo + Name + Stats + Contact Button) */}
        <div className="bg-white border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
              {/* Left: Floating Logo & Info */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                {/* Floating Logo Badge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 border-2 border-zinc-200 shadow-xl overflow-hidden shrink-0 z-10 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={academy.logo}
                      alt={`${academy.name} Logo`}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Name & Metadata */}
                <div className="space-y-1.5 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                      {academy.name}
                    </h1>
                    {academy.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1d4ed8] text-white shadow-2xs">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{academy.location.address}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-500 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>
                      Established {academy.establishedYear} • {yearsActive} years
                      of operation
                    </span>
                  </p>
                </div>
              </div>

              {/* Right: Contact Button (No admission button per user request!) */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 active:scale-95 text-zinc-900 font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-zinc-600" />
                  <span>Contact Academy</span>
                </button>
              </div>
            </div>

            {/* 3. NAVIGATION TABS */}
            <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-zinc-100 pt-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#84cc16] text-zinc-950 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* ================= SECTION 1: ABOUT THE ACADEMY ================= */}
        <section
          ref={overviewRef}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-950">
              About {academy.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Academy overview, history, and training environment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Left: Description + 4 Stat Chips */}
            <div className="lg:col-span-2 space-y-6">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                {academy.about.history}
              </p>

              {/* 4 Stat Chips Matching Screenshot 2 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Established */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Established
                    </div>
                    <div className="text-xs font-black text-zinc-900">
                      {academy.establishedYear}
                    </div>
                  </div>
                </div>

                {/* 2. Years */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Years
                    </div>
                    <div className="text-xs font-black text-zinc-900">
                      {yearsActive} Years
                    </div>
                  </div>
                </div>

                {/* 3. Training Ground */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Training Ground
                    </div>
                    <div className="text-xs font-black text-zinc-900 truncate">
                      {academy.location.upazila ? `${academy.location.upazila}, ` : ""}
                      {academy.location.district}
                    </div>
                  </div>
                </div>

                {/* 4. Age Group */}
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Age Group
                    </div>
                    <div className="text-xs font-black text-zinc-900 truncate">
                      {academy.eligibleAgeGroups[0]} to{" "}
                      {academy.eligibleAgeGroups[academy.eligibleAgeGroups.length - 1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Watch Academy Video Card */}
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-zinc-900 group cursor-pointer border border-zinc-200 shadow-2xs"
            >
              <Image
                src={
                  academy.videoThumbnail ||
                  academy.coverImage ||
                  "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80"
                }
                alt="Watch Academy Video"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

              {/* Play Button Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border-2 border-white/80 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#84cc16] group-hover:text-zinc-950 group-hover:border-[#84cc16] transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Video Title Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl">
                <Video className="w-4 h-4 text-[#84cc16]" />
                <span>Watch Academy Video</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: COACHING STAFF ================= */}
        <section ref={coachesRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                Coaching Staff
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Experienced and certified coaches
              </p>
            </div>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
            >
              View All Coaches
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {academy.coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: ALUMNI & ACHIEVEMENTS ================= */}
        {academy.alumni && academy.alumni.length > 0 && (
          <section ref={alumniRef} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                  Alumni & Achievements
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Our players are making an impact at domestic and international levels.
                </p>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                View All Alumni
              </button>
            </div>

            <AlumniSection alumni={academy.alumni} />
          </section>
        )}

        {/* ================= SECTION 4: FACILITIES ================= */}
        {academy.facilities && academy.facilities.length > 0 && (
          <section ref={facilitiesRef} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                  Facilities
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Modern training facilities for better development
                </p>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-2xs"
              >
                View All Photos
              </button>
            </div>

            {/* 5-Column Grid Matching Screenshot 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {academy.facilities.map((fac, idx) => (
                <div
                  key={fac.id || idx}
                  className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-2xs cursor-pointer"
                >
                  <Image
                    src={
                      fac.image ||
                      academy.galleryImages[idx % academy.galleryImages.length] ||
                      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=600&fit=crop&q=80"
                    }
                    alt={fac.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="text-xs font-bold text-white block truncate">
                      {fac.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SECTION 5: ADMISSION INFORMATION ================= */}
        <section
          ref={admissionRef}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                Admission Information
              </h2>
              {academy.admissionStatus === "Open" ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Open
                </span>
              ) : academy.admissionStatus === "Closed" ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                  Closed
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Contact for Admission
                </span>
              )}
            </div>

            {/* Note: User explicitly said "admisstion button lagbe na", so no "Apply for Admission" button here! */}
          </div>

          {/* 8 Information Chips in 4x2 Grid Matching Screenshot 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Age Group */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">Age Group</div>
                <div className="text-xs font-black text-zinc-900 mt-0.5">
                  {academy.eligibleAgeGroups.join(", ")}
                </div>
              </div>
            </div>

            {/* 2. Training Programs */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">
                  Training Programs
                </div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.programs?.[0]?.title || "Beginner, Intermediate, Advanced"}
                </div>
              </div>
            </div>

            {/* 3. Training Schedule */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">
                  Training Schedule
                </div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.admissionInfo.practiceTimings}
                </div>
              </div>
            </div>

            {/* 4. Monthly Fee */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CircleDollarSign className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">
                  Monthly Fee
                </div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.admissionInfo.monthlyFeeNote || "৳2,000 - ৳5,000"}
                </div>
              </div>
            </div>

            {/* 5. Trial Session */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">
                  Trial Session
                </div>
                <div className="text-xs font-black text-zinc-900 mt-0.5">
                  {academy.admissionInfo.trialSessionAvailable
                    ? "Available"
                    : "Not Available"}
                </div>
              </div>
            </div>

            {/* 6. Required Documents */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">
                  Required Documents
                </div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.admissionInfo.requiredDocuments.slice(0, 2).join(", ")}
                </div>
              </div>
            </div>

            {/* 7. Contact */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">Contact</div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.contact.phone[0] || "+8801 234-567890"}
                </div>
              </div>
            </div>

            {/* 8. Email */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-zinc-400">Email</div>
                <div className="text-xs font-black text-zinc-900 mt-0.5 truncate">
                  {academy.contact.email || "academy@playzone.com.bd"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 6: GALLERY & LOCATION ================= */}
        <section ref={galleryRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                Academy Gallery
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Photo moments from practice matches and training grounds
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {academy.galleryImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedGalleryImg(img)}
                className="relative h-32 sm:h-44 rounded-2xl overflow-hidden bg-zinc-100 cursor-pointer group border border-zinc-200"
              >
                <Image
                  src={img}
                  alt={`Academy Gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section
          ref={locationRef}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-4"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-950">
              Location & Ground Address
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              How to reach {academy.name}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#84cc16]" />
                <span>{academy.location.address}</span>
              </p>
              <p className="text-xs text-zinc-500 pl-5">
                {academy.location.district}, {academy.location.division} Division, Bangladesh
              </p>
            </div>

            {academy.location.googleMapsUrl && (
              <a
                href={academy.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 transition-colors shrink-0 shadow-xs"
              >
                <span>Open in Google Maps</span>
              </a>
            )}
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl p-6 text-center space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-white">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Video className="w-4 h-4 text-[#84cc16]" />
                <span>{academy.name} - Training Overview Video</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="text-zinc-400 hover:text-white font-bold text-xs px-2 py-1"
              >
                Close
              </button>
            </div>
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={
                  academy.videoThumbnail ||
                  academy.coverImage ||
                  "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80"
                }
                alt="Video Placeholder"
                fill
                className="object-cover opacity-70"
              />
              <div className="relative z-10 text-white space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#84cc16] text-zinc-950 flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <p className="text-xs text-zinc-300 font-semibold">
                  Official training ground tour and coaching sessions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Gallery Images */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={selectedGalleryImg}
              alt="Gallery Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Contact Academy Modal */}
      <ContactAcademyModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        academy={academy}
      />
    </div>
  );
}

export default function AcademyProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center py-24">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#84cc16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-zinc-500 font-semibold">
              Loading cricket academy profile...
            </p>
          </div>
        </div>
      }
    >
      <AcademyProfileContent />
    </Suspense>
  );
}
