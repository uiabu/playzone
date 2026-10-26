"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  ClipboardList,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  AlertCircle,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";
import {
  SAMPLE_SUPPORTED_CRICKETERS,
  ELIGIBLE_INJURIES,
  HOW_IT_WORKS_STEPS,
  SupportedCricketer,
} from "@/lib/foundationData";
import ApplySupportModal from "@/components/foundation/ApplySupportModal";
import CaseDetailsModal from "@/components/foundation/CaseDetailsModal";
import LearnMoreModal from "@/components/foundation/LearnMoreModal";

// Custom icons matching the reference screenshot exactly
function KneeJointIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      {/* Femur bone */}
      <path
        d="M17 6C17 4.5 18 3 20 3C22 3 23 4.5 23 6V17C23 18.5 24.5 20 26 21C26.8 21.5 27.5 22.5 27 23.5C26.5 24.5 25 24.5 24 24.5C22 24.5 20.5 23.5 20 22C19.5 23.5 18 24.5 16 24.5C15 24.5 13.5 24.5 13 23.5C12.5 22.5 13.2 21.5 14 21C15.5 20 17 18.5 17 17V6Z"
        fill="#27272a"
        stroke="#18181b"
        strokeWidth="1.2"
      />
      {/* Patella (Knee Cap) - highlighted neon lime */}
      <ellipse
        cx="20"
        cy="21.5"
        rx="3.5"
        ry="3"
        fill="#84cc16"
        stroke="#4d7c0f"
        strokeWidth="1.2"
      />
      {/* Tibia & Fibula bones */}
      <path
        d="M17.5 25C18.5 25 19 25.5 19 26.5V34C19 35.5 18 37 16.5 37C15 37 14 35.5 14 34V26.5C14 25.5 16 25 17.5 25Z"
        fill="#27272a"
        stroke="#18181b"
        strokeWidth="1.2"
      />
      <path
        d="M22.5 25C21.5 25 21 25.5 21 26.5V34C21 35.5 22 37 23.5 37C25 37 26 35.5 26 34V26.5C26 25.5 24 25 22.5 25Z"
        fill="#27272a"
        stroke="#18181b"
        strokeWidth="1.2"
      />
      {/* Joint ligament highlights */}
      <circle cx="15.5" cy="22.5" r="1.5" fill="#84cc16" />
      <circle cx="24.5" cy="22.5" r="1.5" fill="#84cc16" />
    </svg>
  );
}

function BoneFractureIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <g transform="rotate(-30 20 20)">
        {/* Bone Left Knobs */}
        <circle cx="8" cy="17" r="3.2" fill="#27272a" stroke="#18181b" strokeWidth="1.2" />
        <circle cx="8" cy="23" r="3.2" fill="#27272a" stroke="#18181b" strokeWidth="1.2" />
        {/* Bone Shaft with fracture split */}
        <path
          d="M10 18.5L19 18.5L20 16L18 21.5L21 21.5L30 21.5"
          stroke="#84cc16"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 17H18L21 20H30"
          fill="none"
          stroke="#27272a"
          strokeWidth="3"
        />
        {/* Bone Right Knobs */}
        <circle cx="32" cy="17" r="3.2" fill="#27272a" stroke="#18181b" strokeWidth="1.2" />
        <circle cx="32" cy="23" r="3.2" fill="#27272a" stroke="#18181b" strokeWidth="1.2" />
        {/* Neon green fracture sparks */}
        <path d="M19 14L22 17L18 20L21 23" stroke="#84cc16" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function MedicalKitSurgeryIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      {/* First Aid Box */}
      <rect
        x="6"
        y="11"
        width="28"
        height="22"
        rx="5"
        fill="#27272a"
        stroke="#18181b"
        strokeWidth="1.5"
      />
      {/* Handle */}
      <path
        d="M14 11V8C14 6.89543 14.8954 6 16 6H24C25.1046 6 26 6.89543 26 8V11"
        stroke="#18181b"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Cross in center with neon green */}
      <rect x="18" y="16" width="4" height="12" rx="1.5" fill="#84cc16" />
      <rect x="14" y="20" width="12" height="4" rx="1.5" fill="#84cc16" />
    </svg>
  );
}

