"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from "lucide-react";

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#f8faf8] overflow-hidden py-12 sm:py-20 px-4 flex items-center justify-center select-none">
      {/* ================= BACKGROUND STYLING & CRICKET ACCENTS ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top-Left Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-br from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />

        {/* Bottom-Right Ambient Glow */}
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-tl from-[#84cc16]/20 via-[#a3e635]/10 to-transparent rounded-full blur-3xl transform -rotate-12" />

        {/* Left Dot Matrix Pattern */}
        <div className="absolute top-28 left-6 sm:left-16 opacity-35">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {[...Array(5)].map((_, r) =>
              [...Array(5)].map((_, c) => (
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

        {/* Right Dot Matrix Pattern */}
        <div className="absolute bottom-28 right-6 sm:right-16 opacity-35">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {[...Array(5)].map((_, r) =>
              [...Array(5)].map((_, c) => (
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

      {/* ================= MAIN SIGN IN CARD ================= */}
      <div className="relative z-10 w-full max-w-[560px] mx-auto">
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.08)] border border-zinc-100 p-8 sm:p-11 transition-all overflow-hidden relative">
          
          {/* Subtle Top Lime Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#84cc16] via-[#a3e635] to-[#74d600]" />

          {/* Brand Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105 mb-3">
              <Image
                src="/images/playzone-logo-transparent.png"
                alt="Playzone"
                width={160}
                height={32}
                priority
                className="h-8 w-auto object-contain mx-auto"
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              {mode === "signin" ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 max-w-xs mx-auto">
              {mode === "signin"
                ? "Enter your details to access your account & orders"
                : "Join Playzone for Bangladesh's premier cricket gear"}
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/80 active:scale-[0.99] flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-zinc-700 transition-all shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider: Or */}
          <div className="relative my-4 sm:my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <span className="relative bg-white px-3 text-xs uppercase font-bold text-zinc-400">
              Or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Signup only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                  <UserIcon className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required={mode === "signup"}
                    className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* Email or Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                Email or phone number
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                <Mail className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone number"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                Password
              </label>
              <div className="relative flex items-center w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-zinc-900 focus-within:border-[#74d600] focus-within:ring-2 focus-within:ring-[#74d600]/20 transition-all bg-white">
                <Lock className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full bg-transparent outline-none placeholder:text-zinc-400 text-xs sm:text-sm pr-7"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-zinc-400 hover:text-zinc-700 transition-colors p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Forgot Password Link (Signin only) */}
              {mode === "signin" && (
                <div className="text-right mt-1.5">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="text-xs text-[#4d8c00] bg-lime-50 p-3 rounded-xl border border-lime-200 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#74d600]" />
                <span>
                  {mode === "signin"
                    ? "Welcome back to PLAYZONE! Redirecting..."
                    : "Account created successfully! Welcome to PLAYZONE."}
                </span>
              </div>
            )}

            {/* Submit Button (PLAYZONE BRANDING: NEON LIME GREEN) */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] active:scale-[0.99] disabled:opacity-70 text-zinc-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-lime-500/25 cursor-pointer mt-3"
            >
              <span>
                {isLoading
                  ? "Please wait..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Bottom Switch: Don't have an account? Create Account */}
          <div className="text-center mt-6 text-xs text-zinc-600">
            {mode === "signin" ? (
              <span>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#65a30d] hover:text-[#54870b] hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#65a30d] hover:text-[#54870b] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>

          {/* Trust Badge at Bottom */}
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#74d600]" />
            <span>100% Secure & Encrypted Playzone Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
