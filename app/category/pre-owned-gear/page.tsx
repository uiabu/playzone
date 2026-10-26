"use client";

import React, { Suspense } from "react";
import PreOwnedPageContent from "@/components/preOwned/PreOwnedPageContent";

export default function PreOwnedGearPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PreOwnedPageContent />
    </Suspense>
  );
}
