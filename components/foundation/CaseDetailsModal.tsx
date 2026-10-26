"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  ShieldCheck,
  Activity,
  Hospital,
  User,
  HeartHandshake,
} from "lucide-react";
import { SupportedCricketer } from "@/lib/foundationData";

interface CaseDetailsModalProps {
  cricketer: SupportedCricketer | null;
  onClose: () => void;
  onApplyClick: () => void;
}

export default function CaseDetailsModal({
  cricketer,
  onClose,
  onApplyClick,
}: CaseDetailsModalProps) {
  if (!cricketer) return null;

  const getStatusBadge = () => {
    switch (cricketer.status) {
      case "Returned to Cricket":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Rehabilitation":
        return "bg-sky-100 text-sky-800 border-sky-300";
      case "Under Treatment":
      default:
        return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8"
      >
        {/* Cover Photo */}
        <div className="relative h-56 sm:h-64 w-full bg-zinc-900 overflow-hidden">
          <Image
            src={cricketer.image}
            alt={cricketer.name}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${getStatusBadge()}`}
            >
              {cricketer.status}
            </span>

            <span className="text-[11px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
              Support Year: {cricketer.supportedYear}
            </span>
          </div>
        </div>

        {/* Details Container */}
        <div className="p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
                {cricketer.name}
              </h3>
              <p className="text-xs text-zinc-500 font-semibold flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{cricketer.locationLabel}</span>
              </p>
            </div>

            <div className="self-start sm:self-auto px-3 py-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-extrabold text-zinc-800">
              {cricketer.injury}
            </div>
          </div>

          {/* Recovery Progress Bar */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Rehabilitation & Recovery Progress</span>
              </span>
              <span className="font-black text-zinc-900">
                {cricketer.recoveryProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
              <div
                className="h-full bg-[#84cc16] rounded-full transition-all duration-500"
                style={{ width: `${cricketer.recoveryProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Medical Summary */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">
                Treatment & Support Details
              </span>
              <p className="text-zinc-700 leading-relaxed font-medium mt-1">
                {cricketer.treatmentDetails}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  Club / Team
                </span>
                <span className="font-bold text-zinc-900 text-xs block mt-0.5">
                  {cricketer.club}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">
                  Treating Medical Facility
                </span>
                <span className="font-bold text-zinc-900 text-xs block mt-0.5 truncate">
                  {cricketer.hospital}
                </span>
              </div>
            </div>
          </div>

          {/* Notice & CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100">
            <span className="text-[11px] text-zinc-400">
              Are you or a teammate currently facing a serious cricket injury?
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onApplyClick();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs transition-all shadow-xs cursor-pointer shrink-0"
            >
              Apply for Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
