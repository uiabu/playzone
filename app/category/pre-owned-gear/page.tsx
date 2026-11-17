import { Suspense } from "react";
import { Metadata } from "next";
import PreOwnedPageContent from "@/components/preOwned/PreOwnedPageContent";

export const metadata: Metadata = {
  title: "Pre-Owned Cricket Gear | Certified Used Equipment | PLAYZONE",
  description:
    "Explore PlayZone certified pre-owned cricket gear. Test-grade English Willow bats, batting protection, and match equipment inspected, certified, and sold exclusively by PlayZone authorities at 40%–50% savings.",
};

export default function PreOwnedGearPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-[#74d600] animate-spin" />
            <p className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Loading Pre-Owned Gear...
            </p>
          </div>
        </div>
      }
    >
      <PreOwnedPageContent />
    </Suspense>
  );
}
