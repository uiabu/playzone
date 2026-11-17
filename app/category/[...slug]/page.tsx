"use client";

import React, { Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ShopPageContent from "@/components/shop/ShopPageContent";
import CategoryDetailsContent from "@/components/category/CategoryDetailsContent";
import PreOwnedPageContent from "@/components/preOwned/PreOwnedPageContent";

function CategoryPageContent() {
  const params = useParams();
  const router = useRouter();
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
    mainCategory === "all" ||
    mainCategory === "new-gear"
  ) {
    return <ShopPageContent />;
  }

  // 2. Certified Pre-Owned Gear Dedicated Page
  if (mainCategory === "pre-owned-gear" || mainCategory === "pre-owned") {
    return <PreOwnedPageContent />;
  }

  // Redirect legacy resell route to pre-owned
  useEffect(() => {
    if (mainCategory === "resell") {
      router.replace("/pre-owned");
    }
  }, [mainCategory, router]);

  if (mainCategory === "resell") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-[#74d600] animate-spin" />
      </div>
    );
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
    <div className="min-h-screen bg-white p-6 sm:p-10">
      <div className="max-w-[1440px] mx-auto animate-pulse space-y-6">
        <div className="h-44 bg-zinc-200 rounded-3xl" />
        <div className="h-8 w-48 bg-zinc-200 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 bg-zinc-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryCatchAllPage() {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryPageContent />
    </Suspense>
  );
}
