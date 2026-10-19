"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import ProductCatalogView from "@/components/products/ProductCatalogView";

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

  let initialCategory = "all";
  let initialCondition: "all" | "new" | "pre-owned" = "all";
  let pageTitle: string | undefined = undefined;

  if (mainCategory === "pre-owned-gear") {
    initialCondition = "pre-owned";
    pageTitle = "Certified Pre-Owned Cricket Gear";
  } else if (mainCategory === "new-gear") {
    initialCondition = "new";
    pageTitle = "New Arrival Cricket Gear";
  } else if (mainCategory === "cricket-bats" || mainCategory === "bats") {
    initialCategory = "cricket-bats";
    pageTitle = subCategory
      ? `${subCategory.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} Bats`
      : "Cricket Bats (English & Kashmir Willow)";
  } else if (mainCategory === "batting") {
    initialCategory = "batting";
    pageTitle = "Batting Equipment & Protective Gear";
  } else if (mainCategory === "bowling") {
    initialCategory = "bowling";
    pageTitle = "Bowling Equipment & Match Balls";
  } else if (mainCategory === "wicketkeeping") {
    initialCategory = "batting";
    pageTitle = "Wicketkeeping Gear & Accessories";
  } else if (mainCategory === "shoes") {
    initialCategory = "shoes";
    pageTitle = "Cricket Shoes, Spikes & Footwear";
  } else if (mainCategory === "accessories") {
    initialCategory = "accessories";
    pageTitle = "Kit Bags, Training Gear & Accessories";
  } else {
    initialCategory = "all";
    pageTitle = "Shop Cricket Equipment & Gear";
  }

  return (
    <ProductCatalogView
      initialCategory={initialCategory}
      initialCondition={initialCondition}
      pageTitle={pageTitle}
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
