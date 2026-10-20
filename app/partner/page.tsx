import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Institutional Partnerships | PLAYZONE Bangladesh",
  description: "Cricket club, school, and academy equipment partnerships with PLAYZONE Bangladesh.",
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Collaboration</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Partner with PLAYZONE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Supporting cricket academies, school teams, district clubs, and tournament organizers across Bangladesh.
          </p>
        </div>

        {/* Notice of Direct Retailer Model */}
        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed mb-8">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#74d600]" />
              <span>Notice: PLAYZONE Direct Retailer Model</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              PLAYZONE is a direct cricket equipment retailer and sole seller. We do not operate an open third-party seller marketplace, vendor onboarding portal, or seller commission system. All equipment sold on PLAYZONE is directly procured, authenticated, warehoused, and dispatched by PLAYZONE.
            </p>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white">How We Collaborate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h3 className="text-sm font-bold text-white mb-1">Cricket Academies & Schools</h3>
              <p className="text-xs text-zinc-400">
                Bulk institutional pricing for cricket balls, training nets, target stumps, and complete team kit bags.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <h3 className="text-sm font-bold text-white mb-1">Tournament & League Organizers</h3>
              <p className="text-xs text-zinc-400">
                Official ball supply agreements, match umpire booking coordination, and tournament awards gear.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-bold text-white mb-1">Institutional Inquiries</h3>
            <p className="text-zinc-400">
              For institutional equipment procurement or coaching partnerships, reach out directly to our partnerships desk at:{" "}
              <a href="mailto:partners@playzone.com.bd" className="text-[#a3e635] font-bold hover:underline">
                partners@playzone.com.bd
              </a>
            </p>
          </div>
        </div>

        {/* Customer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md text-center"
          >
            Shop Cricket Gear
          </Link>
          <Link
            href="/hire-experts"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all text-center"
          >
            Hire Cricket Experts
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
