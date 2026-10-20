"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { Expert } from "./expertsData";
import { websiteApi } from "@/lib/api";

interface BookingModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ expert, isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("08:00 AM - 10:00 AM");
  const [sessionHours, setSessionHours] = useState(1);
  const [groundLocation, setGroundLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen || !expert) return null;

  const totalCost = expert.price * sessionHours;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    // Save to localStorage for transparency
    try {
      const existing = JSON.parse(localStorage.getItem("playzone_expert_bookings") || "[]");
      existing.unshift({
        id: ref,
        expertId: expert.id,
        expertName: expert.name,
        role: expert.role,
        date: selectedDate,
        time: selectedTime,
        location: groundLocation,
        phone,
        notes,
        status: "Pending Confirmation",
        totalCost,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("playzone_expert_bookings", JSON.stringify(existing));
    } catch {
      // Ignore localStorage errors
    }

    try {
      await websiteApi.bookExpert({
        expertId: expert.id,
        expertName: expert.name,
        customerName: "Player Booking",
        customerPhone: phone,
        date: selectedDate,
        timeSlot: selectedTime,
        serviceMode: "ground",
        locationDetails: groundLocation,
        notes,
        totalFee: totalCost,
      });
    } catch (err) {
      console.warn("Backend booking submission fallback:", err);
    }

    setIsSuccess(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    onClose();
    setSelectedDate("");
    setGroundLocation("");
    setPhone("");
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#84cc16]" />
            <h3 className="text-base font-bold text-zinc-900">Book Cricket Expert</h3>
          </div>
          <button
            type="button"
            onClick={isSuccess ? handleCloseSuccess : onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black tracking-wide uppercase mb-2">
                Status: Pending Confirmation
              </span>
              <h4 className="text-xl font-black text-zinc-900">Booking Request Submitted</h4>
              <p className="text-xs text-zinc-500 font-mono mt-1">
                Reference ID: <strong className="text-zinc-900">{bookingRef}</strong>
              </p>
            </div>

            <div className="w-full bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Expert:</span>
                <span className="font-bold text-zinc-900">{expert.name} ({expert.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Time:</span>
                <span className="font-semibold text-zinc-800">{selectedDate} • {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Venue:</span>
                <span className="font-semibold text-zinc-800">{groundLocation}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-zinc-200">
                <span className="text-zinc-500 font-bold">Estimated Fee:</span>
                <span className="font-black text-zinc-900 text-sm">৳ {totalCost.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
              Because expert availability depends on official match and net fixtures, our coordinator will call <span className="font-bold text-zinc-900">{phone}</span> to confirm schedule availability before finalizing the session.
            </p>

            <button
              type="button"
              onClick={handleCloseSuccess}
              className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-sm transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Expert Info Card */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-200 shrink-0">
                <Image
                  src={expert.imageSrc}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-zinc-900 truncate">{expert.name}</h4>
                <p className="text-xs text-zinc-500 font-medium">{expert.role} • {expert.location}</p>
                <p className="text-xs font-black text-zinc-900 mt-0.5">
                  ৳ {expert.price.toLocaleString()} <span className="text-zinc-500 font-normal">{expert.priceUnit}</span>
                </p>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800 bg-white"
                />
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800 bg-white"
              >
                <option value="08:00 AM - 10:00 AM">Morning (08:00 AM - 10:00 AM)</option>
                <option value="10:00 AM - 12:00 PM">Late Morning (10:00 AM - 12:00 PM)</option>
                <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                <option value="04:00 PM - 06:00 PM">Evening Practice (04:00 PM - 06:00 PM)</option>
                <option value="07:00 PM - 09:00 PM">Under Floodlights (07:00 PM - 09:00 PM)</option>
              </select>
            </div>

            {/* Ground / Venue Location */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                Ground / Venue Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Mirpur Indoor, Dhanmondi Cricket Ground"
                  value={groundLocation}
                  onChange={(e) => setGroundLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                Contact Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="+880 1700-000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-1.5">
                Training Goals / Match Details (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Specific focus areas, bowler speed requirement, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800 resize-none"
              />
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 font-medium">Estimated Total</span>
                <p className="text-lg font-black text-zinc-950">৳ {totalCost.toLocaleString()}</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#92cf2e] text-black font-extrabold text-sm transition-all shadow-xs active:scale-95"
              >
                Confirm & Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
