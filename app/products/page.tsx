"use client";

import React, { Suspense } from "react";
import ProductCatalogView from "@/components/products/ProductCatalogView";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <ProductCatalogView
        initialCategory="all"
        pageTitle="All Cricket Products"
        pageSubtitle="Discover Bangladesh's largest catalog of authentic international cricket equipment."
      />
    </Suspense>
  );
}
