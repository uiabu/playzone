"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (date: string) => void;
  minDate?: string;
  placeholder?: string;
  required?: boolean;
  preferredDirection?: "up" | "down" | "auto";
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Helper to format date safely as YYYY-MM-DD without UTC timezone drift
function formatDateString(year: number, month: number, day: number): string {
  const m = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
  const d = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${m}-${d}`;
}

// Helper to format display text (e.g. "Mon, Nov 23, 2026")
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function CustomDatePicker({
  value,
  onChange,
  minDate,
  placeholder = "Select date...",
  required = false,
  preferredDirection = "auto",
}: CustomDatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<"down" | "up">("down");
  const [openAlign, setOpenAlign] = useState<"left" | "right">("left");

  // Smart direction placement: Open towards wherever there is more space
  const toggleOpen = () => {
    if (!isOpen && containerRef.current) {
      if (preferredDirection === "up") {
        setOpenDirection("up");
      } else if (preferredDirection === "down") {
        setOpenDirection("down");
      } else {
        const rect = containerRef.current.getBoundingClientRect();
        const parentModal = containerRef.current.closest(".overflow-y-auto, [role='dialog'], form");
        let spaceBelow = window.innerHeight - rect.bottom;
        let spaceAbove = rect.top;
        if (parentModal) {
          const pRect = parentModal.getBoundingClientRect();
          spaceBelow = pRect.bottom - rect.bottom;
          spaceAbove = rect.top - pRect.top;
        }
        const popoverHeight = 260;

        if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
          setOpenDirection("up");
        } else {
          setOpenDirection("down");
        }
      }

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.left + 290 > window.innerWidth) {
        setOpenAlign("right");
      } else {
        setOpenAlign("left");
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Initialize view month/year based on value or current date
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todayStr = formatDateString(todayYear, todayMonth, todayDay);

  const effectiveMin = minDate || todayStr;

  const [viewYear, setViewYear] = useState<number>(() => {
    if (value) {
      const [y] = value.split("-").map(Number);
      if (y) return y;
    }
    return todayYear;
  });

  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (value) {
      const [, m] = value.split("-").map(Number);
      if (m) return m - 1;
    }
    return todayMonth;
  });

  // Sync view month/year when value changes
  useEffect(() => {
    if (value) {
      const [y, m] = value.split("-").map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Navigation handlers
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build calendar matrix
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const handleSelectDate = (day: number) => {
    const dateStr = formatDateString(viewYear, viewMonth, day);
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(todayStr);
    setViewYear(todayYear);
    setViewMonth(todayMonth);
    setIsOpen(false);
  };

  const handleSelectTomorrow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const tomStr = formatDateString(tom.getFullYear(), tom.getMonth(), tom.getDate());
    onChange(tomStr);
    setViewYear(tom.getFullYear());
    setViewMonth(tom.getMonth());
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden native input for required form validation */}
      <input
        type="text"
        required={required}
        value={value}
        onChange={() => { }}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Trigger Button Styled like a Form Input */}
      <button
        type="button"
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border text-xs sm:text-sm bg-white transition-all cursor-pointer shadow-2xs ${isOpen
          ? "border-zinc-950 ring-1 ring-zinc-950"
          : "border-zinc-200 hover:border-zinc-300"
          }`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon className="w-4 h-4 text-zinc-400 shrink-0" />
          {value ? (
            <span className="font-semibold text-zinc-900 truncate">
              {formatDisplayDate(value)}
            </span>
          ) : (
            <span className="text-zinc-400 truncate">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {value && (
            <span
              onClick={handleClear}
              className="p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <span className="text-xs text-zinc-400 font-semibold px-1">📅</span>
        </div>
      </button>

      {/* Beautiful Popover Calendar with Smart Dynamic Direction Placement */}
      {isOpen && (
        <div
          className={`absolute ${openDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
            } ${openAlign === "right" ? "right-0" : "left-0"
            } bg-white rounded-2xl border border-zinc-200 shadow-2xl p-2.5 sm:p-3 z-50 animate-in fade-in-50 zoom-in-95 duration-150 w-full sm:w-72`}
        >
          {/* Header: Month, Year & Navigation */}
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-zinc-100">
            <h4 className="text-xs sm:text-sm font-black text-zinc-950 tracking-tight">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </h4>

            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={prevMonth}
                className="w-6 h-6 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="w-6 h-6 rounded-md hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-1 text-center">
            {DAYS_OF_WEEK.map((day) => (
              <span
                key={day}
                className="text-[10px] font-bold text-zinc-400 uppercase py-0.5"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Previous month filler days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => {
              const dayNum = daysInPrevMonth - firstDayOfWeek + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="h-7 flex items-center justify-center text-[11px] text-zinc-300 font-medium select-none"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = formatDateString(viewYear, viewMonth, dayNum);
              const isSelected = value === dateStr;
              const isToday = todayStr === dateStr;
              const isPast = effectiveMin ? dateStr < effectiveMin : false;

              return (
                <button
                  key={dayNum}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDate(dayNum)}
                  className={`h-7 w-7 sm:h-7.5 sm:w-7.5 mx-auto rounded-lg flex items-center justify-center text-xs font-bold transition-all ${isSelected
                    ? "bg-[#84cc16] text-zinc-950 shadow-sm scale-105"
                    : isPast
                      ? "text-zinc-300 cursor-not-allowed"
                      : isToday
                        ? "border border-[#84cc16] text-zinc-950 hover:bg-lime-50"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 cursor-pointer"
                    }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Quick Shortcut Buttons in Footer */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-100 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSelectToday}
                className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-lime-100 text-zinc-700 hover:text-lime-900 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={handleSelectTomorrow}
                className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-lime-100 text-zinc-700 hover:text-lime-900 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Tomorrow
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
