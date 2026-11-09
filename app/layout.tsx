import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, CartModal } from "@/components/global";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { LanguageProvider } from "@/context/LanguageContext";

// ============================================================================
// 🌍 GLOBAL SITE FONT CONFIGURATION (পুরো ওয়েবসাইটের গ্লোবাল ফন্ট)
// To change the font for the ENTIRE website, simply change this font definition.
// For example: import { Poppins } or { Inter } from "next/font/google".
// এখানে ফন্ট পরিবর্তন করলে স্বয়ংক্রিয়ভাবে সমগ্র ওয়েবসাইটের ফন্ট পরিবর্তিত হবে।
// ============================================================================
const siteFont = Poppins({
  variable: "--font-site",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteMono = Geist_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLAYZONE | Cricket Equipment & Gear Store",
  description:
    "Gear up for every innings. New and pre-owned cricket equipment for every player in Bangladesh.",
  other: {
    "color-scheme": "only light",
    "supported-color-schemes": "light",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${siteFont.variable} ${siteFont.className} ${siteMono.variable} h-full antialiased light`}
      style={{ colorScheme: "only light" }}
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body
        className={`${siteFont.className} min-h-full flex flex-col bg-white text-zinc-900`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ProductsProvider>
            <CartProvider>
              <Suspense fallback={<div className="h-20 bg-zinc-950" />}>
                <Navbar />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
              <CartModal />
            </CartProvider>
          </ProductsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

