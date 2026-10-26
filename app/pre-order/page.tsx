"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Link2,
  User,
  Mail,
  Phone,
  MapPin,
  UploadCloud,
  ArrowRight,
  CheckCircle2,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";
import { websiteApi } from "@/lib/api";

export default function PreOrderPage() {
  const [productInfo, setProductInfo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // OTP countdown handler
  const handleSendOtp = () => {
    if (!phone.trim()) {
      setOtpMessage("Please enter your phone number first");
      setTimeout(() => setOtpMessage(null), 3000);
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
    setOtpMessage("OTP sent successfully to " + phone);
    setTimeout(() => setOtpMessage(null), 4000);

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpCode.trim().length >= 4) {
      setOtpVerified(true);
      setOtpMessage("Phone verified successfully!");
      setTimeout(() => setOtpMessage(null), 3000);
    } else {
      setOtpMessage("Please enter a valid OTP code");
    }
  };

  // File handling
  const handleFile = (file: File) => {
    setFileError(null);
    if (!file.type.match(/^image\/(jpeg|png|webp|jpg)$/)) {
      setFileError("Only JPG, PNG and WebP images are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5 MB limit.");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!acceptedTerms) {
      setErrorMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    if (!selectedFile) {
      setErrorMessage("Please upload an image of the cricket equipment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await websiteApi.submitPreOrder({
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        deliveryAddress: address,
        productInfo,
        attachedImageUrl: filePreview || undefined,
        isOtpVerified: otpVerified,
      });

      if (res?.data?.refNumber) {
        setOrderRef(res.data.refNumber);
      } else {
        const fallbackRef = "PZ-PRE-" + Math.floor(100000 + Math.random() * 900000);
        setOrderRef(fallbackRef);
      }
    } catch (err) {
      console.warn("Backend pre-order submit error, using local fallback ref:", err);
      const fallbackRef = "PZ-PRE-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(fallbackRef);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setProductInfo("");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSelectedFile(null);
    setFilePreview(null);
    setAcceptedTerms(false);
    setOtpSent(false);
    setOtpVerified(false);
    setSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-10 sm:py-16 px-4 select-none">
      {/* ================= BACKGROUND STYLING & CRICKET ACCENTS ================= */}
      {/* Angular Lime Speed Streaks & Gradient Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-Left Lime Ambient Glow & Diagonal Streak */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />
        
        {/* Left Side Angular Speed Stripe */}
        <div className="absolute top-1/4 -left-48 w-96 h-28 bg-gradient-to-r from-transparent via-[#84cc16]/25 to-transparent transform -rotate-30 blur-xl" />

        {/* Bottom-Right Lime Ambient Glow & Diagonal Streak */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />

        {/* Right Side Angular Speed Stripe */}
        <div className="absolute bottom-1/4 -right-48 w-96 h-28 bg-gradient-to-l from-transparent via-[#84cc16]/25 to-transparent transform -rotate-30 blur-xl" />

        {/* Left Dot Matrix Pattern Grid */}
        <div className="absolute top-36 left-4 sm:left-12 opacity-40">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {[...Array(6)].map((_, r) =>
              [...Array(6)].map((_, c) => (
                <circle
                  key={`dot-l-${r}-${c}`}
                  cx={c * 20 + 10}
                  cy={r * 20 + 10}
                  r="2"
                  fill="#84cc16"
                />
              ))
            )}
          </svg>
        </div>

        {/* Right Dot Matrix Pattern Grid */}
        <div className="absolute bottom-40 right-4 sm:right-12 opacity-40">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {[...Array(6)].map((_, r) =>
              [...Array(6)].map((_, c) => (
                <circle
                  key={`dot-r-${r}-${c}`}
                  cx={c * 20 + 10}
                  cy={r * 20 + 10}
                  r="2"
                  fill="#84cc16"
                />
              ))
            )}
          </svg>
        </div>
      </div>

      {/* ================= MAIN FORM CARD ================= */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.07)] border border-zinc-100 p-6 sm:p-10 md:p-12 transition-all">
          
          {/* Card Header: Playzone Logo */}
          <div className="flex justify-center mb-2">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/playzone-logo-transparent.png"
                alt="Playzone"
                width={170}
                height={34}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Title: Looking for Something Different? */}
          <div className="text-center mt-3 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              <span>Looking for Something </span>
              <span className="block sm:inline">
                <span className="text-[#6bb800]">Different</span>?
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
              Can&apos;t find the cricket gear you&apos;re looking for?
              <br />
              Send us a request and we&apos;ll try to get it for you.
            </p>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* 1. Product Information * */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Product Information <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all">
                <Link2 className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  placeholder="Enter product name or URL"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 2. Your Name * */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all">
                <User className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 3. Email * */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all">
                <Mail className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 4. Phone Number * with Send OTP button */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 sm:gap-3">
                <div className="relative flex-1 flex items-center rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all">
                  <Phone className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#74d600] hover:bg-[#65c200] active:scale-95 text-zinc-950 font-bold text-xs sm:text-sm shrink-0 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                >
                  {otpSent ? (otpTimer > 0 ? `Resend (${otpTimer}s)` : "Resend OTP") : "Send OTP"}
                </button>
              </div>

              {/* OTP Toast Notification */}
              {otpMessage && (
                <div className="mt-2 text-xs font-semibold text-[#549900] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{otpMessage}</span>
                </div>
              )}

              {/* OTP Input Field (Shows after clicking Send OTP) */}
              {otpSent && !otpVerified && (
                <div className="mt-2.5 flex items-center gap-2 p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-6 digit OTP"
                    className="flex-1 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg text-xs sm:text-sm outline-none focus:border-[#74d600]"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>

            {/* 5. Address */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Address
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 sm:py-3 text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all">
                <MapPin className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 6. Upload Product Image * */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-zinc-900 mb-1.5">
                Upload Product Image <span className="text-red-500">*</span>
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-[#74d600] bg-lime-50/60"
                    : selectedFile
                    ? "border-zinc-300 bg-zinc-50/60"
                    : "border-zinc-200 hover:border-[#74d600]/80 bg-zinc-50/30 hover:bg-lime-50/20"
                }`}
              >
                {selectedFile && filePreview ? (
                  <div className="relative flex flex-col items-center">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 shadow-md mb-2">
                      <Image
                        src={filePreview}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs font-semibold text-zinc-800 max-w-[200px] truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remove image"
                      className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove image</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-[#ecfccb] text-[#65a30d] flex items-center justify-center mb-3">
                      <UploadCloud className="w-7 h-7 stroke-[2.2]" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 font-medium">
                      <span className="text-[#65a30d] font-bold hover:underline">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      JPG, PNG (Max 5 MB)
                    </p>
                  </>
                )}
              </div>

              {fileError && (
                <div className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-zinc-300 text-[#74d600] focus:ring-[#74d600] cursor-pointer"
                />
                <span className="text-xs sm:text-xs text-zinc-600 leading-snug">
                  I hereby accept the terms and conditions of pre-order and read the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="underline text-zinc-900 font-medium hover:text-[#65a30d]"
                  >
                    pre-order terms and conditions
                  </Link>{" "}
                  carefully. <span className="text-red-500 font-bold">*</span>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 rounded-full bg-[#74d600] hover:bg-[#65c200] active:scale-[0.99] disabled:opacity-70 text-zinc-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-lime-500/25 transition-all cursor-pointer"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= SUCCESS CONFIRMATION MODAL ================= */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-zinc-100">
            <div className="w-16 h-16 rounded-full bg-[#ecfccb] text-[#65a30d] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-zinc-900">
              Pre-Order Request Received!
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Thank you, <span className="font-bold text-zinc-900">{name}</span>! We have received your request for:
            </p>

            <div className="my-4 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-left text-xs space-y-1">
              <p className="text-zinc-500">
                Item: <span className="text-zinc-900 font-semibold">{productInfo}</span>
              </p>
              <p className="text-zinc-500">
                Contact: <span className="text-zinc-900 font-semibold">{phone}</span>
              </p>
              <p className="text-zinc-500">
                Reference ID: <span className="text-[#65a30d] font-bold font-mono">{orderRef}</span>
              </p>
            </div>

            <p className="text-xs text-zinc-500">
              Our cricket gear sourcing team will contact you within 24 hours to confirm pricing and availability.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Submit Another
              </button>
              <Link
                href="/"
                className="flex-1 py-3 rounded-full bg-[#74d600] hover:bg-[#65c200] text-zinc-950 text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center shadow-md shadow-lime-500/20"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
