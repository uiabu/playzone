"use client";

import React, { Suspense } from "react";
import ShopPageContent from "@/components/shop/ShopPageContent";

export default function CategoryIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopPageContent />
    </Suspense>
  );
}
