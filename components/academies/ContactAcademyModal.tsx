"use client";

import React from "react";
import {
  X,
  Phone,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Academy } from "@/lib/academiesData";

interface ContactAcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
  academy: Academy | null;
}

export default function ContactAcademyModal({
  isOpen,
  onClose,
  academy,
}: ContactAcademyModalProps) {
  if (!isOpen || !academy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-zinc-950 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-black uppercase tracking-wider text-[#84cc16]">
            Official Academy Contact
          </span>
          <h2 className="text-xl font-black text-white mt-1 pr-6">
            {academy.name}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#84cc16]" />
            <span>
              {academy.location.address}, {academy.location.district}
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Phone Numbers */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
              Helpline & WhatsApp
            </label>
            <div className="space-y-2">
              {academy.contact.phone.map((num, idx) => (
                <a
                  key={idx}
                  href={`tel:${num.replace(/\s+/g, "")}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-[#84cc16]/10 border border-zinc-200 hover:border-[#84cc16] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-zinc-900 group-hover:text-[#65a30d]">
                      {num}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 group-hover:text-[#65a30d]">
                    Call Now
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Email */}
          {academy.contact.email && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                Official Email
              </label>
              <a
                href={`mailto:${academy.contact.email}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition-all text-xs font-semibold text-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-500" />
                  <span>{academy.contact.email}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          )}

          {/* Website */}
          {academy.contact.website && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
                Website
              </label>
              <a
                href={academy.contact.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition-all text-xs font-semibold text-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-zinc-500" />
                  <span>{academy.contact.website}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          )}

          {/* Timings */}
          <div className="p-4 rounded-2xl bg-lime-50/70 border border-lime-200 text-xs">
            <p className="font-bold text-zinc-900 flex items-center gap-1.5 mb-1">
              <Calendar className="w-4 h-4 text-[#65a30d]" />
              Practice & Registration Timings:
            </p>
            <p className="text-zinc-600">
              {academy.admissionInfo.practiceTimings}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
