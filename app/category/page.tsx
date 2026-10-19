"use client";

import React, { Suspense } from "react";
import ProductCatalogView from "@/components/products/ProductCatalogView";

export default function CategoryIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <ProductCatalogView
        initialCategory="all"
        pageTitle="Shop All Cricket Categories"
        pageSubtitle="Explore our complete range of cricket bats, batting gear, bowling balls, shoes and kit bags."
      />
    </Suspense>
  );
}
