import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, CartModal } from "@/components/global";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
      style={{ colorScheme: "only light" }}
    >
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
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
      </body>
    </html>
  );
}

