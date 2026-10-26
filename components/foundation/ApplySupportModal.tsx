"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Building,
  Calendar,
  Check,
  Lock,
} from "lucide-react";
import { InjuryCategory } from "@/lib/foundationData";

interface ApplySupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplySupportModal({
  isOpen,
  onClose,
}: ApplySupportModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [clubOrAcademy, setClubOrAcademy] = useState("");
  const [playingRole, setPlayingRole] = useState("Batsman");

  const [injuryCategory, setInjuryCategory] =
    useState<InjuryCategory>("ACL Injury");
  const [dateOfInjury, setDateOfInjury] = useState("");
  const [venue, setVenue] = useState("");
  const [injuryDescription, setInjuryDescription] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");

  const [playzoneOrderId, setPlayzoneOrderId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; size: string }[]
  >([]);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newFiles = files.map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage("Please complete all required contact fields.");
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!dateOfInjury || !injuryDescription.trim() || !hospitalName.trim()) {
      setErrorMessage("Please provide date, description, and hospital details.");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!agreementChecked) {
      setErrorMessage(
        "Please check the declaration box confirming the authenticity of your submission."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate submission network call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const randomRef = `PZF-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setReferenceId(randomRef);
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    setUploadedFiles([]);
    setAgreementChecked(false);
    setErrorMessage("");
    onClose();
  };

  return (
    <div
      onClick={resetAndClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8"
      >
        {/* Top Header */}
        <div className="bg-zinc-950 text-white p-6 sm:p-7 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/20 text-[#84cc16] text-[11px] font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PLAYZONE Foundation Injury Support</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Apply for Medical & Financial Support
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-md">
            Direct assistance grants for dedicated cricketers suffering serious
            cricket injuries in Bangladesh.
          </p>

          {/* Progress Indicator */}
          {!isSubmitted && (
            <div className="flex items-center gap-2 pt-5">
              <div
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  step >= 1 ? "bg-[#84cc16]" : "bg-zinc-800"
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  step >= 2 ? "bg-[#84cc16]" : "bg-zinc-800"
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  step >= 3 ? "bg-[#84cc16]" : "bg-zinc-800"
                }`}
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSubmitted ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#84cc16]/20 text-[#65a30d] flex items-center justify-center mx-auto border-2 border-[#84cc16]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-black text-zinc-950">
                  Application Submitted Successfully
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Your reference ID is{" "}
                  <span className="font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
                    {referenceId}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 text-left space-y-3 max-w-md mx-auto text-xs">
                <div className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] pb-1 border-b border-zinc-200">
                  Review & Verification Pipeline
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-zinc-800">
                      Medical Panel Document Check
                    </span>
                    <p className="text-zinc-500 text-[11px]">
                      Our sports physios review your MRI and diagnostic reports.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-zinc-800">
                      Hospital Verification & Direct Contact
                    </span>
                    <p className="text-zinc-500 text-[11px]">
                      A Foundation officer will call you and verify quotes with
                      the clinic.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#84cc16] text-zinc-950 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-zinc-800">
                      Grant Disbursement & Physio Sponsorship
                    </span>
                    <p className="text-zinc-500 text-[11px]">
                      Financial assistance paid directly toward surgery and recovery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: PERSONAL & CRICKET PROFILE */}
              {step === 1 && (
                <form onSubmit={handleNextStep1} className="space-y-4">
                  <div className="border-b border-zinc-100 pb-2">
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider">
                      Step 1: Player & Cricket Profile
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Tell us who you are and where you play.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Shakib Al Hasan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01712-345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="player@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Home District / City
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="e.g. Dhaka / Chattogram"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Current Cricket Club / Academy / School
                      </label>
                      <input
                        type="text"
                        value={clubOrAcademy}
                        onChange={(e) => setClubOrAcademy(e.target.value)}
                        placeholder="e.g. Dhanmondi Club / BKSP"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Primary Playing Role
                      </label>
                      <select
                        value={playingRole}
                        onChange={(e) => setPlayingRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] bg-white cursor-pointer"
                      >
                        <option value="Batsman">Batsman</option>
                        <option value="Fast Bowler">Fast Bowler</option>
                        <option value="Spin Bowler">Spin Bowler</option>
                        <option value="All-Rounder">All-Rounder</option>
                        <option value="Wicketkeeper">Wicketkeeper</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Injury Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: INJURY DETAILS */}
              {step === 2 && (
                <form onSubmit={handleNextStep2} className="space-y-4">
                  <div className="border-b border-zinc-100 pb-2">
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider">
                      Step 2: Cricket Injury Information
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Describe the specific injury sustained and current treatment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Injury Category *
                      </label>
                      <select
                        value={injuryCategory}
                        onChange={(e) =>
                          setInjuryCategory(e.target.value as InjuryCategory)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] bg-white cursor-pointer font-medium"
                      >
                        <option value="ACL Injury">ACL Injury (Knee Ligament)</option>
                        <option value="Meniscus Injury">Meniscus Injury (Cartilage Tear)</option>
                        <option value="Fracture">Fracture (Bone Fracture / Hand / Arm)</option>
                        <option value="Ligament Injury">Ligament Injury (MCL / Ankle)</option>
                        <option value="Knee Injury">Knee Injury (General / Patellar)</option>
                        <option value="Surgery Required">Surgery Required (Other Major)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Date of Injury *
                      </label>
                      <input
                        type="date"
                        required
                        value={dateOfInjury}
                        onChange={(e) => setDateOfInjury(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16] bg-white cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Treating Hospital / Clinic Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        placeholder="e.g. NITOR / Evercare Orthopedics"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Attending Orthopedic Doctor / Surgeon
                      </label>
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        placeholder="e.g. Prof. Dr. M. Rahman"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Match / Practice Ground where injury occurred
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. Mirpur Academy Net / City Club Ground"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Describe How the Injury Happened *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={injuryDescription}
                      onChange={(e) => setInjuryDescription(e.target.value)}
                      placeholder="Explain the incident (e.g., slipped while bowling in delivery stride, knee popped during fielding turn, impact fracture from leather ball)..."
                      className="w-full p-3 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next: Documents & Verification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: PLAYZONE ORDER & MEDICAL DOCUMENTS */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-zinc-100 pb-2">
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider">
                      Step 3: Verification & Medical Documents
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Provide order details and medical proof to expedite assistance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        PLAYZONE Order ID (Previous 12 Months)
                      </label>
                      <input
                        type="text"
                        value={playzoneOrderId}
                        onChange={(e) => setPlayzoneOrderId(e.target.value)}
                        placeholder="e.g. PZ-94821 or Phone number on order"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                      />
                      <span className="text-[10px] text-zinc-400 mt-1 block">
                        Verifies active player status in the PLAYZONE cricket ecosystem.
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Estimated Surgery / Treatment Cost (BDT)
                      </label>
                      <input
                        type="text"
                        value={estimatedCost}
                        onChange={(e) => setEstimatedCost(e.target.value)}
                        placeholder="e.g. ৳80,000 - ৳1,50,000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:outline-none focus:border-[#84cc16]"
                      />
                    </div>
                  </div>

                  {/* Medical Documents Upload Box */}
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1.5">
                      Upload Medical Reports (MRI, X-ray, Prescriptions)
                    </label>
                    <label className="border-2 border-dashed border-zinc-200 hover:border-[#84cc16] rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-zinc-50/50">
                      <Upload className="w-6 h-6 text-zinc-400 mb-1" />
                      <span className="text-xs font-bold text-zinc-800">
                        Click or drag files here to upload
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-0.5">
                        PDF, JPG, PNG accepted (Max 15MB each)
                      </span>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {uploadedFiles.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-xl bg-zinc-100 text-xs text-zinc-800"
                          >
                            <span className="truncate max-w-xs">{f.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-zinc-500">
                                {f.size}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Declarations & Security Box */}
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreementChecked}
                        onChange={(e) => setAgreementChecked(e.target.checked)}
                        className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] mt-0.5 cursor-pointer"
                      />
                      <span className="text-[11px] text-zinc-600 leading-relaxed">
                        I solemnly declare that this injury was sustained in genuine
                        cricket activity and all medical documents are authentic. I
                        understand grants are disbursed directly to clinics/hospitals
                        following committee review, and funding is subject to availability.
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-xl bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
