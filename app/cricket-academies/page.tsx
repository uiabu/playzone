"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Filter,
  X,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Academy,
  AgeGroup,
  TrainingType,
  AdmissionStatus,
  DIVISIONS,
  ALL_AGE_GROUPS,
  ALL_TRAINING_TYPES,
  ADMISSION_STATUSES,
  INITIAL_ACADEMIES,
} from "@/lib/academiesData";
import AcademyCard from "@/components/academies/AcademyCard";
import AdmissionInquiryModal from "@/components/academies/AdmissionInquiryModal";
import ContactAcademyModal from "@/components/academies/ContactAcademyModal";

export default function CricketAcademiesDirectoryPage() {
  const [academies, setAcademies] = useState<Academy[]>(INITIAL_ACADEMIES);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("All");
  const [selectedTrainingType, setSelectedTrainingType] = useState<string>("All");
  const [selectedAdmissionStatus, setSelectedAdmissionStatus] =
    useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Modals state
  const [selectedAcademyForApply, setSelectedAcademyForApply] =
    useState<Academy | null>(null);
  const [selectedAcademyForContact, setSelectedAcademyForContact] =
    useState<Academy | null>(null);

  // Fetch updated academies from API on mount
  useEffect(() => {
    async function fetchAcademies() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/academies");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAcademies(json.data);
        }
      } catch (err) {
        console.warn("Using initial pre-seeded academies:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAcademies();
  }, []);

  // Compute available districts based on selected division
  const availableDistricts = useMemo(() => {
    const list = new Set<string>();
    academies.forEach((a) => {
      if (
        selectedDivision === "All" ||
        a.location.division.toLowerCase() === selectedDivision.toLowerCase()
      ) {
        list.add(a.location.district);
      }
    });
    return Array.from(list);
  }, [academies, selectedDivision]);

  // Compute available upazilas based on selected district
  const availableUpazilas = useMemo(() => {
    const list = new Set<string>();
    academies.forEach((a) => {
      if (
        (selectedDivision === "All" ||
          a.location.division.toLowerCase() === selectedDivision.toLowerCase()) &&
        (selectedDistrict === "All" ||
          a.location.district.toLowerCase() === selectedDistrict.toLowerCase())
      ) {
        if (a.location.upazila) list.add(a.location.upazila);
      }
    });
    return Array.from(list);
  }, [academies, selectedDivision, selectedDistrict]);

  // Filtered academies list
  const filteredAcademies = useMemo(() => {
    const results = academies.filter((academy) => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = academy.name.toLowerCase().includes(query);
        const matchesLocation =
          academy.location.address.toLowerCase().includes(query) ||
          academy.location.district.toLowerCase().includes(query) ||
          academy.location.upazila.toLowerCase().includes(query);
        const matchesCoach =
          academy.headCoachName &&
          academy.headCoachName.toLowerCase().includes(query);
        const matchesTagline = academy.tagline.toLowerCase().includes(query);

        if (!matchesName && !matchesLocation && !matchesCoach && !matchesTagline) {
          return false;
        }
      }

      // 2. Division filter
      if (
        selectedDivision !== "All" &&
        academy.location.division.toLowerCase() !== selectedDivision.toLowerCase()
      ) {
        return false;
      }

      // 3. District filter
      if (
        selectedDistrict !== "All" &&
        academy.location.district.toLowerCase() !== selectedDistrict.toLowerCase()
      ) {
        return false;
      }

      // 4. Upazila filter
      if (
        selectedUpazila !== "All" &&
        academy.location.upazila.toLowerCase() !== selectedUpazila.toLowerCase()
      ) {
        return false;
      }

      // 5. Age group filter
      if (
        selectedAgeGroup !== "All" &&
        !academy.eligibleAgeGroups.includes(selectedAgeGroup as AgeGroup)
      ) {
        return false;
      }

      // 6. Training type filter
      if (
        selectedTrainingType !== "All" &&
        !academy.availableTrainingTypes.includes(
          selectedTrainingType as TrainingType
        )
      ) {
        return false;
      }

      // 7. Admission status filter
      if (
        selectedAdmissionStatus !== "All" &&
        academy.admissionStatus !== selectedAdmissionStatus
      ) {
        return false;
      }

      // 8. Verified only filter
      if (verifiedOnly && !academy.isVerified) {
        return false;
      }

      return true;
    });

    if (sortBy === "experience") {
      return [...results].sort((a, b) => a.establishedYear - b.establishedYear);
    }
    if (sortBy === "newest") {
      return [...results].sort((a, b) => b.establishedYear - a.establishedYear);
    }
    if (sortBy === "name") {
      return [...results].sort((a, b) => a.name.localeCompare(b.name));
    }
    return results;
  }, [
    academies,
    searchTerm,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedAgeGroup,
    selectedTrainingType,
    selectedAdmissionStatus,
    verifiedOnly,
    sortBy,
  ]);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedDivision !== "All" ||
    selectedDistrict !== "All" ||
    selectedUpazila !== "All" ||
    selectedAgeGroup !== "All" ||
    selectedTrainingType !== "All" ||
    selectedAdmissionStatus !== "All" ||
    verifiedOnly;

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDivision("All");
    setSelectedDistrict("All");
    setSelectedUpazila("All");
    setSelectedAgeGroup("All");
    setSelectedTrainingType("All");
    setSelectedAdmissionStatus("All");
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#fafbfa]">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative bg-zinc-950 text-white overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-[#84cc16]/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-[#84cc16]/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-black uppercase tracking-wider text-[#84cc16] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLAYZONE Cricket Academy Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Find the Right <span className="text-[#84cc16]">Cricket Academy</span>{" "}
            for Your Future
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Discover cricket academies, experienced coaches, and training
            opportunities across Bangladesh.
          </p>

          {/* Quick Search Input inside Hero */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by academy name, coach, or location (e.g. Rupganj, Baridhara, Savar)..."
                className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm rounded-2xl bg-zinc-900/90 text-white placeholder:text-zinc-500 border border-zinc-700/80 focus:outline-none focus:border-[#84cc16] focus:ring-2 focus:ring-[#84cc16]/20 transition-all shadow-xl"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-12 p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="absolute right-2 px-4 py-2 rounded-xl bg-[#84cc16] text-zinc-950 font-black text-xs hover:bg-[#74d600] transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-zinc-400 font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#84cc16]" />
              <span>100% Verified Bangladesh Academies</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#84cc16]" />
              <span>National & ICC Certified Coaches</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#84cc16]" />
              <span>Age-Group to First-Class Pathways</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. MAIN DIRECTORY & FILTERS ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* FILTERS CONTAINER */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs mb-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#65a30d]" />
              <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">
                Filter Academies
              </h3>
              <span className="text-xs text-zinc-500 font-bold">
                ({filteredAcademies.length} of {academies.length} shown)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Location Dropdowns: Division, District, Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Division */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict("All");
                  setSelectedUpazila("All");
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] bg-white font-medium"
              >
                <option value="All">All Divisions (Bangladesh)</option>
                {DIVISIONS.map((div) => (
                  <option key={div} value={div}>
                    {div} Division
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila("All");
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] bg-white font-medium"
              >
                <option value="All">All Districts</option>
                {availableDistricts.map((dst) => (
                  <option key={dst} value={dst}>
                    {dst}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                Upazila / Area
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16] focus:ring-1 focus:ring-[#84cc16] bg-white font-medium"
              >
                <option value="All">All Upazilas / Areas</option>
                {availableUpazilas.map((upz) => (
                  <option key={upz} value={upz}>
                    {upz}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Age-Group Filter Pills */}
          <div className="pt-2">
            <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block mb-2">
              Age Group Category
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedAgeGroup("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedAgeGroup === "All"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                All Age Groups
              </button>
              {ALL_AGE_GROUPS.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setSelectedAgeGroup(age)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedAgeGroup === age
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Training Type Filters */}
          <div className="pt-2">
            <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block mb-2">
              Training Focus
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedTrainingType("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedTrainingType === "All"
                    ? "bg-[#84cc16] text-zinc-950 shadow-xs"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                All Specializations
              </button>
              {ALL_TRAINING_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedTrainingType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedTrainingType === type
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Admission Status Filter & Verified Only */}
          <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                Admission Status:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedAdmissionStatus("All")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    selectedAdmissionStatus === "All"
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  All
                </button>
                {ADMISSION_STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedAdmissionStatus(status)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      selectedAdmissionStatus === status
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only Toggle */}
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                Show Verified Academies Only
              </span>
            </label>
          </div>
        </div>

        {/* ================= 3. ACADEMIES DIRECTORY HEADER & GRID ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              Cricket Academies
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
              Showing 1-{filteredAcademies.length} of {Math.max(filteredAcademies.length, 120)} academies
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-zinc-800 bg-white border border-zinc-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#84cc16] cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured</option>
              <option value="experience">Years of Experience</option>
              <option value="newest">Recently Established</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#84cc16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-zinc-500 font-semibold">
              Loading verified cricket academies...
            </p>
          </div>
        ) : filteredAcademies.length === 0 ? (
          <div className="w-full py-16 px-6 rounded-3xl bg-white border border-dashed border-zinc-300 text-center flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-900">
                No Cricket Academies Found
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 leading-relaxed">
                No academies match your current search and filter combination.
                Try adjusting the division, training type, or resetting filters.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredAcademies.map((academy) => (
                <AcademyCard
                  key={academy.id}
                  academy={academy}
                />
              ))}
            </div>

            {/* Pagination Matching Screenshot 1 */}
            <div className="pt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-500 flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl bg-zinc-950 text-white font-black text-xs flex items-center justify-center shadow-xs cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-bold text-xs flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-bold text-xs flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                3
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-bold text-xs flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                4
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-bold text-xs flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                5
              </button>
              <span className="px-1 text-zinc-400 font-bold text-xs">...</span>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-700 font-bold text-xs flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
              >
                10
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl border border-zinc-200 bg-white text-zinc-500 flex items-center justify-center hover:bg-zinc-50 transition-colors shadow-2xs cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. ACADEMY ENROLLMENT NOTICE & TRUST BANNER ================= */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 text-white border border-zinc-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#84cc16]/20 text-[#84cc16] text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authentic Directory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Are you an authorized official of a registered Cricket Academy?
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              PLAYZONE maintains a strictly curated, verified database of cricket
              academies across Bangladesh. Academy profile updates and listings
              are managed exclusively by PLAYZONE administrators to ensure data
              integrity and authenticity.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs transition-all shadow-md"
            >
              <span>Contact PLAYZONE Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 5. MODALS ================= */}
      <AdmissionInquiryModal
        isOpen={Boolean(selectedAcademyForApply)}
        onClose={() => setSelectedAcademyForApply(null)}
        academy={selectedAcademyForApply}
      />

      <ContactAcademyModal
        isOpen={Boolean(selectedAcademyForContact)}
        onClose={() => setSelectedAcademyForContact(null)}
        academy={selectedAcademyForContact}
      />
    </div>
  );
}
