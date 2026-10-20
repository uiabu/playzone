import React from "react";
import Link from "next/link";
import { Ruler, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Cricket Gear Size Guide | PLAYZONE Bangladesh",
  description: "Accurate sizing charts for cricket bats, batting gloves, pads, and helmets.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Ruler className="w-3.5 h-3.5" />
            <span>Cricket Equipment Standards</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cricket Equipment Size Guide
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Choose the perfect fit for cricket bats, batting pads, gloves, and protective gear.
          </p>
        </div>

        <div className="space-y-8">
          {/* Bat Sizing Chart */}
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#a3e635]">1.</span> Cricket Bat Sizing Chart
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-zinc-300">
                <thead className="bg-zinc-900 text-zinc-400 uppercase text-[11px] font-bold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Bat Size</th>
                    <th className="p-3">Player Height</th>
                    <th className="p-3">Approx. Age</th>
                    <th className="p-3 rounded-r-xl">Total Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  <tr>
                    <td className="p-3 font-bold text-white">Full Size (SH)</td>
                    <td className="p-3">5ft 7in – 6ft 2in</td>
                    <td className="p-3">15+ Years / Adults</td>
                    <td className="p-3 text-[#a3e635] font-semibold">33.5 inches</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Long Handle (LH)</td>
                    <td className="p-3">Over 6ft 2in</td>
                    <td className="p-3">Tall Adults</td>
                    <td className="p-3 text-[#a3e635] font-semibold">34.25 inches</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Harrow</td>
                    <td className="p-3">5ft 4in – 5ft 8in</td>
                    <td className="p-3">12 – 14 Years</td>
                    <td className="p-3 text-[#a3e635] font-semibold">32.75 inches</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Size 6</td>
                    <td className="p-3">5ft 1in – 5ft 4in</td>
                    <td className="p-3">11 – 13 Years</td>
                    <td className="p-3 text-[#a3e635] font-semibold">31.75 inches</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Size 5</td>
                    <td className="p-3">4ft 9in – 5ft 1in</td>
                    <td className="p-3">10 – 12 Years</td>
                    <td className="p-3 text-[#a3e635] font-semibold">30.75 inches</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Size 4</td>
                    <td className="p-3">4ft 6in – 4ft 9in</td>
                    <td className="p-3">9 – 11 Years</td>
                    <td className="p-3 text-[#a3e635] font-semibold">29.75 inches</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pads & Gloves Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gloves */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
              <h2 className="text-base font-bold text-white mb-3">Batting Gloves Sizing</h2>
              <p className="text-xs text-zinc-400 mb-4">
                Measured from wrist crease to top of longest finger:
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Men&apos;s Standard:</span>
                  <span className="text-[#a3e635] font-mono">20.5 – 21.5 cm</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Men&apos;s Large:</span>
                  <span className="text-[#a3e635] font-mono">21.5 – 22.5 cm</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Youth:</span>
                  <span className="text-[#a3e635] font-mono">19.0 – 20.0 cm</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-bold text-white">Junior:</span>
                  <span className="text-[#a3e635] font-mono">17.5 – 18.5 cm</span>
                </li>
              </ul>
            </div>

            {/* Pads */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
              <h2 className="text-base font-bold text-white mb-3">Batting Pads Sizing</h2>
              <p className="text-xs text-zinc-400 mb-4">
                Measured from ankle bone to center of kneecap:
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Men&apos;s Standard:</span>
                  <span className="text-[#a3e635] font-mono">42 – 44 cm (17&quot;)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Men&apos;s Large:</span>
                  <span className="text-[#a3e635] font-mono">45 – 47 cm (18&quot;)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="font-bold text-white">Youth:</span>
                  <span className="text-[#a3e635] font-mono">39 – 41 cm (15.5&quot;)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-bold text-white">Junior:</span>
                  <span className="text-[#a3e635] font-mono">36 – 38 cm (14.5&quot;)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-lime-500/20"
          >
            <span>Shop Equipment With Confidence</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
