"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  Star,
  Search,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Award,
  Truck,
  RotateCcw,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import ProductCardMedia from "@/components/products/ProductCardMedia";
import { Product } from "@/lib/productsData";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

type GradeType = "Grade A+" | "Grade A" | "Grade B";

interface PreOwnedItem extends Product {
  grade: GradeType;
  conditionScore: string;
  inspectionNote: string;
}

// Official Certified Pre-Owned Catalog curated & sold exclusively by PLAYZONE authorities
const PRE_OWNED_CATALOG: PreOwnedItem[] = [
  {
    id: "ss-ton-reserve-edition",
    slug: "ss-ton-reserve-edition",
    name: "SS TON Reserve Edition Cricket Bat (Pre-Owned Grade A)",
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
    shortDescription: "Grade A certified pre-owned English Willow bat. Seasoned and match-ready.",
    description: "Inspected by PLAYZONE master bat-makers. Zero handle cracks, clean acoustic ping, newly oiled and gripped.",
    highlights: ["Grade A Match Ready Condition", "Inspected by PLAYZONE Master Bat-Makers", "Acoustic Mallet Tested", "Free Scuff Sheet Installed"],
    specs: [{ label: "Condition", value: "Grade A (9.0/10)" }, { label: "Authority Inspection", value: "Verified 100% Sound" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Match-Ready",
    inspectionNote: "Clean face • Fresh chevron grip fitted",
  },
  {
    id: "sf-stanford-players",
    slug: "sf-stanford-players",
    name: "SF Stanford Players Edition Cricket Bat (Pre-Owned Grade A)",
    brand: "SF Stanford",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 5200,
    originalPrice: 9200,
    discountPercent: 43,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 56,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/sf_stanford.png"],
    shortDescription: "Grade A pre-owned player profile willow. Massive profile with light pick-up.",
    description: "Thoroughly inspected for handle flex and surface delamination. 100% structural integrity guaranteed.",
    highlights: ["Player profile edges", "Light pick-up and balance", "Master craftsman inspected"],
    specs: [{ label: "Condition", value: "Grade A (8.8/10)" }, { label: "Authority Inspection", value: "Verified Handle Integrity" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "8.8/10",
    inspectionNote: "Slight toe surface wear • Solid middle",
  },
  {
    id: "sg-savage-edition",
    slug: "sg-savage-edition",
    name: "SG Savage Edition English Willow (Pre-Owned Grade A+)",
    brand: "SG Cricket",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 8500,
    originalPrice: 14000,
    discountPercent: 39,
    badge: "PRE-OWNED - GRADE A+",
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    stockCount: 1,
    images: ["/images/products/bats/sg_savage.png"],
    shortDescription: "Grade A+ mint condition bat. Played only 2 net sessions. Spotless face.",
    description: "Mint condition English Willow. Selected test cleft, full profile, virtually indistinguishable from brand new.",
    highlights: ["Mint Grade A+ Condition", "Like-New Cleft & Face", "Fully Knocked and Extratec Protected"],
    specs: [{ label: "Condition", value: "Grade A+ (9.5/10)" }, { label: "Authority Inspection", value: "Passed 12-Point Test" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A+",
    conditionScore: "9.5/10 Mint",
    inspectionNote: "Played 2 net sessions • Pristine face",
  },
  {
    id: "kookaburra-aura-pro",
    slug: "kookaburra-aura-pro",
    name: "Kookaburra Aura Pro (Pre-Owned Grade A)",
    brand: "Kookaburra",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 7200,
    originalPrice: 12500,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/kookaburra_aura.png"],
    shortDescription: "Grade A Kookaburra Aura Pro. High sweet spot suited for Bangladeshi wickets.",
    description: "Inspected by PLAYZONE authorities. No edge cracks, solid rebound response across ping mallet test.",
    highlights: ["Grade A Match Condition", "Featherlight pickup", "Pre-seasoned with anti-scuff sheet"],
    specs: [{ label: "Condition", value: "Grade A (9.0/10)" }, { label: "Authority Inspection", value: "Acoustic Mallet Verified" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10",
    inspectionNote: "Superb ping • Fresh white grip",
  },
  {
    id: "mrf-genius-grand-edition",
    slug: "mrf-genius-grand-edition",
    name: "MRF Genius Grand Edition (Pre-Owned Grade A)",
    brand: "MRF",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 9800,
    originalPrice: 17000,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stockCount: 1,
    images: ["/images/products/bats/mrf_genius.png"],
    shortDescription: "Grade A Virat Kohli replica shape. Grade 1 English Willow.",
    description: "Premium MRF Genius cleft inspected by PlayZone master bat-makers. Perfect rebound, clear ping sound.",
    highlights: ["VK replica profile", "38mm edges & massive spine", "Inspected & certified"],
    specs: [{ label: "Condition", value: "Grade A (9.1/10)" }, { label: "Authority Inspection", value: "Master Craftsman Approved" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.1/10",
    inspectionNote: "Natural straight grains • Zero handle twist",
  },
  {
    id: "ca-plus-15000-player",
    slug: "ca-plus-15000-player",
    name: "CA Plus 15000 Player Edition (Pre-Owned Grade A+)",
    brand: "CA Sports",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 8900,
    originalPrice: 15500,
    discountPercent: 43,
    badge: "PRE-OWNED - GRADE A+",
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/ca_plus.png"],
    shortDescription: "Grade A+ mint Pakistani English Willow bat with immense hitting power.",
    description: "Acquired and certified by PlayZone. Outstanding rebound ping, seasoned with mallet knock-in, clean finish.",
    highlights: ["Grade A+ Mint", "Huge 40mm edges", "Pre-knocked & ready for match play"],
    specs: [{ label: "Condition", value: "Grade A+ (9.4/10)" }, { label: "Authority Inspection", value: "Ping Tested 100%" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A+",
    conditionScore: "9.4/10 Mint",
    inspectionNote: "Only net knocked • Zero surface cracks",
  },
  {
    id: "ss-ton-gladiator-pads",
    slug: "ss-ton-gladiator-pads",
    name: "SS TON Gladiator Batting Pads (Pre-Owned Grade A)",
    brand: "SS Sunridges",
    category: "Protection",
    categorySlug: "protection",
    price: 2400,
    originalPrice: 4200,
    discountPercent: 43,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 82,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/batting_essentials/ss_ton_batting_pads.png"],
    shortDescription: "Grade A pre-owned lightweight high-density foam batting leggings.",
    description: "Sanitized and checked by PLAYZONE staff. Velcro straps in mint condition, clean PU face, zero structural tears.",
    highlights: ["Clean sanitized PU face", "Pristine velcro grip", "Lightweight HD foam rods"],
    specs: [{ label: "Condition", value: "Grade A (9.0/10)" }, { label: "Hygiene", value: "Antimicrobial Sanitized" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10 Condition",
    inspectionNote: "Clean white PU • Spotless velcro",
  },
  {
    id: "sg-test-batting-gloves",
    slug: "sg-test-batting-gloves",
    name: "SG Test Batting Gloves (Pre-Owned Grade A)",
    brand: "SG Cricket",
    category: "Protection",
    categorySlug: "protection",
    price: 1850,
    originalPrice: 3200,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.7,
    reviewsCount: 64,
    inStock: true,
    stockCount: 5,
    images: ["/images/products/batting_essentials/sg_test_batting_gloves.png"],
    shortDescription: "Grade A Pittards leather palm batting gloves. Cleaned and conditioned.",
    description: "Inspected for finger sausage padding integrity and leather palm suppleness. Sanitized with leather-safe antimicrobial spray.",
    highlights: ["Pittards leather palm intact", "Three-piece split thumb", "Sanitized inner lining"],
    specs: [{ label: "Condition", value: "Grade A (8.9/10)" }, { label: "Hygiene", value: "Antimicrobial Sanitized" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "8.9/10 Condition",
    inspectionNote: "Leather palm soft & intact • Sanitized",
  },
  {
    id: "adidas-22yds-spikes",
    slug: "adidas-22yds-spikes",
    name: "Adidas 22YDS Metal Spikes (Pre-Owned Grade A)",
    brand: "Adidas",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 3800,
    originalPrice: 7200,
    discountPercent: 47,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.8,
    reviewsCount: 45,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/cricket_shoes/adidas_22yds.png"],
    shortDescription: "Grade A match-used cricket bowling spikes. Fresh replacement studs installed.",
    description: "Outsole treads verified 100% sound. New replacement metal studs screwed in and torqued by PLAYZONE technicians.",
    highlights: ["Fresh steel spikes installed", "BOOST midsole intact", "Deep steam sanitized"],
    specs: [{ label: "Condition", value: "Grade A (9.0/10)" }, { label: "Studs", value: "Brand New Spikes Installed" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.0/10",
    inspectionNote: "Upper pristine • Outsole studs brand new",
  },
  {
    id: "playzone-pro-kit-bag",
    slug: "playzone-pro-kit-bag",
    name: "PLAYZONE Pro Wheelie Kit Bag (Pre-Owned Grade A)",
    brand: "PLAYZONE",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 3200,
    originalPrice: 5800,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.9,
    reviewsCount: 78,
    inStock: true,
    stockCount: 3,
    images: ["/images/categories/kit_bags.png"],
    shortDescription: "Grade A full equipment player wheelie bag with internal bat cave.",
    description: "Inspected zippers, wheels, and pull-up handle. Tested to roll smoothly with full 15kg cricket equipment weight.",
    highlights: ["All heavy-duty zippers tested", "Smooth tractor wheels", "Holds 3 full bats + pads"],
    specs: [{ label: "Condition", value: "Grade A (9.2/10)" }, { label: "Zippers & Wheels", value: "100% Functional" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "9.2/10",
    inspectionNote: "Smooth rolling wheels • Clean interior",
  },
  {
    id: "kookaburra-pro-500-wk",
    slug: "kookaburra-pro-500-wk",
    name: "Kookaburra Pro 500 Wicket Keeping Gloves (Pre-Owned Grade A)",
    brand: "Kookaburra",
    category: "Accessories",
    categorySlug: "accessories",
    price: 2100,
    originalPrice: 3800,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    rating: 4.6,
    reviewsCount: 39,
    inStock: true,
    stockCount: 2,
    images: ["/images/categories/wicketkeeping.png"],
    shortDescription: "Grade A octopus rubber grip keeping gloves. Fully cleaned & sanitized.",
    description: "Rubber cup dimples 95% intact. Flexible wrist cuff, webbed catching pouch inspected by PLAYZONE specialists.",
    highlights: ["Octopus rubber dimples intact", "Flexible reinforced cuff", "Sanitized inner lining"],
    specs: [{ label: "Condition", value: "Grade A (8.9/10)" }, { label: "Hygiene", value: "Antimicrobial Sanitized" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade A",
    conditionScore: "8.9/10",
    inspectionNote: "Grip intact • Sanitized inner lining",
  },
  {
    id: "ss-matrix-pro-bat",
    slug: "ss-matrix-pro-bat",
    name: "SS Matrix Pro Club Bat (Pre-Owned Grade B)",
    brand: "SS Sunridges",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 3200,
    originalPrice: 6500,
    discountPercent: 51,
    badge: "PRE-OWNED - GRADE B",
    rating: 4.5,
    reviewsCount: 31,
    inStock: true,
    stockCount: 3,
    images: ["/images/products/bats/ss_ton.png"],
    shortDescription: "Grade B practice and club match English Willow bat with immense sweet spot value.",
    description: "Has surface ball marks from active league use, but handle flex and blade rebound are 100% sound. Ideal for intensive net practice.",
    highlights: ["Budget tournament & net practice workhorse", "100% sound handle integrity", "Extratec sheet newly applied"],
    specs: [{ label: "Condition", value: "Grade B (8.2/10)" }, { label: "Integrity", value: "Sound Handle & Blade" }],
    warranty: "Sold Directly by PlayZone (Inspected As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [],
    grade: "Grade B",
    conditionScore: "8.2/10 Value",
    inspectionNote: "Solid handle • Extratec sheet fitted",
  },
];

const PRE_OWNED_CATEGORIES = [
  { id: "all", name: "All Pre-Owned Gear" },
  { id: "cricket-bats", name: "Cricket Bats" },
  { id: "pads-gloves", name: "Pads & Gloves" },
  { id: "shoes", name: "Spikes & Footwear" },
  { id: "accessories", name: "Kit Bags & Protection" },
];

const PRE_OWNED_GRADES = [
  { id: "all", label: "All Condition Grades" },
  { id: "Grade A+", label: "Grade A+ (Mint • 9.5/10)" },
  { id: "Grade A", label: "Grade A (Match Ready • 9.0/10)" },
  { id: "Grade B", label: "Grade B (Practice/Club • 8.0/10)" },
];

export default function PreOwnedPageContent() {
  const { t } = useLanguage();
  const { addItem, openCart } = useCart();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accordion Toggles for Sidebar
  const [openSections, setOpenSections] = useState({
    category: true,
    grade: true,
    brand: true,
    price: true,
    rating: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Extract unique brands dynamically
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    PRE_OWNED_CATALOG.forEach((item) => set.add(item.brand));
    return Array.from(set).sort();
  }, []);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedGrade("all");
    setSelectedBrands([]);
    setMaxPrice(10000);
    setMinRating(null);
    setInStockOnly(false);
    setSortBy("recommended");
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    let result = [...PRE_OWNED_CATALOG];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.grade.toLowerCase().includes(q)
      );
    }

    // 2. Category
    if (selectedCategory !== "all") {
      if (selectedCategory === "cricket-bats") {
        result = result.filter((item) => item.categorySlug === "cricket-bats");
      } else if (selectedCategory === "pads-gloves") {
        result = result.filter(
          (item) =>
            item.categorySlug === "protection" ||
            item.name.toLowerCase().includes("pad") ||
            item.name.toLowerCase().includes("glove")
        );
      } else if (selectedCategory === "shoes") {
        result = result.filter((item) => item.categorySlug === "shoes");
      } else if (selectedCategory === "accessories") {
        result = result.filter(
          (item) =>
            item.categorySlug === "accessories" ||
            item.categorySlug === "kit-bags" ||
            item.name.toLowerCase().includes("bag") ||
            item.name.toLowerCase().includes("keeping")
        );
      }
    }

    // 3. Condition Grade
    if (selectedGrade !== "all") {
      result = result.filter((item) => item.grade === selectedGrade);
    }

    // 4. Brands
    if (selectedBrands.length > 0) {
      result = result.filter((item) => selectedBrands.includes(item.brand));
    }

    // 5. Max Price
    result = result.filter((item) => item.price <= maxPrice);

    // 6. Minimum Rating
    if (minRating !== null) {
      result = result.filter((item) => item.rating >= minRating);
    }

    // 7. In Stock
    if (inStockOnly) {
      result = result.filter((item) => item.inStock);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "savings") {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedGrade,
    selectedBrands,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedGrade !== "all" ? 1 : 0) +
    selectedBrands.length +
    (maxPrice < 10000 ? 1 : 0) +
    (minRating !== null ? 1 : 0) +
    (inStockOnly ? 1 : 0);

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
    setToastMessage(`Added "${item.name}" to cart at certified pre-owned price!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sidebar Controls
  const renderFilterControls = () => (
    <div className="space-y-5">
      {/* Search Input */}
      <div>
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block mb-1.5">
          Search Pre-Owned Gear
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. SS TON, English Willow, Pads..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#74d600] text-zinc-900 transition-all placeholder:text-zinc-400"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Category */}
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
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Condition Grade */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("grade")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Inspection Grade</span>
          {openSections.grade ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.grade && (
          <div className="space-y-1">
            {PRE_OWNED_GRADES.map((g) => {
              const isSelected = selectedGrade === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGrade(g.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-950 text-white font-bold shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Brands */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("brand")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Brand ({availableBrands.length})</span>
          {openSections.brand ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.brand && (
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-3.5 h-3.5 rounded border-zinc-300 text-[#74d600] focus:ring-[#74d600] accent-[#74d600] cursor-pointer"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Price Slider */}
      <div className="pt-3 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2 cursor-pointer"
        >
          <span>Max Price: ৳{maxPrice.toLocaleString()}</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>
        {openSections.price && (
          <div className="space-y-2">
            <input
              type="range"
              min={2000}
              max={10000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#74d600] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>৳2,000</span>
              <span>৳10,000</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. In-Stock Only */}
      <div className="pt-3 border-t border-zinc-100">
        <label className="flex items-center justify-between text-xs text-zinc-800 font-bold cursor-pointer select-none">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 text-[#74d600] focus:ring-[#74d600] accent-[#74d600] cursor-pointer"
          />
        </label>
      </div>

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <button
          type="button"
          onClick={handleResetFilters}
          className="w-full py-2 px-3 text-xs font-bold text-zinc-600 hover:text-black bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
        >
          Reset Filters ({activeFiltersCount})
        </button>
      )}

      {/* Authority Guarantee Box */}
      <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
        <div className="flex items-center gap-2 text-[#a3e635]">
          <BadgeCheck className="w-4 h-4 shrink-0" />
          <span className="text-xs font-bold">100% Authority Certified</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          Every piece is verified and sold exclusively by PLAYZONE master craftsmen. No unverified third-party sellers.
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pb-20 select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        {/* ================= 1. PRE-OWNED HERO BANNER ================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-zinc-800/60 bg-zinc-950">
          <div className="relative w-full">
            <Image
              src="/images/banners/pre_owned_cta_banner.png"
              alt="PlayZone Pre-Owned Picks - Quality Gear. Bigger Value."
              width={2170}
              height={725}
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Trust Highlights Strip */}
          <div className="border-t border-zinc-800/80 px-4 sm:px-8 py-3 sm:py-3.5 bg-black/60 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium">100% Inspected by Authorities</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium">12-Point Acoustic Ping Test</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium">24h Dhaka & Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#a3e635] shrink-0" />
              <span className="font-medium">Pre-Sanitized & Fresh Grip</span>
            </div>
          </div>
        </div>

        {/* ================= 2. BREADCRUMBS ================= */}
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
          <span className="text-zinc-900 font-bold">Pre-Owned Gear</span>
        </nav>

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

        {/* ================= MAIN PRE-OWNED PRODUCTS CATALOG & FILTERS ================= */}
        <div id="pre-owned-catalog" className="pt-2 scroll-mt-20">
          {/* Header & Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
                Certified Pre-Owned Gear ({filteredItems.length})
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Every bat and gear item listed here is condition-checked, sanitized, and stored at Dhaka dispatch hub.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-zinc-950 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="recommended">Featured / Highest Savings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="savings">Discount %</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-zinc-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <span className="text-xs font-black uppercase text-zinc-900 tracking-wider">
                    Filters
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-bold text-[#549900] hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {renderFilterControls()}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredItems.length === 0 ? (
                <div className="p-12 rounded-3xl bg-zinc-50 border border-zinc-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-zinc-900">No Pre-Owned Gear Matched Your Filters</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Try expanding your price range or clearing brand selections to view available certified equipment.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4.5">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.slug || item.id}`}
                      className="group bg-white rounded-2xl border border-zinc-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 p-3.5 flex flex-col justify-between hover:-translate-y-1 select-none"
                    >
                      <div>
                        {/* Media Display */}
                        <ProductCardMedia
                          src={item.images[0]}
                          alt={item.name}
                          badge={item.badge}
                          className="mb-2.5"
                        />

                        {/* Condition Note Pill */}
                        <div className="mb-2">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-700">
                            {item.inspectionNote}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#549900] transition-colors line-clamp-2 leading-snug min-h-[34px]">
                          {item.name}
                        </h3>

                        {/* Ratings & Hub */}
                        <div className="flex items-center justify-between gap-1 mt-1.5 text-[11px] text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="font-bold text-zinc-800">{item.rating}</span>
                            <span className="text-zinc-400">({item.reviewsCount})</span>
                          </div>
                          <span className="text-[10px] text-zinc-400">Dhaka Hub</span>
                        </div>
                      </div>

                      {/* Pricing & Add to Cart */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-1">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-base font-black text-zinc-950">
                              ৳{item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-zinc-400 line-through">
                                ৳{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {item.discountPercent && (
                            <span className="text-[10px] font-extrabold text-[#549900]">
                              Save {item.discountPercent}%
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(item, e)}
                          title="Add to Cart"
                          className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-[#74d600] hover:text-black text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= 5. THE PLAYZONE AUTHORITY GUARANTEE ================= */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950 text-white space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#a3e635] uppercase tracking-wider">
              AUTHORITY CERTIFIED ONLY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The PlayZone Pre-Owned Standard
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Unlike unverified peer-to-peer marketplaces, every item in PlayZone Pre-Owned is acquired, inspected, and guaranteed directly by our master bat-makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#74d600]/15 text-[#a3e635] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">12-Point Acoustic Ping Test</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Each cleft is tested using hardwood acoustic mallets across toe, edges, and sweet spot to ensure peak compression and sound rebound.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#74d600]/15 text-[#a3e635] flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">Antimicrobial Sanitization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                All leather gear, batting pads, and gloves are thoroughly sanitized with specialized leather antimicrobial solutions before cataloging.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#74d600]/15 text-[#a3e635] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">Dhaka Dispatch & Inspection</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Stored in climate-controlled Dhaka warehouse. Available with 24-hour delivery and Cash on Delivery across Bangladesh.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 6. MOBILE FILTER DRAWER ================= */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
            <div className="relative ml-auto w-full max-w-xs h-full bg-white p-5 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <span className="text-xs font-black uppercase text-zinc-900 tracking-wider">
                  Filter Pre-Owned Gear
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-zinc-500 hover:text-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderFilterControls()}

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 rounded-full bg-zinc-900 text-white font-bold text-xs"
              >
                Apply Filters ({filteredItems.length} items)
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
