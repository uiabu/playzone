"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronsRight,
  Sparkles,
  UserPlus,
} from "lucide-react";
import {
  EXPERTS_DATA,
  Expert,
  getExpertType,
} from "@/components/hireExperts/expertsData";
import ExpertCard from "@/components/hireExperts/ExpertCard";
import HireExpertsSidebar, {
  FilterState,
} from "@/components/hireExperts/HireExpertsSidebar";
import BookingModal from "@/components/hireExperts/BookingModal";
import ProfileModal from "@/components/hireExperts/ProfileModal";
import JoinExpertModal from "@/components/hireExperts/JoinExpertModal";

const INITIAL_FILTERS: FilterState = {
  categories: [],
  locations: [],
  locationSearch: "",
  minPrice: 500,
  maxPrice: 5000,
  experience: [],
  availability: [],
  serviceModes: [],
  verifiedOnly: false,
  minRating: null,
};

export default function HireExpertsPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Modal states
  const [selectedProfileExpert, setSelectedProfileExpert] =
    useState<Expert | null>(null);
  const [selectedBookingExpert, setSelectedBookingExpert] =
    useState<Expert | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setIsMobileFilterOpen(false);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredExperts = useMemo(() => {
    return EXPERTS_DATA.filter((expert) => {
      // Category / Expert Type filter
      if (filters.categories.length > 0) {
        const expertType = getExpertType(expert);
        const matchesCategory = filters.categories.includes(expert.category);
        const matchesType = filters.categories.includes(expertType);
        if (!matchesCategory && !matchesType) {
          return false;
        }
      }

      // Location filter
      if (
        filters.locations.length > 0 &&
        !filters.locations.some(
          (loc) =>
            expert.location.toLowerCase().includes(loc.toLowerCase()) ||
            loc.toLowerCase() === "all bangladesh"
        )
      ) {
        return false;
      }

      // Location text search
      if (
        filters.locationSearch.trim() &&
        !expert.location
          .toLowerCase()
          .includes(filters.locationSearch.toLowerCase().trim())
      ) {
        return false;
      }

      // Price filter
      if (
        expert.price < filters.minPrice ||
        expert.price > filters.maxPrice
      ) {
        return false;
      }

      // Experience filter
      if (
        filters.experience.length > 0 &&
        !filters.experience.includes(expert.experienceLabel)
      ) {
        return false;
      }

      // Service mode filter
      if (
        filters.serviceModes.length > 0 &&
        !filters.serviceModes.some((mode) =>
          expert.serviceModes.includes(mode as any)
        )
      ) {
        return false;
      }

      // Verified filter
      if (filters.verifiedOnly && !expert.verified) {
        return false;
      }

      // Rating filter
      if (
        filters.minRating !== null &&
        expert.rating < filters.minRating
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0; // Default recommended
    });
  }, [filters, sortBy]);

  const totalResults = EXPERTS_DATA.length;
  const currentCount = filteredExperts.length;

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* 1. Panoramic Top Banner */}
        <div className="relative w-full aspect-[1108/236] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-zinc-200/80 bg-zinc-950">
          <Image
            src="/images/experts/hire_experts_banner.png"
            alt="Hire Cricket Experts - Coaches, Analysts, Umpires, Fitness and more"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center"
          />
        </div>

        {/* 2. Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mt-5 text-xs text-zinc-500 font-medium"
        >
          <Link
            href="/"
            className="hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-700 font-semibold">Hire Experts</span>
        </nav>

        {/* 3. Heading & Subtitle + Join as Expert Action */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-zinc-950 font-serif md:font-sans">
              Hire Cricket Experts in Bangladesh
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              Find and book professional cricket experts for coaching, training,
              analysis, matches and events.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsJoinModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-black bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 transition-all duration-200 shadow-xs hover:shadow cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join as Expert</span>
          </button>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-zinc-800 shadow-2xs hover:bg-zinc-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {(filters.categories.length > 0 ||
              filters.locations.length > 0 ||
              filters.verifiedOnly ||
              filters.minRating !== null) && (
              <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
            )}
          </button>

          <span className="text-xs text-zinc-500">
            {filteredExperts.length} experts available
          </span>
        </div>

        {/* 4. Main Body: Sidebar + Grid */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Desktop Sidebar (Left) */}
          <div className="hidden lg:block w-[270px] shrink-0 sticky top-24">
            <HireExpertsSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              onApply={handleApplyFilters}
              onOpenJoinModal={() => setIsJoinModalOpen(true)}
            />
          </div>

          {/* Mobile Sidebar Slide-Over Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
                <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
                  <h3 className="font-bold text-base text-zinc-900">Filters</h3>
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <HireExpertsSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onReset={handleResetFilters}
                    onApply={handleApplyFilters}
                    onOpenJoinModal={() => {
                      setIsMobileFilterOpen(false);
                      setIsJoinModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Right Main Content */}
          <div className="flex-1 w-full min-w-0">
            {/* Results Header: Count & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-200/80">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                  {currentCount} {currentCount === 1 ? "Expert" : "Experts"} Available
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Showing {currentCount} of {totalResults} registered professionals
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-zinc-500 whitespace-nowrap">
                  Sort By
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 rounded-lg px-3 py-1.5 pr-8 hover:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer shadow-2xs"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                  <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Experts Grid */}
            {filteredExperts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4.5 mt-5">
                {filteredExperts.map((expert) => (
                  <ExpertCard
                    key={expert.id}
                    expert={expert}
                    onViewProfile={(exp) => setSelectedProfileExpert(exp)}
                    onBook={(exp) => setSelectedBookingExpert(exp)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 py-16 px-4 text-center bg-white rounded-2xl border border-zinc-200/80">
                <p className="text-sm font-semibold text-zinc-800">
                  No experts match your selected filters.
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Try adjusting or clearing some filters to see available
                  professionals.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* 5. Pagination Bar (Matching Mockup) */}
            <div className="mt-10 pt-6 border-t border-zinc-200/80 flex items-center justify-between flex-wrap gap-4 text-xs font-medium text-zinc-600">
              {/* Previous */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-1.5 mx-auto">
                {/* 1 - Active Orange */}
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                    currentPage === 1
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  1
                </button>

                {[2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <span className="px-1 text-zinc-400 select-none">...</span>

                <button
                  type="button"
                  onClick={() => setCurrentPage(21)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === 21
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70"
                  }`}
                >
                  21
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage(21)}
                  aria-label="Last page"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-semibold bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70 cursor-pointer"
                >
                  <ChevronsRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(21, p + 1))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      <ProfileModal
        expert={selectedProfileExpert}
        isOpen={Boolean(selectedProfileExpert)}
        onClose={() => setSelectedProfileExpert(null)}
        onBook={(expert) => {
          setSelectedProfileExpert(null);
          setSelectedBookingExpert(expert);
        }}
      />

      {/* Booking Form Modal */}
      <BookingModal
        expert={selectedBookingExpert}
        isOpen={Boolean(selectedBookingExpert)}
        onClose={() => setSelectedBookingExpert(null)}
      />

      {/* Join as Expert Application Modal */}
      <JoinExpertModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </main>
  );
}
