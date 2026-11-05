"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyOrEnglish: string, banglaFallback?: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Navbar
    "nav.announcement":
      "⚡ FREE Express Delivery across Dhaka on orders over ৳5,000! Pre-orders open for 2026 English Willow bats.",
    "nav.searchPlaceholder": "Search for cricket bats, shoes, gloves...",
    "nav.blog": "Blog",
    "nav.preorder": "Pre-order",
    "nav.bookCricketer": "Invite a Cricketer",
    "nav.inviteCricketer": "Invite a Cricketer",
    "nav.hireExperts": "Hire Experts",
    "nav.offers": "Offers",
    "nav.cart": "Cart",
    "nav.signIn": "Sign In",
    "nav.newGear": "New Gear",
    "nav.preOwnedGear": "Pre-owned Gear",
    "nav.cricketAcademies": "Cricket Academies",
    "nav.foundation": "PLAYZONE Foundation",
    "nav.bats": "Bats",
    "nav.batting": "Batting",
    "nav.bowling": "Bowling",
    "nav.wicketkeeping": "Wicketkeeping",
    "nav.shoes": "Shoes",
    "nav.accessories": "Accessories",
    "nav.clothing": "Clothing & Kits",
    "nav.genuineGear": "100% Genuine Gear",
    "nav.dhakaDelivery": "24h Dhaka Delivery (৳80)",
    "nav.cashOnDelivery": "Cash on Delivery Across Bangladesh",
    "nav.browseAll": "Browse All",
    "nav.categories": "Cricket Categories",
    "nav.exploreCollection": "Explore Collection",

    // Footer
    "footer.brandBio":
      "Gear up for every innings. New and pre-owned cricket equipment for every player in Bangladesh.",
    "footer.company": "COMPANY",
    "footer.about": "About PLAYZONE",
    "footer.ourStory": "Our Story",
    "footer.blog": "Blog",
    "footer.careers": "Careers",
    "footer.preOwned": "Pre-Owned Gear",
    "footer.contact": "Contact Us",

    "footer.customerService": "CUSTOMER SERVICE",
    "footer.help": "Help Center",
    "footer.trackOrder": "Track Order",
    "footer.shipping": "Shipping & Delivery",
    "footer.returns": "Returns & Refunds",
    "footer.sizeGuide": "Size Guide",
    "footer.faqs": "FAQs",

    "footer.shopCategories": "SHOP CATEGORIES",
    "footer.cricketBats": "Cricket Bats",
    "footer.battingGear": "Batting Gear",
    "footer.bowlingGear": "Bowling Gear",
    "footer.wicketkeeping": "Wicketkeeping",
    "footer.cricketShoes": "Cricket Shoes",
    "footer.accessories": "Accessories",
    "footer.specialOffers": "Special Offers",

    "footer.newsletter": "NEWSLETTER",
    "footer.newsletterDesc":
      "Get exclusive deals, new arrivals and cricket updates.",
    "footer.emailPlaceholder": "Enter your email address",
    "footer.subscribe": "Subscribe",
    "footer.consent":
      "Yes, I'd like to receive updates and offers from PLAYZONE.",
    "footer.subscribed": "Thank you for subscribing!",
    "footer.copyright": "© 2026 PLAYZONE. All rights reserved.",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.returnsPolicy": "Return Policy",

    "footer.theme": "Theme",
    "footer.language": "Language",
    "footer.darkMode": "Dark Mode",
    "footer.lightMode": "Light Mode",
    "footer.systemDefault": "System Default",

    // Common Cart & Checkout
    "cart.title": "Your Cricket Bag",
    "cart.empty": "Your shopping bag is empty",
    "cart.subtotal": "Subtotal",
    "cart.total": "Total Amount",
    "cart.checkout": "Proceed to Checkout",
    "cart.items": "items",
    "cart.applyCoupon": "Apply Coupon",
    "cart.discount": "Discount",
    "cart.estimatedDelivery": "Estimated Delivery",
    "cart.viewBag": "View Bag",
    "cart.continueShopping": "Continue Shopping",

    // Sections & Titles
    "home.featuredCategories": "Featured Categories",
    "home.hireCricketExperts": "Hire Cricket Experts",
    "home.joinAsExpert": "Join as Expert",
    "home.batsForEveryInnings": "Bats for Every Innings",
    "home.battingEssentials": "Batting Essentials",
    "home.bowlingFielding": "Bowling & Fielding Gear",
    "home.shoesKitBags": "Shoes & Kit Bags",
    "home.featuredCricketGear": "Featured Cricket Gear",
    "home.videoReviews": "Trusted by Bangladesh's Top Cricketers",
    "home.viewAll": "View All",
    "home.addToCart": "Add to Cart",
    "home.topPicks": "Top Picks",
    "home.exploreAll": "Explore All",
  },
  bn: {
    // Top Bar & Navbar
    "nav.announcement":
      "⚡ ৫,০০০ টাকার বেশি অর্ডারে সমগ্র ঢাকায় ফ্রি এক্সপ্রেস ডেলিভারি! ২০২৬ ইংলিশ উইলো ব্যাটের প্রি-অর্ডার চলছে।",
    "nav.searchPlaceholder": "ক্রিকেট ব্যাট, জুতো, গ্লাভস ইত্যাদি খুঁজুন...",
    "nav.blog": "ব্লগ",
    "nav.preorder": "প্রি-অর্ডার",
    "nav.bookCricketer": "ক্রিকেটার ইনভাইট করুন",
    "nav.inviteCricketer": "ক্রিকেটার ইনভাইট করুন",
    "nav.hireExperts": "হায়ার এক্সপার্টস",
    "nav.offers": "অফার সমূহ",
    "nav.cart": "কার্ট",
    "nav.signIn": "সাইন ইন",
    "nav.newGear": "নতুন গিয়ার",
    "nav.preOwnedGear": "ব্যবহৃত গিয়ার",
    "nav.cricketAcademies": "ক্রিকেট একাডেমি",
    "nav.foundation": "প্লেজোন ফাউন্ডেশন",
    "nav.bats": "ব্যাট",
    "nav.batting": "ব্যাটিং",
    "nav.bowling": "বোলিং",
    "nav.wicketkeeping": "উইকেটকিপিং",
    "nav.shoes": "জুতো",
    "nav.accessories": "আনুষাঙ্গিক",
    "nav.clothing": "জার্সি ও পোশাক",
    "nav.genuineGear": "১০০% খাঁটি পণ্য",
    "nav.dhakaDelivery": "২৪ ঘণ্টায় ঢাকায় ডেলিভারি (৳৮০)",
    "nav.cashOnDelivery": "সারাদেশে ক্যাশ অন ডেলিভারি",
    "nav.browseAll": "সবগুলো দেখুন",
    "nav.categories": "ক্রিকেট ক্যাটাগরি",
    "nav.exploreCollection": "কালেকশন দেখুন",

    // Footer
    "footer.brandBio":
      "প্রতিটি ইনিংসের জন্য সেরা প্রস্তুতি। বাংলাদেশের সকল ক্রিকেটারের জন্য নতুন ও প্রি-ওউনড ক্রিকেট সরঞ্জাম।",
    "footer.company": "কোম্পানি",
    "footer.about": "প্লেজোন পরিচিতি",
    "footer.ourStory": "আমাদের গল্প",
    "footer.blog": "ব্লগ",
    "footer.careers": "ক্যারিয়ার",
    "footer.preOwned": "ব্যবহৃত গিয়ার (Pre-Owned)",
    "footer.contact": "যোগাযোগ করুন",

    "footer.customerService": "কাস্টমার সার্ভিস",
    "footer.help": "সহায়তা কেন্দ্র",
    "footer.trackOrder": "অর্ডার ট্র্যাক করুন",
    "footer.shipping": "শিপিং ও ডেলিভারি",
    "footer.returns": "রিটার্ন ও রিফান্ড",
    "footer.sizeGuide": "সাইজ গাইড",
    "footer.faqs": "সাধারণ জিজ্ঞাসা (FAQs)",

    "footer.shopCategories": "শপ ক্যাটাগরি",
    "footer.cricketBats": "ক্রিকেট ব্যাট",
    "footer.battingGear": "ব্যাটিং সরঞ্জাম",
    "footer.bowlingGear": "বোলিং সরঞ্জাম",
    "footer.wicketkeeping": "উইকেটকিপিং গিয়ার",
    "footer.cricketShoes": "ক্রিকেট জুতো",
    "footer.accessories": "এক্সেসরিজ ও ব্যাগ",
    "footer.specialOffers": "বিশেষ অফার",

    "footer.newsletter": "নিউজলেটার",
    "footer.newsletterDesc":
      "এক্সক্লুসিভ অফার, নতুন কালেকশন এবং ক্রিকেট আপডেটের জন্য সাবস্ক্রাইব করুন।",
    "footer.emailPlaceholder": "আপনার ইমেইল এড্রেস লিখুন",
    "footer.subscribe": "সাবস্ক্রাইব",
    "footer.consent":
      "হ্যাঁ, আমি প্লেজোন থেকে নিয়মিত অফার ও আপডেট পেতে চাই।",
    "footer.subscribed": "সাবস্ক্রাইব করার জন্য ধন্যবাদ!",
    "footer.copyright": "© ২০২৬ প্লেজোন। সর্বস্বত্ব সংরক্ষিত।",
    "footer.terms": "ব্যবহারের শর্তাবলী",
    "footer.privacy": "গোপনীয়তা নীতি",
    "footer.returnsPolicy": "রিটার্ন নীতি",

    "footer.theme": "থিম",
    "footer.language": "ভাষা",
    "footer.darkMode": "ডার্ক মোড",
    "footer.lightMode": "লাইট মোড",
    "footer.systemDefault": "সিস্টেম ডিফল্ট",

    // Common Cart & Checkout
    "cart.title": "আপনার ক্রিকেট ব্যাগ",
    "cart.empty": "আপনার শপিং ব্যাগটি খালি রয়েছে",
    "cart.subtotal": "সাবটোটাল",
    "cart.total": "মোট প্রদেয় মূল্য",
    "cart.checkout": "চেকআউটে যান",
    "cart.items": "টি পণ্য",
    "cart.applyCoupon": "কুপন কোড প্রয়োগ করুন",
    "cart.discount": "ছাড়",
    "cart.estimatedDelivery": "আনুমানিক ডেলিভারি",
    "cart.viewBag": "ব্যাগ দেখুন",
    "cart.continueShopping": "কেনাকাটা চালিয়ে যান",

    // Sections & Titles
    "home.featuredCategories": "জনপ্রিয় ক্যাটাগরি",
    "home.hireCricketExperts": "ক্রিকেট এক্সপার্ট ভাড়া করুন",
    "home.joinAsExpert": "এক্সপার্ট হিসেবে যুক্ত হন",
    "home.batsForEveryInnings": "প্রতিটি ইনিংসের জন্য ব্যাট",
    "home.battingEssentials": "ব্যাটিং সরঞ্জাম",
    "home.bowlingFielding": "বোলিং ও ফিল্ডিং গিয়ার",
    "home.shoesKitBags": "জুতো ও কিট ব্যাগ",
    "home.featuredCricketGear": "সেরা ক্রিকেট গিয়ার কালেকশন",
    "home.videoReviews": "বাংলাদেশের সেরা ক্রিকেটারদের পছন্দের প্লেজোন",
    "home.viewAll": "সবগুলো দেখুন",
    "home.addToCart": "কার্টে যোগ করুন",
    "home.topPicks": "জনপ্রিয় পছন্দ",
    "home.exploreAll": "সবগুলো অন্বেষণ করুন",
  },
};

