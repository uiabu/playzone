"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import ShopPageContent from "@/components/shop/ShopPageContent";
import CategoryDetailsContent from "@/components/category/CategoryDetailsContent";
import PreOwnedPageContent from "@/components/preOwned/PreOwnedPageContent";

function CategoryPageContent() {
  const params = useParams();
  const rawSlug = params?.slug;

  const slugSegments = Array.isArray(rawSlug)
    ? rawSlug
    : typeof rawSlug === "string"
    ? [rawSlug]
    : [];

  const mainCategory = slugSegments[0] || "shop-cricket";
  const subCategory = slugSegments[1] || "";

  // 1. General Cricket Superstore / Shop View
  if (
    mainCategory === "shop-cricket" ||
    mainCategory === "shop" ||
    mainCategory === "all"
  ) {
    return <ShopPageContent />;
  }

  // 2. Certified Pre-Owned Gear Dedicated Page
  if (mainCategory === "pre-owned-gear") {
    return <PreOwnedPageContent />;
  }

  // 3. Category Details Page for specific cricket disciplines and subcategories
  return (
    <CategoryDetailsContent
      categorySlug={mainCategory}
      subCategorySlug={subCategory}
    />
  );
}

function CategorySkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc]/70 p-6 sm:p-10">
      <div className="max-w-[1440px] mx-auto animate-pulse space-y-6">
        <div className="h-44 bg-zinc-200 rounded-3xl" />
        <div className="h-6 bg-zinc-200 rounded w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="h-96 bg-zinc-200 rounded-2xl" />
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-zinc-200 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryDynamicPage() {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryPageContent />
    </Suspense>
  );
}
