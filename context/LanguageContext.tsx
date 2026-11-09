"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

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
    "footer.contact": "যোগাযোগ",

    "footer.customerService": "কাস্টমার সার্ভিস",
    "footer.help": "সহায়তা কেন্দ্র",
    "footer.trackOrder": "অর্ডার ট্র্যাক",
    "footer.shipping": "শিপিং ও ডেলিভারি",
    "footer.returns": "রিটার্ন ও রিফান্ড",
    "footer.sizeGuide": "সাইজ গাইড",
    "footer.faqs": "সাধারণ জিজ্ঞাসা",

    "footer.shopCategories": "শপ ক্যাটাগরি",
    "footer.cricketBats": "ক্রিকেট ব্যাট",
    "footer.battingGear": "ব্যাটিং সরঞ্জাম",
    "footer.bowlingGear": "বোলিং সরঞ্জাম",
    "footer.wicketkeeping": "উইকেটকিপিং",
    "footer.cricketShoes": "ক্রিকেট জুতো",
    "footer.accessories": "আনুষাঙ্গিক",
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

// Normalized direct word translations for fallback across ALL pages
const WORD_MAP_BN: Record<string, string> = {
  // Navigation & General
  "home": "হোম",
  "shop": "শপ",
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
  "playzone official cricket concierge": "প্লেজোন অফিসিয়াল ক্রিকেট কনসিয়ার্জ",
  "browse cricketers": "ক্রিকেটারদের তালিকা দেখুন",
  "browse cricketers (step 1)": "ক্রিকেটারদের তালিকা দেখুন (১ম ধাপ)",
  "submit custom request": "কাস্টম রিকোয়েস্ট পাঠান",
  "featured cricket icons": "ফিচার্ড ক্রিকেট আইকন",
  "the playzone invitation model": "প্লেজোন ইনভাইটেশন মডেল",
  "how invitation works (4 easy steps)": "আমন্ত্রণ কীভাবে কাজ করে? (৪টি সহজ ধাপ)",
  "browse available cricketers": "উপলব্ধ ক্রিকেটারদের তালিকা",
  "request other cricketer": "অন্য ক্রিকেটার রিকোয়েস্ট",
  "all event types": "সকল ইভেন্ট ক্যাটাগরি",
  "corporate annual gala & awards": "কর্পোরেট বার্ষিক গালা ও পুরস্কার বিতরণী",
  "tournament chief guest & trophy unveiling": "টুর্নামেন্টের প্রধান অতিথি ও ট্রফি উন্মোচন",
  "brand ambassador & commercial shoot": "ব্র্যান্ড অ্যাম্বাসেডর ও বাণিজ্যিক শুটিং",
  "youth masterclass & cricket clinic": "যুব মাস্টারক্লাস ও ক্রিকেট প্রশিক্ষণ ক্লিনিক",
  "school / college sports day chief guest": "স্কুল/কলেজ ক্রীড়া দিবসের প্রধান অতিথি",
  "exhibition & friendly match appearance": "প্রীতি ম্যাচ ও প্রদর্শনী ম্যাচে উপস্থিতি",
  "keynote motivational speech": "অনুপ্রেরণামূলক বক্তব্য (Motivational Speech)",
  "private meet & greet session": "প্রাইভেট মিট অ্যান্ড গ্রিট সেশন",
  "product launch & endorsement": "পণ্য উদ্বোধন ও শুভেচ্ছা বার্তা",
  "other custom event": "অন্যান্য কাস্টম ইভেন্ট",
  "national legend": "ন্যাশনাল লিজেন্ড",
  "active international": "অ্যাক্টিভ ইন্টারন্যাশনাল",
  "domestic / bpl icon": "ঘরোয়া / বিপিএল আইকন",
  "rising talent": "উদীয়মান তারকা",
  "advance payment after schedule confirmation": "টাইম ফিক্স করার পর অ্যাডভান্স পেমেন্ট",
  "advance payment after fixing time": "টাইম ফিক্স করার পর অ্যাডভান্স পেমেন্ট",
  "direct player coordination": "সরাসরি প্লেয়ার কোঅর্ডিনেশন",
  "official quotation & invoice": "অফিসিয়াল কোটেশন ও ইনভয়েস",
  "custom coordination": "কাস্টম কোঅর্ডিনেশন",
  "clarification & faqs": "সাধারণ জিজ্ঞাসা ও উত্তর",
  "frequently asked questions": "সাধারণ জিজ্ঞাসা (FAQs)",
  "profile & stats": "প্রোফাইল ও পরিসংখ্যান",
  "quote & advance payment": "কোটেশন ও অ্যাডভান্স পেমেন্ট",
  "submit invitation request": "আমন্ত্রণ রিকোয়েস্ট সাবমিট করুন",
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
  star: "স্টার",
  new: "নতুন",
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
  helmets: "হেলমেট",
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
  stumps: "স্টাম্পস ও বেলস",
  "training gear": "প্রশিক্ষণ সরঞ্জাম",

  // Product Card & Details
  "add to cart": "কার্টে যোগ করুন",
  "add to bag": "ব্যাগে যোগ করুন",
  "add to cricket bag": "ক্রিকেট ব্যাগে যোগ করুন",
  "buy now": "এখনই কিনুন",
  "order now": "এখনই অর্ডার করুন",
  "in stock": "স্টকে আছে",
  "out of stock": "স্টক শেষ",
  "pre-order now": "প্রি-অর্ডার করুন",
  "view details": "বিস্তারিত দেখুন",
  "specifications": "স্পেসিফিকেশন",
  "description": "পণ্যের বিবরণ",
  "product description": "পণ্যের বিবরণ",
  "highlights": "মূল আকর্ষণ",
  "key highlights": "মূল আকর্ষণ",
  "care & maintenance": "যত্ন ও রক্ষণাবেক্ষণ",
  "customer reviews": "গ্রাহকদের রিভিউ",
  "ratings & reviews": "রেটিং ও রিভিউ",
  "rating": "রেটিং",
  "reviews": "রিভিউ",
  "views": "ভিউ",
  "verified purchase": "যাচাইকৃত ক্রেতা",
  "related products": "সম্পর্কিত পণ্যসমূহ",
  "you may also like": "আপনার আরও পছন্দ হতে পারে",
  "select size": "সাইজ নির্বাচন করুন",
  "select weight": "ওজন নির্বাচন করুন",
  "quantity": "পরিমাণ",
  "total price": "মোট মূল্য",
  "free delivery": "ফ্রি ডেলিভারি",
  "cash on delivery": "ক্যাশ অন ডেলিভারি",
  "easy returns": "সহজ রিটার্ন",
  "7 days return": "৭ দিনের রিটার্ন সুবিধা",
  "100% genuine": "১০০% খাঁটি পণ্য",
  "100% authentic": "১০০% আসল পণ্য",
  "ready to play": "রেডি টু প্লে",
  "knocked": "নক করা",
  "free knocking": "ফ্রি নকিং সুবিধা",
  "short handle": "শর্ট হ্যান্ডেল",
  "long handle": "লং হ্যান্ডেল",
  "english willow": "ইংলিশ উইলো",
  "kashmir willow": "কাশ্মীর উইলো",
  "grade 1": "গ্রেড ১",
  "grade 2": "গ্রেড ২",
  "grade 3": "গ্রেড ৩",

  // Filters & Catalog View
  filters: "ফিল্টার",
  "filter products": "পণ্য ফিল্টার",
  "filter by": "ফিল্টার করুন",
  "sort by": "সাজান",
  default: "ডিফল্ট",
  "price: low to high": "দাম: কম থেকে বেশি",
  "price: high to low": "দাম: বেশি থেকে কম",
  "top rated": "টপ রেটেড",
  newest: "নতুন আগমন",
  "new arrivals": "নতুন কালেকশন",
  "best sellers": "সর্বাধিক বিক্রিত",
  "all products": "সকল পণ্য",
  showing: "প্রদর্শিত হচ্ছে",
  results: "টি ফলাফল",
  matches: "টি মিল",
  "price range": "দামের পরিসীমা",
  "min price": "সর্বনিম্ন দাম",
  "max price": "সর্বোচ্চ দাম",
  "condition": "পণ্যের অবস্থা",
  brand: "ব্র্যান্ড",
  "all brands": "সকল ব্র্যান্ড",
  "in stock only": "শুধুমাত্র স্টকে আছে",
  "reset filters": "ফিল্টার রিসেট",
  "clear all": "সব মুছুন",
  "view all results": "সকল ফলাফল দেখুন",
  "no products found": "কোনো পণ্য পাওয়া যায়নি",

  // Checkout & Cart
  checkout: "চেকআউট",
  "shopping bag": "শপিং ব্যাগ",
  "your cricket bag": "আপনার ক্রিকেট ব্যাগ",
  "your shopping bag is empty": "আপনার শপিং ব্যাগটি খালি রয়েছে",
  "proceed to checkout": "চেকআউটে যান",
  "billing details": "বিলিং তথ্য",
  "delivery details": "ডেলিভারি তথ্য",
  "shipping address": "ডেলিভারি ঠিকানা",
  "full name": "পূর্ণ নাম",
  "phone number": "ফোন নম্বর",
  "email address": "ইমেইল এড্রেস",
  district: "জেলা",
  "select district": "জেলা নির্বাচন করুন",
  "delivery area": "ডেলিভারি এলাকা",
  address: "ঠিকানা",
  "full address": "পূর্ণ ঠিকানা",
  "order notes": "অর্ডার নোট",
  "payment method": "পেমেন্ট মাধ্যম",
  "cash on delivery (cod)": "ক্যাশ অন ডেলিভারি (সিওডি)",
  "online payment": "অনলাইন পেমেন্ট",
  "order summary": "অর্ডার সামারি",
  subtotal: "সাবটোটাল",
  "delivery fee": "ডেলিভারি চার্জ",
  discount: "ছাড়",
  "coupon code": "কুপন কোড",
  "apply coupon": "কুপন কোড প্রয়োগ করুন",
  "total amount": "মোট প্রদেয় মূল্য",
  "place order": "অর্ডার নিশ্চিত করুন",
  "order placed successfully": "আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!",
  "continue shopping": "কেনাকাটা চালিয়ে যান",

  // Track Order
  "track order": "অর্ডার ট্র্যাক",
  "track your order": "আপনার অর্ডার ট্র্যাক করুন",
  "enter your order id": "আপনার অর্ডার আইডি দিন",
  "order id": "অর্ডার আইডি",
  "track": "ট্র্যাক করুন",
  "status": "অবস্থা",
  "order status": "অর্ডার অবস্থা",

  // Offers & Deals
  "special offers": "বিশেষ অফার",
  "top deals": "সেরা অফার",
  "flash sale": "ফ্ল্যাশ সেল",
  "claim offer": "অফার নিন",
  "copy code": "কোড কপি করুন",
  "copied": "কপি হয়েছে!",
  "valid till": "মেয়াদ",

  // Footer & Links
  "about playzone": "প্লেজোন পরিচিতি",
  "our story": "আমাদের গল্প",
  careers: "ক্যারিয়ার",
  "contact us": "যোগাযোগ",
  "help center": "সহায়তা কেন্দ্র",
  "shipping & delivery": "শিপিং ও ডেলিভারি",
  "returns & refunds": "রিটার্ন ও রিফান্ড",
  "size guide": "সাইজ গাইড",
  faqs: "সাধারণ জিজ্ঞাসা",
  "terms of service": "ব্যবহারের শর্তাবলী",
  "privacy policy": "গোপনীয়তা নীতি",
  "return policy": "রিটার্ন নীতি",
  theme: "থিম",
  language: "ভাষা",
  "dark mode": "ডার্ক মোড",
  "light mode": "লাইট মোড",
  "system default": "সিস্টেম ডিফল্ট",
  company: "কোম্পানি",
  "customer service": "কাস্টমার সার্ভিস",
  "shop categories": "শপ ক্যাটাগরি",
  newsletter: "নিউজলেটার",
  "enter your email address": "আপনার ইমেইল এড্রেস লিখুন",
  subscribe: "সাবস্ক্রাইব",

  // Sections & Tabs
  featured: "জনপ্রিয়",
  categories: "ক্যাটাগরি",
  hire: "ভাড়া করুন",
  "join as expert": "এক্সপার্ট হিসেবে যোগ দিন",
  "top picks": "জনপ্রিয় পছন্দ",
  coaches: "কোচ",
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
  "bats for every innings": "প্রতিটি ইনিংসের জন্য ব্যাট",
  "batting essentials": "ব্যাটিং সরঞ্জাম",
  "bowling & fielding gear": "বোলিং ও ফিল্ডিং গিয়ার",
  "shoes & kit bags": "জুতো ও কিট ব্যাগ",
  "featured cricket gear": "সেরা ক্রিকেট গিয়ার",

  // Social Channels in Hero
  "facebook page": "ফেসবুক পেজ",
  "cricket group": "ক্রিকেট গ্রুপ",
  "join community": "গ্রুপে যুক্ত হন",
  instagram: "ইনস্টাগ্রাম",
  tiktok: "টিকটক",
  "youtube channel": "ইউটিউব চ্যানেল",
};