// Normalized direct word translations for fallback
const WORD_MAP_BN: Record<string, string> = {
  // Navigation & General
  "new gear": "নতুন গিয়ার",
  "pre-owned gear": "ব্যবহৃত গিয়ার",
  "pre-owned": "ব্যবহৃত পণ্য",
  "invite a cricketer": "ক্রিকেটার ইনভাইট করুন",
  "invite cricketer": "ইনভাইট ক্রিকেটার",
  "invite now": "ইনভাইট করুন",
  "request invitation": "আমন্ত্রণ জানান",
  "book a cricketer": "ক্রিকেটার ইনভাইট করুন",
  "book cricketer": "ইনভাইট ক্রিকেটার",
  "book now": "ইনভাইট করুন",
  "hire experts": "হায়ার এক্সপার্টস",
  "hire cricket experts": "ক্রিকেট এক্সপার্ট ভাড়া করুন",
  "cricket academies": "ক্রিকেট একাডেমি",
  "academies": "একাডেমি সমূহ",
  foundation: "ফাউন্ডেশন",
  "playzone foundation": "প্লেজোন ফাউন্ডেশন",
  bats: "ব্যাট",
  batting: "ব্যাটিং",
  bowling: "বোলিং",
  wicketkeeping: "উইকেটকিপিং",
  shoes: "জুতো",
  accessories: "আনুষাঙ্গিক",
  clothing: "পোশাক",
  jerseys: "জার্সি",
  blog: "ব্লগ",
  "pre-order": "প্রি-অর্ডার",
  offers: "অফার",
  cart: "কার্ট",
  "sign in": "সাইন ইন",
  "explore collection": "কালেকশন দেখুন",
  "star": "স্টার",
  "new": "নতুন",
  "cricket categories": "ক্রিকেট ক্যাটাগরি",
  "search for cricket bats, shoes, gloves...": "ক্রিকেট ব্যাট, জুতো, গ্লাভস ইত্যাদি খুঁজুন...",
  "⚡ free express delivery across dhaka on orders over ৳5,000! pre-orders open for 2026 english willow bats.":
    "⚡ ৫,০০০ টাকার বেশি অর্ডারে সমগ্র ঢাকায় ফ্রি এক্সপ্রেস ডেলিভারি! ২০২৬ ইংলিশ উইলো ব্যাটের প্রি-অর্ডার চলছে।",
  "100% genuine gear": "১০০% আসল ক্রিকেট গিয়ার",
  "24h dhaka delivery (৳80)": "২৪ ঘণ্টায় ঢাকায় ডেলিভারি (৳৮০)",
  "cash on delivery across bangladesh": "সারাদেশে ক্যাশ অন ডেলিভারি",
  "browse all": "সবগুলো দেখুন",

  // Mega Menu Subcategories & Brands
  "by willow & type": "উইলো ও ব্যাটের ধরন",
  "top brands": "সেরা ব্র্যান্ডসমূহ",
  "english willow bats": "ইংলিশ উইলো ব্যাট",
  "kashmir willow bats": "কাশ্মীর উইলো ব্যাট",
  "tennis / tape ball bats": "টেনিস ও টেপ বল ব্যাট",
  "junior & youth bats": "জুনিয়র ও যুব ব্যাট",
  "ready to play knocked bats": "নক করা রেডি-টু-প্লে ব্যাট",
  "batting protection": "ব্যাটিং সুরক্ষা",
  "inners & under-gear": "ইনার ও সহায়ক গিয়ার",
  "batting gloves": "ব্যাটিং গ্লাভস",
  "batting legguards & pads": "ব্যাটিং প্যাড",
  "batting pads": "ব্যাটিং প্যাড",
  "cricket helmets": "ক্রিকেট হেলমেট",
  "helmets": "হেলমেট",
  "dual thigh guards": "থাই গার্ড",
  "thigh guards": "থাই গার্ড",
  "chest & arm guards": "চেস্ট ও আর্ম গার্ড",
  "abdominal guards": "অ্যাবডোমিনাল গার্ড (বক্স)",
  "cricket balls": "ক্রিকেট বল",
  "bowling gear & aids": "বোলিং সরঞ্জাম ও প্রশিক্ষণ",
  "red 4-piece leather balls": "লাল ৪-পিস লেদার বল",
  "white match leather balls": "সাদা ম্যাচ লেদার বল",
  "pink day/night balls": "গোলাপি ডে/নাইট বল",
  "heavy tennis & tape balls": "ভারী টেনিস ও টেপ বল",
  "training wind & reaction balls": "অনুশীলন বল",
  "keeper's gear": "কিপার সরঞ্জাম",
  "wicket keeping gloves": "উইকেটকিপিং গ্লাভস",
  "wicket keeping pads": "উইকেটকিপিং প্যাড",
  "footwear categories": "জুতো ক্যাটাগরি",
  "cricket shoes": "ক্রিকেট জুতো",
  "full metal spikes (turf)": "ফুল মেটাল স্পাইকস",
  "rubber studs (matting/hard ground)": "রাবার স্টাডস",
  "kit bags": "কিট ব্যাগ",
  "stumps": "স্টাম্পস ও বেলস",
  "training gear": "প্রশিক্ষণ সরঞ্জাম",

  // Footer & Links
  "about playzone": "প্লেজোন পরিচিতি",
  "our story": "আমাদের গল্প",
  careers: "ক্যারিয়ার",
  "contact us": "যোগাযোগ",
  "help center": "সহায়তা কেন্দ্র",
  "track order": "অর্ডার ট্র্যাক",
  "shipping & delivery": "শিপিং ও ডেলিভারি",
  "returns & refunds": "রিটার্ন ও রিফান্ড",
  "size guide": "সাইজ গাইড",
  faqs: "সাধারণ জিজ্ঞাসা",
  "special offers": "বিশেষ অফার",
  "terms of service": "ব্যবহারের শর্তাবলী",
  "privacy policy": "গোপনীয়তা নীতি",
  "return policy": "রিটার্ন নীতি",
  theme: "থিম",
  language: "ভাষা",
  "dark mode": "ডার্ক মোড",
  "light mode": "লাইট মোড",
  "system default": "সিস্টেম ডিফল্ট",
  "company": "কোম্পানি",
  "customer service": "কাস্টমার সার্ভিস",
  "shop categories": "শপ ক্যাটাগরি",
  "newsletter": "নিউজলেটার",
  "enter your email address": "আপনার ইমেইল এড্রেস লিখুন",
  "subscribe": "সাবস্ক্রাইব",

  // Sections & Tabs
  "featured": "জনপ্রিয়",
  "categories": "ক্যাটাগরি",
  "hire": "ভাড়া করুন",
  "join as expert": "এক্সপার্ট হিসেবে যোগ দিন",
  "top picks": "জনপ্রিয় পছন্দ",
  "coaches": "কোচ",
  "net bowlers & throwers": "নেট বোলার ও থ্রোয়ার",
  "fitness & physio": "ফিটনেস ও ফিজিও",
  "match officials": "আম্পায়ার ও স্কোরার",
  "bat & gear repairs": "ব্যাট ও সরঞ্জাম মেরামত",
  "broadcast & video": "ধারাভাষ্য ও ভিডিওগ্রাফি",
  "view all": "সবগুলো দেখুন",
  "explore all": "সবগুলো দেখুন",
  "explore all experts": "সব এক্সপার্ট দেখুন",
  "book session": "সেশন বুক করুন",
  "view profile": "প্রোফাইল দেখুন",
  "add to cart": "কার্টে যোগ করুন",
  "in stock": "স্টকে আছে",
  "out of stock": "স্টক শেষ",
  "pre-order now": "প্রি-অর্ডার করুন",
  "bats for every innings": "প্রতিটি ইনিংসের জন্য ব্যাট",
  "batting essentials": "ব্যাটিং সরঞ্জাম",
  "bowling & fielding gear": "বোলিং ও ফিল্ডিং গিয়ার",
  "shoes & kit bags": "জুতো ও কিট ব্যাগ",
  "featured cricket gear": "সেরা ক্রিকেট গিয়ার",
  "best sellers": "সর্বাধিক বিক্রিত",
  "new arrivals": "নতুন কালেকশন",
  "top deals": "সেরা অফার",
  "top rated": "টপ রেটেড",

  // Social Channels in Hero
  "facebook page": "ফেসবুক পেজ",
  "cricket group": "ক্রিকেট গ্রুপ",
  "join community": "গ্রুপে যুক্ত হন",
  "instagram": "ইনস্টাগ্রাম",
  "tiktok": "টিকটক",
  "youtube channel": "ইউটিউব চ্যানেল",
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (keyOrEnglish) => keyOrEnglish,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("playzone_language") as Language | null;
      if (saved === "en" || saved === "bn") {
        setLanguageState(saved);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("playzone_language", lang);
    } catch {
      // ignore storage access errors
    }
  };

  const toggleLanguage = () => {
    const nextLang = (isMounted ? language : "en") === "en" ? "bn" : "en";
    setLanguage(nextLang);
  };

  const t = (keyOrEnglish: string, banglaFallback?: string): string => {
    if (!keyOrEnglish) return "";

    // During SSR and the very first client hydration render, always use 'en'
    // so server and client output match 100% identically with zero hydration mismatch.
    const effectiveLanguage = isMounted ? language : "en";

    if (effectiveLanguage === "bn") {
      // 1. Direct match in TRANSLATIONS.bn dictionary
      if (TRANSLATIONS.bn[keyOrEnglish]) return TRANSLATIONS.bn[keyOrEnglish];

      // 2. Exact or trimmed lookup in WORD_MAP_BN
      const trimmed = keyOrEnglish.trim();
      const lower = trimmed.toLowerCase();
      if (WORD_MAP_BN[lower]) return WORD_MAP_BN[lower];

      // 3. Fallback provided in function call
      if (banglaFallback) return banglaFallback;

      return trimmed;
    }

    // effectiveLanguage === 'en'
    if (TRANSLATIONS.en[keyOrEnglish]) return TRANSLATIONS.en[keyOrEnglish];
    return keyOrEnglish;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: isMounted ? language : "en",
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
