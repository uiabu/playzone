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
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Filter,
  Truck,
  Eye,
} from "lucide-react";
import { Product, getProductViews } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";
import TradeInModal from "./TradeInModal";

type GradeType = "Grade A+" | "Grade A" | "Grade B";

interface PreOwnedItem extends Product {
  grade: GradeType;
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
    name: "New Balance TC 1260 Batting Pads (Pre-Owned)",
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
    name: "Gray-Nicolls Elite Cricket Helmet (Pre-Owned)",
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
    name: "Gray-Nicolls All-in-One Thigh Guard (Pre-Owned)",
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
  {
    id: "kookaburra-pro-keeper-gloves-preowned",
    slug: "kookaburra-pro-keeper-gloves",
    name: "Kookaburra Pro 500 Wicket Keeping Gloves (Pre-Owned)",
    brand: "Kookaburra",
    category: "Wicketkeeping",
    categorySlug: "wicketkeeping",
    price: 2200,
    originalPrice: 4200,
    discountPercent: 48,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
    stockCount: 3,
    images: ["/images/categories/batting_gloves.png"],
    shortDescription: "ICC compliant octopus grip wicketkeeping gloves. Sanitized leather palm.",
    description: "Supple sheep leather with zero webbing rips. Completely disinfected and tested for flexibility.",
    highlights: ["Grade A Condition (9/10)", "Octopus Grip", "Clean & Sanitized"],
    specs: [{ label: "Condition", value: "Grade A (9/10)" }],
    warranty: "6-Month Guarantee",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.1/10 Condition",
    inspectionNote: "Intact web seam • Sanitized lining",
  },
  {
    id: "ss-matrix-bat-preowned",
    slug: "ss-matrix-bat-grip-pack",
    name: "SS Matrix Pro Club Bat (Pre-Owned Grade B)",
    brand: "SS Sunridges",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 1950,
    originalPrice: 3500,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.5,
    reviewsCount: 34,
    inStock: true,
    stockCount: 5,
    images: ["/images/products/bats/ss_ton.png"],
    shortDescription: "Tough practice bat with massive power profile. Fresh grip and Extratec sheet fitted.",
    description: "Ideal for club practice sessions and cement net wickets. Strong cane handle with new grip.",
    highlights: ["Grade B Value Condition (8.2/10)", "New grip fitted", "Great for practice"],
    specs: [{ label: "Condition", value: "Grade B (8.2/10)" }],
    warranty: "3-Month Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade B",
    conditionScore: "8.2/10 Value",
    inspectionNote: "Solid handle • Extratec sheet fitted",
  },
];

// Department Filter Definitions
const PRE_OWNED_CATEGORIES = [
  { id: "all", name: "All Pre-Owned Gear" },
  { id: "cricket-bats", name: "Cricket Bats" },
  { id: "pads-gloves", name: "Batting Pads & Gloves" },
  { id: "protection", name: "Helmets & Body Armour" },
  { id: "shoes", name: "Footwear & Spikes" },
  { id: "accessories", name: "Kit Bags & Gear" },
];

const PRE_OWNED_GRADES = [
  { id: "all", label: "All Condition Grades" },
  { id: "Grade A+", label: "Grade A+ (Like New • 9.5/10)", badge: "Mint" },
  { id: "Grade A", label: "Grade A (Match Ready • 9.0/10)", badge: "Popular" },
  { id: "Grade B", label: "Grade B (Practice Value • 8.0/10)", badge: "Value" },
];

const PRE_OWNED_BRANDS = [
  "SS Sunridges",
  "SG Cricket",
  "Kookaburra",
  "MRF",
  "Gray-Nicolls",
  "New Balance",
  "Adidas",
  "DSC",
  "SF Stanford",
  "PLAYZONE",
];

