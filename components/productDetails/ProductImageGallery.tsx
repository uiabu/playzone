"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  Share2,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

export default function ProductImageGallery({
  images,
  productName,
  badge,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // In-card Smooth Zoom & Pan States (Default: 100% scale initially)
  const [cardScale, setCardScale] = useState(1);
  const [cardPan, setCardPan] = useState({ x: 0, y: 0 });
  const [isCardDragging, setIsCardDragging] = useState(false);
  const cardDragStartRef = useRef({ x: 0, y: 0 });

  // Lightbox Fullscreen Modal States (Default: 100% scale initially)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Fallback perspective angles if only 1 image provided
  const displayImages =
    images.length >= 3 ? images : [images[0], images[0], images[0]];

  const activeImage = displayImages[selectedImageIndex] || displayImages[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Card Smooth Zoom In (+)
  const handleCardZoomIn = () => {
    setCardScale((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 3));
  };

  // Card Smooth Zoom Out (-)
  const handleCardZoomOut = () => {
    setCardScale((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
      if (next === 1) setCardPan({ x: 0, y: 0 });
      return next;
    });
  };

  // Card Reset Zoom
  const handleCardResetZoom = () => {
    setCardScale(1);
    setCardPan({ x: 0, y: 0 });
  };

  // Card Mouse Drag / Pan Handlers
  const handleCardMouseDown = (e: React.MouseEvent) => {
    if (cardScale <= 1) return;
    setIsCardDragging(true);
    cardDragStartRef.current = {
      x: e.clientX - cardPan.x,
      y: e.clientY - cardPan.y,
    };
  };

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!isCardDragging || cardScale <= 1) return;
    setCardPan({
      x: e.clientX - cardDragStartRef.current.x,
      y: e.clientY - cardDragStartRef.current.y,
    });
  };

  const handleCardMouseUp = () => {
    setIsCardDragging(false);
  };

  // Double click toggles between 1x and 1.8x
  const handleCardDoubleClick = () => {
    if (cardScale > 1) {
      handleCardResetZoom();
    } else {
      setCardScale(1.8);
    }
  };

  // Switch thumbnail angle
  const handleSelectThumbnail = (idx: number) => {
    setSelectedImageIndex(idx);
    handleCardResetZoom();
    setLightboxScale(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  // Open Fullscreen Lightbox Modal (Starts at 100% normal view)
  const openLightbox = () => {
    setIsLightboxOpen(true);
    setLightboxScale(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
        setLightboxScale(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
        setLightboxScale(1);
        setLightboxPan({ x: 0, y: 0 });
      } else if (e.key === "+" || e.key === "=") {
        setLightboxScale((s) => Math.min(Number((s + 0.5).toFixed(1)), 4));
      } else if (e.key === "-" || e.key === "_") {
        setLightboxScale((s) => {
          const next = Math.max(Number((s - 0.5).toFixed(1)), 1);
          if (next === 1) setLightboxPan({ x: 0, y: 0 });
          return next;
        });
      }
    };

    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, displayImages.length]);

  // Lightbox Pan & Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (lightboxScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - lightboxPan.x, y: e.clientY - lightboxPan.y };
  };

  const handleModalMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || lightboxScale <= 1) return;
    setLightboxPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setLightboxScale((s) => Math.min(Number((s + 0.5).toFixed(1)), 4));
  };

  const handleZoomOut = () => {
    setLightboxScale((s) => {
      const next = Math.max(Number((s - 0.5).toFixed(1)), 1);
      if (next === 1) setLightboxPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setLightboxScale(1);
    setLightboxPan({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ================= 1. MAIN INTERACTIVE IMAGE FRAME ================= */}
      <div
        className={`relative w-full aspect-[4/3] sm:aspect-square bg-gradient-to-b from-zinc-50/90 via-white to-zinc-50/70 rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden flex items-center justify-center select-none ${
          cardScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        }`}
        onMouseDown={handleCardMouseDown}
        onMouseMove={handleCardMouseMove}
        onMouseUp={handleCardMouseUp}
        onMouseLeave={handleCardMouseUp}
        onDoubleClick={handleCardDoubleClick}
      >
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start pointer-events-none">
          {badge && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-xs ${
                badge.includes("PRE-OWNED")
                  ? "bg-zinc-900 text-white"
                  : badge.includes("OFF")
                  ? "bg-red-500 text-white"
                  : "bg-[#74d600] text-black"
              }`}
            >
              {badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-zinc-200/80 text-[11px] font-bold text-zinc-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>100% Genuine</span>
          </span>
        </div>

        {/* Top Right Action Icons */}
        <div
          className="absolute top-4 right-4 z-10 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm border cursor-pointer ${
              isLiked
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white/90 hover:bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isLiked ? "fill-rose-500" : ""
              }`}
            />
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="relative w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-8 right-0 whitespace-nowrap bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-md animate-in fade-in">
                Link Copied!
              </span>
            )}
          </button>
        </div>

        {/* Product Image Stage (Smoothly transforms on plus (+) click & drag) */}
        <div className="relative w-full h-full p-6 sm:p-10 flex items-center justify-center overflow-hidden pointer-events-none">
          <div
            className="relative w-full h-full flex items-center justify-center will-change-transform"
            style={{
              transform: `translate(${cardPan.x}px, ${cardPan.y}px) scale(${cardScale})`,
              transition: isCardDragging
                ? "none"
                : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Bottom Right Floating Zoom Toolbar (Smooth Plus/Minus controls) */}
        <div
          className="absolute bottom-3 right-4 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-zinc-200/90 shadow-sm hover:shadow-md transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Zoom Out Button (-) */}
          <button
            type="button"
            onClick={handleCardZoomOut}
            disabled={cardScale <= 1}
            title="Zoom Out (-)"
            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-600 hover:text-black hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Scale Percentage Indicator */}
          <span className="text-[11px] font-bold text-zinc-800 font-mono px-1 min-w-[36px] text-center select-none">
            {Math.round(cardScale * 100)}%
          </span>

          {/* Zoom In Button (+) */}
          <button
            type="button"
            onClick={handleCardZoomIn}
            disabled={cardScale >= 3}
            title="Zoom In (+)"
            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-800 hover:text-[#549900] hover:bg-lime-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer group/plus"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#65a30d] group-hover/plus:scale-110 transition-transform" />
          </button>

          {/* Reset Zoom Button (visible when zoomed) */}
          {cardScale > 1 && (
            <button
              type="button"
              onClick={handleCardResetZoom}
              title="Reset Zoom (100%)"
              className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          <div className="h-4 w-px bg-zinc-200 mx-0.5" />

          {/* Fullscreen Modal trigger */}
          <button
            type="button"
            onClick={openLightbox}
            title="Open Fullscreen Lightbox"
            className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* When zoomed in, show drag hint badge on bottom left */}
        {cardScale > 1 && (
          <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 text-[10px] font-bold text-[#4d7c0f] bg-lime-50/95 border border-lime-200/80 px-2.5 py-1 rounded-full animate-in fade-in duration-150 pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74d600]" />
            <span>Drag to inspect detail • Double-click to reset</span>
          </div>
        )}
      </div>

      {/* ================= 2. THUMBNAILS PERSPECTIVE STRIP ================= */}
      <div className="flex items-center gap-3">
        {displayImages.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;
          const label =
            idx === 0 ? "Front View" : idx === 1 ? "Profile Edge" : "Detail";
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectThumbnail(idx)}
              className={`relative flex-1 aspect-[4/3] rounded-2xl overflow-hidden bg-white p-2.5 border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#74d600] ring-2 ring-[#74d600]/30 shadow-xs"
                  : "border-zinc-200/80 hover:border-zinc-300 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain select-none"
                />
              </div>
              <span className="absolute bottom-1 right-2 text-[9px] font-bold text-zinc-500 bg-white/80 px-1 rounded">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 3. FULLSCREEN INTERACTIVE LIGHTBOX MODAL ================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col text-white animate-in fade-in duration-200 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-zinc-800/80 bg-zinc-950/70"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-sm sm:text-base font-black text-white truncate max-w-xs sm:max-w-md">
                {productName}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Angle {selectedImageIndex + 1} of {displayImages.length} • Drag image to pan • Click +/- to zoom smoothly
              </p>
            </div>

            {/* Zoom Controls Bar */}
            <div className="flex items-center gap-2">
              {/* Zoom Out Button */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={lightboxScale <= 1}
                title="Zoom Out (-)"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4 text-zinc-200" />
              </button>

              {/* Scale Indicator */}
              <span className="font-mono font-bold text-xs px-2.5 py-1 bg-zinc-900 rounded-lg border border-zinc-800 text-[#a3e635]">
                {Math.round(lightboxScale * 100)}%
              </span>

              {/* Zoom In Button */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={lightboxScale >= 4}
                title="Zoom In (+)"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 text-zinc-200" />
              </button>

              {/* Reset Zoom Button */}
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Zoom (100%)"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-zinc-200" />
              </button>

              <div className="h-6 w-px bg-zinc-800 mx-1" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                title="Close (Esc)"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Image Stage */}
          <div
            className={`flex-1 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 ${
              lightboxScale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleModalMouseMove}
            onMouseUp={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={() => {
              if (lightboxScale > 1) {
                handleResetZoom();
              } else {
                setLightboxScale(2);
              }
            }}
          >
            {/* Prev Angle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev > 0 ? prev - 1 : displayImages.length - 1
                );
                setLightboxScale(1);
                setLightboxPan({ x: 0, y: 0 });
              }}
              title="Previous Angle"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 hover:bg-black text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Angle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev < displayImages.length - 1 ? prev + 1 : 0
                );
                setLightboxScale(1);
                setLightboxPan({ x: 0, y: 0 });
              }}
              title="Next Angle"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700 hover:bg-black text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* High-Resolution Zoomable Image (Smooth easing transform) */}
            <div
              className="relative w-full h-full max-w-4xl max-h-[75vh] flex items-center justify-center will-change-transform"
              style={{
                transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxScale})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={activeImage}
                alt={`${productName} High Resolution Zoom`}
                fill
                priority
                sizes="100vw"
                className="object-contain select-none pointer-events-none drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Modal Footer: Angle Thumbnails */}
          <div
            className="py-3 px-4 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-center gap-3 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setLightboxScale(1);
                  setLightboxPan({ x: 0, y: 0 });
                }}
                className={`relative w-16 h-12 rounded-xl bg-zinc-900 overflow-hidden border p-1 transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? "border-[#74d600] ring-2 ring-[#74d600]/40 scale-105"
                    : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Angle ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
