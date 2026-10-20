"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>Customer Assistance</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contact PLAYZONE Support
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Need bat selection guidance, order tracking assistance, or expert coach coordination? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-5">
              <h2 className="text-base font-bold text-white pb-3 border-b border-zinc-800">
                Direct Contact Channels
              </h2>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#74d600] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">
                    Customer Hotline & WhatsApp
                  </span>
                  <a
                    href="tel:+8801711000000"
                    className="text-sm font-bold text-white hover:text-[#a3e635] transition-colors"
                  >
                    +880 1711-000000
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Quick WhatsApp responses</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#74d600] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">
                    Email Support
                  </span>
                  <a
                    href="mailto:support@playzone.com.bd"
                    className="text-sm font-bold text-white hover:text-[#a3e635] transition-colors"
                  >
                    support@playzone.com.bd
                  </a>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Response within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#74d600] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">
                    Dhaka Dispatch & Hub
                  </span>
                  <p className="text-sm font-bold text-white">House 42, Road 11, Banani</p>
                  <p className="text-xs text-zinc-400">Dhaka-1213, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#74d600] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block font-semibold">
                    Working Hours
                  </span>
                  <p className="text-xs text-zinc-300">Saturday – Thursday: 10:00 AM – 8:00 PM</p>
                  <p className="text-[11px] text-zinc-500">Closed on Fridays</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-5 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Looking for an active order?</span>
              <Link
                href="/track-order"
                className="text-[#a3e635] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Track Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-base font-bold text-white mb-1">Send Us a Direct Message</h2>
              <p className="text-xs text-zinc-400 mb-6">
                Fill out the form below and a PLAYZONE cricket equipment specialist will contact you.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#74d600]/10 border border-[#74d600]/30 text-center animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#74d600] mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">Message Received!</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                    Thank you, {name || "cricketer"}. Our support team will review your inquiry and reach out via phone or email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-full bg-zinc-900 text-xs font-bold text-zinc-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tamim Iqbal"
                        className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none transition-colors cursor-pointer"
                    >
                      <option value="Order Inquiry">Order Inquiry & Dispatch</option>
                      <option value="Bat Recommendation">Cricket Bat Selection Advice</option>
                      <option value="Pre-Owned Gear">Pre-Owned Equipment Condition</option>
                      <option value="Hire Experts">Hire Cricket Coach / Expert Assistance</option>
                      <option value="Club / Academy Inquiry">Institutional / Club Bulk Gear</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you with your cricket equipment or training?"
                      className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-[#74d600] text-white text-xs sm:text-sm rounded-xl p-3 outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-lime-500/20 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
