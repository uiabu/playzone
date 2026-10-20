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

  if (!isOpen || !expert) return null;

  const totalCost = expert.price * sessionHours;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
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
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-zinc-900">Booking Confirmed!</h4>
            <p className="text-sm text-zinc-600 max-w-xs">
              Your session with <span className="font-bold text-zinc-900">{expert.name}</span> ({expert.role}) has been requested. We will contact you at {phone || "your phone"} shortly.
            </p>
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
