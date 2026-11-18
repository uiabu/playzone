export type ShortCategory =
  | "all"
  | "bat"
  | "ball"
  | "gloves"
  | "helmet"
  | "pad"
  | "shoe"
  | "tips";

export interface ShortVideoProduct {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

export interface ShortVideo {
  id: string;
  youtubeId: string;
  title: string;
  titleBn: string;
  category: ShortCategory;
  tagTop: string;
  tagTopBn: string;
  tagBottom: string;
  tagBottomBn: string;
  duration: string;
  thumbnail: string;
  channelName: string;
  product: ShortVideoProduct;
}

export interface CategoryFilter {
  id: ShortCategory;
  label: string;
  labelBn: string;
  icon?: string;
}

export const SHORT_CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "All", labelBn: "সবগুলো" },
  { id: "bat", label: "Bat", labelBn: "ব্যাট", icon: "🏏" },
  { id: "ball", label: "Ball", labelBn: "বল", icon: "🔴" },
  { id: "gloves", label: "Gloves", labelBn: "গ্লাভস", icon: "🧤" },
  { id: "helmet", label: "Helmet", labelBn: "হেলমেট", icon: "⛑️" },
  { id: "pad", label: "Pad", labelBn: "প্যাড", icon: "🛡️" },
  { id: "shoe", label: "Shoe", labelBn: "জুতো", icon: "👟" },
];

export const MORE_CATEGORIES: CategoryFilter[] = [
  { id: "tips", label: "Tips & Tricks", labelBn: "টিপস ও ট্রিকস", icon: "💡" },
];