export default function PreOwnedPageContent() {
  const { addItem, openCart } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("savings");

  // Mobile Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isTradeInOpen, setIsTradeInOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion Sections State
  const [openSections, setOpenSections] = useState({
    search: true,
    category: true,
    grade: true,
    brand: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedGrade("all");
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(15000);
    setMinRating(null);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedGrade !== "all" ? 1 : 0) +
    selectedBrands.length +
    (minRating !== null ? 1 : 0) +
    (minPrice > 0 || maxPrice < 15000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return PRE_OWNED_CATALOG.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesGrade = item.grade.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesGrade) return false;
      }

      // 2. Category Filter
      if (selectedCategory === "cricket-bats" && item.categorySlug !== "cricket-bats") return false;
      if (
        selectedCategory === "pads-gloves" &&
        !item.name.toLowerCase().includes("pad") &&
        !item.name.toLowerCase().includes("glove")
      )
        return false;
      if (
        selectedCategory === "protection" &&
        !item.name.toLowerCase().includes("helmet") &&
        !item.name.toLowerCase().includes("guard")
      )
        return false;
      if (selectedCategory === "shoes" && item.categorySlug !== "shoes") return false;
      if (
        selectedCategory === "accessories" &&
        item.categorySlug !== "accessories" &&
        !item.name.toLowerCase().includes("bag")
      )
        return false;

      // 3. Certified Grade Filter
      if (selectedGrade !== "all" && item.grade !== selectedGrade) return false;

      // 4. Brand Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) return false;

      // 5. Price Range
      if (item.price < minPrice || item.price > maxPrice) return false;

      // 6. Rating Filter
      if (minRating !== null && item.rating < minRating) return false;

      // 7. In-Stock Only
      if (inStockOnly && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "grade-a-plus") {
        const gradeRank: Record<GradeType, number> = { "Grade A+": 3, "Grade A": 2, "Grade B": 1 };
        return gradeRank[b.grade] - gradeRank[a.grade];
      }
      // Default: Highest savings %
      return (b.discountPercent || 0) - (a.discountPercent || 0);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedGrade,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
  ]);

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

  // Reusable Filter Sidebar Content
  const renderFilterControls = () => (
    <div className="space-y-4">
      {/* 1. Real-time Search */}
      <div>
        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">
          Search Pre-Owned Gear
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bat, pad, brand..."
            className="w-full pl-8 pr-7 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#84cc16] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Department / Category Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Category</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.category && (
          <div className="space-y-1">
            {PRE_OWNED_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              // Calculate dynamic count for each category
              const count = PRE_OWNED_CATALOG.filter((item) => {
                if (cat.id === "all") return true;
                if (cat.id === "cricket-bats") return item.categorySlug === "cricket-bats";
                if (cat.id === "pads-gloves")
                  return (
                    item.name.toLowerCase().includes("pad") ||
                    item.name.toLowerCase().includes("glove")
                  );
                if (cat.id === "protection")
                  return (
                    item.name.toLowerCase().includes("helmet") ||
                    item.name.toLowerCase().includes("guard")
                  );
                if (cat.id === "shoes") return item.categorySlug === "shoes";
                if (cat.id === "accessories")
                  return item.categorySlug === "accessories" || item.name.toLowerCase().includes("bag");
                return false;
              }).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span
                    className={`text-[10px] ml-1 shrink-0 ${
                      isSelected ? "text-zinc-400" : "text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Condition / Inspection Grade */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("grade")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Certified Grade</span>
          {openSections.grade ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.grade && (
          <div className="space-y-1.5">
            {PRE_OWNED_GRADES.map((gradeOption) => {
              const isSelected = selectedGrade === gradeOption.id;
              const count = PRE_OWNED_CATALOG.filter(
                (item) => gradeOption.id === "all" || item.grade === gradeOption.id
              ).length;

              return (
                <button
                  key={gradeOption.id}
                  type="button"
                  onClick={() => setSelectedGrade(gradeOption.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="truncate">{gradeOption.label}</span>
                  </div>
                  <span
                    className={`text-[10px] ml-1 shrink-0 ${
                      isSelected ? "text-zinc-400" : "text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Brands Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("brand")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Brand</span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.brand && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {PRE_OWNED_BRANDS.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              const brandCount = PRE_OWNED_CATALOG.filter((p) => p.brand === brand).length;
              if (brandCount === 0) return null;

              return (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium select-none py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-3.5 h-3.5 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{brand}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">({brandCount})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Price Range Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Price Range (BDT)</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-zinc-400 block mb-0.5">Min (৳)</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-800 outline-none focus:border-[#84cc16]"
                />
              </div>
              <span className="text-zinc-400 pt-3">-</span>
              <div className="flex-1">
                <span className="text-[10px] text-zinc-400 block mb-0.5">Max (৳)</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || 15000)}
                  className="w-full px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-800 outline-none focus:border-[#84cc16]"
                />
              </div>
            </div>

            {/* Quick Price Range Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "< ৳3,000", min: 0, max: 3000 },
                { label: "৳3k - ৳5k", min: 3000, max: 5000 },
                { label: "> ৳5,000", min: 5000, max: 15000 },
              ].map((chip) => {
                const isActive = minPrice === chip.min && maxPrice === chip.max;
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setMinPrice(chip.min);
                      setMaxPrice(chip.max);
                    }}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-zinc-950 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 6. Customer Rating Accordion */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("rating")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Customer Rating</span>
          {openSections.rating ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.rating && (
          <div className="space-y-1.5">
            {[4.8, 4.6, 4.4].map((star) => {
              const checked = minRating === star;
              return (
                <label
                  key={star}
                  className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer font-medium select-none py-0.5"
                >
                  <input
                    type="radio"
                    name="preowned-rating"
                    checked={checked}
                    onChange={() => setMinRating(checked ? null : star)}
                    className="w-3.5 h-3.5 accent-[#84cc16] cursor-pointer"
                  />
                  <div className="flex items-center gap-0.5 text-[#84cc16]">
                    <Star className="w-3 h-3 fill-[#84cc16]" />
                  </div>
                  <span>{star} & above</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. In-Stock Only Toggle */}
      <div className="pt-3 border-t border-zinc-100">
        <label className="flex items-center justify-between text-xs text-zinc-800 font-bold cursor-pointer select-none">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
          />
        </label>
      </div>

      {/* 8. Trade-In Promo Box */}
      <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-[#84cc16]/10 to-lime-100/40 border border-[#84cc16]/30 text-center space-y-2">
        <span className="text-[11px] font-black uppercase text-[#4d7c0f] tracking-wider block">
          UPGRADE YOUR WILLOW
        </span>
        <p className="text-[11px] text-zinc-600 leading-tight">
          Trade in your old bat or equipment for instant cash discount on any pre-owned gear.
        </p>
        <button
          type="button"
          onClick={() => setIsTradeInOpen(true)}
          className="w-full py-1.5 px-3 bg-zinc-950 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          Estimate Trade-In Value →
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8fafc]/70 pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-7">
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
          <Link href="/category" className="hover:text-zinc-900 transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-800 font-semibold">Pre-Owned Cricket Gear</span>
        </nav>

        {/* 3. Heading & Concept Subtitle + Sell/Trade Button */}
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

        {/* 4. The 3 Condition Grades Explainer */}
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
            <div className="bg-white rounded-2xl p-4.5 border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-2">
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
            <div className="bg-white rounded-2xl p-4.5 border-2 border-[#84cc16]/50 shadow-xs hover:shadow-md transition-all space-y-2 relative">
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
            <div className="bg-white rounded-2xl p-4.5 border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all space-y-2">
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

        {/* 5. Trust Pillars Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">12-Point Checked</strong>
              <span className="text-zinc-500 text-[11px]">Zero hidden cracks</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">Fully Knocked-In</strong>
              <span className="text-zinc-500 text-[11px]">Match ready on day 1</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">7-Day Net Trial</strong>
              <span className="text-zinc-500 text-[11px]">Risk-free exchange</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xs leading-tight">
              <strong className="block text-zinc-900 font-bold">6-Month Warranty</strong>
              <span className="text-zinc-500 text-[11px]">Handle integrity cover</span>
            </div>
          </div>
        </div>

        {/* 6. MAIN CATALOG SECTION WITH LEFT SIDEBAR FILTERS */}
        <div className="flex flex-col lg:flex-row gap-6 items-start pt-2">
          {/* Desktop Left Sticky Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24 bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#84cc16]" />
                <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#84cc16] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Reusable Filter Controls */}
            {renderFilterControls()}
          </aside>

          {/* Right Main Catalog Content */}
          <div className="flex-1 w-full min-w-0">
            {/* Active Filters Bar & Top Bar */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-3.5 sm:p-4 mb-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  {/* Mobile Filter Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 text-white font-bold text-xs shadow-xs active:scale-95 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#84cc16] text-black text-[9px] font-extrabold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <span className="text-xs font-bold text-zinc-900">
                    Showing <span className="text-[#65a30d] font-black">{filteredItems.length}</span> Pre-Owned Items
                  </span>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-zinc-400 font-medium hidden sm:inline">Sort:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800 rounded-xl px-3 py-1.5 pr-8 hover:border-zinc-300 focus:outline-none cursor-pointer shadow-2xs"
                    >
                      <option value="savings">Biggest Savings %</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="grade-a-plus">Condition: Grade A+ First</option>
                    </select>
                    <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filter Pill Tags */}
              {activeFilterCount > 0 && (
                <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-zinc-100">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Active:
                  </span>
                  {selectedCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>
                        {PRE_OWNED_CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                      </span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  {selectedGrade !== "all" && (
                    <button
                      type="button"
                      onClick={() => setSelectedGrade("all")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>{selectedGrade}</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  {selectedBrands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleBrandToggle(b)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>{b}</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  ))}
                  {minRating !== null && (
                    <button
                      type="button"
                      onClick={() => setMinRating(null)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>★ {minRating}+</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  {(minPrice > 0 || maxPrice < 15000) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice(0);
                        setMaxPrice(15000);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>৳{minPrice.toLocaleString()} - ৳{maxPrice.toLocaleString()}</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  {inStockOnly && (
                    <button
                      type="button"
                      onClick={() => setInStockOnly(false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>In Stock</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:border-zinc-400 cursor-pointer shadow-2xs"
                    >
                      <span>"{searchQuery}"</span>
                      <X className="w-3 h-3 text-zinc-400 hover:text-zinc-700" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer ml-auto"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Product Cards Grid (Matching Concept Mockup) */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/90 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <Filter className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-zinc-950">No Pre-Owned Items Found</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    No verified gear matches your active filter combination. Try adjusting price range, condition grade, or brand.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4.5">
                {filteredItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-md transition-all duration-300 p-3 sm:p-4 flex flex-col justify-between hover:-translate-y-1 select-none"
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

                      {/* Ratings & Views */}
                      <div className="flex items-center justify-between gap-1 pt-0.5">
                        <div className="flex items-center gap-1 min-w-0">
                          <div className="flex items-center gap-0.5 text-[#84cc16] shrink-0">
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
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium shrink-0" title="Views">
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{getProductViews(item)}</span>
                        </div>
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
            )}
          </div>
        </div>

        {/* 7. The PLAYZONE 12-Point Inspection Process Details */}
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

        {/* 8. Player Testimonial Banner */}
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

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#84cc16]" />
                <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#84cc16] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700"
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              {renderFilterControls()}
            </div>

            {/* Drawer Sticky Footer */}
            <div className="p-4 border-t border-zinc-100 bg-zinc-50">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View {filteredItems.length} Pre-Owned Items</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade In Modal */}
      <TradeInModal
        isOpen={isTradeInOpen}
        onClose={() => setIsTradeInOpen(false)}
      />
    </main>
  );
}
