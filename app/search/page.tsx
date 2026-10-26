import { Suspense } from "react";
import { Metadata } from "next";
import SearchPageContent from "@/components/search/SearchPageContent";

export const metadata: Metadata = {
  title: "Search Cricket Products & Experts | PLAYZONE",
  description:
    "Live search for premium cricket bats, gear, pads, balls, shoes, pre-owned equipment, and professional cricket coaches & net bowlers.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#84cc16] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-zinc-600">Loading search results...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
