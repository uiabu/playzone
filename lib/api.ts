const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    console.warn(`[API] ${endpoint} request failed:`, err);
    throw err;
  }
}

export const websiteApi = {
  // Products
  getProducts: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<{ success: boolean; data: any[] }>(`/products${qs}`);
  },
  getProduct: (idOrSlug: string) =>
    request<{ success: boolean; data: any }>(`/products/${idOrSlug}`),

  // Orders / Checkout
  createOrder: (order: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    shippingAddress?: string;
    city?: string;
    items: Array<{
      productId: string;
      productName: string;
      productImage?: string;
      price: number;
      quantity: number;
      selectedSize?: string;
      selectedWeight?: string;
      selectedServices?: string[];
    }>;
    subtotal: number;
    deliveryFee?: number;
    discount?: number;
    totalAmount: number;
    paymentMethod?: "cod" | "bkash" | "nagad" | "card";
    notes?: string;
  }) =>
    request<{ success: boolean; message: string; data: any }>("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    }),

  // Pre-Orders
  submitPreOrder: (preOrder: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryAddress?: string;
    productInfo: string;
    referenceUrl?: string;
    attachedImageUrl?: string;
    isOtpVerified?: boolean;
  }) =>
    request<{ success: boolean; message: string; data: any }>("/pre-orders", {
      method: "POST",
      body: JSON.stringify(preOrder),
    }),

  // Coupons
  validateCoupon: (code: string, subtotal: number) =>
    request<{
      success: boolean;
      message: string;
      data?: {
        code: string;
        discountType: "percent" | "fixed";
        discountValue: number;
        calculatedDiscount: number;
      };
    }>("/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code, subtotal }),
    }),

  // Experts & Bookings
  getExperts: () => request<{ success: boolean; data: any[] }>("/experts"),
  bookExpert: (booking: {
    expertId: string;
    expertName?: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    date: string;
    timeSlot?: string;
    serviceMode?: "ground" | "home" | "online";
    locationDetails?: string;
    notes?: string;
    totalFee?: number;
  }) =>
    request<{ success: boolean; message: string; data: any }>(
      "/expert-bookings",
      {
        method: "POST",
        body: JSON.stringify(booking),
      }
    ),

  // Banners & Settings
  getBanners: () => request<{ success: boolean; data: any[] }>("/banners"),
  getSettings: () => request<{ success: boolean; data: any }>("/settings"),
  getBlogs: () => request<{ success: boolean; data: any[] }>("/blogs?publishedOnly=true"),
  getReviews: () => request<{ success: boolean; data: any[] }>("/reviews?approvedOnly=true"),
  getVideoTestimonials: () =>
    request<{ success: boolean; data: any[] }>("/video-testimonials?featuredOnly=true"),
};

export const api = websiteApi;

