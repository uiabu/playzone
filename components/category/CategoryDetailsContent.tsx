"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Sparkles,
  Award,
  Info,
  SlidersHorizontal,
  Flame,
} from "lucide-react";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";

interface SubmenuTab {
  id: string;
  label: string;
  slug: string;
}

interface CategoryConfig {
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerSubtitle: string;
  submenus: SubmenuTab[];
  guideTitle: string;
  guidePoints: { title: string; desc: string }[];
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "cricket-bats": {
    title: "Cricket Bats",
    subtitle: "English Willow & Kashmir Willow match bats handcrafted by legendary makers.",
    bannerTitle: "MASTER BATS FOR EVERY INNINGS",
    bannerSubtitle: "Explore test-grade English Willow clefts, massive 40mm power edges and feather-light pick-up profiles.",
    submenus: [
      { id: "all", label: "All Bats", slug: "" },
      { id: "english-willow-bats", label: "English Willow Bats", slug: "english-willow-bats" },
      { id: "kashmir-willow-bats", label: "Kashmir Willow Bats", slug: "kashmir-willow-bats" },
      { id: "tennis-tape-ball-bats", label: "Tennis / Tape Ball Bats", slug: "tennis-tape-ball-bats" },
      { id: "junior-youth-bats", label: "Junior & Knocked", slug: "junior-youth-bats" },
      { id: "ss-sunridges", label: "SS Sunridges", slug: "ss-sunridges" },
      { id: "sg-cricket", label: "SG Cricket", slug: "sg-cricket" },
      { id: "kookaburra", label: "Kookaburra", slug: "kookaburra" },
      { id: "mrf", label: "MRF", slug: "mrf" },
      { id: "gray-nicolls", label: "Gray-Nicolls", slug: "gray-nicolls" },
      { id: "dsc", label: "DSC", slug: "dsc" },
    ],
    guideTitle: "Cricket Bat Buyer's Guide",
    guidePoints: [
      { title: "English Willow vs. Kashmir", desc: "Grade 1 & 2 English willow delivers supreme ping and rebound for league cricket. Kashmir willow provides durable, economical power for tape-ball and practice." },
      { title: "Sweet Spot Profile", desc: "Mid-to-low sweet spots suit subcontinental wickets with true bounce, maximizing drive power." },
      { title: "Weight & Balance", desc: "A lighter pick-up (2.7 - 2.8 lbs) allows fast hand speed against 135+ km/h pace bowling." },
    ],
  },
  "batting": {
    title: "Batting Equipment & Protective Gear",
    subtitle: "Test match protection pads, leather palm gloves, helmets and guards.",
    bannerTitle: "FEARLESS BATTING PROTECTION",
    bannerSubtitle: "Face 140+ km/h pace bowling with complete confidence. Multi-split sausage gloves and lightweight cane pads.",
    submenus: [
      { id: "all", label: "All Batting Gear", slug: "" },
      { id: "batting-gloves", label: "Batting Gloves", slug: "batting-gloves" },
      { id: "batting-pads", label: "Batting Pads", slug: "batting-legguards-pads" },
      { id: "cricket-helmets", label: "Cricket Helmets", slug: "cricket-helmets" },
      { id: "dual-thigh-guards", label: "Dual Thigh Guards", slug: "dual-thigh-guards" },
      { id: "chest-arm-guards", label: "Chest & Arm Guards", slug: "chest-arm-guards" },
      { id: "abdominal-guards", label: "Abdominal Guards", slug: "abdominal-guards" },
      { id: "chamois-padded-inners", label: "Chamois Inners", slug: "chamois-padded-inners" },
    ],
    guideTitle: "Batting Protection Standards",
    guidePoints: [
      { title: "Glove Palm Leather", desc: "Pittards & sheep leather offer supreme sweat absorption and non-slip bat handle control." },
      { title: "Legguard Cane Structure", desc: "Traditional 7-cane vertical ribs disperse high-velocity leather ball impacts across the shin." },
      { title: "Helmet Certification", desc: "Always look for BS 7928 certified titanium or high-tensile steel face grilles for neck safety." },
    ],
  },
  "bowling": {
    title: "Bowling Gear & Match Balls",
    subtitle: "Regulation leather match balls, bowling spikes, and fielding training equipment.",
    bannerTitle: "BOWLING ARSENAL & MATCH BALLS",
    bannerSubtitle: "Four-piece alum tanned leather match balls with prominent hand-stitched seams for lasting swing.",
    submenus: [
      { id: "all", label: "All Bowling Gear", slug: "" },
      { id: "red-4-piece-leather-balls", label: "Red 4-Piece Match Balls", slug: "red-4-piece-leather-balls" },
      { id: "white-match-leather-balls", label: "White & Pink Match Balls", slug: "white-match-leather-balls" },
      { id: "bowling-spikes-boots", label: "Bowling Spikes & Boots", slug: "bowling-spikes-boots" },
      { id: "pitch-markers-target-mats", label: "Pitch Markers & Nets", slug: "pitch-markers-target-mats" },
    ],
    guideTitle: "Cricket Ball & Bowling Guide",
    guidePoints: [
      { title: "4-Piece Match Balls", desc: "Alum-tanned steer hide with 75-80 hand stitches retains shape across 50-over league innings." },
      { title: "Bowling Footwear Support", desc: "Rearfoot GEL and reinforced toe bumpers cushion the landing foot against severe shock." },
      { title: "Seam Maintenance", desc: "Keep ball seam clean and dry. Avoid abrasive grit on practice wickets to preserve swing." },
    ],
  },
  "wicketkeeping": {
    title: "Wicketkeeping Gear",
    subtitle: "Supple octopus grip gloves, lightweight compact pads and padded chamois inners.",
    bannerTitle: "ELITE WICKETKEEPING GEAR",
    bannerSubtitle: "High-flex webbing and padded catch cups engineered for lightning-quick stumpings and catches.",
    submenus: [
      { id: "all", label: "All Keeper Gear", slug: "" },
      { id: "wicket-keeping-gloves", label: "Keeping Gloves", slug: "wicket-keeping-gloves" },
      { id: "wicket-keeping-pads", label: "Keeping Pads", slug: "wicket-keeping-pads" },
      { id: "padded-inner-gloves", label: "Padded Inner Gloves", slug: "padded-inner-gloves" },
      { id: "keeper-helmets-caps", label: "Keeper Helmets", slug: "keeper-helmets-caps" },
    ],
    guideTitle: "Wicketkeeper Sizing & Care",
    guidePoints: [
      { title: "Webbing Compliance", desc: "All Playzone keeper gloves feature ICC regulation compliant T-web thumb configurations." },
      { title: "Compact Shin Bolsters", desc: "Shortened leg guards allow fast squatting and diving without knee clash." },
    ],
  },
  "shoes": {
    title: "Cricket Shoes & Spikes",
    subtitle: "Full metal spike plates for turf and multi-lug rubber studs for hard matting.",
    bannerTitle: "EXPLOSIVE TRACTION CRICKET FOOTWEAR",
    bannerSubtitle: "Built for rapid running between wickets and high-impact bowling strides.",
    submenus: [
      { id: "all", label: "All Footwear", slug: "" },
      { id: "full-metal-spikes-turf", label: "Full Metal Spikes (Turf)", slug: "full-metal-spikes-turf" },
      { id: "rubber-studs-matting-hard-ground", label: "Rubber Studs (Matting)", slug: "rubber-studs-matting-hard-ground" },
      { id: "all-rounder-performance-shoes", label: "All-Rounder Performance", slug: "all-rounder-performance-shoes" },
    ],
    guideTitle: "Turf Spikes vs. Rubber Studs",
    guidePoints: [
      { title: "Turf Pitches", desc: "Full metal spikes (7 front, 4 heel) penetrate grass turf for non-slip push-off." },
      { title: "Matting / Hard Ground", desc: "Multi-stud rubber soles prevent heel bruising on asphalt and coir matting." },
    ],
  },
  "accessories": {
    title: "Kit Bags & Cricket Essentials",
    subtitle: "Heavy duty tractor wheelie bags, duffles, bat grips, mallets and training cones.",
    bannerTitle: "TOUR-GRADE KIT BAGS & ACCESSORIES",
    bannerSubtitle: "Keep your entire cricket equipment organized, protected and travel-ready.",
    submenus: [
      { id: "all", label: "All Accessories", slug: "" },
      { id: "wheelie-duffle-bags", label: "Wheelie & Duffle Bags", slug: "wheelie-duffle-bags" },
      { id: "replacement-grips", label: "Bat Grips & Care Kit", slug: "replacement-grips" },
      { id: "target-stumps-bails", label: "Target Nets & Agility", slug: "target-stumps-bails" },
    ],
    guideTitle: "Cricket Kit Maintenance",
    guidePoints: [
      { title: "Bag Capacity", desc: "120L+ wheelie bags with internal padded bat sleeves prevent blade scratches." },
      { title: "Grip Application", desc: "Use a wooden grip cone for effortless replacement without tearing chevron rubber." },
    ],
  },
  "new-gear": {
    title: "New Arrival Cricket Gear",
    subtitle: "Latest 2026 releases in bats, protective equipment, match balls and footwear.",
    bannerTitle: "2026 NEW ARRIVALS & RELEASES",
    bannerSubtitle: "Be the first to step onto the pitch with the newest technology and master craftsmanship.",
    submenus: [
      { id: "all", label: "All New Arrivals", slug: "" },
      { id: "new-bats", label: "New Bats", slug: "new-bats" },
      { id: "new-protection", label: "New Protection", slug: "new-protection" },
      { id: "new-footwear", label: "New Footwear", slug: "new-footwear" },
    ],
    guideTitle: "2026 Cricket Gear Innovations",
    guidePoints: [
      { title: "Aerodynamic Pick-up", desc: "Modern spine concaving redistributes weight without compromising 40mm power hitting edges." },
      { title: "D3O & High-Density Foams", desc: "Next-gen protection absorbs 30% more kinetic energy from 145 km/h deliveries while reducing pad weight." },
      { title: "Rapid Responsive Soleplates", desc: "New TPU spike plates minimize energy loss during sprint acceleration between wickets." },
    ],
  },
};