export const SHORT_VIDEOS: ShortVideo[] = [
  // 1. Kookaburra Pro 4.0 Bat Unboxing & Ping Test
  {
    id: "short-pe-sBpdLGBw",
    youtubeId: "pe-sBpdLGBw",
    title: "Kookaburra Pro 4.0 English Willow Cricket Bat Unboxing & Ping Test!",
    titleBn: "কুকাবুরা প্রো ৪.০ ইংলিশ উইলো ক্রিকেট ব্যাট আনবক্সিং ও পিং টেস্ট!",
    category: "bat",
    tagTop: "PLAYZONE",
    tagTopBn: "প্লেজোন",
    tagBottom: "BAT REVIEW",
    tagBottomBn: "ব্যাট রিভিউ",
    duration: "0:58",
    thumbnail: "https://i.ytimg.com/vi/pe-sBpdLGBw/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "kookaburra-aura-pro",
      slug: "kookaburra-aura-pro",
      name: "Kookaburra Aura Pro English Willow Bat",
      nameBn: "কুকাবুরা অরা প্রো ইংলিশ উইলো ব্যাট",
      price: 7200,
      originalPrice: 9500,
      image: "/images/products/bats/kookaburra_bat.png",
      category: "Cricket Bats",
    },
  },
  // 2. Leather Match Ball Guide
  {
    id: "short-ball-1",
    youtubeId: "gcIYjdiniF4",
    title: "Which Cricket Ball To Choose? Leather Match Balls Comparison",
    titleBn: "কোন ক্রিকেট বলটি আপনার জন্য সেরা? লেদার বল গাইড",
    category: "ball",
    tagTop: "WHICH BALL",
    tagTopBn: "কোন বল",
    tagBottom: "TO CHOOSE?",
    tagBottomBn: "বেছে নেবেন?",
    duration: "0:52",
    thumbnail: "https://i.ytimg.com/vi/gcIYjdiniF4/hqdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "leather-match-balls-pack-6",
      slug: "leather-match-balls-pack-6",
      name: "Regulation 4-Piece Leather Match Balls (Box of 6)",
      nameBn: "৪-পিস লেদার ম্যাচ ক্রিকেট বল (৬ টির বক্স)",
      price: 4800,
      originalPrice: 6000,
      image: "/images/categories/cricket_balls.png",
      category: "Bowling Gear",
    },
  },
  // 3. Batting Gloves Protection
  {
    id: "short-gloves-1",
    youtubeId: "qRu3905EdxM",
    title: "Pro Batting Gloves Features & Sausage Finger Protection",
    titleBn: "প্রো ব্যাটিং গ্লাভস ফিচার ও ফিঙ্গার প্রটেকশন",
    category: "gloves",
    tagTop: "GLOVES",
    tagTopBn: "গ্লাভস",
    tagBottom: "FEATURES",
    tagBottomBn: "ফিচার ও সুরক্ষা",
    duration: "0:52",
    thumbnail: "https://i.ytimg.com/vi/qRu3905EdxM/hqdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "sg-test-batting-gloves",
      slug: "sg-test-batting-gloves",
      name: "SG Test Batting Gloves",
      nameBn: "এসজি টেস্ট ব্যাটিং গ্লাভস",
      price: 3200,
      originalPrice: 4200,
      image: "/images/products/batting_essentials/sg_gloves.png",
      category: "Batting Gear",
    },
  },
  // 4. Helmet Safety Test
  {
    id: "short-helmet-1",
    youtubeId: "huC1bmS0TU4",
    title: "The Safest Cricket Helmet? Steel Grille Impact Test",
    titleBn: "সেরা ক্রিকেট হেলমেট? গ্রিল ইমপ্যাক্ট টেস্ট",
    category: "helmet",
    tagTop: "HELMET",
    tagTopBn: "হেলমেট",
    tagBottom: "SAFETY TEST",
    tagBottomBn: "সেফটি টেস্ট",
    duration: "0:49",
    thumbnail: "https://i.ytimg.com/vi/huC1bmS0TU4/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "gray-nicolls-elite-helmet",
      slug: "gray-nicolls-elite-helmet",
      name: "Gray-Nicolls Elite Cricket Helmet",
      nameBn: "গ্রে-নিকোলস এলিট ক্রিকেট হেলমেট",
      price: 3600,
      originalPrice: 4800,
      image: "/images/products/batting_essentials/gray_nicolls_helmet.png",
      category: "Batting Gear",
    },
  },
  // 5. Cricket Shoes Review
  {
    id: "short-shoe-1",
    youtubeId: "YPa3NAgVvw0",
    title: "Kookaburra Pro Spike Cricket Shoes Review & Turf Grip",
    titleBn: "কুকাবুরা প্রো স্পাইক ক্রিকেট শু রিভিউ ও টার্ফ গ্রিপ",
    category: "shoe",
    tagTop: "CRICKET",
    tagTopBn: "ক্রিকেট",
    tagBottom: "SHOE REVIEW",
    tagBottomBn: "জুতো রিভিউ",
    duration: "0:56",
    thumbnail: "https://i.ytimg.com/vi/YPa3NAgVvw0/hqdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "asics-gel-peake-bowling-shoes",
      slug: "asics-gel-peake-bowling-shoes",
      name: "Asics Gel-Peake Bowling Shoes",
      nameBn: "অ্যাসিক্স জেল-পিক বোলিং ক্রিকেট জুতো",
      price: 9500,
      originalPrice: 12500,
      image: "/images/products/bowling_fielding/asics_bowling_shoes.png",
      category: "Cricket Shoes",
    },
  },
  // 6. Batting Tips & Tricks
  {
    id: "short-tips-1",
    youtubeId: "G3jnTEL-2GQ",
    title: "Cricket Batting Tips & Stance Position Breakdown",
    titleBn: "ক্রিকেট ব্যাটিং টেকনিক ও স্ট্যান্স পজিশন গাইড",
    category: "tips",
    tagTop: "BATTING",
    tagTopBn: "ব্যাটিং",
    tagBottom: "TIPS & TRICKS",
    tagBottomBn: "টিপস ও ট্রিকস",
    duration: "0:43",
    thumbnail: "https://i.ytimg.com/vi/G3jnTEL-2GQ/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "batting-protection-master-combo",
      slug: "batting-protection-master-combo",
      name: "PLAYZONE Complete Batting Protection Combo",
      nameBn: "প্লেজোন ফুল ব্যাটিং প্রোটেকশন কম্বো প্যাক",
      price: 11800,
      originalPrice: 15500,
      image: "/images/categories/batting_pads.png",
      category: "Batting Gear",
    },
  },
  // 7. Kookaburra Kahuna Pro Players Replica
  {
    id: "short-EXv39G4Mg2I",
    youtubeId: "EXv39G4Mg2I",
    title: "Kookaburra Kahuna Pro Players Replica (JB Edition) Showcase",
    titleBn: "কুকাবুরা কাহুনা প্রো প্লেয়ার্স রেপ্লিকা (জেবি এডিশন) শোকেস",
    category: "bat",
    tagTop: "KAHUNA PRO",
    tagTopBn: "কাহুনা প্রো",
    tagBottom: "BAT SHOWCASE",
    tagBottomBn: "ব্যাট শোকেস",
    duration: "0:52",
    thumbnail: "https://i.ytimg.com/vi/EXv39G4Mg2I/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "kookaburra-kahuna-preowned",
      slug: "kookaburra-kahuna-preowned",
      name: "Kookaburra Kahuna Pro Bat (Grade A Pre-Owned)",
      nameBn: "কুকাবুরা কাহুনা প্রো ব্যাট (গ্রেড এ প্রি-ওনড)",
      price: 4800,
      originalPrice: 8500,
      image: "/images/products/bats/kookaburra_bat.png",
      category: "Cricket Bats",
    },
  },
  // 8. DSC BLU MIRAGE
  {
    id: "short-wc386gFjhgQ",
    youtubeId: "wc386gFjhgQ",
    title: "DSC BLU MIRAGE Cricket Bat First Look & Profile Ping Review",
    titleBn: "ডিএসসি ব্লু মিরাজ ক্রিকেট ব্যাট ফার্স্ট লুক ও পিং রিভিউ",
    category: "bat",
    tagTop: "DSC CRICKET",
    tagTopBn: "ডিএসসি ক্রিকেট",
    tagBottom: "BLU MIRAGE",
    tagBottomBn: "ব্লু মিরাজ",
    duration: "0:45",
    thumbnail: "https://i.ytimg.com/vi/wc386gFjhgQ/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "dsc-split-44-kashmir",
      slug: "dsc-split-44-kashmir",
      name: "DSC Split 44 Kashmir Willow Bat",
      nameBn: "ডিএসসি স্প্লিট ৪৪ কাশ্মীর উইলো ব্যাট",
      price: 2650,
      originalPrice: 3500,
      image: "/images/products/bats/dsc_bat.png",
      category: "Cricket Bats",
    },
  },
  // 9. Batting Pads
  {
    id: "short-pad-1",
    youtubeId: "WUTnIjxsIpo",
    title: "Lightweight Pro Batting Pads & Knee Wing Protection",
    titleBn: "লাইটওয়েট প্রো ব্যাটিং প্যাডস ও সেফটি রিভিউ",
    category: "pad",
    tagTop: "PLAYZONE",
    tagTopBn: "প্লেজোন",
    tagBottom: "PAD PROTECTION",
    tagBottomBn: "প্যাড প্রটেকশন",
    duration: "0:48",
    thumbnail: "https://i.ytimg.com/vi/WUTnIjxsIpo/hqdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "dsc-split-batting-pads",
      slug: "dsc-split-batting-pads",
      name: "DSC Split 44 Batting Pads",
      nameBn: "ডিএসসি স্প্লিট ৪৪ ব্যাটিং প্যাডস",
      price: 4600,
      originalPrice: 5800,
      image: "/images/products/batting_essentials/dsc_pads.png",
      category: "Batting Gear",
    },
  },
  // 10. MRF Genius Emperor VK Edition
  {
    id: "short-0K9Xgu-2Uvc",
    youtubeId: "0K9Xgu-2Uvc",
    title: "MRF Genius Emperor Virat Kohli Edition English Willow Bat",
    titleBn: "এমআরএফ জিনিয়াস এম্পেরর বিরাট কোহলি এডিশন ইংলিশ উইলো ব্যাট",
    category: "bat",
    tagTop: "MRF GENIUS",
    tagTopBn: "এমআরএফ জিনিয়াস",
    tagBottom: "VIRAT KOHLI",
    tagBottomBn: "বিরাট কোহলি",
    duration: "0:50",
    thumbnail: "https://i.ytimg.com/vi/0K9Xgu-2Uvc/maxresdefault.jpg",
    channelName: "@playzone.cricket",
    product: {
      id: "mrf-genius-grand-edition",
      slug: "mrf-genius-grand-edition",
      name: "MRF Genius Grand Edition Cricket Bat",
      nameBn: "এমআরএফ জিনিয়াস গ্র্যান্ড এডিশন ক্রিকেট ব্যাট",
      price: 9800,
      originalPrice: 14500,
      image: "/images/products/bats/mrf.png",
      category: "Cricket Bats",
    },
  },
];
