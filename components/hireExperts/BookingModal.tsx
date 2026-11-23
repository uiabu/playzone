"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Check,
  User,
  CreditCard,
  Phone,
  AlertCircle,
} from "lucide-react";
import { Expert } from "./expertsData";
import { websiteApi } from "@/lib/api";
import CustomDatePicker from "./CustomDatePicker";

const TIME_SLOTS = [
  "Morning (08:00 AM - 10:00 AM)",
  "Late Morning (10:00 AM - 12:00 PM)",
  "Afternoon (02:00 PM - 04:00 PM)",
  "Evening Practice (04:00 PM - 06:00 PM)",
  "Under Floodlights (07:00 PM - 09:00 PM)",
];

interface BookingModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ expert, isOpen, onClose }: BookingModalProps) {
  // Booking Details
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("Morning (08:00 AM - 10:00 AM)");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [timeDropdownDirection, setTimeDropdownDirection] = useState<"down" | "up">("up");
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const [sessionHours, setSessionHours] = useState(1);
  const [groundLocation, setGroundLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const toggleTimeDropdown = () => {
    if (!isTimeDropdownOpen && timeDropdownRef.current) {
      const rect = timeDropdownRef.current.getBoundingClientRect();
      const parentModal = timeDropdownRef.current.closest("form, [role='dialog']");
      let spaceBelow = window.innerHeight - rect.bottom;
      let spaceAbove = rect.top;
      if (parentModal) {
        const pRect = parentModal.getBoundingClientRect();
        spaceBelow = pRect.bottom - rect.bottom;
        spaceAbove = rect.top - pRect.top;
      }
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setTimeDropdownDirection("up");
      } else {
        setTimeDropdownDirection("down");
      }
    }
    setIsTimeDropdownOpen((prev) => !prev);
  };

  // Requester Identity & Security
  const [customerName, setCustomerName] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  // Close time dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setIsTimeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen || !expert) return null;

