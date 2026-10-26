import {
  Academy,
  AdmissionInquiry,
  INITIAL_ACADEMIES,
  INITIAL_INQUIRIES,
} from "./academiesData";

// Global cache for Next.js hot-reload persistence in development
declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_ACADEMIES__: Academy[] | undefined;
  // eslint-disable-next-line no-var
  var __PLAYZONE_INQUIRIES__: AdmissionInquiry[] | undefined;
}

if (!globalThis.__PLAYZONE_ACADEMIES__) {
  globalThis.__PLAYZONE_ACADEMIES__ = [...INITIAL_ACADEMIES];
}

if (!globalThis.__PLAYZONE_INQUIRIES__) {
  globalThis.__PLAYZONE_INQUIRIES__ = [...INITIAL_INQUIRIES];
}

export const academiesStore = {
  getAll: (publishedOnly = true): Academy[] => {
    const list = globalThis.__PLAYZONE_ACADEMIES__ || INITIAL_ACADEMIES;
    if (!publishedOnly) return list;
    return list.filter((a) => a.isPublished);
  },

  getBySlug: (slug: string): Academy | undefined => {
    const list = globalThis.__PLAYZONE_ACADEMIES__ || INITIAL_ACADEMIES;
    return list.find((a) => a.slug === slug);
  },

  getById: (id: string): Academy | undefined => {
    const list = globalThis.__PLAYZONE_ACADEMIES__ || INITIAL_ACADEMIES;
    return list.find((a) => a.id === id);
  },

  create: (academy: Omit<Academy, "createdAt" | "updatedAt">): Academy => {
    const now = new Date().toISOString();
    const newAcademy: Academy = {
      ...academy,
      createdAt: now,
      updatedAt: now,
    };
    if (!globalThis.__PLAYZONE_ACADEMIES__) {
      globalThis.__PLAYZONE_ACADEMIES__ = [...INITIAL_ACADEMIES];
    }
    globalThis.__PLAYZONE_ACADEMIES__.unshift(newAcademy);
    return newAcademy;
  },

  update: (idOrSlug: string, updates: Partial<Academy>): Academy | null => {
    if (!globalThis.__PLAYZONE_ACADEMIES__) {
      globalThis.__PLAYZONE_ACADEMIES__ = [...INITIAL_ACADEMIES];
    }
    const index = globalThis.__PLAYZONE_ACADEMIES__.findIndex(
      (a) => a.id === idOrSlug || a.slug === idOrSlug
    );
    if (index === -1) return null;

    const existing = globalThis.__PLAYZONE_ACADEMIES__[index];
    const updated: Academy = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    globalThis.__PLAYZONE_ACADEMIES__[index] = updated;
    return updated;
  },

  delete: (idOrSlug: string): boolean => {
    if (!globalThis.__PLAYZONE_ACADEMIES__) return false;
    const initialLen = globalThis.__PLAYZONE_ACADEMIES__.length;
    globalThis.__PLAYZONE_ACADEMIES__ = globalThis.__PLAYZONE_ACADEMIES__.filter(
      (a) => a.id !== idOrSlug && a.slug !== idOrSlug
    );
    return globalThis.__PLAYZONE_ACADEMIES__.length < initialLen;
  },

  // Inquiries
  getInquiries: (academyId?: string): AdmissionInquiry[] => {
    const list = globalThis.__PLAYZONE_INQUIRIES__ || INITIAL_INQUIRIES;
    if (academyId) {
      return list.filter((i) => i.academyId === academyId);
    }
    return list;
  },

  getInquiryById: (id: string): AdmissionInquiry | undefined => {
    const list = globalThis.__PLAYZONE_INQUIRIES__ || INITIAL_INQUIRIES;
    return list.find((i) => i.id === id);
  },

  createInquiry: (
    inquiryData: Omit<AdmissionInquiry, "id" | "status" | "createdAt">
  ): AdmissionInquiry => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newInquiry: AdmissionInquiry = {
      ...inquiryData,
      id: `ADM-INQ-2026-${randomDigits}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    if (!globalThis.__PLAYZONE_INQUIRIES__) {
      globalThis.__PLAYZONE_INQUIRIES__ = [...INITIAL_INQUIRIES];
    }
    globalThis.__PLAYZONE_INQUIRIES__.unshift(newInquiry);
    return newInquiry;
  },

  updateInquiryStatus: (
    id: string,
    status: AdmissionInquiry["status"],
    adminNotes?: string
  ): AdmissionInquiry | null => {
    if (!globalThis.__PLAYZONE_INQUIRIES__) {
      globalThis.__PLAYZONE_INQUIRIES__ = [...INITIAL_INQUIRIES];
    }
    const index = globalThis.__PLAYZONE_INQUIRIES__.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const existing = globalThis.__PLAYZONE_INQUIRIES__[index];
    const updated: AdmissionInquiry = {
      ...existing,
      status,
      adminNotes: adminNotes !== undefined ? adminNotes : existing.adminNotes,
      updatedAt: new Date().toISOString(),
    };
    globalThis.__PLAYZONE_INQUIRIES__[index] = updated;
    return updated;
  },
};
