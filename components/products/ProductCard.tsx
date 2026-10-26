"use client";

import React from "react";
import Link from "next/link";
import { Star, Eye, ShoppingCart } from "lucide-react";
import { Product, getProductViews } from "@/lib/productsData";
import ProductCardMedia from "./ProductCardMedia";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  className = "",
  priority = false,
}: ProductCardProps) {
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/images/products/bats/sg_bat.png";

  const targetSlug = product.slug || product.id;

  return (
    <Link
      href={`/product/${targetSlug}`}
      className={`group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none ${className}`}
    >
      <div>
        {/* Media (Image with YouTube Video on Hover) */}
        <ProductCardMedia
          src={imageSrc}
          alt={product.name}
          videoUrl={product.videoUrl}
          badge={product.badge}
          priority={priority}
          className="mb-3"
        />

        {/* Brand & Title */}
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
          {product.brand}
        </span>
        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px] mt-0.5">
          {product.name}
        </h3>

        {/* Ratings & Views */}
        <div className="flex items-center justify-between gap-1 mt-2">
          <div className="flex items-center gap-1 min-w-0">
            <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "fill-[#84cc16] text-[#84cc16]"
                      : i < product.rating
                      ? "fill-[#84cc16]/50 text-[#84cc16]"
                      : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-zinc-700">
              {product.rating}
            </span>
            <span className="text-[11px] text-zinc-400">
              ({product.reviewsCount})
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0"
            title="Views"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>{getProductViews(product)}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Cart Action */}
      <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight block">
            ৳ {product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-zinc-400 line-through">
              ৳ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {onAddToCart && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="w-8 h-8 rounded-xl bg-zinc-900 group-hover:bg-[#84cc16] text-white group-hover:text-black flex items-center justify-center transition-colors shadow-xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </Link>
  );
}
