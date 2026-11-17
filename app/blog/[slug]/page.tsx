"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BlogArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  imageSrc: string;
  excerpt: string;
  content: {
    heading: string;
    body: string[];
    tips?: string[];
  }[];
  relatedProducts?: {
    name: string;
    href: string;
    badge: string;
  }[];
}

const ARTICLES_MAP: Record<string, BlogArticleData> = {
  "how-to-knock-in-english-willow-bat": {
    slug: "how-to-knock-in-english-willow-bat",
    title: "The Ultimate Guide: How to Properly Knock-in an English Willow Bat in Bangladesh",
    category: "Bat Care & Prep",
    readTime: "6 min read",
    date: "October 16, 2026",
    author: "Mahmudul Hasan",
    authorRole: "Master Bat-Maker, PLAYZONE Dhaka",
    imageSrc: "/images/products/bats/sg_bat.png",
    excerpt:
      "Why skipping the knocking-in process can ruin an expensive bat in your very first match. Learn the exact mallet techniques, oiling ratios, and pitch testing methods used by professionals.",
    content: [
      {
        heading: "1. Why New English Willow Must Be Knocked-in",
        body: [
          "English Willow (Salix alba caerulea) is naturally a fibrous, soft wood. While pressing at the factory compresses the main cleft, the outer edges, toe, and shoulder areas remain vulnerable to high-speed impact from 156-gram leather match balls.",
          "Knocking-in gradually compacts these delicate willow fibres, creating a resilient, spring-like outer layer that transfers maximum kinetic energy to the ball while preventing catastrophic cracks or denting.",
        ],
        tips: [
          "Never face a brand new leather ball straight out of the plastic wrap.",
          "Even bats marked 'Ready to Play' benefit from at least 5,000 gentle mallet taps on the edges and toe.",
        ],
      },
      {
        heading: "2. The Oiling Process (Raw Linseed Oil)",
        body: [
          "Before using a wooden knocking mallet, apply a teaspoon (about 5ml) of raw linseed oil to the face, edges, and toe of the blade. Spread evenly using a clean lint-free cloth or your fingertips.",
          "Do not oil the splice, handle, or stickers, as excess oil weakens the rubber glue bonds. Allow the bat to sit horizontally on its back for 24 hours to let the oil soak deep into the grain.",
        ],
      },
      {
        heading: "3. Striking Angles and Power Progression",
        body: [
          "Begin with a curved hardwood knocking mallet. Start at the sweet spot with moderate taps, listening for a clear, high-pitched ping. Gradually move towards the edges, striking at a 45-degree angle rather than directly perpendicular.",
          "Spend at least 45 minutes on each edge, gently rounding off sharp corners. Repeat the process across 3 to 4 days for a cumulative 15,000 to 20,000 strikes before introducing old leather balls in the nets.",
        ],
      },
      {
        heading: "4. Extratec Anti-Scuff Sheet & Toe Guard Protection",
        body: [
          "Once knocking is complete, apply a clear Extratec scuff sheet and edge tape. In Bangladesh's humid monsoon and dry dusty winter pitches, scuff sheets act as a vital moisture barrier, preserving bat longevity for multiple seasons.",
        ],
      },
    ],
    relatedProducts: [
      {
        name: "English Willow Bat Care & Knocking Combo",
        href: "/product/master-bat-knocking-combo",
        badge: "Essential Kit",
      },
      {
        name: "SG Savage Edition English Willow Bat",
        href: "/product/sg-savage-english-willow",
        badge: "Grade 2 Willow",
      },
    ],
  },
  "choosing-cricket-spikes-for-turf-and-matting": {
    slug: "choosing-cricket-spikes-for-turf-and-matting",
    title: "Metal Spikes vs. Rubber Studs: Which Cricket Shoes Are Best for Bangladeshi Grounds?",
    category: "Gear Advice",
    readTime: "5 min read",
    date: "October 10, 2026",
    author: "Shakib Al-Amin",
    authorRole: "Senior Equipment Analyst",
    imageSrc: "/images/products/shoes_bags/adidas_spikes.png",
    excerpt:
      "A complete breakdown of traction, knee impact, and outsole durability across Dhaka, Chittagong, and Sylhet pitch conditions.",
    content: [
      {
        heading: "1. The Diverse Ground Conditions in Bangladesh",
        body: [
          "Cricket in Bangladesh is played across vastly differing terrains: from international-standard bermuda grass turfs at Mirpur Sher-e-Bangla and Sylhet International, to hard coir matting and baked clay wickets in divisional district leagues.",
          "Wearing the wrong footwear can lead to severe ankle sprains, heel bruising, and stress fractures in fast bowlers' landing legs.",
        ],
      },
      {
        heading: "2. When to Choose Full Metal Spikes",
        body: [
          "Full metal spikes (typically 7 forefoot pins and 4 heel pins) are strictly designed for natural turf wickets and lush outfield grass. They dig deep into the turf, preventing slipping during aggressive bowling strides and sudden turns while running between wickets.",
          "Never wear metal spikes on concrete nets or coir matting — the metal cannot penetrate the hard surface, creating dangerous ankle rolls and premature joint impact.",
        ],
        tips: [
          "Keep spare steel and nylon replacement studs in your kit bag.",
          "Clean mud out of spike threads after dewy winter morning matches.",
        ],
      },
      {
        heading: "3. The Advantage of Multi-Lug Rubber Studs",
        body: [
          "For astroturf pitches, indoor facilities, and coir matting on hard soil, multi-lug rubber turf shoes are superior. They distribute impact shock evenly across the entire foot, drastically reducing knee and lower-back fatigue.",
        ],
      },
    ],
    relatedProducts: [
      {
        name: "Adidas 22YDS Metal Bowling Spikes",
        href: "/product/adidas-22yds-bowling-spikes",
        badge: "Pro Spikes",
      },
      {
        name: "New Balance CK4020 Turf Spikes",
        href: "/product/nb-ck4020-preowned",
        badge: "Turf Multi-Stud",
      },
    ],
  },
  "pre-owned-cricket-bats-guide": {
    slug: "pre-owned-cricket-bats-guide",
    title: "How to Buy a Pre-Owned English Willow Bat with Confidence",
    category: "Smart Buying",
    readTime: "4 min read",
    date: "October 04, 2026",
    author: "Tanvir Ahmed",
    authorRole: "First-Class Cricketer & Gear Consultant",
    imageSrc: "/images/products/bats/ss_ton.png",
    excerpt:
      "Get test-grade willow at 50% of the retail price. How PLAYZONE evaluates handle flex, acoustic ping, and condition grading standards.",
    content: [
      {
        heading: "1. The Value of Seasoned Match Willow",
        body: [
          "A brand new English Willow bat requires weeks of knocking-in before reaching peak performance. In contrast, a certified Grade A pre-owned bat has already been match-seasoned — the willow fibres are fully compacted, delivering instant rebound and unmatched hitting punch.",
          "You can frequently purchase a top-tier Grade 1 cleft from elite makers like SS, MRF, or Kookaburra for 40% to 50% less than retail price.",
        ],
      },
      {
        heading: "2. The 4-Point PLAYZONE Inspection Standard",
        body: [
          "When inspecting a pre-owned bat, focus on the splice joint, handle cane flex, toe integrity, and acoustic ping across the blade.",
          "At PLAYZONE, our certified bat-makers inspect every cleft using ultrasound density checks, ensuring zero internal fractures or dry-rot beneath the surface.",
        ],
        tips: [
          "Grade A: Pristine cleft, zero structural repairs, 90%+ ping life remaining.",
          "Grade B: Minor surface scuffs or toe guard replacements, fully match-ready.",
        ],
      },
    ],
    relatedProducts: [
      {
        name: "MRF Grand Edition Pre-Owned Bat",
        href: "/product/mrf-grand-edition-preowned",
        badge: "Grade A Certified",
      },
      {
        name: "Kookaburra Kahuna Pro Pre-Owned",
        href: "/product/kookaburra-kahuna-preowned",
        badge: "Grade A Certified",
      },
    ],
  },
  "mastering-the-sidearm-throwdown": {
    slug: "mastering-the-sidearm-throwdown",
    title: "How to Train with a Sidearm Thrower to Counter 140+ km/h Pace",
    category: "Coaching & Drills",
    readTime: "7 min read",
    date: "September 26, 2026",
    author: "Coach M. Rahman",
    authorRole: "BCB Level 3 Coach",
    imageSrc: "/images/experts/sidearm_thrower.png",
    excerpt:
      "Modern batting demands fast hand speed. Here is how academy batsmen are using throwdown specialists to sharpen their back-foot defense and pull shots.",
    content: [
      {
        heading: "1. The Modern Need for Express Pace Training",
        body: [
          "In modern international and franchise cricket, top pacers routinely bowl in excess of 140 km/h with steep bounce. Standard net bowlers tire quickly, struggling to maintain pace and relentless accuracy across extended sessions.",
          "Sidearm ball throwers replicate 145+ km/h speeds effortlessly from 18 yards, allowing batsmen to develop lightning-fast reaction times and confident back-foot trigger movements.",
        ],
      },
      {
        heading: "2. Structured Drills for Back-Foot Mastery",
        body: [
          "Begin with short-length deliveries aimed at the chest and helmet ribcage. Focus on keeping the head still, weight forward, and executing controlled roll-wrist pulls into the ground.",
          "Gradually introduce rapid yorker drills at 135 km/h to sharpen bat-speed and toe-defense under pressure.",
        ],
      },
    ],
    relatedProducts: [
      {
        name: "PLAYZONE Complete Batting Protection Combo",
        href: "/product/batting-protection-master-combo",
        badge: "Test Standard",
      },
      {
        name: "Regulation 4-Piece Match Balls (Box of 6)",
        href: "/product/leather-match-balls-pack-6",
        badge: "Leather Balls",
      },
    ],
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const slug = (params?.slug as string) || "";

  const article = useMemo(() => {
    if (ARTICLES_MAP[slug]) return ARTICLES_MAP[slug];

    // Fallback article generator for any slug
    const humanTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      slug,
      title: humanTitle || "Cricket Gear Insights & Master Guides",
      category: "Cricket Equipment",
      readTime: "5 min read",
      date: "2026 Season",
      author: "PLAYZONE Editorial Team",
      authorRole: "Cricket Equipment Specialists",
      imageSrc: "/images/products/bats/sg_bat.png",
      excerpt:
        "Professional cricket advice, gear maintenance techniques, and performance guides from PLAYZONE.",
      content: [
        {
          heading: "Mastering Your Cricket Performance",
          body: [
            "Cricket equipment is an investment in your safety and performance. Choosing authentic gear tested for subcontinental wicket bounce ensures durability and supreme confidence at the crease.",
            "Explore PLAYZONE's extensive collection of handcrafted English Willow bats, protective batting gear, and certified pre-owned equipment.",
          ],
        },
      ],
      relatedProducts: [
        {
          name: "SG Savage Edition English Willow Bat",
          href: "/product/sg-savage-english-willow",
          badge: "Featured Bat",
        },
      ],
    };
  }, [slug]);

  return (
    <main className="min-h-screen bg-white pb-20 select-none">
      {/* Article Header & Breadcrumbs */}
      <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            {t("Home", "হোম")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link href="/blog" className="hover:text-zinc-900 transition-colors">
            {t("Blog & Advice", "ব্লগ ও গাইড")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-900 font-semibold truncate max-w-[220px]">
            {article.category}
          </span>
        </nav>

        {/* Category Pill & Title */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-zinc-950 text-[#84cc16] text-xs font-black uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author Meta */}
          <div className="flex items-center justify-between py-4 border-y border-zinc-100 flex-wrap gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-zinc-900 text-sm border border-zinc-200">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-zinc-900 text-sm">
                  {article.author}
                </p>
                <p className="text-[11px] text-zinc-400">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-100 my-8 shadow-sm border border-zinc-100">
          <Image
            src={article.imageSrc}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 960px"
            className="object-contain p-8"
          />
        </div>

        {/* Excerpt Lead Paragraph */}
        <div className="bg-lime-50/70 border-l-4 border-[#84cc16] rounded-r-2xl p-4 sm:p-6 mb-8 text-sm sm:text-base text-zinc-800 font-medium leading-relaxed">
          {article.excerpt}
        </div>

        {/* Article Body Content */}
        <article className="space-y-8 text-zinc-700 leading-relaxed text-sm sm:text-base">
          {article.content.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                {section.heading}
              </h2>
              {section.body.map((para, pIdx) => (
                <p key={pIdx} className="text-zinc-600 leading-relaxed">
                  {para}
                </p>
              ))}

              {section.tips && section.tips.length > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#84cc16]" />
                    <span>{t("Pro Tips from Experts", "বিশেষজ্ঞের পরামর্শ")}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 pl-4 list-disc">
                    {section.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* Related Recommended Equipment CTAs */}
        {article.relatedProducts && article.relatedProducts.length > 0 && (
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-zinc-950 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84cc16]">
                  {t("Recommended Gear", "প্রস্তাবিত ক্রিকেট গিয়ার")}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {t("Gear Mentioned in this Article", "এই আর্টিকেলে উল্লিখিত সরঞ্জাম")}
                </h3>
              </div>
              <ShoppingBag className="w-6 h-6 text-[#84cc16]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {article.relatedProducts.map((prod, pIdx) => (
                <Link
                  key={pIdx}
                  href={prod.href}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-[#84cc16] transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#84cc16]">
                      {prod.badge}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#a3e635] transition-colors truncate max-w-[200px]">
                      {prod.name}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#84cc16] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Back to Blog */}
        <div className="mt-12 pt-6 border-t border-zinc-200 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("Back to All Articles", "সব আর্টিকেলে ফিরে যান")}</span>
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-black text-[#549900] hover:underline"
          >
            <span>{t("Explore Cricket Shop", "ক্রিকেট শপ দেখুন")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
