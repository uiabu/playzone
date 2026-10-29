"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  CreditCard,
  Banknote,
  Phone,
  MapPin,
  User,
  Clock,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { websiteApi } from "@/lib/api";

const BD_DISTRICTS = [
  "Dhaka",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Gazipur",
  "Narayanganj",
  "Cumilla",
  "Bogura",
  "Kushtia",
  "Feni",
  "Noakhali",
  "Cox's Bazar",
  "Jessore",
  "Dinajpur",
  "Tangail",
  "Brahmanbaria",
  "Other District",
];

export interface PlayzoneOrder {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    altPhone?: string;
    district: string;
    deliveryAddress: string;
    orderNotes?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
    condition?: string;
  }>;
  financials: {
    subtotal: number;
    discount: number;
    deliveryFee: number;
    totalAmount: number;
    couponCode?: string;
  };
  payment: {
    method: "Cash on Delivery" | "bKash / Nagad (Manual Merchant)";
    status: "Pending Delivery Payment" | "Unverified";
  };
  deliveryZone: "inside_dhaka" | "outside_dhaka";
  status: "Order Placed" | "Verified" | "Packed" | "In Transit" | "Delivered";
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, discount, total, couponCode, clearCart } = useCart();

  // Delivery zone state
  const [deliveryZone, setDeliveryZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");

  // Customer form inputs
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "digital">("cod");

  // Validation & UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlayzoneOrder | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // Automatically switch deliveryZone when district changes
  useEffect(() => {
    if (district === "Dhaka") {
      setDeliveryZone("inside_dhaka");
    } else {
      setDeliveryZone("outside_dhaka");
    }
  }, [district]);

  const deliveryFee = deliveryZone === "inside_dhaka" ? 80 : 150;
  const finalPayable = total + deliveryFee;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!cleanPhone) {
      errs.phone = "Phone number is required for courier delivery.";
    } else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone.trim())) {
      errs.phone = "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX).";
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      errs.deliveryAddress = "Please provide a complete street/house/area delivery address.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) {
      setErrors({ cart: "Your cart is currently empty." });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const timestamp = new Date();
      const orderDateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedOrderId = `PZ-${orderDateStr}-${randomSuffix}`;

      const newOrder: PlayzoneOrder = {
        id: generatedOrderId,
        createdAt: timestamp.toISOString(),
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          altPhone: altPhone.trim() || undefined,
          district,
          deliveryAddress: deliveryAddress.trim(),
          orderNotes: orderNotes.trim() || undefined,
        },
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          image: it.image,
          quantity: it.quantity,
          category: it.category,
          condition: it.condition,
        })),
        financials: {
          subtotal,
          discount,
          deliveryFee,
          totalAmount: finalPayable,
          couponCode: couponCode || undefined,
        },
        payment: {
          method: paymentMethod === "cod" ? "Cash on Delivery" : "bKash / Nagad (Manual Merchant)",
          status: "Pending Delivery Payment",
        },
        deliveryZone,
        status: "Order Placed",
      };

      try {
        const existingRaw = localStorage.getItem("playzone_orders");
        const existingList = existingRaw ? JSON.parse(existingRaw) : [];
        existingList.unshift(newOrder);
        localStorage.setItem("playzone_orders", JSON.stringify(existingList));
      } catch {
        // localStorage fallback
      }

      // Asynchronously record into API
      websiteApi
        .createOrder({
          customerName: newOrder.customer.fullName,
          customerPhone: newOrder.customer.phone,
          customerEmail: altPhone || undefined,
          shippingAddress: newOrder.customer.deliveryAddress,
          city: newOrder.customer.district,
          items: newOrder.items.map((it) => ({
            productId: it.id,
            productName: it.name,
            productImage: it.image,
            price: it.price,
            quantity: it.quantity,
          })),
          subtotal: newOrder.financials.subtotal,
          deliveryFee: newOrder.financials.deliveryFee,
          discount: newOrder.financials.discount,
          totalAmount: newOrder.financials.totalAmount,
          paymentMethod: paymentMethod === "cod" ? "cod" : "bkash",
          notes: newOrder.customer.orderNotes,
        })
        .catch((apiErr) => {
          console.warn("Backend order sync fallback:", apiErr);
        });

      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const handleCopyOrderId = (orderId: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  // ---------------- ORDER CONFIRMATION VIEW ----------------
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#74d600]/15 border border-[#74d600]/30 flex items-center justify-center mx-auto mb-4 text-[#74d600]">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/20 text-[#a3e635] uppercase tracking-wider mb-2">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
              Your order has been recorded. Our Dhaka dispatch team will verify your contact number and prepare your cricket gear for courier delivery.
            </p>

            {/* Order Reference Box */}
            <div className="mt-6 inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700/80 rounded-2xl px-5 py-3 text-sm">
              <span className="text-zinc-400 font-medium">Order Reference:</span>
              <span className="font-mono font-black text-[#a3e635] text-base tracking-wider">
                {confirmedOrder.id}
              </span>
              <button
                type="button"
                onClick={() => handleCopyOrderId(confirmedOrder.id)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Order ID"
              >
                {copiedOrderId ? (
                  <Check className="w-4 h-4 text-[#74d600]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Timeline Status */}
          <div className="mt-6 bg-[#111216] border border-zinc-800 rounded-3xl p-6">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-5">
              Live Order Progression
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#74d600] text-black font-black flex items-center justify-center mb-1.5 shadow-sm shadow-lime-500/30">
                  ✓
                </div>
                <span className="font-bold text-white">Order Placed</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Recorded</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center mb-1.5">
                  2
                </div>
                <span className="font-medium text-zinc-400">Verification</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Phone Call</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center mb-1.5">
                  3
                </div>
                <span className="font-medium text-zinc-400">Packing & Prep</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Dhaka Hub</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 flex items-center justify-center mb-1.5">
                  4
                </div>
                <span className="font-medium text-zinc-400">Delivery</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">COD Payment</span>
              </div>
            </div>
          </div>

          {/* Order Details & Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery & Customer Info */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#74d600]" />
                <span>Delivery Address</span>
              </h3>
              <div className="space-y-2 text-sm text-zinc-300">
                <p className="font-bold text-white">{confirmedOrder.customer.fullName}</p>
                <p className="text-zinc-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{confirmedOrder.customer.phone}</span>
                  {confirmedOrder.customer.altPhone && (
                    <span className="text-zinc-500">/ {confirmedOrder.customer.altPhone}</span>
                  )}
                </p>
                <p className="text-zinc-400">{confirmedOrder.customer.deliveryAddress}</p>
                <p className="text-xs font-semibold text-zinc-500">
                  District: {confirmedOrder.customer.district} (
                  {confirmedOrder.deliveryZone === "inside_dhaka"
                    ? "Inside Dhaka (24-48h)"
                    : "Outside Dhaka (48-72h)"}
                  )
                </p>
                <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
                  <span className="font-bold text-zinc-300">Payment Mode: </span>
                  <span className="text-[#a3e635] font-semibold">{confirmedOrder.payment.method}</span>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Please keep ৳{confirmedOrder.financials.totalAmount.toLocaleString()} ready for the courier agent.
                  </p>
                </div>
              </div>
            </div>

            {/* Purchased Items & Receipt */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#74d600]" />
                <span>Items Ordered ({confirmedOrder.items.length})</span>
              </h3>
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-1.5 border-b border-zinc-800/60 last:border-0">
                    <div className="relative w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 p-1">
                      <Image
                        src={it.image || "/images/products/ss_gladiator.png"}
                        alt={it.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{it.name}</p>
                      <p className="text-[11px] text-zinc-500">
                        Qty: {it.quantity} × ৳{it.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-white shrink-0">
                      ৳{(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">৳{confirmedOrder.financials.subtotal.toLocaleString()}</span>
                </div>
                {confirmedOrder.financials.discount > 0 && (
                  <div className="flex justify-between text-[#74d600]">
                    <span>Discount</span>
                    <span>-৳{confirmedOrder.financials.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Charge</span>
                  <span className="text-zinc-200">৳{confirmedOrder.financials.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total Payable</span>
                  <span className="text-[#a3e635] text-base font-black">
                    ৳{confirmedOrder.financials.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/track-order?id=${confirmedOrder.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20"
            >
              <Truck className="w-4 h-4 stroke-[2.5]" />
              <span>Track Your Order</span>
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 border border-zinc-700 transition-all"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- EMPTY CART VIEW ----------------
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#090a0c] text-white flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-[#111216] border border-zinc-800 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400 mb-4">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-black text-white">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Please add cricket bats, protection gear, or pre-owned essentials before proceeding to checkout.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="px-5 py-2.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs transition-all shadow-md"
            >
              Shop New Gear
            </Link>
            <Link
              href="/pre-owned"
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border border-zinc-700 transition-all"
            >
              Explore Pre-Owned
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- ACTIVE CHECKOUT FORM ----------------
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shopping</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Order Checkout
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Direct delivery across Bangladesh. Pay safely with Cash on Delivery upon receiving your package.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3.5 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#74d600]" />
            <span>PLAYZONE Direct Retailer Guarantee</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-[#74d600] text-black font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-white">Contact & Recipient Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Shakib Al Hasan"
                      className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Alternative Phone <span className="text-zinc-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="e.g. Backup contact"
                      className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-zinc-500 text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-[#74d600] text-black font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-white">Delivery Destination</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      District / Division <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition-colors cursor-pointer"
                    >
                      {BD_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist} className="bg-zinc-900 text-white">
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delivery Speed Card */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Estimated Courier Speed
                    </label>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2.5 text-xs text-zinc-300">
                      <Truck className="w-4 h-4 text-[#74d600] shrink-0" />
                      <div>
                        <span className="font-bold text-white">
                          {deliveryZone === "inside_dhaka" ? "Dhaka City (৳80)" : "Outside Dhaka (৳150)"}
                        </span>
                        <p className="text-[11px] text-zinc-500">
                          {deliveryZone === "inside_dhaka" ? "Delivered in 24-48 Hours" : "Delivered in 48-72 Hours"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Detailed Delivery Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House number, Road number, Flat/Floor, Area/Thana, Landmark..."
                    className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl p-3 outline-none transition-colors"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.deliveryAddress}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    Order / Knocking Instructions <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Please knock lightly, or call 1 hour before arrival"
                    className="w-full bg-zinc-900/80 border border-zinc-700/80 focus:border-zinc-500 text-white text-xs sm:text-sm rounded-xl px-4 py-2 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-zinc-800/80">
                <span className="w-6 h-6 rounded-full bg-[#74d600] text-black font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {/* Option 1: Cash on Delivery (Primary Active) */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "bg-zinc-900/90 border-[#74d600] shadow-md shadow-lime-500/10"
                      : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 accent-[#74d600]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#74d600]" />
                        <span className="text-sm font-bold text-white">Cash on Delivery (COD)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#74d600]/20 text-[#a3e635]">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        Pay in cash or transfer via mobile banking directly to the courier agent upon receiving and inspecting your package at your doorstep.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Option 2: bKash / Nagad Gateway Notice */}
                <label
                  onClick={() => setPaymentMethod("digital")}
                  className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "digital"
                      ? "bg-zinc-900/90 border-amber-500/60"
                      : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment_option"
                      checked={paymentMethod === "digital"}
                      onChange={() => setPaymentMethod("digital")}
                      className="mt-1 accent-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-white">bKash / Nagad / Card Payment</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                          Gateway Verification Notice
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        Automated instant PGW checkout is undergoing merchant licensing integration. For fastest order processing, select <strong>Cash on Delivery</strong>. Our team can also provide official bKash Merchant payment instructions upon order verification call.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Placement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-lg sticky top-24">
              <h2 className="text-base font-bold text-white pb-3 border-b border-zinc-800 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-semibold text-zinc-400">{itemCount} Items</span>
              </h2>

              {/* Items List */}
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-1.5 border-b border-zinc-800/60 last:border-0">
                    <div className="relative w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 p-1">
                      <Image
                        src={item.image || "/images/products/ss_gladiator.png"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        {item.condition === "pre-owned" && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                            Pre-Owned
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      </div>
                      <p className="text-[11px] text-zinc-500">
                        Qty: {item.quantity} × ৳{item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-[#a3e635] shrink-0">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="mt-5 pt-4 border-t border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#74d600]">
                    <span>Discount {couponCode ? `(${couponCode})` : ""}</span>
                    <span className="font-semibold">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>
                    Delivery Charge ({deliveryZone === "inside_dhaka" ? "Inside Dhaka" : "Outside Dhaka"})
                  </span>
                  <span className="font-semibold text-white">৳{deliveryFee}</span>
                </div>
                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-sm font-black text-white">Total Amount</span>
                  <span className="text-xl font-black text-[#a3e635]">
                    ৳{finalPayable.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Policy Trust Notice */}
              <div className="mt-5 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#74d600]" />
                  <span>PLAYZONE Customer Purchase Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  • 100% genuine equipment inspected by PLAYZONE.
                  <br />
                  • Pre-owned gear is sold as-is with condition grading and without warranty.
                  <br />
                  • Cash on Delivery payment after examining courier package condition.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="mt-5 w-full py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] active:scale-[0.99] disabled:opacity-50 text-black font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/25 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Recording Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