export default function PlayzoneFoundationPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [selectedCricketer, setSelectedCricketer] =
    useState<SupportedCricketer | null>(null);

  return (
    <div className="min-h-screen bg-[#fafbfa] text-zinc-900 select-none">
      {/* ========================================================================= */}
      {/* SECTION A: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#08080a] overflow-hidden">
        {/* Background Atmosphere & Ambient Neon Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#84cc16]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col lg:flex-row items-center justify-between">
          {/* Left Column: Hero Text & CTAs */}
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 py-12 lg:py-16 z-10 space-y-5">
            {/* Top Subtitle with lime accent line */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#84cc16] rounded-full" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/90">
                PLAYZONE FOUNDATION
              </span>
            </div>

            {/* Headline matching screenshot */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.08]">
              When Cricketers
              <br />
              Get Injured,
              <br />
              <span className="text-[#84cc16]">We Stand Together.</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-lg leading-relaxed font-normal">
              Financial support for dedicated cricketers in times of serious injury.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] cursor-pointer"
              >
                <span>Apply for Support</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => setIsLearnMoreModalOpen(true)}
                className="inline-flex items-center px-6 sm:px-7 py-3 rounded-full bg-transparent hover:bg-white/10 active:scale-95 text-white border border-white/40 hover:border-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image of Injured Cricketer */}
          <div className="w-full lg:w-1/2 relative h-[320px] sm:h-[400px] lg:h-[540px] overflow-hidden">
            <Image
              src="/images/foundation/hero_injured_cricketer.jpg"
              alt="Injured cricketer supported on cricket pitch by PLAYZONE Foundation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center lg:object-right"
            />
            {/* Seamless gradients: left dark fade for seamless transition to text, bottom fade */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#08080a] to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#08080a] to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: HOW IT WORKS                                                   */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-zinc-200/90 py-10 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Title */}
          <div className="lg:w-1/4 shrink-0 space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">
              A simple process to get support.
            </p>
          </div>

          {/* Right 3 Steps with Connected Arrow Dividers */}
          <div className="lg:w-3/4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#ecfccb] text-zinc-950 flex items-center justify-center shrink-0 border border-[#d9f99d]">
                <ClipboardList className="w-5 h-5 text-zinc-900" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-zinc-950 truncate">
                  1. Check Eligibility
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 font-medium leading-relaxed">
                  Verify your purchase history and injury details.
                </p>
              </div>
            </div>

            {/* Arrow Divider 1 */}
            <div className="hidden sm:block text-zinc-300 font-light text-lg px-2 shrink-0">
              →
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#ecfccb] text-zinc-950 flex items-center justify-center shrink-0 border border-[#d9f99d]">
                <FileText className="w-5 h-5 text-zinc-900" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-zinc-950 truncate">
                  2. Submit Application
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 font-medium leading-relaxed">
                  Provide medical reports and required information.
                </p>
              </div>
            </div>

            {/* Arrow Divider 2 */}
            <div className="hidden sm:block text-zinc-300 font-light text-lg px-2 shrink-0">
              →
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-full bg-[#ecfccb] text-zinc-950 flex items-center justify-center shrink-0 border border-[#d9f99d]">
                <ShieldCheck className="w-5 h-5 text-zinc-900" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-zinc-950 truncate">
                  3. Get Reviewed
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 font-medium leading-relaxed">
                  Our team reviews your application and informs you about the support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: SUPPORTED CRICKETERS                                           */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#fafbfa]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                Supported Cricketers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
                <span className="font-bold text-zinc-800">Cricketers</span> we have supported through Playzone Foundation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLearnMoreModalOpen(true)}
              className="self-start sm:self-auto px-4 py-2 rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 active:scale-95 text-xs font-bold text-zinc-800 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards Grid: 5 Horizontal Cards exactly matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {SAMPLE_SUPPORTED_CRICKETERS.map((cricketer) => (
              <div
                key={cricketer.id}
                onClick={() => setSelectedCricketer(cricketer)}
                className="group flex flex-col bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Single Image Showing Recovery/Situation (No before-after) */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={cricketer.image}
                    alt={cricketer.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-zinc-950 group-hover:text-[#65a30d] transition-colors truncate">
                      {cricketer.name}
                    </h3>
                    <p className="text-xs font-bold text-zinc-700 mt-0.5">
                      {cricketer.injury}
                    </p>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 mt-3 truncate">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{cricketer.locationLabel}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sample Data Transparent Disclaimer */}
          <div className="text-center pt-2">
            <p className="text-[11px] text-zinc-400 font-medium">
              * Sample records shown above illustrate Foundation rehabilitation cases during development.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: INJURY SUPPORT WE PROVIDE                                      */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/90">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10">
          {/* Left Title & Description */}
          <div className="lg:w-1/3 shrink-0 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Injury Support We Provide
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal max-w-sm">
              We provide financial support for major cricket-related injuries, including:
            </p>
          </div>

          {/* Right 3 Injury Cards matching screenshot */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full">
            {/* Card 1: ACL / Meniscus */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#ecfccb] flex items-center justify-center border border-[#d9f99d]">
                  <KneeJointIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-950">
                    ACL / Meniscus
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Support for ACL or meniscus injuries requiring treatment or surgery.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Fractures */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#ecfccb] flex items-center justify-center border border-[#d9f99d]">
                  <BoneFractureIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-950">
                    Fractures
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Support for major fractures (hairline or severe) due to cricket activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Surgery Required */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#ecfccb] flex items-center justify-center border border-[#d9f99d]">
                  <MedicalKitSurgeryIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-950">
                    Surgery Required
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Support for other serious cricket-related injuries that require surgery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: DEDICATED APPLICATION CTA & TRUST BANNER                       */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#fafbfa] border-t border-zinc-200/90">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="relative rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-zinc-800">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#84cc16]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/20 text-[#84cc16] text-[11px] font-black uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Standing With Grassroots Players</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  Facing a Serious Cricket Injury? Apply for Support Today.
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Our Foundation medical panel reviews cases weekly. Provide your hospital diagnosis, doctor&apos;s recommendations, and PLAYZONE purchase history for rapid verification.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply for Support</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsLearnMoreModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-[#84cc16]" />
                  <span>Funding Policy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}
      {/* 1. Dedicated Multi-Step Application Modal */}
      <ApplySupportModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* 2. Supported Cricketer Case Review Modal */}
      <CaseDetailsModal
        cricketer={selectedCricketer}
        onClose={() => setSelectedCricketer(null)}
        onApplyClick={() => setIsApplyModalOpen(true)}
      />

      {/* 3. Learn More & Foundation Rules Modal */}
      <LearnMoreModal
        isOpen={isLearnMoreModalOpen}
        onClose={() => setIsLearnMoreModalOpen(false)}
        onApplyClick={() => setIsApplyModalOpen(true)}
      />
    </div>
  );
}
