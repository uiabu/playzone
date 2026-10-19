"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, UploadCloud, RefreshCw } from "lucide-react";

interface TradeInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TradeInModal({ isOpen, onClose }: TradeInModalProps) {
  const [gearType, setGearType] = useState("Cricket Bat");
  const [brand, setBrand] = useState("SS Sunridges");
  const [willowType, setWillowType] = useState("English Willow");
  const [usagePeriod, setUsagePeriod] = useState("Under 1 Year");
  const [condition, setCondition] = useState("Grade A (Clean, No Cracks)");
  const [phone, setPhone] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Dynamic Valuation Estimate based on selections
  let minEstimate = 2500;
  let maxEstimate = 5500;

  if (gearType === "Cricket Bat") {
    if (willowType === "English Willow") {
      if (condition.includes("Grade A+")) {
        minEstimate = 4000;
        maxEstimate = 7000;
      } else if (condition.includes("Grade A")) {
        minEstimate = 3000;
        maxEstimate = 5500;
      } else {
        minEstimate = 2000;
        maxEstimate = 3500;
      }
    } else {
      minEstimate = 1000;
      maxEstimate = 1800;
    }
  } else {
    minEstimate = 1200;
    maxEstimate = 2800;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsCalculated(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-lime-100 text-[#65a30d] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-zinc-900">
              Trade-In Request Received!
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
              Our master gear-evaluator will contact you at <strong className="text-zinc-800">{phone}</strong> within 2 business hours with an inspection slot and final cash / store credit offer.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase text-[#4d7c0f] bg-lime-50 px-2.5 py-0.5 rounded-full border border-lime-200 tracking-wider">
                PLAYZONE BUYBACK & TRADE-IN PROGRAM
              </span>
              <h3 className="text-xl font-black text-zinc-950 tracking-tight mt-1.5">
                Sell or Trade-In Your Cricket Gear
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Get an instant quote. Turn your old bat into cash or trade-in value for brand-new gear!
              </p>
            </div>

            {/* Gear Type */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Gear Item Type
              </label>
              <select
                value={gearType}
                onChange={(e) => setGearType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm font-semibold outline-none focus:border-zinc-900 bg-zinc-50"
              >
                <option value="Cricket Bat">Cricket Bat</option>
                <option value="Batting Pads">Batting Pads</option>
                <option value="Batting Gloves">Batting Gloves</option>
                <option value="Cricket Helmet">Cricket Helmet</option>
                <option value="Cricket Shoes / Spikes">Cricket Shoes / Spikes</option>
                <option value="Kit Bag">Kit Bag</option>
              </select>
            </div>

            {/* Brand & Willow Type (if bat) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Brand Name
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold outline-none focus:border-zinc-900 bg-zinc-50"
                >
                  <option value="SG Cricket">SG Cricket</option>
                  <option value="Kookaburra">Kookaburra</option>
                  <option value="MRF">MRF</option>
                  <option value="SS Sunridges">SS Sunridges</option>
                  <option value="Gray-Nicolls">Gray-Nicolls</option>
                  <option value="Gunn & Moore (GM)">Gunn & Moore (GM)</option>
                  <option value="New Balance">New Balance</option>
                  <option value="DSC">DSC</option>
                  <option value="Other">Other International Brand</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Wood / Material
                </label>
                <select
                  value={willowType}
                  onChange={(e) => setWillowType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold outline-none focus:border-zinc-900 bg-zinc-50"
                >
                  <option value="English Willow">English Willow</option>
                  <option value="Kashmir Willow">Kashmir Willow</option>
                  <option value="Composite / Other">Composite / PU</option>
                </select>
              </div>
            </div>

            {/* Condition Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Estimated Physical Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-semibold outline-none focus:border-zinc-900 bg-zinc-50"
              >
                <option value="Grade A+ (Mint, played 1-2 matches)">
                  Grade A+ (Mint, played 1-2 matches only)
                </option>
                <option value="Grade A (Clean, No Cracks)">
                  Grade A (Seasoned, clean blade, intact handle)
                </option>
                <option value="Grade B (Normal match wear & tear)">
                  Grade B (Cosmetic marks, but structurally solid)
                </option>
              </select>
            </div>

            {/* Instant Valuation Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-lime-50 to-emerald-50 border border-lime-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                  Estimated Trade-in Payout
                </span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950">
                  ৳ {minEstimate.toLocaleString()} – ৳ {maxEstimate.toLocaleString()}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#84cc16] text-black text-[10px] font-black uppercase tracking-wider">
                Instant bKash / Cash
              </span>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Your Contact Phone / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 017XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-zinc-900"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Confirm & Request Free Doorstep Pickup</span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center">
              Available in Dhaka, Chittagong, Sylhet, Rajshahi and nationwide. Zero hassle pickup.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
