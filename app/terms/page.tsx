import React from "react";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service | PLAYZONE Bangladesh",
  description: "Official terms of service and purchase policies for PLAYZONE cricket equipment and expert bookings.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Please read these terms carefully before purchasing cricket equipment or submitting cricket expert booking requests on PLAYZONE.
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">Last Updated: October 2026</p>
        </div>

        {/* Content Card */}
        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">1.</span> Direct Retailer Business Model
            </h2>
            <p>
              PLAYZONE (operated in Dhaka, Bangladesh) is the direct retailer and sole seller of all equipment presented on this website. PLAYZONE does not operate as an open third-party seller marketplace, multi-vendor bazaar, or auction site. Every product listed in our inventory is directly managed, warehoused, and dispatched by PLAYZONE.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">2.</span> Brand-New Cricket Equipment
            </h2>
            <p>
              All new cricket bats, batting pads, batting gloves, helmets, cricket balls, kit bags, and accessories are 100% authentic gear sourced from authorized brand distributors (including SS Sunridges, SG Cricket, Kookaburra, Gray-Nicolls, MRF, New Balance, and DSC). Standard manufacturer defect policies apply as specified on product listings.
            </p>
          </section>

          {/* Section 3: Pre-Owned Gear Policy */}
          <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">3.</span> Pre-Owned Cricket Gear Policy (Sold As-Is)
            </h2>
            <p className="mb-2">
              <strong>Pre-owned cricket equipment is sold strictly As-Is, Without Warranty.</strong> PLAYZONE does not provide extended warranties, replacement guarantees, or trial periods for pre-owned bats and protective gear.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs">
              <li>
                <strong>Condition Grading:</strong> Used bats and gear are graded into standard tiers (Grade A+, Grade A, Grade B) based on manual visual inspection of willow grain, face wear, cleft firmness, and handle binding.
              </li>
              <li>
                <strong>Photographs & Descriptions:</strong> Product listings reflect actual photographs and transparent condition notes describing visible surface marks, scuffs, or repairs.
              </li>
              <li>
                <strong>Delivery Inspection:</strong> Customers are advised to inspect the package upon courier arrival.
              </li>
            </ul>
          </section>

          {/* Section 4: Safety Critical Equipment */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">4.</span> Helmets & Safety-Critical Equipment
            </h2>
            <p>
              Player safety is critical in cricket. While PLAYZONE inspects pre-owned helmets for shell integrity, grill tightness, and chin strap attachment, pre-owned protective gear is sold without manufacturer safety re-certification claims. Customers are encouraged to purchase brand-new certified helmets for competitive leather-ball cricket against high-pace bowling.
            </p>
          </section>

          {/* Section 5: Hire Experts Flow */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">5.</span> Hire Cricket Experts Booking Requests
            </h2>
            <p>
              PLAYZONE connects cricket players, clubs, and academies with experienced cricket professionals, including Level-1/Level-2 coaches, sidearm throwers, net bowlers, and fitness trainers.
            </p>
            <p className="mt-2 text-zinc-400">
              When a booking request is submitted on PLAYZONE, it enters a <strong>Pending Confirmation</strong> status. A PLAYZONE sports coordinator verifies ground availability and coach schedule with the professional before confirming the training session. Submitting a request does not constitute an instant contract until confirmation.
            </p>
          </section>

          {/* Section 6: Orders & Payments */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-[#a3e635]">6.</span> Pricing, Courier Delivery & Payments
            </h2>
            <p>
              All listed product prices are in Bangladeshi Taka (৳ BDT). Courier shipping fees are ৳80 for delivery inside Dhaka City (24-48 hours) and ৳150 for districts outside Dhaka (48-72 hours). Cash on Delivery (COD) is available nationwide.
            </p>
          </section>

          {/* Section 7: Policy Decisions Under Review */}
          <section className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-300 mb-1">
                  Notice: Specific Return & Exchange Policy Under Formal Review
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Detailed return, refund, and exchange timeframes for pre-owned equipment are currently under formal review by PLAYZONE management. To protect consumer clarity without fabricating policies, damaged or misdescribed items upon courier delivery must be reported to our customer service helpline within 24 hours of delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Contact */}
          <section className="pt-4 border-t border-zinc-800">
            <h2 className="text-base sm:text-lg font-bold text-white mb-2">
              Customer Support & Inquiries
            </h2>
            <p className="text-zinc-400">
              For any questions regarding your order or these terms, contact our Dhaka support desk at:
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-zinc-300">
              <span>Hotline: +880 1711-000000</span>
              <span>•</span>
              <span>Email: support@playzone.com.bd</span>
              <span>•</span>
              <span>Dhaka, Bangladesh</span>
            </div>
          </section>
        </div>

        {/* Footer Back link */}
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
