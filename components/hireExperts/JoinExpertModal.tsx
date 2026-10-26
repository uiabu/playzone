"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Sparkles,
  Phone,
  User,
  Mail,
  MapPin,
  Briefcase,
  Award,
  DollarSign,
  FileText,
  ShieldCheck,
  Send,
} from "lucide-react";
import { ExpertType, EXPERT_TYPES } from "./expertsData";

interface JoinExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultExpertType?: ExpertType;
}

const DISTRICTS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Gazipur",
  "Narayanganj",
  "All Bangladesh",
];

const EXPERIENCE_OPTIONS = [
  "1 - 3 years",
  "3 - 5 years",
  "5 - 10 years",
  "10+ years",
];

const RATE_UNITS = [
  { value: "/hour", label: "Per Hour (৳/hour)" },
  { value: "/match", label: "Per Match (৳/match)" },
  { value: "/session", label: "Per Session (৳/session)" },
  { value: "/service", label: "Per Service (৳/service)" },
];

export default function JoinExpertModal({
  isOpen,
  onClose,
  defaultExpertType = "Cricket Coach",
}: JoinExpertModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    expertType: defaultExpertType,
    district: "Dhaka",
    experience: "3 - 5 years",
    expectedRate: "1500",
    rateUnit: "/hour" as const,
    serviceModes: ["ground"] as string[],
    bio: "",
    certifications: "",
    socialProfile: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState("");
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const handleModeToggle = (mode: string) => {
    setFormData((prev) => {
      const exists = prev.serviceModes.includes(mode);
      if (exists && prev.serviceModes.length === 1) return prev; // Keep at least one
      return {
        ...prev,
        serviceModes: exists
          ? prev.serviceModes.filter((m) => m !== mode)
          : [...prev.serviceModes, mode],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Basic Validation
    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setFormError("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (!formData.bio.trim() || formData.bio.trim().length < 20) {
      setFormError("Please provide a brief bio/experience summary (at least 20 characters).");
      return;
    }

    setIsSubmitting(true);

    const ref = `EXP-REG-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const existing = JSON.parse(
        localStorage.getItem("playzone_expert_applications") || "[]"
      );
      existing.unshift({
        id: ref,
        ...formData,
        status: "Under Review",
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(
        "playzone_expert_applications",
        JSON.stringify(existing)
      );
    } catch {
      // ignore localStorage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setApplicationRef(ref);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setApplicationRef("");
    setFormError("");
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      expertType: defaultExpertType,
      district: "Dhaka",
      experience: "3 - 5 years",
      expectedRate: "1500",
      rateUnit: "/hour",
      serviceModes: ["ground"],
      bio: "",
      certifications: "",
      socialProfile: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-100 overflow-hidden relative my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* ================= SUCCESS STATE ================= */
          <div className="p-8 sm:p-10 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#84cc16]/20 border border-[#84cc16]/40 flex items-center justify-center text-[#65a30d] mb-5 shadow-xs animate-bounce">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#84cc16]/15 text-[#549900] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Application Received
            </span>

            <h3 className="text-2xl font-black text-zinc-950 tracking-tight mb-2">
              Welcome to the PLAYZONE Network!
            </h3>

            <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto mb-5 font-medium">
              Thank you for applying as a{" "}
              <strong className="text-zinc-950 font-bold">{formData.expertType}</strong>.
              Our verification team will review your qualifications and connect via
              WhatsApp/Phone within <strong>24 to 48 hours</strong>.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 w-full max-w-md text-left mb-6 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Application Reference:</span>
                <span className="font-mono font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                  {applicationRef}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Applicant:</span>
                <span className="font-bold text-zinc-900">{formData.fullName}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Expert Category:</span>
                <span className="font-bold text-[#549900]">{formData.expertType}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Contact Phone:</span>
                <span className="font-bold text-zinc-900">{formData.phone}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-zinc-950 text-white font-extrabold hover:bg-zinc-800 transition-colors cursor-pointer text-sm shadow-md"
            >
              Done & Return to Experts
            </button>
          </div>
        ) : (
          /* ================= FORM BODY ================= */
          <>
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-[#84cc16]/20 text-[#549900] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Playzone Expert Network</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Join as a Cricket Expert
              </h2>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Offer your coaching, practice, technical, or officiating services to players & academies across Bangladesh.
              </p>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {formError}
                </div>
              )}

              {/* 1. Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coach Rafiqul Islam"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    WhatsApp / Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +880 1711-XXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Email & Expert Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Email Address <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="coach@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Expert Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.expertType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          expertType: e.target.value as ExpertType,
                        })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all font-semibold"
                    >
                      {EXPERT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Location & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Primary Location / Base <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all font-semibold"
                    >
                      {DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all font-semibold"
                    >
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Expected Fee / Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Expected Rate (৳ BDT) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min={200}
                      max={50000}
                      step={50}
                      required
                      placeholder="1500"
                      value={formData.expectedRate}
                      onChange={(e) =>
                        setFormData({ ...formData, expectedRate: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Rate Structure
                  </label>
                  <select
                    value={formData.rateUnit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rateUnit: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all font-semibold"
                  >
                    {RATE_UNITS.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 5. Service Modes */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-2">
                  Service Delivery Modes <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: "ground", label: "Ground / Field" },
                    { id: "home", label: "Home Visit" },
                    { id: "online", label: "Online / Video" },
                  ].map((mode) => {
                    const isChecked = formData.serviceModes.includes(mode.id);
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleModeToggle(mode.id)}
                        className={`py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          isChecked
                            ? "bg-[#84cc16]/15 border-[#84cc16] text-zinc-950 shadow-2xs"
                            : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Bio & Background */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Bio, Achievements & Background <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your cricket playing history, coaching accreditations, club representations, or special expertise..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all resize-none leading-relaxed"
                />
              </div>

              {/* 7. Certifications */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Certifications / Accreditations{" "}
                  <span className="text-zinc-400 font-normal">(e.g. BCB Level 1/2, ICC, Physiotherapy Degree)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. BCB Level 2 Certified, First Aid Certified"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                />
              </div>

              {/* 8. Profile Link */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Profile Link / Video Reel / Social Link{" "}
                  <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://facebook.com/... or YouTube channel"
                  value={formData.socialProfile}
                  onChange={(e) =>
                    setFormData({ ...formData, socialProfile: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                />
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <ShieldCheck className="w-4 h-4 text-[#84cc16] shrink-0" />
                <span>
                  Joining the PLAYZONE Expert Directory is completely free. We connect you directly with cricketers & academies.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.99] text-zinc-950 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Expert Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
