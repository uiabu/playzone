"use client";

import React from "react";
import {
  X,
  ShieldCheck,
  HeartHandshake,
  FileCheck,
  Stethoscope,
  Building,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { FOUNDATION_FAQ } from "@/lib/foundationData";

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: () => void;
}

export default function LearnMoreModal({
  isOpen,
  onClose,
  onApplyClick,
}: LearnMoreModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-zinc-950 text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/20 text-[#84cc16] text-[11px] font-black uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>PLAYZONE Foundation Charter</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            How PLAYZONE Foundation Supports Injured Cricketers
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Standing side by side with the grassroots and club cricketers who power our nation&apos;s passion.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-zinc-700 leading-relaxed">
          {/* Mission & Purpose */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
              <span>Our Mission</span>
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              Cricket in Bangladesh thrives at the grassroots level, in district leagues, universities, and coaching academies. Yet a single ACL tear, compound fracture, or tendon rupture can end a promising player&apos;s career simply due to prohibitive orthopedic surgery costs. PLAYZONE Foundation was established to bridge this financial gap and ensure no dedicated cricketer is left behind.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
              <Stethoscope className="w-5 h-5 text-[#65a30d]" />
              <h4 className="font-black text-zinc-900 text-xs">Medical Review</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Every application is evaluated by licensed sports medicine consultants.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
              <Building className="w-5 h-5 text-[#65a30d]" />
              <h4 className="font-black text-zinc-900 text-xs">Direct Hospital Grants</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Disbursements are sent directly to verified surgical and physio clinics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-1.5">
              <FileCheck className="w-5 h-5 text-[#65a30d]" />
              <h4 className="font-black text-zinc-900 text-xs">Community Loyalty</h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Priority given to players actively equipped and verified in our community.
              </p>
            </div>
          </div>

          {/* Business & Eligibility Rules */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Key Policy & Funding Guidelines</span>
            </div>
            <ul className="space-y-1 text-[11px] text-amber-900/90 list-disc pl-5">
              <li>
                <strong>Cricket-related injuries only:</strong> Injuries sustained in motor accidents, domestic incidents, or non-cricket sports are not covered.
              </li>
              <li>
                <strong>Medical verification required:</strong> Prescriptions, MRI/X-ray reports, and hospital estimates must be submitted for review.
              </li>
              <li>
                <strong>Qualifying purchase:</strong> Recent purchases on PLAYZONE within the last 12 months assist in verifying active cricketer status, but approval is determined by medical severity and available funds.
              </li>
              <li>
                <strong>Funds allocation:</strong> Financial aid is not guaranteed and depends on Foundation committee approval and monthly budget caps.
              </li>
            </ul>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2.5">
              {FOUNDATION_FAQ.map((faq, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1"
                >
                  <p className="font-bold text-zinc-900 text-xs">{faq.q}</p>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-bold text-xs hover:bg-zinc-100 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onApplyClick();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Apply for Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
