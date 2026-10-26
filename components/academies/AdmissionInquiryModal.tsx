"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  Calendar,
  MapPin,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import {
  Academy,
  ALL_TRAINING_TYPES,
  DIVISIONS,
  TrainingType,
} from "@/lib/academiesData";

interface AdmissionInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  academy: Academy | null;
}

export default function AdmissionInquiryModal({
  isOpen,
  onClose,
  academy,
}: AdmissionInquiryModalProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    age: "12",
    dateOfBirth: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    district: "Dhaka",
    preferredTrainingType: "Batting" as TrainingType,
    previousExperience: "1 year school cricket / local coaching",
    preferredSchedule: "Regular Session (Tuesday - Saturday)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    studentName: string;
    academyName: string;
    createdAt: string;
  } | null>(null);
  const [hasCopiedRef, setHasCopiedRef] = useState(false);

  // Sync default academy schedule & training types when academy changes
  useEffect(() => {
    if (academy) {
      if (academy.availableTrainingTypes.length > 0) {
        setFormData((prev) => ({
          ...prev,
          preferredTrainingType: academy.availableTrainingTypes[0],
          preferredSchedule:
            academy.programs[0]?.title ||
            "Regular Session (Tuesday - Saturday)",
          district: academy.location.district || prev.district,
        }));
      }
    }
  }, [academy]);

  if (!isOpen) return null;

  const isMinor = Number(formData.age) < 18;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation checks
    if (!formData.studentName.trim()) {
      setErrorMessage("Please enter the student's full name.");
      return;
    }

    const numAge = Number(formData.age);
    if (!numAge || numAge < 5 || numAge > 40) {
      setErrorMessage("Please enter a valid age between 5 and 40 years.");
      return;
    }

    if (isMinor && !formData.guardianName.trim()) {
      setErrorMessage(
        "Guardian's full name is required for applicants under 18 years of age."
      );
      return;
    }

    // Bangladesh mobile number verification
    const cleanPhone = formData.guardianPhone.replace(/[\s-]/g, "");
    const bdRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;
    if (!cleanPhone || !bdRegex.test(cleanPhone)) {
      setErrorMessage(
        "Please enter a valid 11-digit Bangladesh phone number (e.g. 017XXXXXXXX, 018XXXXXXXX)."
      );
      return;
    }

    if (!formData.district.trim()) {
      setErrorMessage("Please specify the student's district or current city.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/academies/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          academyId: academy?.id || "cricket-academy",
          academyName: academy?.name || "Cricket Academy",
          studentName: formData.studentName,
          age: numAge,
          dateOfBirth: formData.dateOfBirth,
          guardianName: formData.guardianName,
          guardianPhone: cleanPhone,
          guardianEmail: formData.guardianEmail,
          district: formData.district,
          preferredTrainingType: formData.preferredTrainingType,
          previousExperience: formData.previousExperience,
          preferredSchedule: formData.preferredSchedule,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit admission inquiry.");
      }

      setSuccessData(result.data);
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "Could not submit your admission inquiry. Please check your internet connection or try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!successData?.referenceId) return;
    navigator.clipboard.writeText(successData.referenceId);
    setHasCopiedRef(true);
    setTimeout(() => setHasCopiedRef(false), 2500);
  };

  const handleModalClose = () => {
    setSuccessData(null);
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-zinc-950 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#84cc16] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cricket Academy Admission Inquiry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white pr-8">
            Apply to {academy ? academy.name : "Cricket Academy"}
          </h2>
          {academy && (
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#84cc16]" />
              <span>
                {academy.location.address}, {academy.location.district}
              </span>
            </p>
          )}
        </div>

        {/* ================= SUCCESS STATE ================= */}
        {successData ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center mx-auto ring-8 ring-[#84cc16]/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black text-zinc-900">
                Inquiry Submitted Successfully!
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 max-w-md mx-auto leading-relaxed">
                Thank you,{" "}
                <span className="font-bold text-zinc-900">
                  {successData.studentName}
                </span>
                . Your admission application has been received by{" "}
                <span className="font-bold text-zinc-900">
                  {successData.academyName}
                </span>
                . The academy coaching office will contact your guardian shortly
                for preliminary assessment or trial scheduling.
              </p>
            </div>

            {/* Application Reference ID Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  Application Reference ID
                </p>
                <p className="text-lg font-black text-zinc-950 tracking-wider">
                  {successData.referenceId}
                </p>
                <p className="text-[11px] text-zinc-400">
                  Please preserve this reference for trial inquiries.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyRef}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 transition-colors cursor-pointer shadow-2xs"
              >
                {hasCopiedRef ? (
                  <>
                    <Check className="w-4 h-4 text-[#65a30d]" />
                    <span className="text-[#65a30d]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-500" />
                    <span>Copy Ref</span>
                  </>
                )}
              </button>
            </div>

            {/* Next Steps Guide */}
            <div className="text-left p-4 rounded-2xl bg-lime-50/70 border border-lime-200 text-xs text-zinc-700 space-y-1.5">
              <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                Next Steps for Candidate:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 text-[11px]">
                <li>The academy registrar will verify age and slot availability.</li>
                <li>Bring white training kit and sport shoes for trial assessment.</li>
                <li>Carry photocopy of Birth Certificate / NID and 2 photos.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleModalClose}
              className="w-full py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs transition-colors cursor-pointer shadow-md"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* ================= INQUIRY FORM ================= */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4 max-h-[75vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Student Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  Student Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  Age (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="5"
                  max="40"
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                />
              </div>
            </div>

            {/* Guardian Name (Mandatory for < 18) & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  Guardian Name {isMinor && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  required={isMinor}
                  value={formData.guardianName}
                  onChange={(e) =>
                    setFormData({ ...formData, guardianName: e.target.value })
                  }
                  placeholder={
                    isMinor ? "Father/Mother/Guardian name" : "Optional for adult"
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  Contact Number (WhatsApp/Phone) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, guardianPhone: e.target.value })
                    }
                    placeholder="017XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                  />
                </div>
              </div>
            </div>

            {/* District & Preferred Training Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  District / Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  placeholder="e.g. Dhaka, Narayanganj"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-800">
                  Preferred Training Focus <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.preferredTrainingType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredTrainingType: e.target.value as TrainingType,
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] bg-white"
                >
                  {academy?.availableTrainingTypes &&
                  academy.availableTrainingTypes.length > 0
                    ? academy.availableTrainingTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))
                    : ALL_TRAINING_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            {/* Preferred Training Schedule */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-800">
                Preferred Training Schedule / Program
              </label>
              <select
                value={formData.preferredSchedule}
                onChange={(e) =>
                  setFormData({ ...formData, preferredSchedule: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] bg-white"
              >
                {academy?.programs && academy.programs.length > 0 ? (
                  academy.programs.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title} ({p.schedule})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Regular Session (Tuesday - Saturday)">
                      Regular Session (Tuesday - Saturday)
                    </option>
                    <option value="Weekend Coaching (Friday - Saturday)">
                      Weekend Coaching (Friday - Saturday)
                    </option>
                    <option value="Residential Camp Program">
                      Residential Camp Program
                    </option>
                  </>
                )}
              </select>
            </div>

            {/* Previous Cricket Experience */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-800">
                Previous Cricket Experience
              </label>
              <input
                type="text"
                value={formData.previousExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    previousExperience: e.target.value,
                  })
                }
                placeholder="e.g. 1 year tape ball, school team, or absolute beginner"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
              />
            </div>

            {/* Optional Message */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-800">
                Optional Message / Specific Inquiry
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Any special inquiries regarding hostel, fees, or coaching timing..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
              />
            </div>

            {/* Disclaimer & Submit */}
            <div className="pt-2">
              <p className="text-[11px] text-zinc-500 mb-3 leading-relaxed">
                <span className="font-semibold text-zinc-700">Notice:</span>{" "}
                Admission inquiry submissions are routed directly to official
                academy administration. PLAYZONE collects only necessary training
                evaluation data. No online fee payment is charged during inquiry.
              </p>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Admission Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
