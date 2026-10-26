"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Film } from "lucide-react";

export interface ProductCardMediaProps {
  src: string;
  alt: string;
  videoUrl?: string;
  badge?: string;
  aspectRatio?: string; // e.g., "aspect-[4/3]"
  className?: string;
  priority?: boolean;
}

export function extractYoutubeId(urlOrId?: string): string | null {
  if (!urlOrId) return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function ProductCardMedia({
  src,
  alt,
  videoUrl,
  badge,
  aspectRatio = "aspect-[4/3]",
  className = "",
  priority = false,
}: ProductCardMediaProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const youtubeId = extractYoutubeId(videoUrl);
  const isDirectVideo =
    videoUrl &&
    (videoUrl.endsWith(".mp4") ||
      videoUrl.endsWith(".webm") ||
      videoUrl.includes(".mp4?"));

  const hasVideo = Boolean(youtubeId || isDirectVideo);

  // Debounced hover activation to prevent iframe thrashing on rapid cursor sweeps
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasVideo) return;

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const isDataUrlOrExternal =
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://");

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40 select-none ${className}`}
    >
      {/* 1. Base Product Image */}
      {isDataUrlOrExternal ? (
        <img
          src={imgError ? "/images/products/bats/sg_bat.png" : src}
          alt={alt}
          className={`w-full h-full object-contain p-2 transition-transform duration-300 ${
            isHovered && !isVideoPlaying ? "scale-105" : ""
          }`}
          onError={() => setImgError(true)}
        />
      ) : (
        <Image
          src={imgError ? "/images/products/bats/sg_bat.png" : src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
          className={`object-contain object-center transition-transform duration-300 ${
            isHovered && !isVideoPlaying ? "scale-105" : ""
          }`}
          onError={() => setImgError(true)}
        />
      )}

      {/* 2. Embedded Video on Hover */}
      {isVideoPlaying && hasVideo && (
        <div className="absolute inset-0 w-full h-full bg-black z-20 overflow-hidden rounded-xl animate-in fade-in duration-200">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
              title={`${alt} Video Preview`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none border-0 scale-[1.35]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : isDirectVideo ? (
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : null}

          {/* Playing indicator pill */}
          <div className="absolute bottom-2 left-2 z-30 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-bold text-white border border-white/10 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Previewing</span>
          </div>
        </div>
      )}

      {/* 3. Promotional Badge (Top Left) */}
      {badge && (
        <span
          className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-2xs pointer-events-none ${
            badge.includes("PRE-OWNED")
              ? "bg-zinc-900 text-white"
              : badge.includes("OFF")
              ? "bg-red-500 text-white"
              : "bg-[#84cc16] text-black"
          }`}
        >
          {badge}
        </span>
      )}

      {/* 4. Interactive Video Badge (Top Right) */}
      {hasVideo && !isVideoPlaying && (
        <div
          className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[9px] font-bold border border-white/15 shadow-sm transition-all duration-200 group-hover:bg-red-600 group-hover:border-red-500"
          title="Hover to watch video preview"
        >
          <Play className="w-2.5 h-2.5 fill-current text-red-400 group-hover:text-white" />
          <span className="hidden sm:inline">Hover for Video</span>
          <span className="sm:hidden">Video</span>
        </div>
      )}
    </div>
  );
}