interface CategoryDetailsContentProps {
  categorySlug: string;
  subCategorySlug?: string;
}

function matchProductToSubcategory(product: Product, subCategory: string): boolean {
  if (!subCategory || subCategory === "all" || subCategory === "") return true;
  const sub = subCategory.toLowerCase().trim();

  // 1. Direct Brand Match
  const brands = [
    { key: "ss-sunridges", match: "ss" },
    { key: "sg-cricket", match: "sg" },
    { key: "kookaburra", match: "kookaburra" },
    { key: "mrf", match: "mrf" },
    { key: "gray-nicolls", match: "gray-nicolls" },
    { key: "dsc", match: "dsc" },
    { key: "new-balance", match: "new balance" },
    { key: "adidas", match: "adidas" },
    { key: "asics", match: "asics" },
    { key: "puma", match: "puma" },
    { key: "ceat", match: "ceat" },
    { key: "sf-stanford", match: "sf" },
    { key: "mb-malik", match: "mb malik" },
    { key: "mks", match: "mks" },
    { key: "gm", match: "gunn & moore" },
  ];

  const foundBrand = brands.find((b) => sub === b.key || sub.includes(b.key));
  if (foundBrand) {
    return (
      product.brand.toLowerCase().includes(foundBrand.match) ||
      product.id.toLowerCase().includes(foundBrand.match) ||
      product.name.toLowerCase().includes(foundBrand.match)
    );
  }

  // 2. Bats Subcategories
  if (sub.includes("english-willow") || sub.includes("english")) {
    return (
      product.name.toLowerCase().includes("english") ||
      product.shortDescription.toLowerCase().includes("english") ||
      Boolean(product.specs?.some((s) => s.value.toLowerCase().includes("english")))
    );
  }
  if (sub.includes("kashmir-willow") || sub.includes("kashmir")) {
    return (
      product.name.toLowerCase().includes("kashmir") ||
      product.shortDescription.toLowerCase().includes("kashmir") ||
      Boolean(product.specs?.some((s) => s.value.toLowerCase().includes("kashmir")))
    );
  }
  if (sub.includes("tennis") || sub.includes("tape")) {
    return (
      product.name.toLowerCase().includes("kashmir") ||
      product.name.toLowerCase().includes("tape") ||
      product.name.toLowerCase().includes("tennis") ||
      product.id.includes("kashmir") ||
      product.id.includes("malik") ||
      product.id.includes("mks")
    );
  }
  if (sub.includes("junior") || sub.includes("youth")) {
    return (
      product.name.toLowerCase().includes("aura") ||
      product.name.toLowerCase().includes("savage") ||
      Boolean(product.sizes?.some((sz) => sz.toLowerCase().includes("harrow") || sz.toLowerCase().includes("size 6")))
    );
  }
  if (sub.includes("knocked") || sub.includes("ready")) {
    return (
      product.name.toLowerCase().includes("ton") ||
      product.name.toLowerCase().includes("reserve") ||
      product.name.toLowerCase().includes("savage")
    );
  }

  // 3. Batting & Protection Subcategories
  if (sub.includes("batting-glove") || (sub.includes("glove") && !sub.includes("inner") && !sub.includes("keeper"))) {
    return product.name.toLowerCase().includes("batting glove") || (product.name.toLowerCase().includes("glove") && !product.name.toLowerCase().includes("inner"));
  }
  if (sub.includes("batting-legguard") || sub.includes("batting-pad") || (sub.includes("pad") && !sub.includes("keeper"))) {
    return product.name.toLowerCase().includes("batting pad") || (product.name.toLowerCase().includes("pad") && !product.name.toLowerCase().includes("keeper"));
  }
  if (sub.includes("helmet")) {
    return product.name.toLowerCase().includes("helmet");
  }
  if (sub.includes("thigh")) {
    return product.name.toLowerCase().includes("thigh");
  }
  if (sub.includes("chest") || sub.includes("arm")) {
    return product.name.toLowerCase().includes("arm") || product.name.toLowerCase().includes("chest");
  }
  if (sub.includes("abdominal")) {
    return product.name.toLowerCase().includes("abdominal");
  }
  if (sub.includes("inner")) {
    return product.name.toLowerCase().includes("inner");
  }
  if (sub.includes("grip-band") || sub.includes("base-layer")) {
    return product.categorySlug === "batting" || product.categorySlug === "accessories";
  }

  // 4. Bowling Subcategories
  if (sub.includes("red") || sub.includes("4-piece")) {
    return product.name.toLowerCase().includes("sf pro-x") || product.name.toLowerCase().includes("club cricket ball") || product.name.toLowerCase().includes("red");
  }
  if (sub.includes("white") || sub.includes("pink")) {
    return product.name.toLowerCase().includes("white") || product.name.toLowerCase().includes("tournament special");
  }
  if (sub.includes("heavy-tennis") || sub.includes("reaction")) {
    return product.categorySlug === "bowling" || product.categorySlug === "accessories";
  }
  if (sub.includes("bowling-spike") || sub.includes("spikes-boots") || sub.includes("boot")) {
    return product.name.toLowerCase().includes("bowling") || product.name.toLowerCase().includes("spike");
  }
  if (sub.includes("pitch-marker") || sub.includes("target-mat") || sub.includes("cone") || sub.includes("trainer")) {
    return product.name.toLowerCase().includes("cone") || product.name.toLowerCase().includes("trainer") || product.name.toLowerCase().includes("net");
  }
  if (sub.includes("mallet") || sub.includes("polish") || sub.includes("cloth")) {
    return product.name.toLowerCase().includes("care") || product.categorySlug === "accessories";
  }

  // 5. Wicketkeeping Subcategories
  if (sub.includes("keeper") && sub.includes("glove")) {
    return product.name.toLowerCase().includes("keeping glove") || product.name.toLowerCase().includes("keeper");
  }
  if (sub.includes("keeper") && sub.includes("pad")) {
    return product.name.toLowerCase().includes("keeping pad") || product.name.toLowerCase().includes("keeper");
  }
  if (sub.includes("keeper") && (sub.includes("helmet") || sub.includes("cap"))) {
    return product.name.toLowerCase().includes("helmet");
  }

  // 6. Footwear Subcategories
  if (sub.includes("metal-spike") || sub.includes("spikes-turf")) {
    return product.name.toLowerCase().includes("spike") || product.name.toLowerCase().includes("22yds");
  }
  if (sub.includes("rubber-stud") || sub.includes("matting")) {
    return product.name.toLowerCase().includes("ck4020") || product.name.toLowerCase().includes("gel-peake") || product.name.toLowerCase().includes("shoes");
  }
  if (sub.includes("all-rounder") || sub.includes("performance") || sub.includes("indoor") || sub.includes("trainer") || sub.includes("socks")) {
    return product.categorySlug === "shoes";
  }

  // 7. Accessories Subcategories
  if (sub.includes("wheelie") || sub.includes("duffle") || sub.includes("bag") || sub.includes("backpack")) {
    return product.name.toLowerCase().includes("bag") || product.name.toLowerCase().includes("backpack");
  }
  if (sub.includes("grip") || sub.includes("cone") || sub.includes("applicator")) {
    return product.name.toLowerCase().includes("grip") || product.name.toLowerCase().includes("care");
  }
  if (sub.includes("scuff") || sub.includes("sheet") || sub.includes("oil") || sub.includes("wax") || sub.includes("mallet")) {
    return product.name.toLowerCase().includes("care") || product.name.toLowerCase().includes("scuff") || product.categorySlug === "accessories";
  }
  if (sub.includes("stump") || sub.includes("bail") || sub.includes("scorebook") || sub.includes("counter") || sub.includes("towel") || sub.includes("wristband")) {
    return product.name.toLowerCase().includes("cone") || product.name.toLowerCase().includes("trainer") || product.name.toLowerCase().includes("net") || product.categorySlug === "accessories";
  }

  // 8. New Gear Subcategories
  if (sub === "new-bats") return product.categorySlug === "cricket-bats";
  if (sub === "new-protection") return product.categorySlug === "batting" || product.categorySlug === "wicketkeeping";
  if (sub === "new-footwear") return product.categorySlug === "shoes";

  // General text match fallback
  const cleanSub = sub.replace(/-/g, " ");
  return (
    product.name.toLowerCase().includes(cleanSub) ||
    product.category.toLowerCase().includes(cleanSub) ||
    product.shortDescription.toLowerCase().includes(cleanSub)
  );
}

