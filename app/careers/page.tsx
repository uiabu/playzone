import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Careers | PLAYZONE Bangladesh",
  description: "Join the PLAYZONE team and help shape the future of cricket equipment and coaching in Bangladesh.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Squad</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Build the Future of Bangladesh Cricket
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            We are passionate about cricket equipment, athlete development, and digital retail innovation.
          </p>
        </div>

        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-white">Why Work With PLAYZONE?</h2>
          <p>
            At PLAYZONE, our mission is to empower every cricketer across Bangladesh with authentic, professional-grade equipment and accessible cricket coaching. Our team is based in Dhaka, working directly with national cricketers, club academies, and international gear brands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-sm font-bold text-white mb-1">Cricket Equipment Specialist</h3>
              <p className="text-xs text-zinc-400">
                Assist in willow selection, grain analysis, manual bat knocking, and pre-owned condition grading.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-sm font-bold text-white mb-1">Cricket Expert Coordinator</h3>
              <p className="text-xs text-zinc-400">
                Liaise between customers, academies, Level-1/2 coaches, sidearm throwers, and net bowlers.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-bold text-white mb-1">How to Apply</h3>
            <p className="text-zinc-400">
              Send your CV and a short introduction explaining your passion for cricket to:{" "}
              <a href="mailto:careers@playzone.com.bd" className="text-[#a3e635] font-bold hover:underline">
                careers@playzone.com.bd
              </a>
            </p>
          </div>
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