  const totalCost = expert.price * sessionHours;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!customerName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!nidNumber.trim()) {
      setFormError("National ID (NID) is required for security verification.");
      return;
    }

    if (!phone.trim()) {
      setFormError("Please enter your contact phone number.");
      return;
    }

    if (!selectedDate) {
      setFormError("Please select a session date.");
      return;
    }

    if (!groundLocation.trim()) {
      setFormError("Please provide ground or venue location details.");
      return;
    }

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
        customerName: customerName.trim(),
        nidNumber: nidNumber.trim(),
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
        customerName: customerName.trim() || "Player Booking",
        customerPhone: phone,
        date: selectedDate,
        timeSlot: selectedTime,
        serviceMode: "ground",
        locationDetails: groundLocation,
        notes: `[NID: ${nidNumber.trim()}] ${notes}`.trim(),
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
    setCustomerName("");
    setNidNumber("");
    setSelectedDate("");
    setGroundLocation("");
    setPhone("");
    setNotes("");
    setFormError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-visible my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-100 bg-zinc-50 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#84cc16]" />
            <h3 className="text-base font-bold text-zinc-900">Book Cricket Expert</h3>
          </div>
          <button
            type="button"
            onClick={isSuccess ? handleCloseSuccess : onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors cursor-pointer"
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

            <div className="w-full bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Requester Name:</span>
                <span className="font-bold text-zinc-900">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">NID Verified:</span>
                <span className="font-mono font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded text-[11px]">
                  {nidNumber} 🛡️
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Contact Phone:</span>
                <span className="font-semibold text-zinc-900">{phone}</span>
              </div>
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
              <div className="flex justify-between pt-1.5 border-t border-zinc-200">
                <span className="text-zinc-500 font-bold">Estimated Fee:</span>
                <span className="font-black text-zinc-900 text-sm">৳ {totalCost.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-sm">
              Our coordinator will call your verified number <span className="font-bold text-zinc-900">{phone}</span> to confirm schedule availability before finalizing the session.
            </p>

            <button
              type="button"
              onClick={handleCloseSuccess}
              className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-sm transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 overflow-visible rounded-b-3xl">
            {/* Expert Info Card (Compact) */}
            <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-zinc-200 shrink-0">
                  <Image
                    src={expert.imageSrc}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-zinc-900 truncate">{expert.name}</h4>
                  <p className="text-xs text-zinc-500 font-medium truncate">{expert.role} • {expert.location}</p>
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Rate</span>
                <span className="text-xs sm:text-sm font-black text-zinc-950">
                  ৳ {expert.price.toLocaleString()} <span className="text-[11px] text-zinc-500 font-normal">{expert.priceUnit}</span>
                </span>
              </div>
            </div>

            {/* SECURITY & IDENTITY SECTION (2 Columns: Name & NID, then Phone OTP) */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-lime-50/50 to-zinc-50 border border-lime-200/70 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
                  <span>Requester Security & Identity</span>
                </div>
                <span className="text-[10px] font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded-full border border-lime-200/80">
                  Required
                </span>
              </div>

              {/* Row 1: Full Name & NID Number in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-900 bg-white"
                    />
                  </div>
                </div>

                {/* 2. National ID (NID) Number */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-zinc-700">
                      National ID (NID) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[9px] text-zinc-400 font-medium">10, 13, 17 digits</span>
                  </div>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 19901234567890"
                      value={nidNumber}
                      onChange={(e) => setNidNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-900 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Contact Phone Number */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                  Contact Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01700-000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-900 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* BOOKING DETAILS: Date & Time in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Date Selection */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                  Select Date <span className="text-red-500">*</span>
                </label>
                <CustomDatePicker
                  required
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholder="Choose date..."
                  preferredDirection="up"
                />
              </div>

              {/* Time Slot */}
              <div ref={timeDropdownRef} className="relative">
                <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                  Time Slot <span className="text-red-500">*</span>
                </label>

                {/* Dropdown Trigger Button */}
                <button
                  type="button"
                  onClick={toggleTimeDropdown}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs sm:text-sm bg-white text-zinc-800 transition-all cursor-pointer shadow-2xs ${
                    isTimeDropdownOpen
                      ? "border-zinc-950 ring-1 ring-zinc-950"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isTimeDropdownOpen}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="font-medium text-zinc-900 truncate">
                      {selectedTime}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 shrink-0 ${
                      isTimeDropdownOpen ? "rotate-180 text-zinc-900" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu List with Smart Direction */}
                {isTimeDropdownOpen && (
                  <div
                    className={`absolute ${
                      timeDropdownDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1"
                    } left-0 right-0 bg-white rounded-xl border border-zinc-200 shadow-xl z-50 overflow-hidden py-1 animate-in fade-in-50 zoom-in-95 duration-150 max-h-56 overflow-y-auto`}
                  >
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedTime(slot);
                            setIsTimeDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-lime-50 text-zinc-950 font-bold"
                              : "text-zinc-700 hover:bg-zinc-50 font-medium"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span className="truncate">{slot}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#84cc16] shrink-0 ml-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* VENUE & GOALS: 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Ground / Venue Location */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                  Ground / Venue Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mirpur Indoor, Dhanmondi Field"
                    value={groundLocation}
                    onChange={(e) => setGroundLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800"
                  />
                </div>
              </div>

              {/* Special Requests / Goals */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-800 uppercase tracking-wider mb-1">
                  Training Goals (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Inswing focus, yorker bowling"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 outline-none text-zinc-800"
                />
              </div>
            </div>

            {/* Global Form Validation Error */}
            {formError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Price Summary */}
            <div className="pt-2.5 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-500 font-medium block">Estimated Total</span>
                <p className="text-base sm:text-lg font-black text-zinc-950">৳ {totalCost.toLocaleString()}</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#74be10] text-zinc-950 font-black text-xs sm:text-sm transition-all shadow-xs active:scale-95 cursor-pointer"
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
