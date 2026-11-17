export interface ProductReview {
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  location: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductExtraService {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  viewsCount?: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  sizes?: string[];
  weights?: string[];
  colors?: string[];
  extraServices?: ProductExtraService[];
  condition?: "new" | "pre-owned";
  conditionGrade?: string;
  warranty: string;
  deliveryDaysDhaka: string;
  deliveryDaysNationwide: string;
  videoUrl?: string;
  reviews: ProductReview[];
}

export function isPreOwnedProduct(product: Product): boolean {
  return product.condition === "pre-owned" || (product.badge?.toUpperCase().includes("PRE-OWNED") ?? false);
}

export const ALL_PRODUCTS: Product[] = [
  // ==================== BATS ====================
  {
    id: "sg-savage-english-willow",
    slug: "sg-savage-english-willow",
    name: "SG Savage Edition English Willow Bat",
    brand: "SG Cricket",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 124,
    inStock: true,
    stockCount: 8,
    images: ["/images/products/bats/sg_bat.png"],
    shortDescription:
      "Handcrafted from premium Grade 2 English Willow. Engineered with an enlarged mid-to-low sweet spot for aggressive stroke play on Asian pitches.",
    description:
      "The SG Savage Edition English Willow Bat is sculpted for dynamic batsmen who like to dominate the bowler from ball one. Specially pressed to deliver maximum rebound with minimal vibration, each cleft features 6-8 straight grains and clean edge profiles. Complete with a 12-piece Sarawak cane handle for supreme shock absorption and effortless pick-up.",
    highlights: [
      "Grade 2 Hand-Selected English Willow",
      "Massive 38-40mm edge profile for maximum power transfer",
      "Mid-to-low sweet spot optimized for subcontinental bounce",
      "12-piece imported Sarawak cane round handle",
      "Fitted with durable toe guard and chevron textured grip",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 2 English Willow" },
      { label: "Grains", value: "6 - 8 Straight Grains" },
      { label: "Edge Profile", value: "39mm - 41mm" },
      { label: "Spine Profile", value: "64mm with slight concaving" },
      { label: "Sweet Spot", value: "Mid-to-Low Profile" },
      { label: "Handle Type", value: "12-Piece Sarawak Cane (Semi-Oval)" },
      { label: "Toe Protection", value: "Factory-fitted rubber toe guard" },
      { label: "Finish", value: "Natural, lightly oiled" },
      { label: "Origin", value: "Meerut, India" },
    ],
    sizes: ["Short Handle (SH)", "Long Handle (LH)", "Harrow"],
    weights: ["2.7 lbs (Light / 1120g)", "2.8 lbs (Medium / 1150g)", "2.9 lbs (Power / 1180g)"],
    extraServices: [
      { id: "machine-knocking", label: "Professional Machine Knocking (15,000 Strikes)", price: 600 },
      { id: "scuff-sheet", label: "Heavy Duty Extratec Scuff Sheet & Edge Tape", price: 250 },
      { id: "full-prep", label: "Ready-to-Play Combo (Knocking + Oiling + Anti-Scuff Sheet)", price: 800 },
    ],
    warranty: "1 Year Official Brand Warranty on Handle",
    deliveryDaysDhaka: "24 Hours (Express Delivery Available)",
    deliveryDaysNationwide: "2 - 3 Days via Steadfast / RedX Courier",
    videoUrl: "https://www.youtube.com/watch?v=kYJzX2eQZrs",
    reviews: [
      {
        author: "Rahim Al-Hasan",
        verified: true,
        rating: 5,
        date: "October 14, 2026",
        title: "Tremendous punch and feather-light pick up!",
        comment: "Ordered this bat for our Dhaka First Division league. The balance is unbelievable. The sound of the ball coming off the mid-blade is like a gunshot. PLAYZONE delivered in 24 hours.",
        location: "Dhanmondi, Dhaka",
      },
      {
        author: "Mahmudul Haque",
        verified: true,
        rating: 4.8,
        date: "September 28, 2026",
        title: "Worth every penny for serious cricketers",
        comment: "Got the machine-knocking add-on, played in the nets the following weekend. Clean ping, pinged 8 sixes in my first match. Great quality willow.",
        location: "Mirpur, Dhaka",
      },
      {
        author: "Nazmul Karim",
        verified: true,
        rating: 4.5,
        date: "September 12, 2026",
        title: "Authentic SG bat with authentic holographic seal",
        comment: "Checked the scratch code on SG's app and it confirmed 100% genuine. Excellent customer care service from PLAYZONE team.",
        location: "Chittagong",
      },
    ],
  },
  {
    id: "kookaburra-aura-pro",
    slug: "kookaburra-aura-pro",
    name: "Kookaburra Aura Pro English Willow Bat",
    brand: "Kookaburra",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 7200,
    originalPrice: 8900,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 189,
    inStock: true,
    stockCount: 12,
    images: ["/images/products/bats/kookaburra_bat.png"],
    shortDescription:
      "Signature Australian profile designed for all-round 360-degree stroke-play. Features a high spine and sweeping spine contour for rapid bat speed.",
    description:
      "Crafted in accordance with Kookaburra's world-renowned Australian standards, the Aura Pro combines cutting-edge aesthetic styling with traditional unbleached English Willow craftsmanship. The flat-face profile maximizes the contact area, while the tapered toe ensures rapid bat speed through the hitting arc.",
    highlights: [
      "Grade 3 Unbleached English Willow",
      "Dynamic power drive handle for superior vibration damping",
      "Extended sweet spot stretching through the middle blade",
      "Lightweight feel with an aerodynamic bow",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 3 English Willow" },
      { label: "Edge Thickness", value: "37mm - 39mm" },
      { label: "Sweet Spot", value: "Mid Profile (215mm to 235mm from toe)" },
      { label: "Handle Type", value: "Round 12-Piece Cane" },
      { label: "Face Profile", value: "Flat 'Dynamic Power' Face" },
      { label: "Origin", value: "Australia / India" },
    ],
    sizes: ["Short Handle (SH)", "Harrow", "Size 6"],
    weights: ["2.7 lbs (1130g)", "2.8 lbs (1160g)"],
    extraServices: [
      { id: "machine-knocking", label: "Professional Machine Knocking", price: 600 },
      { id: "scuff-sheet", label: "Clear Face Scuff Guard", price: 200 },
    ],
    warranty: "1 Year Manufacturer Handle Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    videoUrl: "https://www.youtube.com/watch?v=1x9iX5-sZ78",
    reviews: [
      {
        author: "Tanvir S.",
        verified: true,
        rating: 5,
        date: "October 10, 2026",
        title: "Kookaburra never disappoints!",
        comment: "Incredible balance. Drives on both front and back foot feel effortless. Fast delivery to Uttara.",
        location: "Uttara, Dhaka",
      },
    ],
  },
  {
    id: "mrf-genius-grand-edition",
    slug: "mrf-genius-grand-edition",
    name: "MRF Genius Grand Edition Cricket Bat",
    brand: "MRF",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 9800,
    originalPrice: 12000,
    discountPercent: 18,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stockCount: 5,
    images: ["/images/products/bats/mrf.png"],
    shortDescription:
      "Endorsed by international batting maestros. Precision-pressed Grade 1 English willow designed for elite match performance.",
    description:
      "The MRF Genius Grand Edition is modeled after Virat Kohli's match-spec bat. Crafted from the absolute top 5% of English Willow clefts, it boasts 8 to 11 razor-straight grains, huge 40mm contoured edges, and a thick spine that guarantees effortless clearance of boundary ropes.",
    highlights: [
      "Grade 1+ Elite Hand-Selected English Willow",
      "Huge 40mm edges with substantial power swell",
      "Pristine straight grains with zero blemishes",
      "Custom MRF 3D embossed metallic stickers",
      "Premium padded MRF full-length bat cover included",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 1 English Willow" },
      { label: "Grains", value: "8 - 11 Straight Grains" },
      { label: "Edge Profile", value: "40mm - 42mm" },
      { label: "Sweet Spot", value: "Mid Sweet Spot for all-round dominance" },
      { label: "Handle Type", value: "Multi-piece Chevron Cane" },
      { label: "Origin", value: "India" },
    ],
    sizes: ["Short Handle (SH)", "Long Handle (LH)"],
    weights: ["2.75 lbs (1145g)", "2.85 lbs (1175g)"],
    extraServices: [
      { id: "full-prep", label: "Ready-to-Play Knocking & Oiling Package", price: 800 },
    ],
    warranty: "1 Year Official Brand Warranty",
    deliveryDaysDhaka: "Same Day / 24h Express",
    deliveryDaysNationwide: "48 Hours Nationwide",
    reviews: [
      {
        author: "Fahim Shahriar",
        verified: true,
        rating: 5,
        date: "October 02, 2026",
        title: "Pure masterclass bat!",
        comment: "This is easily the highest quality bat I have held in Bangladesh. Clean grains, insane ping, and the ping test with an old leather ball was unbelievable.",
        location: "Gulshan, Dhaka",
      },
    ],
  },
  {
    id: "ss-ton-reserve-edition",
    slug: "ss-ton-reserve-edition",
    name: "SS TON Reserve Edition Cricket Bat",
    brand: "SS Sunridges",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 4800,
    originalPrice: 8500,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    condition: "pre-owned",
    conditionGrade: "Grade A",
    rating: 4.6,
    reviewsCount: 98,
    inStock: true,
    stockCount: 3,
    images: ["/images/products/bats/ss_ton.png"],
    shortDescription:
      "Pre-owned Grade A English Willow bat. Seasoned, re-gripped, and pitch-ready at unbeatable value. Sold directly by PLAYZONE as-is.",
    description:
      "This SS TON Reserve Edition is part of PLAYZONE's Pre-Owned collection. Visually inspected for structural integrity: zero handle cracks, solid toe integrity, lightly sanded and fitted with brand-new grip and protective face sheet. Sold as-is without warranty.",
    highlights: [
      "Pre-Owned Grade A Condition (9/10)",
      "100% genuine English Willow - seasoned and match ready",
      "Brand new grip and toe guard fitted",
      "Sold as-is directly by PLAYZONE (No Warranty)",
    ],
    specs: [
      { label: "Condition", value: "Pre-Owned (Grade A - 9/10)" },
      { label: "Willow Type", value: "English Willow" },
      { label: "Sweet Spot", value: "Mid to Low Profile" },
      { label: "Edge Profile", value: "38mm" },
      { label: "Knocking Status", value: "Seasoned" },
      { label: "Warranty Notice", value: "Sold as-is without warranty" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.8 lbs (1160g)"],
    warranty: "No Warranty (Pre-Owned Gear Sold As-Is)",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [
      {
        author: "Imtiaz Hossain",
        verified: true,
        rating: 5,
        date: "October 11, 2026",
        title: "Unbelievable deal for a pre-owned English bat",
        comment: "Looked almost like new. Bat has already played 2 corporate matches and scored 47 and 62*. Great service from PLAYZONE pre-owned gear.",
        location: "Banani, Dhaka",
      },
    ],
  },
  {
    id: "gm-diamond-limited-edition",
    slug: "gm-diamond-limited-edition",
    name: "GM Diamond Limited Edition Cricket Bat",
    brand: "Gunn & Moore",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 7900,
    originalPrice: 9500,
    discountPercent: 17,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 76,
    inStock: true,
    stockCount: 6,
    images: ["/images/products/bats/gm_bat.png"],
    shortDescription:
      "Engineered in Nottingham, England. Shortened L540 blade design for dynamic stroke acceleration and unmatched pick-up balance.",
    description:
      "The GM Diamond Limited Edition, developed in collaboration with England test captain Ben Stokes, features a shortened L540 blade for enhanced sweet spot concentration and swift pick-up. Fitted with GM's renowned DriGuard moisture barrier toe finish.",
    highlights: [
      "Engineered by Gunn & Moore England",
      "Shortened L540 blade profile for rapid bat speed",
      "Powerarc bowed face and substantial F4.5 face profile",
      "Fitted with GM Hex grip for firm traction",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 2 English Willow" },
      { label: "Blade Length", value: "L540 Blade (Slightly Shortened)" },
      { label: "Handle Length", value: "310mm Standard Handle" },
      { label: "Sweet Spot", value: "Mid Sweet Spot" },
      { label: "Toe Protection", value: "GM DriGuard Factory Applied" },
    ],
    sizes: ["Short Handle (SH)", "Harrow"],
    weights: ["2.7 lbs", "2.8 lbs"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [
      {
        author: "Zubair Ahmed",
        verified: true,
        rating: 4.8,
        date: "September 19, 2026",
        title: "The pick up on this bat is incredible",
        comment: "Feels like 2.6 in the hands even though it weighs 2.8 lbs. True GM engineering.",
        location: "Sylhet",
      },
    ],
  },
  {
    id: "gray-nicolls-nova-players",
    slug: "gray-nicolls-nova-players",
    name: "Gray-Nicolls Nova Players Cricket Bat",
    brand: "Gray-Nicolls",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 6500,
    originalPrice: 8200,
    discountPercent: 21,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 64,
    inStock: true,
    stockCount: 7,
    images: ["/images/products/bats/gr_bat.png"],
    shortDescription:
      "Iconic English bat with feathered spine profile and powercurve face. Crafted for shotmakers who excel in touch play and punchy drives.",
    description:
      "The Nova Players brings Gray-Nicolls' 160-year heritage of bat making to life. Features sweeping spine curves that redistribute weight across the blade for an effortless pick-up, coupled with a generous mid-blade swell.",
    highlights: [
      "Handcrafted English Willow",
      "Powercurve face enhances feel on off-center strikes",
      "Signature classic Gray-Nicolls silver and teal branding",
      "Laser-etched holographic authenticity sticker",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 3 English Willow" },
      { label: "Sweet Spot", value: "Mid Profile" },
      { label: "Edges", value: "36mm - 38mm" },
      { label: "Handle", value: "Finest 12 Piece Cane" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.75 lbs", "2.85 lbs"],
    warranty: "1 Year Manufacturer Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "ceat-special-master",
    slug: "ceat-special-master",
    name: "CEAT Special Master English Willow Bat",
    brand: "CEAT",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 6200,
    originalPrice: 7800,
    discountPercent: 20,
    badge: "NEW",
    rating: 4.5,
    reviewsCount: 88,
    inStock: true,
    stockCount: 9,
    images: ["/images/products/bats/ceat_ton.png"],
    shortDescription:
      "Engineered for heavy ball impact and thick edges. Endorsed by top opening batsmen for rock-solid boundary clearing.",
    description:
      "Crafted with robust edges and a prominent spine, the CEAT Special Master is built to withstand high-velocity leather cricket balls without losing shape or energy transfer.",
    highlights: [
      "Air-dried English Willow",
      "Thick contoured 39mm edges",
      "Specially designed scale grip for superior control",
    ],
    specs: [
      { label: "Willow Grade", value: "Selected English Willow" },
      { label: "Edge Size", value: "38mm - 40mm" },
      { label: "Sweet Spot", value: "Mid-to-Low" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.8 lbs"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sf-stanford-players-edition",
    slug: "sf-stanford-players-edition",
    name: "SF Stanford Players Edition Cricket Bat",
    brand: "SF Stanford",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 3600,
    originalPrice: 6500,
    discountPercent: 45,
    badge: "PRE-OWNED - GRADE A",
    condition: "pre-owned",
    conditionGrade: "Grade A",
    rating: 4.5,
    reviewsCount: 52,
    inStock: true,
    stockCount: 2,
    images: ["/images/products/bats/sf_bat.png"],
    shortDescription:
      "Pre-owned Grade A English willow with strong rebound response. Serviced by PLAYZONE and sold as-is.",
    description:
      "An exceptional value English Willow bat from SF Stanford's Players range. Fitted with toe guard, clean grip, and protective face sheet. Sold as-is without warranty.",
    highlights: [
      "Pre-Owned Grade A Condition",
      "Naturally aged English willow with dynamic ping",
      "Sold as-is directly by PLAYZONE (No Warranty)",
    ],
    specs: [
      { label: "Condition", value: "Pre-Owned Grade A" },
      { label: "Willow", value: "English Willow" },
      { label: "Weight", value: "2.8 lbs" },
      { label: "Warranty Notice", value: "Sold as-is without warranty" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.8 lbs"],
    warranty: "No Warranty (Pre-Owned Gear Sold As-Is)",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "dsc-split-44-kashmir",
    slug: "dsc-split-44-kashmir",
    name: "DSC Split 44 Kashmir Willow Bat",
    brand: "DSC",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 2650,
    originalPrice: 3200,
    discountPercent: 17,
    badge: "NEW",
    rating: 4.4,
    reviewsCount: 86,
    inStock: true,
    stockCount: 15,
    images: ["/images/products/bats/dsc_bat.png"],
    shortDescription:
      "Top grade Kashmir Willow bat crafted with modern profile edges. Ideal for club matches, tape-ball, and academy practice.",
    description:
      "The DSC Split 44 delivers massive power at an affordable price. Made from air-dried Kashmir Willow, it features a pronounced bow and heavy edges that offer supreme resilience for hard-hitting batsmen.",
    highlights: [
      "Handcrafted Grade 1 Kashmir Willow",
      "Thick edges and full profile spine",
      "Comfortable treble spring cane handle",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 1 Kashmir Willow" },
      { label: "Edges", value: "36mm - 38mm" },
      { label: "Sweet Spot", value: "Mid Sweet Spot" },
    ],
    sizes: ["Short Handle (SH)", "Size 6", "Size 5"],
    weights: ["2.8 lbs", "2.9 lbs"],
    warranty: "6 Months Handle Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "mb-malik-boom-kashmir",
    slug: "mb-malik-boom-kashmir",
    name: "MB Malik Boom Kashmir Willow Bat",
    brand: "MB Malik",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 2200,
    originalPrice: 2800,
    discountPercent: 21,
    badge: "NEW",
    rating: 4.3,
    reviewsCount: 72,
    inStock: true,
    stockCount: 14,
    images: ["/images/products/bats/mb_bat.png"],
    shortDescription:
      "Renowned powerhouse bat for tape ball and leather ball tournaments. Massive sweet spot engineered for long boundary sixes.",
    description:
      "Engineered in Sialkot, the MB Malik Boom is world-famous among tournament and power hitters. Features curved blade architecture with maximum meat behind the sweet spot.",
    highlights: [
      "Hardened Kashmir Willow",
      "Power sweep profile for maximum elevation",
      "Double rubber cushioned cane handle",
    ],
    specs: [
      { label: "Willow Type", value: "Kashmir Willow" },
      { label: "Edges", value: "39mm" },
      { label: "Play Style", value: "Power Hitting / T20" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.8 lbs", "2.9 lbs"],
    warranty: "6 Months Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "mks-limited-edition-kashmir",
    slug: "mks-limited-edition-kashmir",
    name: "MKS Limited Edition Kashmir Willow Bat",
    brand: "MKS",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 1950,
    originalPrice: 2500,
    discountPercent: 22,
    badge: "NEW",
    rating: 4.2,
    reviewsCount: 49,
    inStock: true,
    stockCount: 20,
    images: ["/images/products/bats/mks.png"],
    shortDescription:
      "Reliable and budget-friendly Kashmir Willow bat. Great pick for beginners, casual tournaments, and daily academy training.",
    description:
      "The MKS Limited Edition delivers solid durability and balanced weight distribution for players honing their batting skills without breaking the bank.",
    highlights: [
      "Selected Kashmir Willow",
      "Full cane handle for shock absorption",
      "Protective toe guard included",
    ],
    specs: [
      { label: "Willow Type", value: "Kashmir Willow" },
      { label: "Edge Profile", value: "35mm" },
      { label: "Sweet Spot", value: "Mid" },
    ],
    sizes: ["Short Handle (SH)", "Size 6"],
    weights: ["2.8 lbs"],
    warranty: "3 Months Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },

  // ==================== BATTING ESSENTIALS ====================
  {
    id: "sg-test-batting-gloves",
    slug: "sg-test-batting-gloves",
    name: "SG Test Batting Gloves",
    brand: "SG Cricket",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 3200,
    originalPrice: 3900,
    discountPercent: 18,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 110,
    inStock: true,
    stockCount: 14,
    images: ["/images/products/batting_essentials/sg_gloves.png"],
    shortDescription:
      "International test match grade protection. Features premium sheep leather palm and high-density multi-split finger rolls.",
    description:
      "The SG Test Batting Gloves are chosen by professional batsmen across the world. Fitted with ultra-soft Pittards sheep leather for sublime grip and moisture management. Each finger features high-density EVA foam layered with thermoplastic polyurethane inserts for maximum impact dispersion against 140+ km/h pace bowling.",
    highlights: [
      "Premium imported sheep leather palm with reinforcement patches",
      "Multi-split finger sausage design for supreme flexibility and grip",
      "Thermoplastic fiber shells on leading two fingers of bottom hand",
      "Airflow mesh gussets for rapid heat dissipation",
      "Towel wristband with secure velcro fastener",
    ],
    specs: [
      { label: "Protection Level", value: "Test Match Level 5" },
      { label: "Palm Material", value: "Full Grain Sheep Leather" },
      { label: "Finger Construction", value: "Multi-Split Sausage with TPU Inserts" },
      { label: "Side Protection", value: "Three-piece side bar on bottom hand" },
      { label: "Thumb Design", value: "Two-piece flexible thumb guard" },
      { label: "Ventilation", value: "Double-sided airflow mesh" },
    ],
    sizes: ["Adult Men (RH)", "Adult Men (LH)", "Youth"],
    warranty: "6 Months Manufacturer Warranty",
    deliveryDaysDhaka: "24 Hours Delivery",
    deliveryDaysNationwide: "2 - 3 Days Nationwide",
    reviews: [
      {
        author: "Shafiqul Islam",
        verified: true,
        rating: 5,
        date: "October 07, 2026",
        title: "Hands down the best gloves I've used",
        comment: "Took a nasty blow on the thumb last weekend against a quick bowler and felt zero pain. Palm is very soft and supple.",
        location: "Mohammadpur, Dhaka",
      },
    ],
  },
  {
    id: "dsc-split-batting-pads",
    slug: "dsc-split-batting-pads",
    name: "DSC Split 44 Batting Pads",
    brand: "DSC",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 4600,
    originalPrice: 5500,
    discountPercent: 16,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 94,
    inStock: true,
    stockCount: 10,
    images: ["/images/products/batting_essentials/dsc_pads.png"],
    shortDescription:
      "Ultra-lightweight cane and high-density foam legguards. Offers wrap-around knee bolsters and padded shin wings.",
    description:
      "The DSC Split 44 Batting Pads deliver premier protection without restricting footwork. Traditional 7-cane rib structure reinforced with modern HD foam wings and a sculpted 3-piece knee cup.",
    highlights: [
      "Traditional cane and lightweight HD foam hybrid",
      "Contoured knee locator lined with moisture-wicking fleece",
      "Wide 50mm padded calf straps for zero-slippage fit",
      "Durable PU facing with wipe-clean surface",
    ],
    specs: [
      { label: "Protection Grade", value: "Pro Level 4" },
      { label: "Facing Material", value: "Premium Polyurethane (PU)" },
      { label: "Shin Bolster", value: "Tri-Layer HD Foam" },
      { label: "Knee Protection", value: "Contoured 3-Piece Cup with Gel Insert" },
      { label: "Straps", value: "Padded 50mm Calf & Ankle Straps" },
    ],
    sizes: ["Men's Adult", "Youth", "Small Adult"],
    warranty: "6 Months Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "gray-nicolls-elite-helmet",
    slug: "gray-nicolls-elite-helmet",
    name: "Gray-Nicolls Elite Cricket Helmet",
    brand: "Gray-Nicolls",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 3600,
    originalPrice: 6200,
    discountPercent: 42,
    badge: "PRE-OWNED - GRADE A",
    condition: "pre-owned",
    conditionGrade: "Grade A",
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/batting_essentials/gray_nicolls_helmet.png"],
    shortDescription:
      "Pre-owned Grade A cricket helmet with steel grille and EPS liner. Note: Sold as-is without warranty.",
    description:
      "Pre-owned cricket helmet in Grade A cosmetic condition. Cleaned and sanitized. Note: Pre-owned helmets are sold as-is without warranty or safety certification claims; players must independently check sizing, condition, and fit prior to match play.",
    highlights: [
      "Pre-Owned Grade A cosmetic condition",
      "Steel face grille with chin cup",
      "Rear dial micro-adjustment system for custom fit",
      "Sold as-is without safety warranty",
    ],
    specs: [
      { label: "Condition", value: "Pre-Owned (Grade A)" },
      { label: "Shell Material", value: "High-Impact ABS Polymer" },
      { label: "Grille Material", value: "Reinforced Steel" },
      { label: "Important Policy", value: "Sold as-is without safety warranty; verify fit before match play" },
    ],
    sizes: ["Medium (57-58cm)", "Large (59-60cm)"],
    warranty: "No Warranty (Pre-Owned Gear Sold As-Is)",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "gray-nicolls-thigh-guard",
    slug: "gray-nicolls-thigh-guard",
    name: "Gray-Nicolls All-in-One Thigh Guard",
    brand: "Gray-Nicolls",
    category: "Protection",
    categorySlug: "batting",
    price: 1800,
    originalPrice: 3200,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    condition: "pre-owned",
    conditionGrade: "Grade A",
    rating: 4.6,
    reviewsCount: 72,
    inStock: true,
    stockCount: 6,
    images: ["/images/products/batting_essentials/gray_nicolls_thigh_guard_upscaled.png"],
    shortDescription:
      "Dual thigh protection with articulated inner thigh pad and breathable elastic waistband.",
    description:
      "All-in-one combination combo pad protecting both front and inner thighs. Pre-owned Grade A, fully washed and sanitized with clean velcro straps. Sold as-is directly by PLAYZONE.",
    highlights: [
      "Integrated front and inner thigh protection",
      "High-density molded EVA foam with poly shell inserts",
      "Elasticated waistband with double-lock velcro",
      "Sold as-is without warranty",
    ],
    specs: [
      { label: "Condition", value: "Pre-Owned (Grade A)" },
      { label: "Type", value: "All-in-One Combo Thigh Guard" },
      { label: "Material", value: "Molded HD EVA Foam" },
      { label: "Warranty Notice", value: "Sold as-is without warranty" },
    ],
    sizes: ["Senior Adult", "Youth"],
    warranty: "No Warranty (Pre-Owned Gear Sold As-Is)",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "new-balance-tc-batting-pads",
    slug: "new-balance-tc-batting-pads",
    name: "New Balance TC 1260 Batting Pads",
    brand: "New Balance",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 2900,
    originalPrice: 5200,
    discountPercent: 44,
    badge: "PRE-OWNED - GRADE A",
    condition: "pre-owned",
    conditionGrade: "Grade A",
    rating: 4.8,
    reviewsCount: 86,
    inStock: true,
    stockCount: 4,
    images: ["/images/products/batting_essentials/new_balance_pads.png"],
    shortDescription:
      "Modern lightweight pads with clean white facing. Pre-owned Grade A condition sold as-is.",
    description:
      "New Balance TC 1260 pads offer elite flex curves and comfortable shin bolsters. Pre-owned Grade A condition with intact straps and clean cosmetics. Sold as-is directly by PLAYZONE.",
    highlights: [
      "Pre-Owned Grade A Condition",
      "7-bar vertical cane construction with cross-foam mesh",
      "Quick-release velcro strapping",
      "Sold as-is without warranty",
    ],
    specs: [
      { label: "Condition", value: "Pre-Owned (Grade A)" },
      { label: "Facing", value: "White PU" },
      { label: "Weight", value: "820g per pad" },
      { label: "Warranty Notice", value: "Sold as-is without warranty" },
    ],
    sizes: ["Adult Men"],
    warranty: "No Warranty (Pre-Owned Gear Sold As-Is)",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "new-balance-inner-gloves",
    slug: "new-balance-inner-gloves",
    name: "New Balance Cotton Padded Inner Gloves",
    brand: "New Balance",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 850,
    originalPrice: 1100,
    discountPercent: 23,
    badge: "NEW",
    rating: 4.5,
    reviewsCount: 64,
    inStock: true,
    stockCount: 25,
    images: ["/images/products/batting_essentials/new_balance_inner_gloves.png"],
    shortDescription:
      "100% natural absorbent cotton inner gloves with padded chamois palm patches for extended batting comfort.",
    description:
      "Prolongs the life of your expensive batting gloves by absorbing sweat and preventing odor buildup. Features soft elasticated wrist cuff.",
    highlights: [
      "Pure breathable cotton knit",
      "Padded palm reinforcement absorbs handle impact",
      "Machine washable and durable",
    ],
    specs: [
      { label: "Material", value: "100% Cotton with Chamois Patch" },
      { label: "Cuff", value: "Elasticated Band" },
    ],
    sizes: ["Standard Adult", "Youth"],
    warranty: "Standard Manufacturer Specification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sg-test-arm-guard",
    slug: "sg-test-arm-guard",
    name: "SG Test Player Arm Guard",
    brand: "SG Cricket",
    category: "Protection",
    categorySlug: "batting",
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.5,
    reviewsCount: 43,
    inStock: true,
    stockCount: 18,
    images: ["/images/products/batting_essentials/sg_test_arm_guard.png"],
    shortDescription:
      "Anatomically shaped forearm guard with high-density poly sponge inserts. Shields against short-pitch bouncers.",
    description:
      "The SG Test Arm Guard conforms naturally to the forearm without slipping or restricting stroke execution.",
    highlights: [
      "Anatomical pre-curved shape",
      "Impact absorbing foam with soft towel back",
      "Adjustable dual hook-and-loop straps",
    ],
    specs: [
      { label: "Material", value: "High Impact Polycarbonate & Foam" },
      { label: "Lining", value: "Sweat Absorbent Towel" },
    ],
    sizes: ["Adult", "Youth"],
    warranty: "3 Months Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sg-abdominal-guard",
    slug: "sg-abdominal-guard",
    name: "SG Pro Abdominal Guard",
    brand: "SG Cricket",
    category: "Protection",
    categorySlug: "batting",
    price: 650,
    originalPrice: 850,
    discountPercent: 24,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 58,
    inStock: true,
    stockCount: 30,
    images: ["/images/products/batting_essentials/sg_abdominal_guard.png"],
    shortDescription:
      "High-impact polypropylene protector cup with soft elastomer rim for maximum comfort and security.",
    description:
      "Engineered to withstand direct ball impact at high speeds. Soft silicone edge prevents chafing.",
    highlights: [
      "Hardened polypropylene shell",
      "Flexible rubberized border for irritation-free wear",
      "Fits standard cricket jockstraps and briefs",
    ],
    specs: [
      { label: "Material", value: "High-Impact Polypropylene" },
      { label: "Border", value: "Elastomer Rubber Edge" },
    ],
    sizes: ["Adult", "Youth", "Junior"],
    warranty: "Standard Manufacturer Specification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },

  // ==================== BOWLING & FIELDING ====================
  {
    id: "rexaduro-sf-pro-x",
    slug: "rexaduro-sf-pro-x",
    name: "RexAduro Leather Ball SF Pro-X",
    brand: "RexAduro",
    category: "Bowling Gear",
    categorySlug: "bowling",
    price: 2800,
    originalPrice: 3400,
    discountPercent: 18,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    stockCount: 22,
    images: ["/images/products/bowling_fielding/rexaduro_ball.png"],
    shortDescription:
      "Match-grade four-piece alum tanned leather ball. Prominent hand-stitched seam delivering sustained swing and seam movement.",
    description:
      "Engineered for premier division 50-over matches and multi-day tournaments. Hand-stitched with 75-80 stitches along the seam for prolonged shape retention and consistent bounce on abrasive turf pitches.",
    highlights: [
      "4-Piece Alum Tanned Top-Grain Leather",
      "Cork and New Zealand wool core center",
      "Wax-finished for weather resistance and shine retention",
      "Weight: 156g (5.5 oz) official regulation match spec",
    ],
    specs: [
      { label: "Ball Type", value: "4-Piece Match Leather Ball" },
      { label: "Seam Stitches", value: "75 - 80 Hand Stitches" },
      { label: "Core", value: "Layered Cork & Worsted Wool" },
      { label: "Weight", value: "156g (Standard Regulation)" },
      { label: "Suitable For", value: "50-Over & Multi-Day League Matches" },
    ],
    colors: ["Red (Multi-Day)", "White (Limited Overs)", "Pink (Day/Night)"],
    warranty: "Official Match Certification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sg-club-ball",
    slug: "sg-club-ball",
    name: "SG Club Cricket Ball",
    brand: "SG Cricket",
    category: "Bowling Gear",
    categorySlug: "bowling",
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 72,
    inStock: true,
    stockCount: 35,
    images: ["/images/products/bowling_fielding/sg_club_ball.png"],
    shortDescription:
      "High quality four-piece cricket ball made from selected alum tanned leather. Ideal for club and school tournament play.",
    description:
      "The SG Club is one of the most trusted cricket balls in South Asia. Good abrasion resistance and shape retention across 30-40 overs.",
    highlights: [
      "Selected steer hide leather",
      "Naturally seasoned inner core",
      "Durable lacquer finish",
    ],
    specs: [
      { label: "Pieces", value: "4-Piece Construction" },
      { label: "Weight", value: "156g" },
      { label: "Color", value: "Classic Cherry Red" },
    ],
    warranty: "Standard Manufacturer Specification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "asics-gel-peake-bowling-shoes",
    slug: "asics-gel-peake-bowling-shoes",
    name: "Asics Gel-Peake Bowling Shoes",
    brand: "Asics",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 9500,
    originalPrice: 11500,
    discountPercent: 17,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 56,
    inStock: true,
    stockCount: 8,
    images: ["/images/products/bowling_fielding/asics_bowling_shoes.png"],
    shortDescription:
      "Engineered with rearfoot GEL cushioning and reinforced toe overlays. Built to withstand high-impact bowling landings.",
    description:
      "The Asics Gel-Peake provides stability and ankle support during intense bowling actions. Multi-stud rubber outsole delivers uncompromising grip on turf and synthetic wickets.",
    highlights: [
      "Rearfoot GEL cushioning absorbs bowling impact shock",
      "Reinforced synthetic leather upper with medial overlays",
      "Durable rubber outsole with aggressive traction lugs",
    ],
    specs: [
      { label: "Shoe Type", value: "Bowling & All-Rounder Cricket Shoe" },
      { label: "Outsole", value: "Molded Rubber Studs (Turf / Matting)" },
      { label: "Cushioning", value: "Asics GEL Technology" },
      { label: "Toe Protection", value: "Reinforced PGuard Toe Protector" },
    ],
    sizes: ["UK 7 / US 8", "UK 8 / US 9", "UK 9 / US 10", "UK 10 / US 11", "UK 11 / US 12"],
    warranty: "1 Year Official Brand Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "agility-cone-set-50pcs",
    slug: "agility-cone-set-50pcs",
    name: "Agility Training Cone Set 50 Pcs",
    brand: "PLAYZONE Training",
    category: "Training Gear",
    categorySlug: "accessories",
    price: 950,
    originalPrice: 1300,
    discountPercent: 27,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 42,
    inStock: true,
    stockCount: 40,
    images: ["/images/products/bowling_fielding/agility_cones.png"],
    shortDescription:
      "Set of 50 flexible saucer cones with carry stand. Essential for bowling run-up markers, agility drills, and fielding drills.",
    description:
      "Made from durable, flexible PE plastic that bounces back when stepped on. Includes 5 bright neon colors and heavy-duty metal transport stand.",
    highlights: [
      "50 saucer cones in 5 high-visibility neon colors",
      "Flexible plastic returns to shape when stepped on",
      "Convenient carry caddy included",
    ],
    specs: [
      { label: "Quantity", value: "50 Cones + Carry Stand" },
      { label: "Material", value: "Heavy-Duty Flexible Polyethylene" },
    ],
    warranty: "Standard Manufacturer Specification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "rebounder-net-trainer",
    slug: "rebounder-net-trainer",
    name: "Rebounder Net Fielding Trainer",
    brand: "PLAYZONE Training",
    category: "Training Gear",
    categorySlug: "accessories",
    price: 3500,
    originalPrice: 4200,
    discountPercent: 17,
    badge: "NEW",
    rating: 4.5,
    reviewsCount: 38,
    inStock: true,
    stockCount: 12,
    images: ["/images/products/bowling_fielding/rebounder_net.png"],
    shortDescription:
      "Adjustable angle reaction rebounder net for slip catching, reaction training, and wicketkeeping reflexes.",
    description:
      "Heavy duty steel frame with high tension bungee net. Adjust angles to practice high catches, flat catches, and ground fielding reflex training.",
    highlights: [
      "Multi-angle adjustable steel frame",
      "High-tension all-weather netting",
      "Folds flat for easy transport and storage",
    ],
    specs: [
      { label: "Dimensions", value: "100cm x 100cm Frame" },
      { label: "Netting", value: "High-Tensile Bungee Cord Net" },
    ],
    warranty: "1 Year Frame Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },

  // ==================== SHOES & KIT BAGS ====================
  {
    id: "adidas-22yds-spikes",
    slug: "adidas-22yds-spikes",
    name: "Adidas 22YDS Spikes",
    brand: "Adidas",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 7800,
    originalPrice: 9500,
    discountPercent: 18,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 48,
    inStock: true,
    stockCount: 9,
    images: ["/images/products/shoes_bags/adidas_spikes.png"],
    shortDescription:
      "Pro level metal spike cricket shoes. Lightweight TPU outsole with Boost heel insert and breathable upper.",
    description:
      "The Adidas 22YDS delivers explosive traction on turf wickets. Features full metal spike setup with replacement spikes and spike key included.",
    highlights: [
      "Full metal spike plate with 7-4 configuration",
      "Breathable engineered mesh upper with TPU midfoot cage",
      "Cushioned EVA midsole for day-long fielding comfort",
      "Includes extra spikes and wrench key",
    ],
    specs: [
      { label: "Spikes", value: "Replaceable Metal Spikes" },
      { label: "Outsole", value: "Rigid TPU Plate" },
      { label: "Upper", value: "Reinforced Mesh & Synthetic" },
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "nb-ck4020-shoes",
    slug: "nb-ck4020-shoes",
    name: "New Balance CK4020 Cricket Shoes",
    brand: "New Balance",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 6900,
    originalPrice: 8200,
    discountPercent: 16,
    badge: "NEW",
    rating: 4.6,
    reviewsCount: 32,
    inStock: true,
    stockCount: 11,
    images: ["/images/products/shoes_bags/nb_cricket_shoes.png"],
    shortDescription:
      "Rubber studded turf cricket shoes with Fresh Foam midsole. Maximum shock absorption on hard wickets.",
    description:
      "Ideal for all-rounders playing on synthetic and matting wickets. Fresh Foam cushioning protects knees and lower back throughout long days on the field.",
    highlights: [
      "Fresh Foam midsole technology",
      "Engineered rubber lug outsole for 360-degree traction",
      "Seamless toe wrap prevents scuffing",
    ],
    specs: [
      { label: "Outsole", value: "Multi-Stud Rubber" },
      { label: "Midsole", value: "Fresh Foam Precision Cushioning" },
    ],
    sizes: ["UK 7.5", "UK 8.5", "UK 9.5", "UK 10.5"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "playzone-pro-wheelie-bag",
    slug: "playzone-pro-wheelie-bag",
    name: "PLAYZONE Pro Wheelie Cricket Kit Bag",
    brand: "PLAYZONE",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 45,
    inStock: true,
    stockCount: 7,
    images: ["/images/products/shoes_bags/playzone_wheelie_bag.png"],
    shortDescription:
      "Tour-grade cricket wheelie bag with 3-bat padded compartment, separate shoe tunnel, and heavy-duty tractor wheels.",
    description:
      "Built for the traveling cricketer. Made from waterproof 1680D ballistic nylon with reinforced bottom skid plates. Accommodates 3 bats, 2 pairs of pads, helmet, 4 pairs of gloves, shoes, and match apparel.",
    highlights: [
      "Dedicated thermo-insulated 3-bat compartment",
      "All-terrain heavy-duty tractor wheels with dual bearings",
      "Ventilated external footwear compartment",
      "Telescopic pull handle with aircraft-grade aluminum rails",
    ],
    specs: [
      { label: "Capacity", value: "145 Liters" },
      { label: "Material", value: "Waterproof 1680D Ballistic Nylon" },
      { label: "Bat Storage", value: "3 Internal Padded Sleeves" },
      { label: "Dimensions", value: "98cm x 42cm x 42cm" },
    ],
    warranty: "2 Years Hardware & Zipper Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "ss-duffle-kit-bag",
    slug: "ss-duffle-kit-bag",
    name: "SS Duffle Cricket Bag",
    brand: "SS Sunridges",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 4200,
    originalPrice: 5200,
    discountPercent: 19,
    badge: "NEW",
    rating: 4.4,
    reviewsCount: 89,
    inStock: true,
    stockCount: 16,
    images: ["/images/products/shoes_bags/ss_duffle_bag.png"],
    shortDescription:
      "Ergonomic duffle bag with padded backpack straps. External 2-bat sleeves and front accessory pockets.",
    description:
      "Convenient backpack design that leaves your hands free. Spacious main compartment easily holds full batting gear plus personal accessories.",
    highlights: [
      "Padded air-mesh backpack shoulder straps",
      "External double bat side holders",
      "Bottom shoe compartment with air eyelets",
    ],
    specs: [
      { label: "Capacity", value: "95 Liters" },
      { label: "Material", value: "Ripstop Polyester" },
    ],
    warranty: "1 Year Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "gray-nicolls-backpack",
    slug: "gray-nicolls-backpack",
    name: "Gray-Nicolls Backpack",
    brand: "Gray-Nicolls",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 3800,
    originalPrice: 4600,
    discountPercent: 17,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 14,
    images: ["/images/products/shoes_bags/gn_backpack.png"],
    shortDescription:
      "Compact cricket backpack with dedicated external bat sleeve, laptop pocket, and water bottle holders.",
    description:
      "Perfect for academy training sessions and gym workouts. Fits your bat, gloves, shoes, towel, and training gear comfortably.",
    highlights: [
      "External bat holster sleeve",
      "Padded laptop sleeve for students & professionals",
      "Ergonomic sternum strap and breathable back padding",
    ],
    specs: [
      { label: "Capacity", value: "48 Liters" },
      { label: "Dimensions", value: "52cm x 34cm x 22cm" },
    ],
    warranty: "1 Year Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },

  // ==================== FEATURED CRICKET GEAR ====================
  {
    id: "ss-ton-english-bat",
    slug: "ss-ton-english-bat",
    name: "SS TON English Willow Bat",
    brand: "SS Sunridges",
    category: "Cricket Bats",
    categorySlug: "cricket-bats",
    price: 6200,
    originalPrice: 7500,
    discountPercent: 17,
    badge: "17% OFF",
    rating: 4.9,
    reviewsCount: 120,
    inStock: true,
    stockCount: 10,
    images: ["/images/products/featured_gear/ss_ton_bat.png"],
    shortDescription:
      "Limited deal on authentic SS TON English Willow. Massive edges, superb balance, and clean laser-etched face.",
    description:
      "Special discounted edition of the iconic SS TON English Willow Bat. Precision crafted for stroke makers who demand both power and refined touch.",
    highlights: [
      "Grade 2 Hand Selected English Willow",
      "Thick 39mm power edges",
      "Special 17% promotional price at PLAYZONE",
    ],
    specs: [
      { label: "Willow Grade", value: "Grade 2 English Willow" },
      { label: "Edges", value: "39mm" },
      { label: "Handle", value: "Round 12-Piece Cane" },
    ],
    sizes: ["Short Handle (SH)"],
    weights: ["2.75 lbs", "2.85 lbs"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sg-cricket-helmet-pro",
    slug: "sg-cricket-helmet-pro",
    name: "SG Cricket Helmet",
    brand: "SG Cricket",
    category: "Protection",
    categorySlug: "batting",
    price: 5200,
    originalPrice: 6000,
    discountPercent: 13,
    badge: "13% OFF",
    rating: 4.4,
    reviewsCount: 81,
    inStock: true,
    stockCount: 8,
    images: ["/images/products/featured_gear/sg_cricket_helmet.png"],
    shortDescription:
      "High impact ABS outer shell with titanium-finished steel grille. Superior ventilation and sweat management.",
    description:
      "The SG Cricket Helmet offers peace of mind when facing pace bowling. Features high-density shock absorbing EPS foam and removable washable inner ear pads.",
    highlights: [
      "BS 7928 certified for safety",
      "Reinforced titanium-coated steel grille",
      "Quick release chin buckle with soft chin cup",
    ],
    specs: [
      { label: "Standard", value: "BS 7928:2013" },
      { label: "Shell", value: "High Impact ABS Polymer" },
    ],
    sizes: ["Medium (56-58cm)", "Large (59-61cm)"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "kookaburra-pads-white",
    slug: "kookaburra-pads-white",
    name: "Kookaburra Batting Pads",
    brand: "Kookaburra",
    category: "Batting Gear",
    categorySlug: "batting",
    price: 4800,
    originalPrice: 5600,
    discountPercent: 14,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 58,
    inStock: true,
    stockCount: 9,
    images: ["/images/products/featured_gear/kookaburra_batting_pads.png"],
    shortDescription:
      "Traditional cane protection with modern flex curve aesthetics. Pure white finish with high density foam knee bolsters.",
    description:
      "Kookaburra's flagship batting pads provide sublime mobility and protection. Ergonomic knee pocket stabilizes the leg during quick singles.",
    highlights: [
      "Traditional 7-cane uprights with HD foam core",
      "Dual-wing calf wrap design",
      "Premium padded 50mm velcro straps",
    ],
    specs: [
      { label: "Protection", value: "Level 4 Pro" },
      { label: "Facing", value: "Gloss White PU" },
    ],
    sizes: ["Adult", "Youth"],
    warranty: "1 Year Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "puma-cricket-spikes-shoes",
    slug: "puma-cricket-spikes-shoes",
    name: "Puma Cricket Spikes",
    brand: "Puma",
    category: "Cricket Shoes",
    categorySlug: "shoes",
    price: 6500,
    originalPrice: 7500,
    discountPercent: 12,
    badge: "12% OFF",
    rating: 4.6,
    reviewsCount: 37,
    inStock: true,
    stockCount: 7,
    images: ["/images/products/featured_gear/puma_cricket_spikes.png"],
    shortDescription:
      "Pro spike shoes built for speed, agility, and aggressive pitch grip. Padded collar with breathable mesh upper.",
    description:
      "Engineered for explosive fast bowlers and quick-running batsmen. Features an abrasion-resistant toe guard and responsive EVA midsole.",
    highlights: [
      "Replaceable metal spikes with key included",
      "Puma ProFoam cushioning for rapid propulsion",
      "Water-resistant synthetic upper",
    ],
    specs: [
      { label: "Spikes", value: "Full Metal Spike Setup" },
      { label: "Midsole", value: "ProFoam Energy Return" },
    ],
    sizes: ["UK 8", "UK 9", "UK 10", "UK 11"],
    warranty: "1 Year Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "playzone-team-wheelie-kit",
    slug: "playzone-team-wheelie-kit",
    name: "PLAYZONE Team Kit Bag",
    brand: "PLAYZONE",
    category: "Kit Bags",
    categorySlug: "accessories",
    price: 5800,
    originalPrice: 6900,
    discountPercent: 16,
    badge: "NEW",
    rating: 4.4,
    reviewsCount: 91,
    inStock: true,
    stockCount: 14,
    images: ["/images/products/featured_gear/playzone_team_bag.png"],
    shortDescription:
      "Heavy duty club wheelie bag with massive central compartment, dual bat sleeves, and reinforced base.",
    description:
      "Designed specifically for club cricket teams and multi-gear players in Bangladesh. Heavy duty construction survives rugged bus and auto-rickshaw transport.",
    highlights: [
      "120 Liter cavernous capacity",
      "Double reinforced base board with heavy-duty skids",
      "Smooth glide bearing wheels",
    ],
    specs: [
      { label: "Capacity", value: "120 Liters" },
      { label: "Material", value: "1000D Cordura Nylon" },
    ],
    warranty: "1 Year Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "kookaburra-pro-keeper-gloves",
    slug: "kookaburra-pro-keeper-gloves",
    name: "Kookaburra Pro 500 Wicket Keeping Gloves",
    brand: "Kookaburra",
    category: "Wicketkeeping",
    categorySlug: "wicketkeeping",
    price: 3600,
    originalPrice: 4200,
    discountPercent: 14,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 38,
    inStock: true,
    stockCount: 9,
    images: ["/images/categories/batting_gloves.png"],
    shortDescription:
      "ICC regulation compliant premium leather keeping gloves with octopus rubber grip palm and web thumb support.",
    description:
      "Engineered for lightning-fast stumpings and high-velocity catches. Supple aniline sheep leather palm with shock-absorbing foam lining ensures maximum safety against 140+ km/h seamers and spinning variations.",
    highlights: [
      "Octopus high-traction rubber grip palm",
      "ICC compliant regulation webbed thumb construction",
      "Reinforced fingertips with abrasion shields",
      "Wide ergonomic cuff for easy on/off between overs",
    ],
    specs: [
      { label: "Palm Leather", value: "Premium Aniline Sheep Leather" },
      { label: "Grip Pattern", value: "Octopus Suction Cups" },
      { label: "Cuff Design", value: "Ergonomic Padded Towel Cuff" },
    ],
    sizes: ["Adult Mens", "Youth"],
    warranty: "6 Months Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "kookaburra-pro-keeper-pads",
    slug: "kookaburra-pro-keeper-pads",
    name: "Kookaburra Pro 500 Wicket Keeping Pads",
    brand: "Kookaburra",
    category: "Wicketkeeping",
    categorySlug: "wicketkeeping",
    price: 3200,
    originalPrice: 3800,
    discountPercent: 15,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 29,
    inStock: true,
    stockCount: 8,
    images: ["/images/categories/batting_pads.png"],
    shortDescription:
      "Ultra-compact lightweight wicketkeeping leg guards with shortened shin bolsters for unrestricted agility and diving.",
    description:
      "Designed specifically for modern agile keepers who need zero interference when squatting, rising to spin, or diving across the stumps. High-density molded foam disperses ball impact effortlessly.",
    highlights: [
      "Ultra-compact short cane profile",
      "Padded mesh inner bolsters for heat dissipation",
      "Dual ergonomic 2-inch strap fastening",
    ],
    specs: [
      { label: "Protection", value: "High-Density Foam & Compact Cane" },
      { label: "Weight", value: "Ultra Lightweight (680g pair)" },
    ],
    sizes: ["Adult Mens", "Youth"],
    warranty: "6 Months Official Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "sg-tournament-white-leather-ball",
    slug: "sg-tournament-white-leather-ball",
    name: "SG Tournament Special White Leather Ball (Pack of 2)",
    brand: "SG Cricket",
    category: "Cricket Balls",
    categorySlug: "bowling",
    price: 2400,
    originalPrice: 2800,
    discountPercent: 14,
    badge: "TOP PICK",
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockCount: 20,
    images: ["/images/categories/cricket_balls.png"],
    shortDescription:
      "Official 4-piece white leather match balls for T20 and limited-overs league cricket with prominent hand-stitched seam.",
    description:
      "Manufactured from top-grade alum-tanned steer hide leather. Specially finished in brilliant white with water-resistant wax coating for night games and floodlight visibility.",
    highlights: [
      "4-Piece alum tanned genuine steer hide",
      "Portuguese cork and worsted wool core",
      "Hand-stitched 78-82 seam for lasting swing",
    ],
    specs: [
      { label: "Seam", value: "Prominent Hand-Stitched Seam" },
      { label: "Pieces", value: "4-Piece Match Construction" },
      { label: "Color", value: "Brilliant White (Pack of 2)" },
    ],
    warranty: "Official Match Grade Standard",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "ss-matrix-bat-grip-pack",
    slug: "ss-matrix-bat-grip-pack",
    name: "SS Matrix Chevron Bat Grips (Pack of 3)",
    brand: "SS Sunridges",
    category: "Bat Accessories",
    categorySlug: "accessories",
    price: 850,
    originalPrice: 1100,
    discountPercent: 22,
    badge: "PACK OF 3",
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stockCount: 30,
    images: ["/images/categories/cricket_bats.png"],
    shortDescription:
      "High-tack chevron textured rubber bat replacement grips with shock-absorbing micro-grooves.",
    description:
      "Upgrade your bat handle feel with genuine SS Sunridges matrix grips. Features multi-directional diamond ridges that prevent rotational twist during aggressive boundary strokes.",
    highlights: [
      "Pack of 3 premium rubber bat grips",
      "Chevron anti-slip texture for wet-weather traction",
      "Fits standard Short Handle and Long Handle bats",
    ],
    specs: [
      { label: "Pack Size", value: "3 Grips (White / Black / Lime)" },
      { label: "Material", value: "Natural High-Tack Rubber" },
    ],
    warranty: "Authentic SS Product",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },
  {
    id: "playzone-pro-bat-care-kit",
    slug: "playzone-pro-bat-care-kit",
    name: "PLAYZONE Master Bat Care Kit (Extratec Sheet + Wooden Mallet + Linseed Oil)",
    brand: "PLAYZONE",
    category: "Bat Accessories",
    categorySlug: "accessories",
    price: 1450,
    originalPrice: 1800,
    discountPercent: 19,
    badge: "ESSENTIAL",
    rating: 4.9,
    reviewsCount: 77,
    inStock: true,
    stockCount: 18,
    images: ["/images/products/featured_gear/ss_ton_bat.png"],
    shortDescription:
      "Complete bat preparation and preservation kit. Includes heavy-duty Extratec sheet, solid hardwood knocking mallet, and cold-pressed linseed oil.",
    description:
      "Everything a serious cricketer needs to protect and season their willow blade. The solid hardwood mallet seasons the toe and edges, while the anti-scuff sheet shields against surface cracking.",
    highlights: [
      "Includes Solid Hardwood Bat Knocking Mallet",
      "Full-blade Clear Extratec Scuff Sheet with Edge Tape",
      "100ml Cold-Pressed Raw Linseed Oil bottle",
    ],
    specs: [
      { label: "Contents", value: "Mallet + Scuff Sheet + 100ml Linseed Oil" },
      { label: "Application", value: "All English & Kashmir Willow Bats" },
    ],
    warranty: "Standard Manufacturer Specification",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  },

  // ==================== HOMEPAGE SYNCED PRODUCTS (24 PREVIOUSLY MISSING ITEMS) ====================
  {
    "id": "mrf-grand-edition-preowned",
    "slug": "mrf-grand-edition-preowned",
    "name": "MRF Grand Edition Cricket Bat (Grade A Pre-Owned)",
    "brand": "MRF Cricket",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bats",
    "price": 4200,
    "originalPrice": 6500,
    "discountPercent": 35,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.8,
    "reviewsCount": 76,
    "inStock": true,
    "stockCount": 4,
    "images": [
      "/images/products/bats/mrf.png"
    ],
    "shortDescription": "Certified Grade A pre-owned MRF Grand Edition English Willow bat. Thoroughly inspected, cleaned, and machine-tested for structural integrity.",
    "description": "The MRF Grand Edition pre-owned cricket bat offers premium English willow performance at a fraction of the original price. Carefully graded and inspected by PLAYZONE experts to ensure zero cracks, optimal ping, and maximum spine resilience for club and league matches.",
    "highlights": [
      "Grade A Pre-Owned certified with structural integrity guarantee",
      "Massive edges and authentic Virat Kohli profile sweet spot",
      "Clean face with minimal surface scuffs and intact toe",
      "Original handle intact with freshly applied chevron grip",
      "7-Day PlayZone Money Back Guarantee"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned (Excellent Ping)"
      },
      {
        "label": "Willow Grade",
        "value": "Grade 1 English Willow"
      },
      {
        "label": "Weight",
        "value": "2.8 lbs (1160g)"
      },
      {
        "label": "Edge Thickness",
        "value": "39mm"
      },
      {
        "label": "Spine Profile",
        "value": "64mm"
      },
      {
        "label": "Origin",
        "value": "India"
      }
    ],
    "sizes": [
      "Short Handle (SH)"
    ],
    "weights": [
      "2.8 lbs (1160g)"
    ],
    "warranty": "30-Day PLAYZONE Structural Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Tahmid Hasan",
        "verified": true,
        "rating": 5,
        "date": "October 20, 2026",
        "title": "Incredible value for an authentic MRF bat!",
        "comment": "Was skeptical about pre-owned at first, but this bat feels brand new. Fantastic rebound off the blade.",
        "location": "Mirpur, Dhaka"
      }
    ]
  },
  {
    "id": "kookaburra-kahuna-preowned",
    "slug": "kookaburra-kahuna-preowned",
    "name": "Kookaburra Kahuna Pro Bat (Grade A Pre-Owned)",
    "brand": "Kookaburra",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bats",
    "price": 4800,
    "originalPrice": 7500,
    "discountPercent": 36,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.7,
    "reviewsCount": 68,
    "inStock": true,
    "stockCount": 3,
    "images": [
      "/images/products/bats/kookaburra_bat.png"
    ],
    "shortDescription": "Iconic lime-green Kookaburra Kahuna Pro pre-owned cricket bat. Hand-verified cleft with powerful mid-blade stroke sweet spot.",
    "description": "The Kookaburra Kahuna has been an iconic choice for world-class stroke players for decades. This certified Grade A pre-owned edition features an explosive sweet spot and smooth pickup, ideal for high-scoring T20 and 50-over matches.",
    "highlights": [
      "Grade A Pre-Owned certified with rigorous rebound verification",
      "High spine profile with maximum wood concentrated behind the sweet spot",
      "Dynamic power handle with exceptional shock damping",
      "Includes protective face sheet and reinforced toe guard"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Willow",
        "value": "English Willow"
      },
      {
        "label": "Weight",
        "value": "2.85 lbs (1175g)"
      },
      {
        "label": "Edge Profile",
        "value": "38mm"
      },
      {
        "label": "Origin",
        "value": "Australia / India"
      }
    ],
    "sizes": [
      "Short Handle (SH)"
    ],
    "weights": [
      "2.85 lbs (1175g)"
    ],
    "warranty": "30-Day PLAYZONE Structural Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Zubair Ahmed",
        "verified": true,
        "rating": 5,
        "date": "November 2, 2026",
        "title": "Punches like a cannon",
        "comment": "Excellent pre-owned quality. Bat pickup is very light and ping is top tier.",
        "location": "Uttara, Dhaka"
      }
    ]
  },
  {
    "id": "dsc-split-44-batting-pads",
    "slug": "dsc-split-44-batting-pads",
    "name": "DSC Split 44 Lightweight Batting Pads",
    "brand": "DSC Cricket",
    "category": "Batting Gear",
    "categorySlug": "batting",
    "price": 4600,
    "originalPrice": 5400,
    "discountPercent": 15,
    "badge": "15% OFF",
    "rating": 4.7,
    "reviewsCount": 94,
    "inStock": true,
    "stockCount": 12,
    "images": [
      "/images/products/batting_essentials/dsc_pads.png"
    ],
    "shortDescription": "Ultra-lightweight multi-split cane batting legguards engineered for rapid running between wickets and elite impact defense.",
    "description": "DSC Split 44 batting pads combine traditional cane front bars with high-density foam filling for unmatched protection against pace bowling. Ergonomically shaped knee bolster provides close contouring and natural flex when pivoting or driving.",
    "highlights": [
      "High-density feather-light foam with reinforced cane rods",
      "Contoured knee cup with breathable moisture-wicking lining",
      "Wide padded calf and ankle straps for secure wrap-around fit",
      "Reinforced instep with synthetic leather piping"
    ],
    "specs": [
      {
        "label": "Material",
        "value": "PU & High-Density Foam"
      },
      {
        "label": "Facing",
        "value": "Split Cane & Foam Rods"
      },
      {
        "label": "Knee Roll",
        "value": "Pre-moulded ergonomic cup"
      },
      {
        "label": "Straps",
        "value": "3 Padded Velcro Straps"
      }
    ],
    "sizes": [
      "Men's Standard",
      "Youth"
    ],
    "warranty": "Official DSC Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Shakil Chowdhury",
        "verified": true,
        "rating": 5,
        "date": "October 18, 2026",
        "title": "Super light and very comfortable",
        "comment": "Running between wickets feels effortless. Stopped 135 kmph yorkers with zero pain.",
        "location": "Chattogram"
      }
    ]
  },
  {
    "id": "ss-ton-reserve-preowned",
    "slug": "ss-ton-reserve-preowned",
    "name": "SS TON Reserve Edition Bat (Grade A)",
    "brand": "SS Cricket",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bats",
    "price": 4800,
    "originalPrice": 8500,
    "discountPercent": 44,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.6,
    "reviewsCount": 98,
    "inStock": true,
    "stockCount": 5,
    "images": [
      "/images/products/bats/ss_ton.png"
    ],
    "shortDescription": "Certified Grade A pre-owned SS TON Reserve Edition. Renowned for its enormous edge profile and feather-light pickup balance.",
    "description": "The SS TON Reserve Edition represents elite Indian bat craftsmanship. This certified pre-owned bat features massive 40mm contoured edges, minimal concaving, and exceptional wood density, verified for long innings in tournament cricket.",
    "highlights": [
      "Grade A Pre-Owned certified by PLAYZONE master bat-maker",
      "40mm edges with substantial spine elevation",
      "Sarawak cane handle delivering supreme vibration dampening",
      "Freshly serviced with anti-scuff sheet and premium grip"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Willow",
        "value": "Grade 1 English Willow"
      },
      {
        "label": "Weight",
        "value": "2.78 lbs (1145g)"
      },
      {
        "label": "Handle",
        "value": "Round Sarawak Cane"
      }
    ],
    "sizes": [
      "Short Handle (SH)"
    ],
    "weights": [
      "2.78 lbs (1145g)"
    ],
    "warranty": "30-Day PLAYZONE Structural Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Mehedi Hasan",
        "verified": true,
        "rating": 5,
        "date": "September 29, 2026",
        "title": "Unreal hitting power",
        "comment": "This bat feels so balanced. The pre-owned grading was spot on, not a single flaw.",
        "location": "Rajshahi"
      }
    ]
  },
  {
    "id": "sf-stanford-players-preowned",
    "slug": "sf-stanford-players-preowned",
    "name": "SF Stanford Players Edition Bat (Grade A)",
    "brand": "SF Stanford",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bats",
    "price": 3600,
    "originalPrice": 6500,
    "discountPercent": 45,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.5,
    "reviewsCount": 52,
    "inStock": true,
    "stockCount": 4,
    "images": [
      "/images/products/bats/sf_bat.png"
    ],
    "shortDescription": "Certified Grade A pre-owned SF Stanford Players Edition. Superbly balanced blade designed for punchy counter-attacking batsmen.",
    "description": "Engineered by SF Stanford for dynamic players who demand quick hands and effortless drives. Tested by PLAYZONE experts to guarantee zero internal fractures and supreme sweet spot resonance.",
    "highlights": [
      "Grade A Pre-Owned certified with structural warranty",
      "Generous mid-sweet spot suitable for all-round strokeplay",
      "Factory toe guard and anti-scuff protection included",
      "Unbeatable price-to-performance ratio"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Willow",
        "value": "English Willow"
      },
      {
        "label": "Weight",
        "value": "2.8 lbs (1155g)"
      },
      {
        "label": "Edge",
        "value": "38mm"
      }
    ],
    "sizes": [
      "Short Handle (SH)"
    ],
    "weights": [
      "2.8 lbs (1155g)"
    ],
    "warranty": "30-Day PLAYZONE Structural Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Nayeem Islam",
        "verified": true,
        "rating": 4,
        "date": "October 12, 2026",
        "title": "Solid bat, great value",
        "comment": "Excellent balance and sound. Delighted with the pre-owned condition.",
        "location": "Sylhet"
      }
    ]
  },
  {
    "id": "gray-nicolls-elite-helmet-preowned",
    "slug": "gray-nicolls-elite-helmet-preowned",
    "name": "Gray-Nicolls Elite Cricket Helmet (Grade A)",
    "brand": "Gray-Nicolls",
    "category": "Batting Gear",
    "categorySlug": "batting",
    "price": 3600,
    "originalPrice": 6000,
    "discountPercent": 40,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.9,
    "reviewsCount": 128,
    "inStock": true,
    "stockCount": 6,
    "images": [
      "/images/products/batting_essentials/gray_nicolls_helmet.png"
    ],
    "shortDescription": "Certified Grade A pre-owned Gray-Nicolls cricket helmet with steel grille and high-impact ABS outer shell.",
    "description": "Superior head protection meeting strict cricket safety standards. Sanitized, professionally certified, and inspected for full shell integrity and grille tightness.",
    "highlights": [
      "Reinforced ABS outer shell with EPS shock-absorbing liner",
      "Steel face grille with micro-adjustable chin strap",
      "Internal air channels for active cooling in hot weather",
      "Sanitized and safety-certified by PLAYZONE technicians"
    ],
    "specs": [
      {
        "label": "Safety Standard",
        "value": "BS 7928:2013 Compliant"
      },
      {
        "label": "Grille",
        "value": "High-Tensile Steel"
      },
      {
        "label": "Shell",
        "value": "Moulded ABS with EPS Foam"
      },
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned (Sanitized)"
      }
    ],
    "sizes": [
      "Medium (57-58cm)",
      "Large (59-60cm)"
    ],
    "warranty": "PLAYZONE Safety Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Farhan Tanvir",
        "verified": true,
        "rating": 5,
        "date": "November 5, 2026",
        "title": "Clean as new and fits perfectly",
        "comment": "Came in pristine sanitized packaging. Very sturdy steel grille.",
        "location": "Dhaka"
      }
    ]
  },
  {
    "id": "new-balance-tc-pads-preowned",
    "slug": "new-balance-tc-pads-preowned",
    "name": "New Balance TC 1260 Batting Pads (Grade A)",
    "brand": "New Balance",
    "category": "Batting Gear",
    "categorySlug": "batting",
    "price": 2900,
    "originalPrice": 4800,
    "discountPercent": 40,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.8,
    "reviewsCount": 86,
    "inStock": true,
    "stockCount": 5,
    "images": [
      "/images/products/batting_essentials/new_balance_pads.png"
    ],
    "shortDescription": "Grade A pre-owned New Balance TC 1260 legguards. Premium lightweight protection used by professional league cricketers.",
    "description": "The New Balance TC series is built for modern players needing unhindered footwork and top-level knee protection. Fully cleaned and inspected with intact straps and clean white facing.",
    "highlights": [
      "Grade A pre-owned condition with clean face and intact velcro straps",
      "High-density foam face with cane inserts for ball deflection",
      "Padded 3-strap system with quick-release velcro buckles",
      "Reinforced instep with heavy-duty PU piping"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Series",
        "value": "New Balance TC 1260"
      },
      {
        "label": "Facing",
        "value": "Premium PU & Cane"
      }
    ],
    "sizes": [
      "Men's Standard"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "gray-nicolls-thigh-guard-preowned",
    "slug": "gray-nicolls-thigh-guard-preowned",
    "name": "Gray-Nicolls All-in-One Thigh Guard (Grade A)",
    "brand": "Gray-Nicolls",
    "category": "Batting Gear",
    "categorySlug": "batting",
    "price": 1800,
    "originalPrice": 2800,
    "discountPercent": 36,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.6,
    "reviewsCount": 72,
    "inStock": true,
    "stockCount": 7,
    "images": [
      "/images/products/batting_essentials/gray_nicolls_thigh_guard_upscaled.png"
    ],
    "shortDescription": "Dual-layer inner and outer thigh protection unit. Sanitized and certified Grade A pre-owned.",
    "description": "All-in-one combo guard safeguarding both the outer and inner thigh from rising deliveries. Soft elastic waist strap ensures a snug, slip-free position throughout long batting sessions.",
    "highlights": [
      "Dual-protection system (main thigh + inner thigh shield)",
      "High-density EVA foam backing for maximum force absorption",
      "Wide adjustable elastic waistband with hook-and-loop closure",
      "Sanitized and checked for zero foam compression"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned (Sanitized)"
      },
      {
        "label": "Style",
        "value": "Dual Combo (Inner + Outer)"
      },
      {
        "label": "Handedness",
        "value": "Right Hand / Left Hand universal"
      }
    ],
    "sizes": [
      "Adult Standard",
      "Youth"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "playzone-pro-wheelie-preowned-gear",
    "slug": "playzone-pro-wheelie-preowned-gear",
    "name": "PLAYZONE Pro Tractor Wheelie Kit Bag (Grade A)",
    "brand": "PLAYZONE",
    "category": "Kit Bags",
    "categorySlug": "shoes",
    "price": 4600,
    "originalPrice": 8500,
    "discountPercent": 46,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.8,
    "reviewsCount": 31,
    "inStock": true,
    "stockCount": 3,
    "images": [
      "/images/products/shoes_bags/playzone_wheelie_bag.png"
    ],
    "shortDescription": "Heavy-duty tractor wheelie bag capable of holding full individual tournament gear. Grade A pre-owned.",
    "description": "Spacious heavy-duty cordura nylon kit bag equipped with all-terrain tractor wheels, padded bat compartments, and separate ventilated footwear chamber.",
    "highlights": [
      "Grade A pre-owned with clean zippers and flawless tractor wheels",
      "Accommodates up to 3 full-sized bats in dedicated padded sleeve",
      "Heavy-duty waterproof bottom with scuff protection rails",
      "Ventilated shoe pocket keeping dirty spikes separate"
    ],
    "specs": [
      {
        "label": "Dimensions",
        "value": "98cm x 40cm x 38cm"
      },
      {
        "label": "Wheels",
        "value": "Heavy-Duty Dual Tractor Wheels"
      },
      {
        "label": "Material",
        "value": "1680D Ballistic Cordura"
      },
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      }
    ],
    "sizes": [
      "Extra Large (Full Kit)"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "batting-protection-master-combo",
    "slug": "batting-protection-master-combo",
    "name": "PLAYZONE Complete Batting Protection Combo (Pads + Gloves + Helmet)",
    "brand": "PLAYZONE",
    "category": "Batting Gear",
    "categorySlug": "batting",
    "price": 11800,
    "originalPrice": 14500,
    "discountPercent": 19,
    "badge": "COMBO SAVE 19%",
    "rating": 4.9,
    "reviewsCount": 67,
    "inStock": true,
    "stockCount": 8,
    "images": [
      "/images/categories/batting_pads.png"
    ],
    "shortDescription": "All-in-one tournament package including match batting pads, sausage-finger leather batting gloves, and safety-certified helmet.",
    "description": "The complete batting protection solution for serious cricketers entering club or league matches. Specially curated by PLAYZONE to deliver international-standard safety, comfort, and uniform aesthetics at bundle savings.",
    "highlights": [
      "Save 19% compared to purchasing items separately",
      "Includes Grade 1 Batting Pads + Pro Leather Gloves + Certified Helmet",
      "Available in multiple sizing configurations with custom fitting guarantee",
      "Comes with complimentary PLAYZONE accessories bundle"
    ],
    "specs": [
      {
        "label": "Bundle Items",
        "value": "Pads + Gloves + Helmet"
      },
      {
        "label": "Safety Level",
        "value": "Club & Premier League Standard"
      },
      {
        "label": "Warranty",
        "value": "Official PLAYZONE Combo Warranty"
      }
    ],
    "sizes": [
      "Adult Standard (Men's)",
      "Youth"
    ],
    "warranty": "1 Year Official Warranty",
    "deliveryDaysDhaka": "24 Hours (Free Delivery)",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Asif Rahman",
        "verified": true,
        "rating": 5,
        "date": "October 10, 2026",
        "title": "Best investment for our cricket season",
        "comment": "Saved money and got everything we needed in one box. Quality is outstanding.",
        "location": "Gulshan, Dhaka"
      }
    ]
  },
  {
    "id": "master-bat-knocking-combo",
    "slug": "master-bat-knocking-combo",
    "name": "English Willow Bat Care & Linseed Knocking Combo Pack",
    "brand": "PLAYZONE",
    "category": "Accessories",
    "categorySlug": "accessories",
    "price": 1450,
    "originalPrice": 1950,
    "discountPercent": 26,
    "badge": "COMBO SAVE 26%",
    "rating": 4.8,
    "reviewsCount": 84,
    "inStock": true,
    "stockCount": 25,
    "images": [
      "/images/categories/batting_pads.png"
    ],
    "shortDescription": "Essential bat preparation kit with hardwood knocking mallet, raw linseed oil bottle, and clear anti-scuff sheet with edge tape.",
    "description": "Prepare and maintain your new English willow or Kashmir willow bat like a professional. Hardwood mallet condenses the willow fibres to prevent surface cracks and ensure longevity.",
    "highlights": [
      "Heavy hardwood knocking mallet with curved striking head",
      "100ml Cold-Pressed Raw Linseed Oil bottle",
      "Full-blade Clear Extratec Scuff Sheet with reinforced edge tape",
      "Step-by-step knocking instructions card included"
    ],
    "specs": [
      {
        "label": "Contents",
        "value": "Mallet + Scuff Sheet + 100ml Linseed Oil"
      },
      {
        "label": "Application",
        "value": "All English & Kashmir Willow Bats"
      },
      {
        "label": "Origin",
        "value": "India / Bangladesh"
      }
    ],
    "warranty": "Standard Manufacturer Specification",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "cricket-training-agility-set",
    "slug": "cricket-training-agility-set",
    "name": "Cricket Training Agility Set (Cones + Ladder + Speed Hurdles)",
    "brand": "PLAYZONE",
    "category": "Accessories",
    "categorySlug": "accessories",
    "price": 2600,
    "originalPrice": 3400,
    "discountPercent": 24,
    "badge": "COMBO SAVE 24%",
    "rating": 4.7,
    "reviewsCount": 52,
    "inStock": true,
    "stockCount": 15,
    "images": [
      "/images/categories/training_gear.png"
    ],
    "shortDescription": "Comprehensive fielding and bowling conditioning kit featuring 6m speed agility ladder, 10 space marker cones, and 4 mini hurdles.",
    "description": "Designed for cricket coaches, academies, and fast bowlers seeking explosive first-step quickness, lateral agility, and run-up deceleration stability.",
    "highlights": [
      "Heavy-duty 6m agility ladder with adjustable non-slip rungs",
      "10 high-visibility flexible marker cones with carry handle",
      "4 lightweight shatter-proof speed training hurdles",
      "Includes compact nylon draw-string carry bag"
    ],
    "specs": [
      {
        "label": "Ladder Length",
        "value": "6 Meters (12 Rungs)"
      },
      {
        "label": "Cones",
        "value": "10 Flexible Space Markers"
      },
      {
        "label": "Hurdles",
        "value": "4 Speed Hurdles (6-inch)"
      }
    ],
    "warranty": "Official PLAYZONE 6-Month Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "wicketkeeper-pro-combo-set",
    "slug": "wicketkeeper-pro-combo-set",
    "name": "Pro Wicketkeeping Kit (Gloves + Padded Inners + Legguards)",
    "brand": "PLAYZONE",
    "category": "Wicketkeeping",
    "categorySlug": "wicketkeeping",
    "price": 7900,
    "originalPrice": 9900,
    "discountPercent": 20,
    "badge": "COMBO SAVE 20%",
    "rating": 4.8,
    "reviewsCount": 46,
    "inStock": true,
    "stockCount": 7,
    "images": [
      "/images/categories/batting_pads.png"
    ],
    "shortDescription": "Complete wicketkeeper match kit with octopus-grip aniline leather gloves, chamois padded inners, and compact lightweight pads.",
    "description": "Tailored specifically for modern wicketkeepers standing up to the stumps and standing back to express pacers. Combines supreme palm cushioning with flexible short-shin legguards.",
    "highlights": [
      "Octopus rubber web facing for supreme ball grip and catch retention",
      "High-density foam padded chamois palm inner gloves included",
      "Compact lightweight legguards allowing instant crouching and mobility",
      "Compliant with international MCC Law 27 wicketkeeping specifications"
    ],
    "specs": [
      {
        "label": "Gloves",
        "value": "Full Aniline Leather with Webbing"
      },
      {
        "label": "Inners",
        "value": "Chamois Padded Palm Inners"
      },
      {
        "label": "Pads",
        "value": "Short-Shin Ultra-Lightweight Legguards"
      }
    ],
    "sizes": [
      "Men's Standard (Adult)",
      "Youth"
    ],
    "warranty": "1 Year Official Brand Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "leather-match-balls-pack-6",
    "slug": "leather-match-balls-pack-6",
    "name": "Regulation 4-Piece Leather Match Balls (Box of 6)",
    "brand": "SG Cricket",
    "category": "Bowling Gear",
    "categorySlug": "bowling",
    "price": 4800,
    "originalPrice": 6000,
    "discountPercent": 20,
    "badge": "BOX COMBO",
    "rating": 4.8,
    "reviewsCount": 88,
    "inStock": true,
    "stockCount": 18,
    "images": [
      "/images/categories/cricket_balls.png"
    ],
    "shortDescription": "Box of 6 regulation 4-piece alum-tanned leather cricket match balls. Hand-stitched with prominent seam for swing and seam bowlers.",
    "description": "Standard regulation 156g cricket match balls ideal for tournament play, premier league fixtures, and academy turf matches. Features Portuguese cork core and waterproof polish.",
    "highlights": [
      "Box of 6 match balls (156g standard adult match weight)",
      "Grade 1 alum-tanned leather with prominent hand-stitched seam",
      "75-80 overs shape retention guarantee under subcontinental conditions",
      "Available in Classic Red or White Day/Night specifications"
    ],
    "specs": [
      {
        "label": "Quantity",
        "value": "Box of 6 Balls"
      },
      {
        "label": "Construction",
        "value": "4-Piece Hand Stitched"
      },
      {
        "label": "Core",
        "value": "Portuguese Compressed Cork & Worsted Yarn"
      },
      {
        "label": "Weight",
        "value": "156g per ball"
      }
    ],
    "colors": [
      "Red",
      "White"
    ],
    "warranty": "Shape Retention Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "sg-tournament-white-ball",
    "slug": "sg-tournament-white-ball",
    "name": "SG Tournament Special White Match Ball",
    "brand": "SG Cricket",
    "category": "Bowling Gear",
    "categorySlug": "bowling",
    "price": 2400,
    "originalPrice": 2800,
    "discountPercent": 14,
    "badge": "NEW",
    "rating": 4.8,
    "reviewsCount": 64,
    "inStock": true,
    "stockCount": 20,
    "images": [
      "/images/categories/cricket_balls.png"
    ],
    "shortDescription": "Single premium white leather cricket match ball for limited-overs and day/night matches with brilliant night-light visibility.",
    "description": "Engineered specifically for high-intensity T20 and 50-over matches under floodlights. High-visibility white leather finish with pronounced central seam that aids conventional and reverse swing.",
    "highlights": [
      "Grade 1 alum-tanned imported white hide",
      "High visibility under both daylight and floodlit conditions",
      "Retains hardness and seam prominence for 50+ overs",
      "Used across regional Bangladesh premier leagues"
    ],
    "specs": [
      {
        "label": "Pieces",
        "value": "4-Piece Construction"
      },
      {
        "label": "Weight",
        "value": "156g Regulation"
      },
      {
        "label": "Color",
        "value": "White Match Ball"
      }
    ],
    "warranty": "Match Shape Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "speed-agility-ladder-set",
    "slug": "speed-agility-ladder-set",
    "name": "Speed Agility Ladder & Hurdle Training Kit",
    "brand": "PLAYZONE",
    "category": "Accessories",
    "categorySlug": "accessories",
    "price": 1850,
    "originalPrice": 2400,
    "discountPercent": 23,
    "badge": "NEW",
    "rating": 4.7,
    "reviewsCount": 49,
    "inStock": true,
    "stockCount": 14,
    "images": [
      "/images/categories/training_gear.png"
    ],
    "shortDescription": "Speed ladder and hurdle set engineered for fast bowler run-ups, footwork drills, and agility training.",
    "description": "Essential physical conditioning equipment for fast bowlers and outfielders. Develops fast feet, stride rhythm, and knee-drive power.",
    "highlights": [
      "Adjustable flat plastic rungs resistant to heavy cleats",
      "Includes stakes for firm anchoring on grass and turf pitches",
      "Lightweight travel pouch for easy transport to practice grounds"
    ],
    "specs": [
      {
        "label": "Length",
        "value": "4.5 Meters"
      },
      {
        "label": "Rungs",
        "value": "10 Flat Heavy-Duty PVC Rungs"
      }
    ],
    "warranty": "6-Month Brand Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "adidas-22yds-bowling-spikes",
    "slug": "adidas-22yds-bowling-spikes",
    "name": "Adidas 22YDS Metal Spikes (Pre-Owned)",
    "brand": "Adidas",
    "category": "Shoes",
    "categorySlug": "shoes",
    "price": 4400,
    "originalPrice": 7200,
    "discountPercent": 39,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.7,
    "reviewsCount": 39,
    "inStock": true,
    "stockCount": 4,
    "images": [
      "/images/products/shoes_bags/adidas_spikes.png"
    ],
    "shortDescription": "Certified Grade A pre-owned Adidas 22YDS fast bowler metal spikes. Unmatched grip and forefoot protection during delivery stride.",
    "description": "The Adidas 22YDS line is universally celebrated by fast bowlers for its midfoot torsional stability and impact cushioning. Fully sanitized with intact spike threads and fresh replaceable metal studs.",
    "highlights": [
      "Grade A pre-owned condition with 100% clean soleplate and intact studs",
      "BOUNCE midsole cushioning reducing ground reaction force on bowling stride",
      "Mid-cut ankle support protecting bowlers on firm outdoor wickets",
      "Sanitized and verified by PLAYZONE footwear specialists"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Studs",
        "value": "Full Metal Spikes (Replaceable)"
      },
      {
        "label": "Upper",
        "value": "Breathable Synthetic Mesh"
      }
    ],
    "sizes": [
      "UK 7 / EU 41",
      "UK 8 / EU 42",
      "UK 9 / EU 43",
      "UK 10 / EU 44"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "target-stumps-heavy-base",
    "slug": "target-stumps-heavy-base",
    "name": "Target Stumps with Spring Return Heavy Base",
    "brand": "PLAYZONE",
    "category": "Bowling Gear",
    "categorySlug": "bowling",
    "price": 2800,
    "originalPrice": 3500,
    "discountPercent": 20,
    "badge": "NEW",
    "rating": 4.6,
    "reviewsCount": 33,
    "inStock": true,
    "stockCount": 11,
    "images": [
      "/images/categories/stumps.png"
    ],
    "shortDescription": "Heavy cast-iron base target stumps with high-tension spring mechanism for target bowling and fielding drills.",
    "description": "Eliminate the need to hammer wooden stumps into concrete or turf practice nets. Heavy stable base stays upright during direct hits, snapping back automatically after every ball.",
    "highlights": [
      "Heavy weighted cast-iron base preventing tipping on hard surfaces",
      "High-tension zinc-coated dual springs for instant snap-back return",
      "Hardwood stumps coated with high-visibility weather-resistant varnish",
      "Suitable for indoor gym, cement turf, or outdoor pitch practice"
    ],
    "specs": [
      {
        "label": "Base Weight",
        "value": "6.5 kg Heavy Cast Iron"
      },
      {
        "label": "Stumps",
        "value": "Regulation 28-inch Wooden Stumps"
      },
      {
        "label": "Mechanism",
        "value": "Dual Return Springs"
      }
    ],
    "warranty": "1 Year Frame Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "kookaburra-turf-white-preowned",
    "slug": "kookaburra-turf-white-preowned",
    "name": "Kookaburra Turf Match Ball 4-Pc (Grade A Pre-Owned)",
    "brand": "Kookaburra",
    "category": "Bowling Gear",
    "categorySlug": "bowling",
    "price": 1450,
    "originalPrice": 2200,
    "discountPercent": 34,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.7,
    "reviewsCount": 45,
    "inStock": true,
    "stockCount": 8,
    "images": [
      "/images/categories/cricket_balls.png"
    ],
    "shortDescription": "Certified Grade A pre-owned Kookaburra Turf white match ball. Tested for seam hardness and true spherical balance.",
    "description": "Slightly used match balls taken from official premier club games with minimum 40 overs of high-intensity play remaining. Perfect for high-level net practice and academy match simulations.",
    "highlights": [
      "Grade A pre-owned condition with clean prominent seam",
      "Real Kookaburra Turf feel and swing response at a budget price",
      "Verified for true spherical shape and balance"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Weight",
        "value": "156g Standard"
      },
      {
        "label": "Color",
        "value": "White Day/Night Ball"
      }
    ],
    "warranty": "PLAYZONE Quality Assurance",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "puma-spikes-bowler-preowned",
    "slug": "puma-spikes-bowler-preowned",
    "name": "Puma Spike 19.1 All-Rounder Shoes (Pre-Owned Grade A)",
    "brand": "Puma",
    "category": "Shoes",
    "categorySlug": "shoes",
    "price": 3200,
    "originalPrice": 5500,
    "discountPercent": 42,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.6,
    "reviewsCount": 38,
    "inStock": true,
    "stockCount": 4,
    "images": [
      "/images/products/featured_gear/puma_cricket_spikes.png"
    ],
    "shortDescription": "Certified Grade A pre-owned Puma Spike 19.1 cricket shoes. Lightweight hybrid spikes suited for pace bowlers and batsmen.",
    "description": "Engineered for speed, stability, and responsiveness. Features an ultra-light upper and EVA cushioned midsole, thoroughly sanitized and inspected with full stud integrity.",
    "highlights": [
      "Grade A pre-owned condition with zero upper tears and fully intact eyelets",
      "Hybrid spike configuration offering grip on dry and dewy pitches",
      "Lightweight synthetic leather upper with reinforced toe-drag guard",
      "Sanitized and deodorized by PLAYZONE"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned (Sanitized)"
      },
      {
        "label": "Sole",
        "value": "Dual Density TPU with Steel Spikes"
      }
    ],
    "sizes": [
      "UK 8 / EU 42",
      "UK 9 / EU 43",
      "UK 10 / EU 44"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "playzone-pro-wheelie-preowned",
    "slug": "playzone-pro-wheelie-preowned",
    "name": "PLAYZONE Pro Wheelie (Grade A Pre-Owned)",
    "brand": "PLAYZONE",
    "category": "Kit Bags",
    "categorySlug": "shoes",
    "price": 4600,
    "originalPrice": 8500,
    "discountPercent": 46,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.8,
    "reviewsCount": 31,
    "inStock": true,
    "stockCount": 3,
    "images": [
      "/images/products/shoes_bags/playzone_wheelie_bag.png"
    ],
    "shortDescription": "Certified Grade A pre-owned PLAYZONE Pro tractor wheelie bag. Pristine zippers, heavy-duty pull handle, and cavernous gear space.",
    "description": "Tested and graded by PLAYZONE. Holds complete batting and keeping kits with internal foam bat partition and dedicated helmet box.",
    "highlights": [
      "Grade A pre-owned condition with clean interior and zero rips",
      "Heavy-duty tractor wheels rolling smoothly over grass and curbs",
      "Reinforced carry straps with padded grip handle"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Capacity",
        "value": "140 Litres"
      }
    ],
    "sizes": [
      "XL Heavy Duty"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "nb-ck4020-preowned",
    "slug": "nb-ck4020-preowned",
    "name": "New Balance CK4020 Turf Spikes (Pre-Owned)",
    "brand": "New Balance",
    "category": "Shoes",
    "categorySlug": "shoes",
    "price": 3900,
    "originalPrice": 6900,
    "discountPercent": 43,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.7,
    "reviewsCount": 22,
    "inStock": true,
    "stockCount": 4,
    "images": [
      "/images/products/shoes_bags/nb_cricket_shoes.png"
    ],
    "shortDescription": "Certified Grade A pre-owned New Balance CK4020 cricket shoes. Engineered for artificial turf, matting, and hard clay wickets.",
    "description": "Features New Balance's plush ACTEVA midsole foam for hours of fatigue-free fielding and bowling. Fully cleaned and inspected with intact multi-directional rubber studs.",
    "highlights": [
      "Grade A pre-owned condition with spotless upper and minimal tread wear",
      "ACTEVA cushioning midsole absorbing heel-strike shock on hard turf",
      "Midfoot saddle strap providing lateral lockdown during sudden turns",
      "Sanitized and boxed with fresh laces"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Outsole",
        "value": "Multi-Stud Turf Rubber"
      },
      {
        "label": "Midsole",
        "value": "ACTEVA Lightweight Foam"
      }
    ],
    "sizes": [
      "UK 7.5",
      "UK 8.5",
      "UK 9.5"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "ss-duffle-preowned",
    "slug": "ss-duffle-preowned",
    "name": "SS Duffle Bag (Grade A Pre-Owned)",
    "brand": "SS Cricket",
    "category": "Kit Bags",
    "categorySlug": "shoes",
    "price": 2400,
    "originalPrice": 4200,
    "discountPercent": 43,
    "badge": "PRE-OWNED - GRADE A",
    "condition": "pre-owned",
    "conditionGrade": "Grade A",
    "rating": 4.5,
    "reviewsCount": 41,
    "inStock": true,
    "stockCount": 5,
    "images": [
      "/images/products/shoes_bags/ss_duffle_bag.png"
    ],
    "shortDescription": "Grade A pre-owned SS Cricket duffle bag with dual padded backpack straps and external bat holder pockets.",
    "description": "Compact and easy to transport on motorcycles or public transit. Holds full batting kit with external zip pocket for cricket bats and padded shoulder harness.",
    "highlights": [
      "Grade A pre-owned condition with smooth zip runners and no tears",
      "Comfortable backpack straps with ergonomic lumbar padding",
      "Side pockets fitting 2 bats securely with velcro locks"
    ],
    "specs": [
      {
        "label": "Condition",
        "value": "Grade A Pre-Owned"
      },
      {
        "label": "Carrying Style",
        "value": "Backpack Duffle"
      },
      {
        "label": "Material",
        "value": "Heavy-Duty Polyester"
      }
    ],
    "sizes": [
      "Standard Adult Duffle"
    ],
    "warranty": "30-Day PLAYZONE Guarantee",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": []
  },
  {
    "id": "playzone-team-bag",
    "slug": "playzone-team-bag",
    "name": "PLAYZONE Team Duffle Bag",
    "brand": "PLAYZONE",
    "category": "Kit Bags",
    "categorySlug": "shoes",
    "price": 5800,
    "originalPrice": 6800,
    "discountPercent": 15,
    "badge": "POPULAR",
    "rating": 4.4,
    "reviewsCount": 54,
    "inStock": true,
    "stockCount": 10,
    "images": [
      "/images/products/featured_gear/playzone_team_bag.png"
    ],
    "shortDescription": "Club team equipment bag designed to hold multiple kits, team balls, and stumps with reinforced base skid rails.",
    "description": "The ultimate solution for club teams, academy coaches, and touring squads. Constructed with tear-resistant ripstop canvas and reinforced load-bearing webbing straps.",
    "highlights": [
      "Massive capacity accommodating shared team gear or dual player kits",
      "Waterproof reinforced bottom panel with skid-proof rubber feet",
      "Heavy-duty double industrial zippers with padlock compatibility",
      "Comfort-padded grab handles on both ends for two-person team carry"
    ],
    "specs": [
      {
        "label": "Capacity",
        "value": "160 Litres Extra Large"
      },
      {
        "label": "Material",
        "value": "Ripstop 1200D Waterproof Canvas"
      },
      {
        "label": "Zippers",
        "value": "Industrial Grade Heavy-Duty Dual Zips"
      }
    ],
    "sizes": [
      "Team XL"
    ],
    "warranty": "1 Year Official PLAYZONE Warranty",
    "deliveryDaysDhaka": "24 Hours",
    "deliveryDaysNationwide": "2 - 3 Days",
    "reviews": [
      {
        "author": "Coach Mahmud",
        "verified": true,
        "rating": 5,
        "date": "October 24, 2026",
        "title": "Carries our entire academy kit effortlessly",
        "comment": "Fits 6 bats, 4 sets of pads, and all our match balls. Extremely tough fabric.",
        "location": "Dhanmondi Cricket Academy"
      }
    ]
  },
];

