import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, Users, ArrowRight, Zap, Target } from "lucide-react";

export const metadata = {
  title: "About Us | PLAYZONE Bangladesh",
  description: "Learn about PLAYZONE, Bangladesh's premier direct cricket gear retailer and expert cricket services hub.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Cricket Equipment Reimagined</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Gear Up for Every Innings
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            PLAYZONE is a Bangladesh-first cricket equipment platform. We directly stock, inspect, and deliver authentic cricket gear to players across all 64 districts.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#74d600]/15 border border-[#74d600]/30 flex items-center justify-center mx-auto text-[#74d600] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Direct Retailer Model</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We own and manage our inventory directly. No third-party sellers, no dropshippers—only genuine bats, gloves, and pads inspected by our team.
            </p>
          </div>

          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#74d600]/15 border border-[#74d600]/30 flex items-center justify-center mx-auto text-[#74d600] mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Pre-Owned Cricket Gear</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transparently graded seasoned willow bats sold as-is without inflated promises. Making Grade 1 English willow accessible to every tournament cricketer.
            </p>
          </div>

          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#74d600]/15 border border-[#74d600]/30 flex items-center justify-center mx-auto text-[#74d600] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Hire Cricket Experts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Book professional cricket coaches, sidearm throwers, net bowlers, and fitness mentors for 1-on-1 and club net training sessions in Bangladesh.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed mb-10">
          <h2 className="text-xl font-bold text-white">Our Cricket Story</h2>
          <p>
            Cricket in Bangladesh is more than a sport—it is a passion found in street alleys, school tournaments, first-division leagues, and national stadiums. Yet, finding authentic, high-grade English willow bats and international-standard protective gear at fair prices has always been challenging.
          </p>
          <p>
            PLAYZONE was founded to bridge this gap. By operating as a direct retailer rather than an open marketplace, we ensure that every piece of gear sent to a cricketer—from Dhaka to Dinajpur—is 100% authentic, precisely weighed, and safely packaged.
          </p>
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-6 text-xs text-zinc-400">
            <div>
              <span className="text-xl font-black text-[#a3e635] block">64</span>
              <span>Districts Covered</span>
            </div>
            <div>
              <span className="text-xl font-black text-[#a3e635] block">100%</span>
              <span>Direct Inventory</span>
            </div>
            <div>
              <span className="text-xl font-black text-[#a3e635] block">Cash on Delivery</span>
              <span>Nationwide Option</span>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md text-center"
          >
            Explore Cricket Gear
          </Link>
          <Link
            href="/hire-experts"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm border border-zinc-700 transition-all text-center"
          >
            Hire Cricket Experts
          </Link>
        </div>
      </div>
    </div>
  );
}
