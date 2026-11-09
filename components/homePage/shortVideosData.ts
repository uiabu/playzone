export type ShortCategory =
  | "all"
  | "bat"
  | "ball"
  | "gloves"
  | "helmet"
  | "pad"
  | "shoe"
  | "tips";

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
  // 1. User provided: Kookaburra Pro 4.0 Bat Unboxing & Ping Test
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
  },
  // 7. User provided: Kookaburra Kahuna Pro Players Replica
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
  },
  // 8. User provided: DSC BLU MIRAGE
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
  },
];
