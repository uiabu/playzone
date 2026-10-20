"use client";

import React from "react";
import Image from "next/image";
import { X, Star, MapPin, Award, ShieldCheck, Calendar, Clock } from "lucide-react";
import { Expert } from "./expertsData";

interface ProfileModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (expert: Expert) => void;
}

export default function ProfileModal({ expert, isOpen, onClose, onBook }: ProfileModalProps) {
  if (!isOpen || !expert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header / Banner Area */}
        <div className="relative h-44 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden shrink-0">
          <Image
            src={expert.imageSrc}
            alt={expert.name}
            fill
            className="object-cover opacity-60 filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Avatar Overlay */}
          <div className="absolute -bottom-8 left-6 flex items-end gap-4 z-10">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-zinc-900">
              <Image
                src={expert.imageSrc}
                alt={expert.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="pt-10 px-6 pb-6 overflow-y-auto space-y-5">
          {/* Main Info Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-zinc-950">{expert.name}</h3>
                {expert.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-700">{expert.role}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500">
                <div className="flex items-center gap-1 text-[#84cc16]">
                  <Star className="w-3.5 h-3.5 fill-[#84cc16] text-[#84cc16]" />
                  <span className="font-bold text-zinc-800">{expert.rating}</span>
                  <span className="text-zinc-400">({expert.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {expert.location}
                </span>
                <span>•</span>
                <span className="text-zinc-600 font-medium">Experience: {expert.experienceYears}+ years</span>
              </div>
            </div>

            {/* Price & Book Button */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 bg-zinc-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl">
              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400 block font-medium">Hire Rate</span>
                <span className="text-lg font-black text-zinc-950">৳ {expert.price.toLocaleString()}</span>
                <span className="text-xs text-zinc-500"> {expert.priceUnit}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBook(expert);
                }}
                className="px-5 py-2 rounded-xl bg-[#a3e635] hover:bg-[#92cf2e] text-black font-extrabold text-sm transition-all shadow-xs active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* About & Bio */}
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">About The Expert</h4>
            <p className="text-sm text-zinc-700 leading-relaxed">{expert.fullBio}</p>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Accreditations & Certifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {expert.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-800">
                  <Award className="w-4 h-4 text-[#84cc16] shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations / Tags */}
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-1.5">
              {expert.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Service Mode & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" /> Availability
              </span>
              <p className="text-xs font-semibold text-zinc-800">{expert.availableDays.join(", ")}</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Service Mode
              </span>
              <p className="text-xs font-semibold text-zinc-800 capitalize">
                {expert.serviceModes.map((m) => (m === "ground" ? "At Ground/Academy" : m === "home" ? "At Home" : "Online Consultation")).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