export default function CategoryDetailsContent({
  categorySlug,
  subCategorySlug = "",
}: CategoryDetailsContentProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  // Normalize category slug
  const normalizedCat =
    categorySlug === "bats"
      ? "cricket-bats"
      : categorySlug;

  const config = CATEGORY_CONFIGS[normalizedCat] || CATEGORY_CONFIGS["cricket-bats"];

  const [activeSubmenu, setActiveSubmenu] = useState<string>(subCategorySlug || "all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  useEffect(() => {
    if (subCategorySlug) {
      setActiveSubmenu(subCategorySlug);
    } else {
      setActiveSubmenu("all");
    }
  }, [subCategorySlug]);

  const handleSubmenuClick = (tab: SubmenuTab) => {
    setActiveSubmenu(tab.id);
    const newUrl = tab.slug
      ? `/category/${normalizedCat}/${tab.slug}`
      : `/category/${normalizedCat}`;
    router.push(newUrl, { scroll: false });
  };

  // Filter Products strictly by Category AND SubCategory slug!
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // 1. Category check with cross-category exceptions for relevant submenus
      if (activeSubmenu && activeSubmenu !== "all") {
        const sub = activeSubmenu.toLowerCase();
        if (normalizedCat === "bowling" && (sub.includes("spike") || sub.includes("boot"))) {
          if (product.categorySlug !== "shoes") return false;
        } else if (normalizedCat === "bowling" && (sub.includes("pitch") || sub.includes("target") || sub.includes("cone"))) {
          if (product.categorySlug !== "accessories") return false;
        } else if (normalizedCat === "wicketkeeping" && sub.includes("inner")) {
          if (!product.name.toLowerCase().includes("inner")) return false;
        } else if (normalizedCat === "cricket-bats") {
          if (product.categorySlug !== "cricket-bats") return false;
        } else if (normalizedCat === "batting") {
          if (product.categorySlug !== "batting") return false;
        } else if (normalizedCat === "bowling") {
          if (product.categorySlug !== "bowling") return false;
        } else if (normalizedCat === "wicketkeeping") {
          if (product.categorySlug !== "wicketkeeping" && !product.name.toLowerCase().includes("keeper")) return false;
        } else if (normalizedCat === "shoes") {
          if (product.categorySlug !== "shoes") return false;
        } else if (normalizedCat === "accessories") {
          if (product.categorySlug !== "accessories") return false;
        } else if (normalizedCat === "new-gear") {
          if (product.badge && product.badge.includes("PRE-OWNED")) return false;
        }
      } else {
        // Strict primary category when on category root
        if (normalizedCat === "cricket-bats" && product.categorySlug !== "cricket-bats") return false;
        if (normalizedCat === "batting" && product.categorySlug !== "batting") return false;
        if (normalizedCat === "bowling" && product.categorySlug !== "bowling") return false;
        if (normalizedCat === "wicketkeeping" && product.categorySlug !== "wicketkeeping" && !product.name.toLowerCase().includes("keeper")) return false;
        if (normalizedCat === "shoes" && product.categorySlug !== "shoes") return false;
        if (normalizedCat === "accessories" && product.categorySlug !== "accessories") return false;
        if (normalizedCat === "new-gear" && product.badge && product.badge.includes("PRE-OWNED")) return false;
      }

      // 2. Subcategory / Slug Filter
      return matchProductToSubcategory(product, activeSubmenu);
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [normalizedCat, activeSubmenu, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
    });
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        {/* 1. Category-Specific Panoramic Banner */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-10 text-white">
          <div className="absolute -left-10 top-0 w-80 h-80 bg-[#84cc16]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84cc16]/20 border border-[#84cc16]/40 text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL CRICKET DEPARTMENT</span>
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {config.bannerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
              {config.bannerSubtitle}
            </p>
          </div>
        </div>

        {/* 2. Breadcrumbs Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 font-medium"
        >
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link href="/category/shop-cricket" className="hover:text-zinc-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link href={`/category/${normalizedCat}`} className="hover:text-zinc-900 transition-colors">
            {config.title}
          </Link>
          {activeSubmenu && activeSubmenu !== "all" && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-900 font-bold capitalize">
                {activeSubmenu.replace(/-/g, " ")}
              </span>
            </>
          )}
        </nav>

        {/* Toast Alert */}
        {addedToast && (
          <div className="p-4 rounded-2xl bg-lime-50 border border-lime-300 text-xs sm:text-sm font-bold text-[#4d7c0f] flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4d7c0f]" />
              <span>Added "{addedToast}" to your cart!</span>
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

        {/* 3. Category Submenu Navigation Pills (Strictly wired to subcategories) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {config.title} Sub-Departments:
            </h2>
            <span className="text-xs text-zinc-500 font-medium">
              Showing {filteredProducts.length} models
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {config.submenus.map((tab) => {
              const isSelected =
                activeSubmenu === tab.id ||
                activeSubmenu === tab.slug ||
                (tab.id === "all" && (!activeSubmenu || activeSubmenu === "all"));

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSubmenuClick(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Results Header & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-zinc-200/80">
          <div>
            <h3 className="text-base sm:text-lg font-black text-zinc-950">
              {activeSubmenu && activeSubmenu !== "all"
                ? `${activeSubmenu.replace(/-/g, " ").toUpperCase()}`
                : config.title}
            </h3>
            <p className="text-xs text-zinc-500">
              All models in stock with official warranty and 24h dispatch
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-zinc-200 text-xs font-bold text-zinc-800 rounded-lg px-3 py-1.5 outline-none cursor-pointer shadow-2xs"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 5. Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl flex items-center justify-center mb-3 overflow-hidden bg-gradient-to-b from-zinc-50/70 via-white to-zinc-50/40">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {product.badge && (
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-2xs ${
                        product.badge.includes("PRE-OWNED")
                          ? "bg-zinc-900 text-white"
                          : product.badge.includes("OFF")
                          ? "bg-red-500 text-white"
                          : "bg-[#84cc16] text-black"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#65a30d] transition-colors line-clamp-2 leading-snug min-h-[34px] mt-0.5">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-0.5 text-[#84cc16]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-[#84cc16] text-[#84cc16]"
                              : "text-zinc-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-700">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm sm:text-base font-black text-zinc-950 tracking-tight block">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-zinc-400 line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    title="Add to Cart"
                    className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-[#84cc16] text-zinc-700 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/80 space-y-3">
            <h4 className="font-bold text-base text-zinc-900">
              No products found in this subcategory
            </h4>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Try switching to another sub-department or browse all models in {config.title}.
            </p>
            <button
              type="button"
              onClick={() => handleSubmenuClick(config.submenus[0])}
              className="px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs cursor-pointer"
            >
              View All {config.title}
            </button>
          </div>
        )}

        {/* 6. Category Buyer's Guide & Spec Explainer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#84cc16]" />
            <h3 className="text-base sm:text-lg font-black text-zinc-950">
              {config.guideTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {config.guidePoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 space-y-1.5"
              >
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900">
                  {point.title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Cross-Sell to Hire Experts */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[#a3e635] text-[11px] font-black uppercase tracking-wider">
              LOOKING FOR 1-ON-1 COACHING?
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Hire Certified Cricket Coaches & Net Bowlers
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Pair your new {config.title.toLowerCase()} with training masterclasses across Bangladesh.
            </p>
          </div>
          <Link
            href="/hire-experts"
            className="px-6 py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm shrink-0 whitespace-nowrap"
          >
            Find Cricket Experts →
          </Link>
        </div>
      </div>
    </main>
  );
}
