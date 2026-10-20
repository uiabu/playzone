import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | PLAYZONE Bangladesh",
  description: "Privacy policy and customer data handling standards at PLAYZONE Bangladesh.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#74d600]/15 text-[#a3e635] uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Privacy</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            How PLAYZONE collects, uses, and protects your information when purchasing cricket gear or booking cricket experts.
          </p>
        </div>

        <div className="bg-[#111216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-white mb-2">1. Information We Collect</h2>
            <p>
              When you place an order or request an expert session on PLAYZONE, we collect only the necessary details to fulfill your service: full name, delivery address, phone number, and optional order instructions. We do not sell, rent, or trade customer contact details to third-party telemarketers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">2. Courier & Delivery Fulfillment</h2>
            <p>
              Your delivery address and mobile contact number are securely shared with our domestic courier partners (including Steadfast and Pathao Courier) strictly for shipment transit, dispatch verification, and Cash on Delivery collection.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">3. Payment Information Security</h2>
            <p>
              PLAYZONE prioritizes Cash on Delivery (COD) for zero digital risk. When automated online payment gateways are active, all financial transactions are processed through SSL-secured Bangladesh Bank authorized payment gateways. PLAYZONE does not store raw credit card numbers or banking PINs.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-2">4. Contact Our Privacy Officer</h2>
            <p className="text-zinc-400">
              If you have any questions or wish to delete your account or contact details, email our privacy desk at: <span className="text-[#a3e635] font-semibold">privacy@playzone.com.bd</span>.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#74d600] hover:bg-[#65c200] text-black font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-lime-500/20"
          >
            <span>Back to Shopping</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
