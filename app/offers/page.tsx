"use client";

import React, { Suspense } from "react";
import OffersPageContent from "@/components/offers/OffersPageContent";

export default function OffersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OffersPageContent />
    </Suspense>
  );
}
