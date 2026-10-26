"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Building,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
  Unlock,
  KeyRound,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Academy,
  AdmissionInquiry,
  InquiryStatus,
  AdmissionStatus,
  AgeGroup,
  TrainingType,
  DIVISIONS,
  ALL_AGE_GROUPS,
  ALL_TRAINING_TYPES,
  ADMISSION_STATUSES,
  calculateYearsOfOperation,
  INITIAL_ACADEMIES,
  INITIAL_INQUIRIES,
} from "@/lib/academiesData";

export default function AdminAcademiesPage() {
  // Authorization state: simple secure passkey guard
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true); // default open in dev
  const [adminPinInput, setAdminPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Navigation tabs: "academies" | "inquiries"
  const [activeTab, setActiveTab] = useState<"academies" | "inquiries">("academies");

  // Data states
  const [academies, setAcademies] = useState<Academy[]>(INITIAL_ACADEMIES);
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(INITIAL_INQUIRIES);
  const [isLoading, setIsLoading] = useState(false);

  // Filters state for Academies
  const [academySearch, setAcademySearch] = useState("");
  const [filterPublished, setFilterPublished] = useState<"all" | "published" | "draft">("all");
  const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "unverified">("all");

  // Filters state for Inquiries
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("All");
  const [inquiryAcademyFilter, setInquiryAcademyFilter] = useState<string>("All");

  // Modal states
  const [editingAcademy, setEditingAcademy] = useState<Academy | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingInquiry, setViewingInquiry] = useState<AdmissionInquiry | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Academy Form State (for Create & Edit)
  const [formData, setFormData] = useState<Partial<Academy>>({
    name: "",
    slug: "",
    shortName: "",
    tagline: "",
    logo: "/images/playzone-logo-transparent.png",
    coverImage:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2020,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Dhaka, Bangladesh",
      upazila: "Dhaka",
      district: "Dhaka",
      division: "Dhaka",
    },
    contact: {
      phone: ["+8801700000000"],
      email: "info@cricketacademy.bd",
    },
    headCoachName: "Senior Coach",
    headCoachRole: "Head Coach",
    about: {
      history: "Premier cricket training institution.",
      founderOrDirector: "Director",
      mission: "To train youth with professional cricket technique.",
      philosophy: "Discipline and consistent turf match simulation.",
    },
    eligibleAgeGroups: ["U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: ["Batting", "Bowling", "Fitness"],
    coaches: [],
    programs: [],
    facilities: [],
    galleryImages: [],
    alumni: [],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails: "Trial session by appointment with coaching panel.",
      monthlyFeeNote: "Monthly fee structured per age group.",
      requiredDocuments: ["Birth Certificate copy", "2 passport photos"],
      practiceTimings: "Morning and afternoon sessions",
    },
  });

  // Fetch live academies and inquiries
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [acadRes, inqRes] = await Promise.all([
        fetch("/api/academies?includeUnpublished=true"),
        fetch("/api/academies/inquiries"),
      ]);

      if (acadRes.ok) {
        const aJson = await acadRes.json();
        if (aJson.success && Array.isArray(aJson.data)) {
          setAcademies(aJson.data);
        }
      }

      if (inqRes.ok) {
        const iJson = await inqRes.json();
        if (iJson.success && Array.isArray(iJson.data)) {
          setInquiries(iJson.data);
        }
      }
    } catch (err) {
      console.warn("Using fallback admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3500);
  };

  // Authenticate PIN
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput === "playzone2026" || adminPinInput === "admin") {
      setIsAdminAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Invalid Admin Passkey. Hint: playzone2026");
    }
  };

  // Toggle Published
  const handleTogglePublish = async (academy: Academy) => {
    const updatedStatus = !academy.isPublished;
    try {
      const res = await fetch(`/api/academies/${academy.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: updatedStatus }),
      });
      if (res.ok) {
        setAcademies((prev) =>
          prev.map((a) =>
            a.id === academy.id ? { ...a, isPublished: updatedStatus } : a
          )
        );
        showNotification(
          `Academy "${academy.name}" is now ${
            updatedStatus ? "PUBLISHED" : "UNPUBLISHED (Draft)"
          }.`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Verified
  const handleToggleVerified = async (academy: Academy) => {
    const updatedStatus = !academy.isVerified;
    try {
      const res = await fetch(`/api/academies/${academy.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: updatedStatus }),
      });
      if (res.ok) {
        setAcademies((prev) =>
          prev.map((a) =>
            a.id === academy.id ? { ...a, isVerified: updatedStatus } : a
          )
        );
        showNotification(
          `Academy "${academy.name}" verified badge ${
            updatedStatus ? "ACTIVATED" : "REMOVED"
          }.`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Academy
  const handleDeleteAcademy = async (academy: Academy) => {
    if (
      !confirm(
        `Are you sure you want to delete "${academy.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/academies/${academy.slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAcademies((prev) => prev.filter((a) => a.id !== academy.id));
        showNotification(`Academy "${academy.name}" was deleted successfully.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open Edit Modal
  const handleStartEdit = (academy: Academy) => {
    setEditingAcademy(academy);
    setFormData({ ...academy });
    setIsCreateModalOpen(true);
  };

  // Open Create Modal
  const handleStartCreate = () => {
    setEditingAcademy(null);
    setFormData({
      name: "",
      slug: "",
      shortName: "",
      tagline: "",
      logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&q=80",
      coverImage:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
      establishedYear: 2021,
      isVerified: true,
      isPublished: true,
      admissionStatus: "Open",
      location: {
        address: "Dhaka, Bangladesh",
        upazila: "Dhaka",
        district: "Dhaka",
        division: "Dhaka",
      },
      contact: {
        phone: ["+8801700000000"],
        email: "info@academy.bd",
      },
      headCoachName: "Lead Coach",
      headCoachRole: "Head Coach",
      about: {
        history: "High-performance cricket development academy.",
        founderOrDirector: "Director Board",
        mission: "Nurturing young cricketers with modern techniques.",
        philosophy: "Discipline, turf wicket match repetition, and agility.",
      },
      eligibleAgeGroups: ["U-12", "U-14", "U-16", "U-18"],
      availableTrainingTypes: ["Batting", "Bowling", "Fitness"],
      coaches: [],
      programs: [],
      facilities: [],
      galleryImages: [],
      alumni: [],
      admissionInfo: {
        status: "Open",
        trialSessionAvailable: true,
        trialSessionDetails: "Trial sessions conducted on appointment.",
        requiredDocuments: ["Birth Certificate copy", "2 passport photos"],
        practiceTimings: "Morning: 7:00 AM - 10:00 AM | Afternoon: 3:00 PM - 6:00 PM",
      },
    });
    setIsCreateModalOpen(true);
  };

  // Save Academy (Create or Update)
  const handleSaveAcademy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert("Please provide an academy name.");
      return;
    }

    const slug =
      formData.slug?.trim() ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload = {
      ...formData,
      slug,
      id: editingAcademy ? editingAcademy.id : slug,
    };

    try {
      if (editingAcademy) {
        // PATCH
        const res = await fetch(`/api/academies/${editingAcademy.slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const json = await res.json();
          setAcademies((prev) =>
            prev.map((a) => (a.id === editingAcademy.id ? json.data : a))
          );
          setIsCreateModalOpen(false);
          showNotification(`Academy "${payload.name}" updated successfully!`);
        }
      } else {
        // POST
        const res = await fetch("/api/academies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setAcademies((prev) => [json.data, ...prev]);
          setIsCreateModalOpen(false);
          showNotification(`Academy "${payload.name}" created successfully!`);
        } else {
          alert(json.message || "Failed to create academy");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving academy");
    }
  };

  // Update Inquiry Status & Notes
  const handleUpdateInquiryStatus = async (
    id: string,
    newStatus: InquiryStatus,
    adminNotes?: string
  ) => {
    try {
      const res = await fetch(`/api/academies/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });
      if (res.ok) {
        const json = await res.json();
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? json.data : i))
        );
        if (viewingInquiry?.id === id) {
          setViewingInquiry(json.data);
        }
        showNotification(`Inquiry status updated to "${newStatus}".`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Academies
  const filteredAcademies = useMemo(() => {
    return academies.filter((acad) => {
      if (academySearch.trim()) {
        const q = academySearch.toLowerCase().trim();
        const matchesName = acad.name.toLowerCase().includes(q);
        const matchesLoc = acad.location.district.toLowerCase().includes(q);
        const matchesCoach =
          acad.headCoachName && acad.headCoachName.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesCoach) return false;
      }
      if (filterPublished === "published" && !acad.isPublished) return false;
      if (filterPublished === "draft" && acad.isPublished) return false;
      if (filterVerified === "verified" && !acad.isVerified) return false;
      if (filterVerified === "unverified" && acad.isVerified) return false;
      return true;
    });
  }, [academies, academySearch, filterPublished, filterVerified]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      if (inquirySearch.trim()) {
        const q = inquirySearch.toLowerCase().trim();
        const matchesStudent = inq.studentName.toLowerCase().includes(q);
        const matchesRef = inq.id.toLowerCase().includes(q);
        const matchesPhone = inq.guardianPhone.includes(q);
        const matchesGuardian =
          inq.guardianName && inq.guardianName.toLowerCase().includes(q);
        if (!matchesStudent && !matchesRef && !matchesPhone && !matchesGuardian) {
          return false;
        }
      }
      if (
        inquiryStatusFilter !== "All" &&
        inq.status !== inquiryStatusFilter
      ) {
        return false;
      }
      if (
        inquiryAcademyFilter !== "All" &&
        inq.academyId !== inquiryAcademyFilter
      ) {
        return false;
      }
      return true;
    });
  }, [inquiries, inquirySearch, inquiryStatusFilter, inquiryAcademyFilter]);

  // Summary counts
  const inquiryCounts = useMemo(() => {
    return {
      total: inquiries.length,
      pending: inquiries.filter((i) => i.status === "Pending").length,
      underReview: inquiries.filter((i) => i.status === "Under Review").length,
      contacted: inquiries.filter((i) => i.status === "Contacted").length,
      accepted: inquiries.filter((i) => i.status === "Accepted").length,
      rejected: inquiries.filter((i) => i.status === "Rejected").length,
    };
  }, [inquiries]);

  // ================= ADMIN LOGIN SCREEN =================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-white shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-black text-white">PLAYZONE Admin Access</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Authorized personnel only. Enter admin passkey to manage Cricket Academies and Inquiries.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300">Admin Passkey</label>
              <input
                type="password"
                required
                value={adminPinInput}
                onChange={(e) => setAdminPinInput(e.target.value)}
                placeholder="Enter passkey (e.g. playzone2026)"
                className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[#84cc16]"
              />
              {pinError && (
                <p className="text-[11px] text-red-400 font-semibold pt-1">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#84cc16] hover:bg-[#74d600] active:scale-95 text-zinc-950 font-black text-xs transition-colors cursor-pointer shadow-md"
            >
              Authenticate & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= ADMIN CONSOLE =================
  return (
    <div className="min-h-screen bg-[#fafbfa] pb-20">
      {/* Top Admin Header */}
      <header className="bg-zinc-950 text-white border-b border-zinc-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#84cc16] text-zinc-950 flex items-center justify-center font-black text-sm shadow-xs">
              PZ
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#84cc16]">
                Administration Console
              </span>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight">
                Cricket Academy Directory & Admission Inquiries
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cricket-academies"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              <span>View Public Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsAdminAuthenticated(false)}
              className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
              title="Lock Admin Console"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {feedbackMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-zinc-950 text-white border border-[#84cc16]/40 shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs & Counters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("academies")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "academies"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              <Building className="w-4 h-4 text-[#84cc16]" />
              <span>Academies ({academies.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              <Users className="w-4 h-4 text-[#84cc16]" />
              <span>Admission Inquiries ({inquiries.length})</span>
              {inquiryCounts.pending > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
          </div>

          {activeTab === "academies" && (
            <button
              type="button"
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-[#84cc16] hover:bg-[#74d600] text-zinc-950 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Academy Profile</span>
            </button>
          )}
        </div>

        {/* ================= TAB 1: ACADEMIES MANAGEMENT ================= */}
        {activeTab === "academies" && (
          <div className="space-y-4">
            {/* Search & Filters */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={academySearch}
                  onChange={(e) => setAcademySearch(e.target.value)}
                  placeholder="Search academies by name, location, or coach..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                {/* Published Status Filter */}
                <select
                  value={filterPublished}
                  onChange={(e) => setFilterPublished(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-white font-medium focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published Only</option>
                  <option value="draft">Unpublished (Draft)</option>
                </select>

                {/* Verified Status Filter */}
                <select
                  value={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-white font-medium focus:outline-none"
                >
                  <option value="all">All Badges</option>
                  <option value="verified">Verified Badge</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>
            </div>

            {/* Academies Table */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Academy</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Established</th>
                      <th className="py-3.5 px-4">Admission</th>
                      <th className="py-3.5 px-4">Verified</th>
                      <th className="py-3.5 px-4">Published</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredAcademies.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-zinc-400">
                          No academies match the selected criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredAcademies.map((acad) => (
                        <tr key={acad.id} className="hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                                <Image
                                  src={acad.logo}
                                  alt={acad.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/cricket-academies/${acad.slug}`}
                                  target="_blank"
                                  className="font-bold text-zinc-900 hover:text-[#65a30d] flex items-center gap-1"
                                >
                                  <span>{acad.name}</span>
                                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                                </Link>
                                <p className="text-[11px] text-zinc-400">
                                  Coach: {acad.headCoachName || "Not assigned"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-zinc-600">
                            {acad.location.district} ({acad.location.division})
                          </td>

                          <td className="py-3 px-4 text-zinc-600">
                            Est. {acad.establishedYear} (
                            {calculateYearsOfOperation(acad.establishedYear)} yrs)
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                acad.admissionStatus === "Open"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {acad.admissionStatus}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleVerified(acad)}
                              className="cursor-pointer"
                              title="Click to toggle verified badge"
                            >
                              {acad.isVerified ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#84cc16]/20 text-[#65a30d]">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Verified</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 text-zinc-400">
                                  <span>Unverified</span>
                                </span>
                              )}
                            </button>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(acad)}
                              className="cursor-pointer"
                              title="Click to toggle published status"
                            >
                              {acad.isPublished ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Live</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400">
                                  <EyeOff className="w-3.5 h-3.5" />
                                  <span>Draft</span>
                                </span>
                              )}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleStartEdit(acad)}
                                className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
                                title="Edit Academy"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAcademy(acad)}
                                className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                title="Delete Academy"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ADMISSION INQUIRIES MANAGEMENT ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {/* Inquiries Summary Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">
                  Total
                </span>
                <p className="text-xl font-black text-zinc-900">
                  {inquiryCounts.total}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-amber-500 uppercase">
                  Pending
                </span>
                <p className="text-xl font-black text-amber-600">
                  {inquiryCounts.pending}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-sky-500 uppercase">
                  Under Review
                </span>
                <p className="text-xl font-black text-sky-600">
                  {inquiryCounts.underReview}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-indigo-500 uppercase">
                  Contacted
                </span>
                <p className="text-xl font-black text-indigo-600">
                  {inquiryCounts.contacted}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">
                  Accepted
                </span>
                <p className="text-xl font-black text-emerald-600">
                  {inquiryCounts.accepted}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center">
                <span className="text-[10px] font-bold text-red-400 uppercase">
                  Rejected
                </span>
                <p className="text-xl font-black text-red-500">
                  {inquiryCounts.rejected}
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search by student, guardian phone, or Ref ID (ADM-INQ-...)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-[#84cc16]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-white font-medium"
                >
                  <option value="All">All Inquiries</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={inquiryAcademyFilter}
                  onChange={(e) => setInquiryAcademyFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-white font-medium max-w-[200px]"
                >
                  <option value="All">All Academies</option>
                  {academies.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Ref ID / Date</th>
                      <th className="py-3.5 px-4">Student Name</th>
                      <th className="py-3.5 px-4">Target Academy</th>
                      <th className="py-3.5 px-4">Contact (Guardian)</th>
                      <th className="py-3.5 px-4">Focus</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-zinc-400">
                          No admission inquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          className="hover:bg-zinc-50/80 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-zinc-900">
                            <div>{inq.id}</div>
                            <span className="text-[10px] text-zinc-400 font-sans font-normal">
                              {inq.createdAt ? inq.createdAt.split("T")[0] : ""}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-zinc-900">
                              {inq.studentName}
                            </span>
                            <span className="text-zinc-500 block text-[11px]">
                              Age: {inq.age} yrs • {inq.district}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-zinc-700 max-w-xs truncate">
                            {inq.academyName}
                          </td>

                          <td className="py-3 px-4 text-zinc-700">
                            <span className="font-bold block">
                              {inq.guardianPhone}
                            </span>
                            {inq.guardianName && (
                              <span className="text-zinc-400 text-[11px]">
                                {inq.guardianName}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-medium text-[11px]">
                              {inq.preferredTrainingType}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleUpdateInquiryStatus(
                                  inq.id,
                                  e.target.value as InquiryStatus,
                                  inq.adminNotes
                                )
                              }
                              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border ${
                                inq.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : inq.status === "Under Review"
                                  ? "bg-sky-50 text-sky-700 border-sky-200"
                                  : inq.status === "Contacted"
                                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                  : inq.status === "Accepted"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingInquiry(inq)}
                              className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs cursor-pointer"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: CREATE / EDIT ACADEMY ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-zinc-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">
                {editingAcademy
                  ? `Edit Academy: ${editingAcademy.name}`
                  : "Create New Cricket Academy"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveAcademy}
              className="p-6 space-y-4 overflow-y-auto flex-1 text-xs"
            >
              {/* Academy Name & Short Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">
                    Full Academy Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Pubergaon Cricket Academy"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g. pubergaon-cricket-academy"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-800">Tagline / Motto</label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  placeholder="e.g. World-Class Cricket Training Center"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                />
              </div>

              {/* Established Year & Admission Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">
                    Established Year
                  </label>
                  <input
                    type="number"
                    min="1950"
                    max="2030"
                    value={formData.establishedYear || 2020}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        establishedYear: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">
                    Admission Status
                  </label>
                  <select
                    value={formData.admissionStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        admissionStatus: e.target.value as AdmissionStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white"
                  >
                    {ADMISSION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">Head Coach</label>
                  <input
                    type="text"
                    value={formData.headCoachName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        headCoachName: e.target.value,
                      })
                    }
                    placeholder="e.g. Sarwar Imran"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              {/* Location details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">Division</label>
                  <select
                    value={formData.location?.division || "Dhaka"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location!,
                          division: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">District</label>
                  <input
                    type="text"
                    value={formData.location?.district || "Dhaka"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location!,
                          district: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">
                    Upazila / Area
                  </label>
                  <input
                    type="text"
                    value={formData.location?.upazila || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location!,
                          upazila: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              {/* Full Address */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-800">Full Address</label>
                <input
                  type="text"
                  value={formData.location?.address || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location!,
                        address: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                />
              </div>

              {/* Contact Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">
                    Phone Numbers (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.contact?.phone?.join(", ") || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact!,
                          phone: e.target.value.split(",").map((s) => s.trim()),
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-800">Email Address</label>
                  <input
                    type="email"
                    value={formData.contact?.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: {
                          ...formData.contact!,
                          email: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                  />
                </div>
              </div>

              {/* History & Mission */}
              <div className="space-y-1">
                <label className="font-bold text-zinc-800">
                  About & Academy History
                </label>
                <textarea
                  rows={3}
                  value={formData.about?.history || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about!, history: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200"
                />
              </div>

              {/* Toggles: Verified & Published */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-zinc-800">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) =>
                      setFormData({ ...formData, isVerified: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#84cc16] accent-[#84cc16]"
                  />
                  <span>Verified Badge Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-zinc-800">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#84cc16] accent-[#84cc16]"
                  />
                  <span>Publish Profile Publicly</span>
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#74d600] font-black text-zinc-950 shadow-sm"
                >
                  {editingAcademy ? "Update Academy" : "Save Academy Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: INQUIRY DETAILS ================= */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8">
            <div className="bg-zinc-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#84cc16]">
                  {viewingInquiry.id}
                </span>
                <h3 className="text-base font-black">
                  Admission Inquiry: {viewingInquiry.studentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingInquiry(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div>
                  <span className="text-zinc-400 block text-[11px]">
                    Student Name
                  </span>
                  <span className="font-bold text-zinc-900">
                    {viewingInquiry.studentName}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">Age</span>
                  <span className="font-bold text-zinc-900">
                    {viewingInquiry.age} years
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">
                    Guardian Contact
                  </span>
                  <span className="font-bold text-zinc-900">
                    {viewingInquiry.guardianPhone}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px]">
                    Guardian Name
                  </span>
                  <span className="font-bold text-zinc-900">
                    {viewingInquiry.guardianName || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-zinc-500 font-bold block">
                  Target Academy:
                </span>
                <span className="font-bold text-zinc-900">
                  {viewingInquiry.academyName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-zinc-500 font-bold block">
                    Preferred Focus:
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {viewingInquiry.preferredTrainingType}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold block">
                    District:
                  </span>
                  <span className="font-semibold text-zinc-800">
                    {viewingInquiry.district}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 font-bold block">
                  Previous Cricket Experience:
                </span>
                <p className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700 mt-1">
                  {viewingInquiry.previousExperience || "None specified"}
                </p>
              </div>

              {viewingInquiry.message && (
                <div>
                  <span className="text-zinc-500 font-bold block">
                    Applicant Message:
                  </span>
                  <p className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700 mt-1">
                    {viewingInquiry.message}
                  </p>
                </div>
              )}

              {/* Status Update & Admin Notes */}
              <div className="pt-3 border-t border-zinc-200 space-y-2">
                <label className="font-bold text-zinc-900 block">
                  Update Application Status:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={viewingInquiry.status}
                    onChange={(e) =>
                      handleUpdateInquiryStatus(
                        viewingInquiry.id,
                        e.target.value as InquiryStatus,
                        viewingInquiry.adminNotes
                      )
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 font-bold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <a
                    href={`tel:${viewingInquiry.guardianPhone}`}
                    className="px-4 py-2 rounded-xl bg-[#84cc16] hover:bg-[#74d600] font-black text-zinc-950 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Guardian</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