// Original text caches to restore perfectly when switching back to English
const originalTextMap = new WeakMap<Node, string>();
const originalPlaceholderMap = new WeakMap<
  HTMLInputElement | HTMLTextAreaElement,
  string
>();

/**
 * Global DOM text translator:
 * Scans DOM text nodes and replaces matching English strings with Bengali equivalents.
 */
function translateTree(root: Node, tFn: (text: string) => string) {
  if (!root || typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (
        tag === "script" ||
        tag === "style" ||
        tag === "noscript" ||
        tag === "code" ||
        parent.hasAttribute("data-no-translate") ||
        parent.closest("[data-no-translate]")
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current: Node | null = walker.nextNode();
  while (current) {
    const raw = current.textContent || "";
    const trimmed = raw.trim();

    // Skip pure numbers, prices (৳ 5000), symbols, or empty spaces
    if (
      trimmed &&
      !/^\d+([.,]\d+)?(\s*(৳|%|kg|g|cm|in|mm|lbs))?$/.test(trimmed)
    ) {
      // ONLY save to originalTextMap if it contains English letters
      if (!originalTextMap.has(current) && /[a-zA-Z]/.test(raw)) {
        originalTextMap.set(current, raw);
      }
      const orig = originalTextMap.get(current) || raw;
      const origTrimmed = orig.trim();
      const translated = tFn(origTrimmed);

      if (translated && translated !== origTrimmed) {
        const leadingSpace = orig.match(/^\s*/)?.[0] || "";
        const trailingSpace = orig.match(/\s*$/)?.[0] || "";
        current.textContent = leadingSpace + translated + trailingSpace;
      }
    }
    current = walker.nextNode();
  }

  // Translate input and textarea placeholders
  if ((root as Element).querySelectorAll) {
    const inputs = (root as Element).querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input[placeholder], textarea[placeholder]");
    inputs.forEach((input) => {
      if (input.closest("[data-no-translate]")) return;
      if (!originalPlaceholderMap.has(input) && /[a-zA-Z]/.test(input.placeholder)) {
        originalPlaceholderMap.set(input, input.placeholder);
      }
      const orig = originalPlaceholderMap.get(input) || input.placeholder;
      const translated = tFn(orig.trim());
      if (translated && translated !== orig.trim()) {
        input.placeholder = translated;
      }
    });
  }
}

/**
 * Restores original English text on all previously translated text nodes and placeholders
 */
function restoreTree(root: Node) {
  if (!root || typeof document === "undefined") return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current: Node | null = walker.nextNode();
  while (current) {
    if (originalTextMap.has(current)) {
      const orig = originalTextMap.get(current);
      if (orig && /[a-zA-Z]/.test(orig)) {
        current.textContent = orig;
      }
    }
    current = walker.nextNode();
  }

  if ((root as Element).querySelectorAll) {
    const inputs = (root as Element).querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input[placeholder], textarea[placeholder]");
    inputs.forEach((input) => {
      if (originalPlaceholderMap.has(input)) {
        input.placeholder = originalPlaceholderMap.get(input)!;
      }
    });
  }
}

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
  const observerRef = useRef<MutationObserver | null>(null);

  // Initialize from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("playzone_language") as Language | null;
      if (saved === "en" || saved === "bn") {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        document.documentElement.setAttribute("data-lang", saved);
      }
    } catch {
      // ignore storage access errors
    }

    // Listen to cross-window or internal language change events
    const handleLangEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail === "en" || customEvent.detail === "bn") {
        setLanguageState(customEvent.detail);
      }
    };
    window.addEventListener("playzone_language_change", handleLangEvent);
    return () => {
      window.removeEventListener("playzone_language_change", handleLangEvent);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("playzone_language", lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
      window.dispatchEvent(
        new CustomEvent("playzone_language_change", { detail: lang })
      );
    } catch {
      // ignore storage access errors
    }
  };

  const toggleLanguage = () => {
    const current = isMounted ? language : "en";
    const nextLang: Language = current === "en" ? "bn" : "en";
    setLanguage(nextLang);
  };

  const t = (keyOrEnglish: string, banglaFallback?: string): string => {
    if (!keyOrEnglish) return "";

    // During SSR and initial hydration, strictly match English to prevent mismatch
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

  // GLOBAL AUTOMATIC DOM TRANSLATION EFFECT
  // Translates ALL pages dynamically whenever language is 'bn' or pathname changes
  useEffect(() => {
    if (!isMounted || typeof document === "undefined") return;

    const effectiveLang = language;
    const rootEl = document.querySelector("main") || document.body;

    const applyDOMTranslation = () => {
      if (effectiveLang === "bn") {
        translateTree(rootEl, (text) => t(text));
      } else {
        restoreTree(rootEl);
      }
    };

    // Run immediately and after a short render delay
    applyDOMTranslation();
    const timeoutId = setTimeout(applyDOMTranslation, 120);

    // Watch for dynamic page updates, modals, or loaded elements
    if (effectiveLang === "bn" && typeof MutationObserver !== "undefined") {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new MutationObserver(() => {
        applyDOMTranslation();
      });

      observerRef.current.observe(rootEl, {
        childList: true,
        subtree: true,
        characterData: false,
      });
    } else if (observerRef.current) {
      observerRef.current.disconnect();
    }

    window.addEventListener("popstate", applyDOMTranslation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("popstate", applyDOMTranslation);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [language, isMounted]);

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
