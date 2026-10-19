"use client";

import React, { Suspense } from "react";
import ShopPageContent from "@/components/shop/ShopPageContent";

export default function ProductIndexPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <ShopPageContent />
    </Suspense>
  );
}
