import React from "react";
import Link from "next/link";
import { RotateCcw, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy | PLAYZONE Bangladesh",
  description: "Official return and refund guidelines for new and pre-owned cricket equipment at PLAYZONE.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Customer Service</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Return & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Clear, transparent return guidelines for brand-new cricket gear and pre-owned equipment sold by PLAYZONE.
          </p>
        </div>

        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          {/* New Gear Return Policy */}
          <section>
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">1.</span> Brand-New Cricket Equipment
            </h2>
            <p>
              Brand-new gear (cricket bats, batting gloves, pads, helmets, shoes, kit bags) may be returned for exchange if:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
              <li>The item is completely unused, unknocked, and in its original shrink wrap and packaging with tags intact.</li>
              <li>A manufacturing flaw or incorrect item dispatch is reported within <strong>48 hours</strong> of delivery.</li>
              <li>Sizing exchanges for gloves, pads, or shoes are accommodated subject to stock availability and customer courier fee.</li>
            </ul>
          </section>

          {/* Pre-Owned Gear Return Policy */}
          <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-amber-400">2.</span> Pre-Owned Cricket Gear (Sold As-Is)
            </h2>
            <p className="mb-2">
              <strong>All pre-owned cricket equipment is sold As-Is, Without Warranty.</strong>
            </p>
            <p className="text-zinc-400">
              Because pre-owned bats and pads have already seen previous use and are priced with significant discounts based on their graded condition, they are not eligible for trial periods, extended warranties, or change-of-mind refunds.
            </p>
            <p className="mt-2 text-zinc-400">
              If an item arrives damaged due to courier transit or differs materially from the listing photos, customers must inform PLAYZONE support within <strong>24 hours</strong> of receiving the package with unboxing photographs.
            </p>
          </section>

          {/* Business Review Notice */}
          <section className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-1">
                  Business Notice: Formal Terms Review
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Additional terms regarding return processing timeframes and store credit options are currently under formal management review by PLAYZONE executive leadership. We do not invent unsupported return or replacement claims.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Helpline */}
          <section className="pt-4 border-t border-zinc-800">
            <h2 className="text-base font-bold text-white mb-2">Initiate an Exchange or Report an Issue</h2>
            <p className="text-zinc-400">
              Contact our Dhaka customer care desk with your Order ID:
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-zinc-300">
              <span>Hotline: +880 1711-000000</span>
              <span>•</span>
              <span>WhatsApp: +880 1711-000000</span>
              <span>•</span>
              <span>Email: support@playzone.com.bd</span>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-lime-500/20"
          >
            <span>Back to Shopping</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
