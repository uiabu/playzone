"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  Star,
  RefreshCw,
  Search,
  ShoppingCart,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";
import TradeInModal from "./TradeInModal";

type CategoryFilter = "all" | "bats" | "pads-gloves" | "helmets" | "shoes-bags";
type GradeFilter = "all" | "Grade A+" | "Grade A" | "Grade B";

interface PreOwnedItem extends Product {
  grade: "Grade A+" | "Grade A" | "Grade B";
  conditionScore: string;
  inspectionNote: string;
}

// Dedicated Pre-Owned Catalog tailored to Bangladesh cricketers
const PRE_OWNED_CATALOG: PreOwnedItem[] = [
  {
    id: "ss-ton-reserve-edition",
    slug: "ss-ton-reserve-edition",
    name: "SS TON Reserve Edition Cricket Bat",
    brand: "SS Sunridges",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 4800,
    originalPrice: 8500,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    stockCount: 3,
    images: ["/images/products/bats/ss_ton.png"],
    shortDescription: "Certified Grade A pre-owned English Willow bat. Seasoned and match-ready.",
    description: "Inspected by PLAYZONE master bat-makers. Zero handle cracks, clean ping, newly oiled and gripped.",
    highlights: ["Grade A Condition (9/10)", "Fully Seasoned & Match Ready", "New Grip & Toe Guard"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Handle Integrity Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.2/10 Condition",
    inspectionNote: "Acoustic ping verified • Zero handle stress",
  },
  {
    id: "sf-stanford-players-edition",
    slug: "sf-stanford-players-edition",
    name: "SF Stanford Players Edition Cricket Bat",
    brand: "SF Stanford",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 3600,
    originalPrice: 6500,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.6,
    reviewsCount: 52,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/sf_bat.png"],
    shortDescription: "Naturally aged English willow with outstanding rebound response.",
    description: "Tested and certified. Refitted with high-traction grip and fresh Extratec face sheet.",
    highlights: ["Grade A Condition (9/10)", "Deep ping resonance", "Toe guard fitted"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Handle Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Straight grains • Sanded & re-oiled",
  },
  {
    id: "sg-savage-english-willow",
    slug: "sg-savage-english-willow",
    name: "SG Savage Edition English Willow (Pre-Owned)",
    brand: "SG Cricket",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 5200,
    originalPrice: 9500,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.9,
    reviewsCount: 114,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/bats/sg_bat.png"],
    shortDescription: "Like-new condition. Played only 2 net sessions. Massive 40mm power edges.",
    description: "Mint condition Grade A+ English Willow. Flawless face, perfectly balanced Sarawak cane handle.",
    highlights: ["Grade A+ Mint Condition (9.5/10)", "Huge 40mm edges", "Ready for match play"],
    specs: [{ label: "Condition", value: "Grade A+ (9.5/10)" }],
    warranty: "6-Month Handle Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A+",
    conditionScore: "9.5/10 Like-New",
    inspectionNote: "Only 2 net sessions • Flawless blade",
  },
  {
    id: "kookaburra-aura-pro",
    slug: "kookaburra-aura-pro",
    name: "Kookaburra Aura Pro (Pre-Owned Grade A)",
    brand: "Kookaburra",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 4500,
    originalPrice: 8200,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 76,
    inStock: true,
    stockCount: 3,
    images: ["/images/products/bats/kookaburra_bat.png"],
    shortDescription: "Australian profile with sweeping spine contour. Seasoned English Willow.",
    description: "Fully inspected and certified. Re-oiled and fitted with new grip. Extraordinary pick-up.",
    highlights: ["Grade A Condition (9/10)", "Lightweight feel", "Dynamic power face"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Handle Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.1/10 Condition",
    inspectionNote: "Acoustic mallet tested • 100% sound",
  },
  {
    id: "mrf-genius-grand-edition",
    slug: "mrf-genius-grand-edition",
    name: "MRF Genius Grand Edition (Pre-Owned Grade A)",
    brand: "MRF",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 5900,
    originalPrice: 11500,
    discountPercent: 49,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/mrf.png"],
    shortDescription: "Player spec Grade 1 English Willow at half the price. Exceptional middle.",
    description: "Certified pre-owned. 9 straight grains, clean face, newly fitted rubber toe protector.",
    highlights: ["Grade A Condition (9.3/10)", "9 Straight grains", "Superb ping"],
    specs: [{ label: "Condition", value: "Grade A (9.3/10)" }],
    warranty: "6-Month Handle Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.3/10 Condition",
    inspectionNote: "Grade 1 English cleft • Clean rebound",
  },
  {
    id: "dsc-split-44-kashmir",
    slug: "dsc-split-44-kashmir",
    name: "DSC Split 44 Power Bat (Pre-Owned Grade B)",
    brand: "DSC",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 1650,
    originalPrice: 2800,
    discountPercent: 41,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.4,
    reviewsCount: 68,
    inStock: true,
    stockCount: 6,
    images: ["/images/products/bats/dsc_bat.png"],
    shortDescription: "Budget powerhouse for tape-ball and club net practice. Solid meat behind the mid.",
    description: "Honest surface cosmetic wear, but structurally 100% sound. Maximum power per Taka.",
    highlights: ["Grade B Value Condition (8/10)", "Ideal for heavy practice", "New grip"],
    specs: [{ label: "Condition", value: "Grade B (8/10)" }],
    warranty: "3-Month Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade B",
    conditionScore: "8.0/10 Value",
    inspectionNote: "Superb for nets • Solid handle",
  },
  // BATTING GEAR & PROTECTION
  {
    id: "new-balance-tc-batting-pads",
    slug: "new-balance-tc-batting-pads",
    name: "New Balance TC 1260 Batting Pads",
    brand: "New Balance",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 2900,
    originalPrice: 5200,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.8,
    reviewsCount: 86,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/batting_essentials/new_balance_pads.png"],
    shortDescription: "Pro level vertical cane legguards with clean white facing and intact straps.",
    description: "Pre-owned Grade A condition. Cleaned and sanitized, zero structural damage.",
    highlights: ["Grade A Condition (9/10)", "Lightweight 820g per pad", "Sanitized"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Clean white PU • Spotless velcro",
  },
  {
    id: "gray-nicolls-elite-helmet",
    slug: "gray-nicolls-elite-helmet",
    name: "Gray-Nicolls Elite Cricket Helmet",
    brand: "Gray-Nicolls",
    category: "Protection",
    categorySlug: "batting",
    price: 3600,
    originalPrice: 6200,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/batting_essentials/gray_nicolls_helmet.png"],
    shortDescription: "Certified steel grille face protection. Inspected for zero shell stress.",
    description: "Fully sanitized, structurally inspected for shell and grille integrity, fitted with fresh padding.",
    highlights: ["Grade A Condition (9.2/10)", "High tensile steel grille", "Sanitized inner lining"],
    specs: [{ label: "Condition", value: "Grade A (9.2/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.2/10 Condition",
    inspectionNote: "Shell X-ray tested • Grille intact",
  },
  {
    id: "gray-nicolls-thigh-guard",
    slug: "gray-nicolls-thigh-guard",
    name: "Gray-Nicolls All-in-One Thigh Guard",
    brand: "Gray-Nicolls",
    category: "Protection",
    categorySlug: "batting",
    price: 1800,
    originalPrice: 3200,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.6,
    reviewsCount: 72,
    inStock: true,
    stockCount: 6,
    images: ["/images/products/batting_essentials/gray_nicolls_thigh_guard_upscaled.png"],
    shortDescription: "Dual thigh combination pad. High-density molded EVA foam with poly shell inserts.",
    description: "Pre-owned Grade A, fully washed and sanitized with pristine velcro straps.",
    highlights: ["Grade A Condition (9/10)", "Molded HD EVA Foam", "Sanitized & Fresh"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Elastic bands intact • Sanitized",
  },
  {
    id: "sg-test-batting-gloves",
    slug: "sg-test-batting-gloves",
    name: "SG Test Batting Gloves (Pre-Owned Grade A)",
    brand: "SG Cricket",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 1850,
    originalPrice: 3200,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 64,
    inStock: true,
    stockCount: 5,
    images: ["/images/products/batting_essentials/sg_gloves.png"],
    shortDescription: "Soft sheep leather palm, multi-split sausage rolls. Fully sanitized with zero tears.",
    description: "Gently used for 3 matches. Sanitized with antimicrobial leather treatment. Soft, flexible palm.",
    highlights: ["Grade A Condition (9/10)", "Supple sheep leather", "Antimicrobial treated"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Treated & sanitized • Zero seam tears",
  },
  // SHOES & KIT BAGS
  {
    id: "adidas-22yds-spikes",
    slug: "adidas-22yds-spikes",
    name: "Adidas 22YDS Metal Spikes (Pre-Owned Grade A)",
    brand: "Adidas",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 4400,
    originalPrice: 7800,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 39,
    inStock: true,
    stockCount: 3,
    images: ["/images/products/shoes_bags/adidas_spikes.png"],
    shortDescription: "Pro metal spikes for turf wickets. Complete set of fresh replacement spikes included.",
    description: "Inspected for upper integrity and sole plate rigidity. Thoroughly washed and deodorized.",
    highlights: ["Grade A Condition (8.8/10)", "Spikes wrench key included", "Sanitized"],
    specs: [{ label: "Condition", value: "Grade A (8.8/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "8.8/10 Condition",
    inspectionNote: "Sole plate solid • New spike set",
  },
  {
    id: "playzone-pro-wheelie-bag",
    slug: "playzone-pro-wheelie-bag",
    name: "PLAYZONE Pro Wheelie Kit Bag (Pre-Owned Grade A)",
    brand: "PLAYZONE",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 4600,
    originalPrice: 8500,
    discountPercent: 46,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/shoes_bags/playzone_wheelie_bag.png"],
    shortDescription: "Heavy duty tractor wheelie bag. 3-bat padded compartment and separate shoe tunnel.",
    description: "All zippers and tractor wheel bearings verified and lubricated. Clean ballistic nylon exterior.",
    highlights: ["Grade A Condition (9/10)", "Heavy tractor wheels", "Zippers 100% smooth"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "1-Year Hardware Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Wheels lubricated • Heavy duty 1680D",
  },
];

export default function PreOwnedPageContent() {
  const { addItem, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedGrade, setSelectedGrade] = useState<GradeFilter>("all");
  const [sortBy, setSortBy] = useState<string>("savings");
  const [isTradeInOpen, setIsTradeInOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return PRE_OWNED_CATALOG.filter((item) => {
      // Category filter
      if (selectedCategory === "bats" && item.categorySlug !== "cricket-bats") return false;
      if (selectedCategory === "pads-gloves" && !item.name.toLowerCase().includes("pad") && !item.name.toLowerCase().includes("glove")) return false;
      if (selectedCategory === "helmets" && !item.name.toLowerCase().includes("helmet") && !item.name.toLowerCase().includes("guard")) return false;
      if (selectedCategory === "shoes-bags" && item.categorySlug !== "shoes" && item.categorySlug !== "accessories") return false;

      // Grade filter
      if (selectedGrade !== "all" && item.grade !== selectedGrade) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.discountPercent || 0) - (a.discountPercent || 0); // Default highest savings %
    });
  }, [selectedCategory, selectedGrade, sortBy]);

  const handleQuickAdd = (item: PreOwnedItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.images[0],
      category: item.category,
    });
    setToastMessage(`Added "${item.name}" to cart at pre-owned deal price!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        {/* 1. Panoramic Pre-Owned CTA Banner (Matching Home Page Mockup) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-zinc-800/40 bg-black">
          <Image
            src="/pre_owned_cta_banner.png"
            alt="Great Gear. Smarter Prices. Quality pre-owned cricket gear at unbeatable value."
            width={2170}
            height={725}
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 2. Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 font-medium"
        >
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 font-semibold">Pre-Owned Cricket Gear</span>
        </nav>

        {/* 3. Heading & Concept Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#4d7c0f] text-xs font-black uppercase tracking-wider">
              PLAYZONE CERTIFIED PRE-OWNED PROGRAM
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 mt-2">
              Great Gear. Smarter Prices.
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-2xl leading-relaxed">
              Play with premium English Willow bats and international gear at 40% – 50% lower prices. Every piece is 12-point certified, fully seasoned, sanitized, and backed by our 7-day risk-free net trial.
            </p>
          </div>

          {/* Sell / Trade-in Trigger Button */}
          <button
            type="button"
            onClick={() => setIsTradeInOpen(true)}
            className="px-5 py-3 rounded-2xl bg-zinc-950 hover:bg-black active:scale-98 text-white font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-md shrink-0 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4 text-[#84cc16]" />
            <span>Sell or Trade-In Your Old Gear →</span>
          </button>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-lime-50 border border-lime-300 text-xs sm:text-sm font-bold text-[#4d7c0f] flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4d7c0f]" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={openCart}
              className="underline text-black font-extrabold cursor-pointer"
            >
              View Cart →
            </button>
          </div>
        )}

        {/* 4. The 3 Condition Grades Explainer (The Concept Core) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#84cc16]" />
              <span>Our Inspection & Grading Standards</span>
            </h2>
            <span className="text-xs text-zinc-400">100% Genuine English Willow Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grade A+ */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  MINT CONDITION • 9.5/10
                </span>
                <span className="text-xs font-bold text-zinc-500">Save 35% - 45%</span>
              </div>
              <h3 className="text-base font-black text-zinc-950">Grade A+ (Like New)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Played only 1–2 friendly matches or net sessions. Spotless face, zero blade stress or edge bruises, fitted with a fresh factory grip.
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>Indistinguishable from brand-new</span>
              </div>
            </div>

            {/* Grade A */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[#84cc16]/50 shadow-xs hover:shadow-md transition-all space-y-2.5 relative">
              <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#84cc16] text-black text-[9px] font-black uppercase tracking-wider shadow-2xs">
                MOST POPULAR
              </span>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] text-[10px] font-black uppercase tracking-wider">
                  MATCH READY • 9.0/10
                </span>
                <span className="text-xs font-bold text-zinc-500">Save 40% - 50%</span>
              </div>
              <h3 className="text-base font-black text-zinc-950">Grade A (Seasoned Pro)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Naturally seasoned and fully knocked-in by master bat-makers. Re-oiled with English linseed oil, new rubber toe-guard, and clean ping.
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#4d7c0f]">
                <Check className="w-3.5 h-3.5" />
                <span>Ready for league matches immediately</span>
              </div>
            </div>

            {/* Grade B */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                  BUDGET VALUE • 8.0/10
                </span>
                <span className="text-xs font-bold text-zinc-500">Save 50% - 60%</span>
              </div>
              <h3 className="text-base font-black text-zinc-950">Grade B (Practice Value)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Normal cosmetic seam marks or surface blemishes, but 100% structurally sound handle and core. Ideal for heavy academy and net drills.
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
                <Check className="w-3.5 h-3.5" />
                <span>Maximum power and savings per Taka</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. PLAYZONE 4 Trust Pillars */}
        <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">12-Point Checked</strong>
              <span className="text-zinc-500 text-[11px]">Zero hidden cracks</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">Fully Knocked-In</strong>
              <span className="text-zinc-500 text-[11px]">Match ready on day 1</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">7-Day Net Trial</strong>
              <span className="text-zinc-500 text-[11px]">Risk-free exchange</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">6-Month Warranty</strong>
              <span className="text-zinc-500 text-[11px]">Handle integrity cover</span>
            </div>
          </div>
        </div>

        {/* 6. Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: "all", label: "All Pre-Owned" },
              { id: "bats", label: "Cricket Bats" },
              { id: "pads-gloves", label: "Pads & Gloves" },
              { id: "helmets", label: "Helmets & Protection" },
              { id: "shoes-bags", label: "Shoes & Bags" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grade Selector & Sort */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Grade filter */}
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as GradeFilter)}
                className="appearance-none bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 rounded-lg px-3 py-1.5 pr-8 hover:border-zinc-300 focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="all">All Grades</option>
                <option value="Grade A+">Grade A+ (Like New)</option>
                <option value="Grade A">Grade A (Match Ready)</option>
                <option value="Grade B">Grade B (Value)</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 rounded-lg px-3 py-1.5 pr-8 hover:border-zinc-300 focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="savings">Biggest Savings %</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Product Cards Grid (Matching Concept Mockup) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
            >
              {/* Media area */}
              <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px"
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                />

                {/* EXACT LIME GREEN BADGE FROM SCREENSHOT: PRE-OWNED - GRADE A */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#a3e635] text-black shadow-xs">
                    PRE-OWNED • {item.grade.toUpperCase()}
                  </span>
                </div>

                {/* Savings Pill */}
                {item.discountPercent && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow-2xs">
                    Save {item.discountPercent}%
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    {item.conditionScore}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px] mt-0.5">
                  {item.name}
                </h3>

                {/* Ratings */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex items-center gap-0.5 text-[#84cc16]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(item.rating)
                            ? "fill-[#84cc16] text-[#84cc16]"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-700">
                    {item.rating}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    ({item.reviewsCount})
                  </span>
                </div>

                {/* Inspection Note */}
                <p className="text-[11px] text-zinc-500 truncate pt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#84cc16] shrink-0" />
                  <span>{item.inspectionNote}</span>
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight block">
                    ৳ {item.price.toLocaleString()}
                  </span>
                  {item.originalPrice && (
                    <span className="text-[11px] text-zinc-400 line-through">
                      New: ৳ {item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Quick Add Button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="py-1.5 px-3 rounded-lg bg-[#84cc16] hover:bg-[#73b512] active:bg-[#65a30d] text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer shrink-0"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* 8. The PLAYZONE 12-Point Inspection Process Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-[11px] font-black uppercase text-[#4d7c0f] tracking-wider">
              HOW WE CERTIFY EVERY BAT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mt-1">
              The PLAYZONE 12-Point Quality Certification Process
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
              Unlike unverified second-hand gear on social media, every bat sold through PLAYZONE undergoes rigorous acoustic, structural, and moisture tests by veteran bat-makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-zinc-950 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-sm text-zinc-900">
                Handle Flex & Cane Integrity
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                We stress-test the Sarawak cane handle on an automated flex jig to detect any internal rubber delamination or handle loosening.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-zinc-950 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-sm text-zinc-900">
                Acoustic Ping & Rebound Test
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tapped with precision mallets across 12 grid points on the blade to measure sound pitch and rebound velocity, mapping the exact sweet spot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="w-7 h-7 rounded-full bg-zinc-950 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-sm text-zinc-900">
                Sanding, Linseed Oiling & New Grip
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Surface blemishes are gently hand-sanded. The cleft receives pure English raw linseed oil, a fresh high-traction grip, and a new rubber toe guard.
              </p>
            </div>
          </div>
        </div>

        {/* 9. Player Testimonial Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
              TRUSTED BY 2,000+ BANGLADESH CRICKETERS
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              "Scored my first First-Division century with a Pre-Owned SS TON"
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              "Saved ৳4,000 compared to a brand new bat, and the ping was already seasoned and explosive. The 7-day trial gave me total peace of mind." — Tanvir A., Dhaka League Player
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsTradeInOpen(true)}
            className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-md cursor-pointer"
          >
            Sell Your Gear to Us →
          </button>
        </div>
      </div>

      {/* Trade In Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
      />
    </main>
  );
}
