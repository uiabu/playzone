"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Copy,
  Check,
  Share2,
  Star,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Expert } from "./expertsData";

interface ShareExpertModalProps {
  expert: Expert | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareExpertModal({
  expert,
  isOpen,
  onClose,
}: ShareExpertModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !expert) return null;

  // Construct URL & Share Text
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://playzone-yk26.vercel.app";
  const shareUrl = `${origin}/hire-experts?expert=${encodeURIComponent(
    expert.id
  )}`;
  const shareTitle = `${expert.name} - ${expert.role} | PLAYZONE Cricket Experts`;
  const shareText = `Hire ${expert.name} (${expert.role}) on PLAYZONE! Rating: ${expert.rating}★ (${expert.reviewsCount} reviews) • From ৳${expert.price.toLocaleString()} ${expert.priceUnit}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  const shareChannels = [
    {
      name: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20ba59] text-white",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText}\n\n${shareUrl}`
      )}`,
    },
    {
      name: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "X (Twitter)",
      color: "bg-zinc-950 hover:bg-zinc-800 text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      color: "bg-[#0A66C2] hover:bg-[#095196] text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-zinc-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Share Expert Profile</h3>
              <p className="text-[11px] text-zinc-400">Share via social media or copy link</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Expert Card Preview Mini */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200">
              <Image
                src={expert.imageSrc}
                alt={expert.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-zinc-900 text-sm truncate">
                  {expert.name}
                </h4>
                {expert.verified && (
                  <span className="w-3.5 h-3.5 rounded-full bg-[#84cc16] text-white flex items-center justify-center text-[9px] shrink-0 font-black">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 truncate">{expert.role}</p>
              <div className="flex items-center gap-1 text-[11px] text-zinc-600 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-bold">{expert.rating}</span>
                <span className="text-zinc-400">• ৳{expert.price.toLocaleString()} {expert.priceUnit}</span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-2.5">
              Share to Social Media
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {shareChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setTimeout(onClose, 800);
                  }}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl text-xs font-bold transition-all shadow-xs active:scale-95 ${channel.color}`}
                >
                  {channel.icon}
                  <span className="text-[11px] font-medium leading-none">
                    {channel.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Copy Link Row */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">
              Or Copy Direct Link
            </label>
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-zinc-50 border border-zinc-200">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs text-zinc-600 bg-transparent focus:outline-none truncate font-mono"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Native Share (if supported) */}
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-600" />
              <span>More Sharing Options</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
