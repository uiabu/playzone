"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  Eye,
  EyeOff,
  Phone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [step, setStep] = useState<"request" | "verify" | "reset" | "complete">(
    "request"
  );
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "verify" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Submit identifier (email/phone)
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const clean = identifier.trim();
    if (!clean) {
      setErrorMessage(
        t(
          "Please enter your registered email or phone number.",
          "অনুগ্রহ করে আপনার নিবন্ধিত ইমেইল বা ফোন নম্বর লিখুন।"
        )
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
      setTimer(60);
    }, 700);
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const code = otp.join("");
    if (code.length < 6) {
      setErrorMessage(
        t(
          "Please enter the complete 6-digit code.",
          "অনুগ্রহ করে ৬-সংখ্যার কোডটি সঠিকভাবে লিখুন।"
        )
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 700);
  };

  // Step 3: Handle password reset
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage(
        t(
          "Password must be at least 6 characters.",
          "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।"
        )
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(
        t("Passwords do not match.", "উভয় পাসওয়ার্ড একই হতে হবে।")
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("complete");
    }, 800);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#f8faf8] overflow-hidden py-12 sm:py-20 px-4 flex items-center justify-center select-none font-sans">
      {/* Background Glow Accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />
      </div>

      <div className="relative z-10 w-full max-w-[460px]">
        {/* Card Header & Brand Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-950 text-[#84cc16] shadow-xl mb-3 border border-zinc-800">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            {step === "complete"
              ? t("Password Reset Complete", "পাসওয়ার্ড পরিবর্তন সফল হয়েছে")
              : t("Reset Your Password", "পাসওয়ার্ড রিসেট করুন")}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-[320px] mx-auto">
            {step === "request" &&
              t(
                "Enter your registered email or phone to receive a verification code.",
                "ভেরিফিকেশন কোড পেতে আপনার নিবন্ধিত ইমেইল বা ফোন নম্বর দিন।"
              )}
            {step === "verify" &&
              t(
                `Enter the 6-digit code sent to ${identifier}`,
                `${identifier} নম্বরে পাঠানো ৬-সংখ্যার কোডটি লিখুন`
              )}
            {step === "reset" &&
              t(
                "Create a strong new password for your PLAYZONE account.",
                "আপনার প্লেজোন অ্যাকাউন্টের জন্য নতুন পাসওয়ার্ড নির্ধারণ করুন।"
              )}
            {step === "complete" &&
              t(
                "Your password has been successfully updated. You can now sign in.",
                "আপনার পাসওয়ার্ড সফলভাবে আপডেট হয়েছে। এখন লগইন করুন।"
              )}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-zinc-100">
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold text-center animate-in fade-in">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Request Code */}
          {step === "request" && (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  {t("Email or Phone Number", "ইমেইল বা ফোন নম্বর")}
                </label>
                <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                  <Mail className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 01700000000 or user@example.com"
                    required
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.99] text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/20 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>{t("Sending Code...", "কোড পাঠানো হচ্ছে...")}</span>
                ) : (
                  <>
                    <span>{t("Send Reset Code", "রিসেট কোড পাঠান")}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === "verify" && (
            <form onSubmit={handleVerifySubmit} className="space-y-5">
              <div className="flex justify-center gap-2 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black rounded-xl border border-zinc-200 focus:border-[#74d600] focus:ring-2 focus:ring-[#74d600]/20 outline-none transition-all bg-zinc-50"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                <span>
                  {timer > 0 ? (
                    `${t("Resend code in", "পুনরায় কোড পাঠানোর সময়:")} ${timer}s`
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTimer(60)}
                      className="text-[#65a30d] font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t("Resend Code", "কোড আবার পাঠান")}</span>
                    </button>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => setStep("request")}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  {t("Change Number/Email", "পরিবর্তন করুন")}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.99] text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/20 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>{t("Verifying...", "যাচাই করা হচ্ছে...")}</span>
                ) : (
                  <>
                    <span>{t("Verify Code", "কোড যাচাই করুন")}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {step === "reset" && (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  {t("New Password", "নতুন পাসওয়ার্ড")}
                </label>
                <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                  <Lock className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t("At least 6 characters", "কমপক্ষে ৬টি অক্ষর")}
                    required
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm pr-7"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 transition-colors p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  {t("Confirm New Password", "নতুন পাসওয়ার্ড নিশ্চিত করুন")}
                </label>
                <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                  <Lock className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("Re-enter new password", "পাসওয়ার্ড পুনরায় লিখুন")}
                    required
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#84cc16] hover:bg-[#74d600] active:scale-[0.99] text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/20 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span>{t("Updating...", "আপডেট করা হচ্ছে...")}</span>
                ) : (
                  <>
                    <span>{t("Update Password", "পাসওয়ার্ড আপডেট করুন")}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: Success Complete */}
          {step === "complete" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-lime-100 text-[#65a30d] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-600">
                {t(
                  "Your password has been changed securely. You can now use your new password to sign into PLAYZONE.",
                  "আপনার পাসওয়ার্ড নিরাপদে পরিবর্তিত হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।"
                )}
              </p>
              <Link
                href="/signin"
                className="inline-flex w-full py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs sm:text-sm items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{t("Go to Sign In", "লগইন পেজে যান")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Back to Sign In Link */}
          {step !== "complete" && (
            <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
              <Link
                href="/signin"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t("Back to Sign In", "লগইনে ফিরে যান")}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Micro Trust Points */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
            256-Bit SSL Encryption
          </span>
          <span>•</span>
          <span>Instant OTP Verification</span>
        </div>
      </div>
    </div>
  );
}
