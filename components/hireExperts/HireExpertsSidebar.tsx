"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Star, RotateCcw } from "lucide-react";

export interface FilterState {
  categories: string[];
  locations: string[];
  locationSearch: string;
  minPrice: number;
  maxPrice: number;
  experience: string[];
  availability: string[];
  serviceModes: string[];
  verifiedOnly: boolean;
  minRating: number | null;
}

interface HireExpertsSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  onApply?: () => void;
  className?: string;
}

export default function HireExpertsSidebar({
  filters,
  setFilters,
  onReset,
  onApply,
  className = "",
}: HireExpertsSidebarProps) {
  // Collapsible section state
  const [openSections, setOpenSections] = useState({
    category: true,
    location: true,
    price: true,
    experience: true,
    availability: true,
    serviceMode: true,
    verification: true,
    rating: true,
  });

  const [showMoreLocations, setShowMoreLocations] = useState(false);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleLocationToggle = (loc: string) => {
    setFilters((prev) => {
      const exists = prev.locations.includes(loc);
      return {
        ...prev,
        locations: exists
          ? prev.locations.filter((l) => l !== loc)
          : [...prev.locations, loc],
      };
    });
  };

  const handleExperienceToggle = (exp: string) => {
    setFilters((prev) => {
      const exists = prev.experience.includes(exp);
      return {
        ...prev,
        experience: exists
          ? prev.experience.filter((e) => e !== exp)
          : [...prev.experience, exp],
      };
    });
  };

  const handleAvailabilityToggle = (avail: string) => {
    setFilters((prev) => {
      const exists = prev.availability.includes(avail);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((a) => a !== avail)
          : [...prev.availability, avail],
      };
    });
  };

  const handleServiceModeToggle = (mode: string) => {
    setFilters((prev) => {
      const exists = prev.serviceModes.includes(mode);
      return {
        ...prev,
        serviceModes: exists
          ? prev.serviceModes.filter((m) => m !== mode)
          : [...prev.serviceModes, mode],
      };
    });
  };

  const primaryLocations = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];
  const extraLocations = ["Barisal", "Rangpur", "Mymensingh", "Comilla"];
  const displayedLocations = (showMoreLocations
    ? [...primaryLocations, ...extraLocations]
    : primaryLocations
  ).filter((l) =>
    l.toLowerCase().includes(filters.locationSearch.toLowerCase().trim())
  );

  return (
    <aside
      className={`bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-xs select-none ${className}`}
    >
      {/* 1. Header: Filters + Clear All */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <h3 className="text-base font-black text-zinc-950">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-zinc-100 space-y-4">
        {/* 2. Service Category */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Service Category</span>
            {openSections.category ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.category && (
            <div className="space-y-2">
              {[
                { id: "coaching", label: "Coaching & Training" },
                { id: "practice", label: "Practice Partners" },
                { id: "analysis", label: "Performance Analysis" },
                { id: "officials", label: "Match Officials" },
                { id: "ground", label: "Ground & Pitch Services" },
                { id: "fitness", label: "Fitness & Sports Science" },
                { id: "equipment", label: "Equipment & Technical" },
                { id: "media", label: "Media & Tournament" },
              ].map((item) => {
                const checked = filters.categories.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategoryToggle(item.id)}
                      className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Location */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("location")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Location</span>
            {openSections.location ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.location && (
            <div className="space-y-2.5">
              {/* Location Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={filters.locationSearch}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      locationSearch: e.target.value,
                    }))
                  }
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 outline-none focus:border-zinc-900 bg-zinc-50/60"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-1">
                {displayedLocations.map((loc) => {
                  const checked = filters.locations.includes(loc);
                  return (
                    <label
                      key={loc}
                      className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleLocationToggle(loc)}
                        className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                      />
                      <span>{loc}</span>
                    </label>
                  );
                })}
              </div>

              {/* Show more toggle */}
              <button
                type="button"
                onClick={() => setShowMoreLocations(!showMoreLocations)}
                className="text-[11px] font-bold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 cursor-pointer pt-1"
              >
                {showMoreLocations ? "Show less ∧" : "Show more ∨"}
              </button>
            </div>
          )}
        </div>

        {/* 4. Price Range (BDT) */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Min (৳)</span>
                  <input
                    type="number"
                    value={filters.minPrice}
                    min={500}
                    max={filters.maxPrice}
                    step={100}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: Number(e.target.value) || 500,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-200 outline-none focus:border-zinc-900 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Max (৳)</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    min={filters.minPrice}
                    max={10000}
                    step={100}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Number(e.target.value) || 5000,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-200 outline-none focus:border-zinc-900 bg-white"
                  />
                </div>
              </div>

              {/* Slider track visualization */}
              <div className="pt-2 px-1">
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#84cc16] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>৳ 500</span>
                  <span>৳ 5,000+</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Experience */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("experience")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Experience</span>
            {openSections.experience ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.experience && (
            <div className="space-y-2">
              {["1 - 3 years", "3 - 5 years", "5 - 10 years", "10+ years"].map((exp) => {
                const checked = filters.experience.includes(exp);
                return (
                  <label
                    key={exp}
                    className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleExperienceToggle(exp)}
                      className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{exp}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Availability */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("availability")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Availability</span>
            {openSections.availability ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.availability && (
            <div className="space-y-2">
              {["Today", "This week", "Weekends", "Select date"].map((avail) => {
                const checked = filters.availability.includes(avail);
                return (
                  <label
                    key={avail}
                    className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleAvailabilityToggle(avail)}
                      className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{avail}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 7. Service Mode */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("serviceMode")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Service Mode</span>
            {openSections.serviceMode ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.serviceMode && (
            <div className="space-y-2">
              {[
                { id: "ground", label: "At ground/academy" },
                { id: "home", label: "At home (where applicable)" },
                { id: "online", label: "Online consultation" },
              ].map((mode) => {
                const checked = filters.serviceModes.includes(mode.id);
                return (
                  <label
                    key={mode.id}
                    className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleServiceModeToggle(mode.id)}
                      className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <span>{mode.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 8. Verification */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("verification")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Verification</span>
            {openSections.verification ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.verification && (
            <div>
              <label className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      verifiedOnly: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                />
                <span>Verified profiles only</span>
              </label>
            </div>
          )}
        </div>

        {/* 9. Rating */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => toggleSection("rating")}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5"
          >
            <span>Rating</span>
            {openSections.rating ? (
              <ChevronUp className="w-4 h-4 text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          {openSections.rating && (
            <div className="space-y-2">
              {[
                { min: 4.5, stars: 5, label: "4.5 & above" },
                { min: 4.0, stars: 4, label: "4.0 & above" },
                { min: 3.5, stars: 3, label: "3.5 & above" },
                { min: 3.0, stars: 3, label: "3.0 & above" },
              ].map((item) => {
                const checked = filters.minRating === item.min;
                return (
                  <label
                    key={item.min}
                    className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer font-medium"
                  >
                    <input
                      type="radio"
                      name="minRating"
                      checked={checked}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          minRating: checked ? null : item.min,
                        }))
                      }
                      className="w-4 h-4 border-zinc-300 text-[#84cc16] focus:ring-[#84cc16] accent-[#84cc16] cursor-pointer"
                    />
                    <div className="flex items-center gap-0.5 text-[#84cc16]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < item.stars
                              ? "fill-[#84cc16] text-[#84cc16]"
                              : "text-zinc-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 10. Bottom Action Buttons: Apply Filters & Reset */}
      <div className="pt-6 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onApply}
          className="w-full py-2.5 px-4 rounded-xl bg-[#a3e635] hover:bg-[#92cf2e] text-black font-extrabold text-xs transition-all shadow-xs active:scale-95 cursor-pointer text-center"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 font-bold text-xs border border-zinc-200 transition-all shadow-xs active:scale-95 cursor-pointer text-center"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}
