"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  Package,
  MapPin,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import type { PlayzoneOrder } from "../checkout/page";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [query, setQuery] = useState(initialId);
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<PlayzoneOrder | null>(null);
  const [allOrders, setAllOrders] = useState<PlayzoneOrder[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("playzone_orders");
      if (raw) {
        const parsed: PlayzoneOrder[] = JSON.parse(raw);
        setAllOrders(parsed);

        if (initialId) {
          const found = parsed.find(
            (o) => o.id.toLowerCase() === initialId.toLowerCase().trim()
          );
          if (found) {
            setMatchedOrder(found);
            setSearched(true);
          }
        }
      }
    } catch {
      // Ignore
    }
  }, [initialId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    setSearched(true);
    const found = allOrders.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.customer.phone.replace(/\D/g, "").includes(clean.replace(/\D/g, ""))
    );
    setMatchedOrder(found || null);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>PLAYZONE Logistics Tracking</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Track Your Cricket Gear Order
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Enter your PLAYZONE Order Reference ID (e.g. PZ-20261020-XXXX) or registered contact mobile number.
          </p>
        </div>

        {/* Search Input Box */}
        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto mb-10 bg-[#111216] border border-zinc-800 rounded-full p-2 flex items-center shadow-xl focus-within:border-[#74d600] transition-colors"
        >
          <div className="pl-4 pr-2 text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID (PZ-...) or Phone (017...)"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none pr-2 font-medium"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            Track Order
          </button>
        </form>

        {/* RESULTS SECTION */}
        {searched && matchedOrder && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Card */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-3">
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    Order Reference
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
                    {matchedOrder.id}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#74d600]/20 text-[#a3e635] border border-[#74d600]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{matchedOrder.status}</span>
                  </span>
                </div>
              </div>

              {/* Progression Stepper */}
              <div className="mt-8">
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#74d600] text-black font-black flex items-center justify-center mb-2 shadow-md shadow-lime-500/30">
                      ✓
                    </div>
                    <span className="font-bold text-white">Order Placed</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">
                      {new Date(matchedOrder.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center mb-2 font-bold">
                      2
                    </div>
                    <span className="font-medium text-zinc-300">Hub Verified</span>
                    <span className="text-[10px] text-zinc-500 mt-0.5">In Progress</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-zinc-800/60 border border-zinc-800 text-zinc-500 flex items-center justify-center mb-2">
                      3
                    </div>
                    <span className="font-medium text-zinc-500">Courier Handover</span>
                    <span className="text-[10px] text-zinc-600 mt-0.5">Steadfast / Pathao</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-zinc-800/60 border border-zinc-800 text-zinc-500 flex items-center justify-center mb-2">
                      4
                    </div>
                    <span className="font-medium text-zinc-500">Delivered</span>
                    <span className="text-[10px] text-zinc-600 mt-0.5">COD Payment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient & Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Info */}
              <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#74d600]" />
                  <span>Delivery Destination</span>
                </h3>
                <div className="space-y-2 text-sm text-zinc-300">
                  <p className="font-bold text-white">{matchedOrder.customer.fullName}</p>
                  <p className="text-zinc-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{matchedOrder.customer.phone}</span>
                  </p>
                  <p className="text-zinc-400">{matchedOrder.customer.deliveryAddress}</p>
                  <p className="text-xs font-semibold text-zinc-500">
                    District: {matchedOrder.customer.district} (
                    {matchedOrder.deliveryZone === "inside_dhaka"
                      ? "Inside Dhaka: 24-48 Hours"
                      : "Outside Dhaka: 48-72 Hours"}
                    )
                  </p>
                  <div className="mt-4 pt-3 border-t border-zinc-800 text-xs">
                    <span className="text-zinc-400">Payment: </span>
                    <span className="text-[#a3e635] font-semibold">
                      {matchedOrder.payment.method} ({matchedOrder.payment.status})
                    </span>
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#74d600]" />
                  <span>Package Items ({matchedOrder.items.length})</span>
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {matchedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1.5 border-b border-zinc-800/60 last:border-0">
                      <div className="relative w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 p-1">
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

                <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-baseline text-xs">
                  <span className="text-zinc-400">Total Payable at Doorstep:</span>
                  <span className="text-base font-black text-[#a3e635]">
                    ৳{matchedOrder.financials.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NO RESULT STATE */}
        {searched && !matchedOrder && (
          <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-8 text-center max-w-lg mx-auto shadow-xl">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400 mb-4">
              <AlertCircle className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">No Order Found</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              We couldn&apos;t find an order matching <span className="text-white font-mono font-semibold">"{query}"</span> in this browser session. If you placed the order over the phone or from another device, please contact our dispatch team.
            </p>
            <div className="mt-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <p className="font-semibold text-zinc-300">Customer Helpline & WhatsApp:</p>
              <p className="text-[#a3e635] font-bold text-sm mt-0.5">+880 1711-000000</p>
              <p className="text-[11px] text-zinc-500 mt-1">Available Saturday - Thursday (10:00 AM - 8:00 PM)</p>
            </div>
          </div>
        )}

        {/* DEFAULT VIEW: Recent Orders in this device */}
        {!searched && (
          <div className="mt-8 bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#74d600]" />
              <span>Recent Orders on this Device</span>
            </h3>

            {allOrders.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-xs">
                <p>No recent orders found on this device.</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-zinc-700 transition-colors"
                >
                  <span>Explore Cricket Gear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allOrders.slice(0, 5).map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => {
                      setQuery(ord.id);
                      setMatchedOrder(ord);
                      setSearched(true);
                    }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#74d600]/50 transition-all cursor-pointer group"
                  >
                    <div>
                      <span className="font-mono font-bold text-white group-hover:text-[#a3e635] transition-colors text-xs sm:text-sm">
                        {ord.id}
                      </span>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {new Date(ord.createdAt).toLocaleDateString("en-GB")} • {ord.items.length} items • ৳
                        {ord.financials.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#74d600]/15 text-[#a3e635]">
                        {ord.status}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#74d600] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090a0c] text-white flex items-center justify-center">
          <p className="text-zinc-500 text-sm">Loading Order Tracking...</p>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
