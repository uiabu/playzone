import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions (FAQs) | PLAYZONE Bangladesh",
  description: "Find answers about cricket equipment purchases, pre-owned gear policies, and hiring cricket experts at PLAYZONE.",
};

const FAQS = [
  {
    q: "Who is the seller of the products on PLAYZONE?",
    a: "PLAYZONE is the direct retailer and seller of all equipment listed on the platform. We are not an open multi-vendor marketplace; every bat, glove, pad, and helmet is warehoused, inspected, and dispatched directly by our team.",
  },
  {
    q: "What is the difference between New and Pre-Owned cricket gear?",
    a: "New gear consists of 100% brand-new, factory-sealed equipment from authorized brand distributors with standard manufacturer defect coverage. Pre-owned gear consists of genuine, seasoned cricket equipment sold directly by PLAYZONE at discounted prices. Pre-owned items are inspected for structural integrity and assigned a condition grade (Grade A+, A, or B).",
  },
  {
    q: "Does pre-owned equipment come with a warranty?",
    a: "No. Pre-owned cricket equipment is sold strictly As-Is, Without Warranty. We do not offer extended warranties or trial periods on used equipment. We provide honest condition grading, high-resolution photographs, and notes on visible wear so you know exactly what you are purchasing.",
  },
  {
    q: "How does the 'Hire Cricket Experts' booking flow work?",
    a: "You can browse verified cricket professionals (coaches, sidearm throwers, net bowlers, fitness trainers), view their credentials and rates, and submit a booking request with your preferred date, time, and ground location. Once submitted, a PLAYZONE coordinator confirms the session schedule with the expert and contacts you to confirm.",
  },
  {
    q: "What payment methods do you support?",
    a: "We currently support Cash on Delivery (COD) across all 64 districts of Bangladesh. You inspect your package upon courier arrival and pay cash or mobile banking to the courier agent. Automated online instant payment gateways are currently undergoing merchant licensing integration.",
  },
  {
    q: "How much is delivery and how long does it take?",
    a: "Delivery inside Dhaka City takes 24 to 48 hours for a flat fee of ৳80. Delivery outside Dhaka across all other districts takes 48 to 72 hours for a flat fee of ৳150 via trusted courier partners.",
  },
  {
    q: "Can I get my new cricket bat knocked in by PLAYZONE?",
    a: "Yes! You can specify your knocking preference in the order notes during checkout, or contact our customer hotline directly after placing your order. Our team offers professional machine or mallet knocking.",
  },
];

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Knowledgebase</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Everything you need to know about purchasing cricket equipment, condition grading, delivery, and hiring cricket experts.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-[#111216] border border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-700"
            >
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-start gap-2.5">
                <span className="text-[#a3e635] font-black shrink-0">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center max-w-lg mx-auto">
          <h4 className="text-sm font-bold text-white">Have a question not answered here?</h4>
          <p className="text-xs text-zinc-400 mt-1 mb-4">
            Our Dhaka customer service team is ready to assist you.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs transition-all shadow-sm"
            >
              Contact Support
            </Link>
            <Link
              href="/shop"
              className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-zinc-700 transition-all"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