export function getProductBySlug(slug: string): Product | null {
  const normalized = slug.trim().toLowerCase();
  const directMatch = ALL_PRODUCTS.find(
    (p) => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized
  );
  if (directMatch) return directMatch;

  // Fallback match by partial or id contains
  const partialMatch = ALL_PRODUCTS.find(
    (p) => p.slug.toLowerCase().includes(normalized) || normalized.includes(p.slug.toLowerCase())
  );
  if (partialMatch) return partialMatch;

  // Intelligent fallback generator so any slug generates a consistent, beautiful product details page
  const humanTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    id: slug,
    slug: slug,
    name: humanTitle || "PLAYZONE Professional Cricket Gear",
    brand: "PLAYZONE Authentic",
    category: "Cricket Equipment",
    categorySlug: "shop-cricket",
    price: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stockCount: 10,
    images: ["/images/products/bats/sg_bat.png"],
    shortDescription:
      "Premium cricket gear crafted for supreme match performance and durability on Bangladesh pitches.",
    description:
      "Precision-crafted cricket equipment from PLAYZONE. Tested by professional club players to ensure international standard resilience, balance, and impact performance.",
    highlights: [
      "100% Genuine and authentic cricket gear",
      "Selected for match performance under Bangladesh conditions",
      "Direct delivery from PLAYZONE with Cash on Delivery",
    ],
    specs: [
      { label: "Category", value: "Cricket Gear" },
      { label: "Authenticity", value: "100% Genuine" },
      { label: "Origin", value: "Imported" },
    ],
    sizes: ["Standard Adult", "Youth"],
    warranty: "Official Brand Warranty",
    deliveryDaysDhaka: "24 Hours",
    deliveryDaysNationwide: "2 - 3 Days",
    reviews: [],
  };
}

export function getRelatedProducts(currentSlug: string, limit = 5): Product[] {
  const current = getProductBySlug(currentSlug);
  return ALL_PRODUCTS.filter((p) => p.slug !== currentSlug && (p.categorySlug === current?.categorySlug || p.category === current?.category))
    .concat(ALL_PRODUCTS.filter((p) => p.slug !== currentSlug))
    .slice(0, limit);
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return views.toString();
}

export function getProductViews(product: { id?: string; reviewsCount?: number; viewsCount?: number }): string {
  if (product.viewsCount) {
    return formatViews(product.viewsCount);
  }
  const base = product.reviewsCount || 24;
  const hash = (product.id || "gear").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const views = base * 15 + (hash % 450) + 180;
  return formatViews(views);
}

