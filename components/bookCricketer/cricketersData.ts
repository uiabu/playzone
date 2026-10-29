export interface Cricketer {
  id: string;
  name: string;
  bengaliName: string;
  role: string;
  tier: "National Legend" | "Active International" | "Domestic / BPL Icon" | "Rising Talent";
  specialties: string[];
  imageSrc: string;
  shortBio: string;
  fullBio: string;
  careerHighlights: string[];
  stats: {
    matches: string | number;
    runs?: string | number;
    wickets?: string | number;
    centuries?: string | number;
    fifties?: string | number;
    bestBowling?: string;
    catches?: string | number;
    pace?: string;
    economy?: string;
    captaincyWins?: string;
    strikeRate?: string;
    [key: string]: string | number | undefined;
  };
  suitableEvents: string[];
  languages: string[];
  verified: boolean;
  featured?: boolean;
}

export const EVENT_TYPES = [
  "Corporate Annual Gala & Awards",
  "Tournament Chief Guest & Trophy Unveiling",
  "Brand Ambassador & Commercial Shoot",
  "Youth Masterclass & Cricket Clinic",
  "School / College Sports Day Chief Guest",
  "Exhibition & Friendly Match Appearance",
  "Keynote Motivational Speech",
  "Private Meet & Greet Session",
  "Product Launch & Endorsement",
  "Other Custom Event",
];

export const BUDGET_RANGES = [
  "৳৫০,০০০ - ৳১,০০,০০০ (Emerging / Domestic)",
  "৳১,০০,০০০ - ৳২,৫০,০০০ (Senior Domestic / BPL)",
  "৳২,৫০,০০০ - ৳৫,০০,০০০ (National Players)",
  "৳৫,০০,০০০ - ৳১০,০০,০০০+ (National Legends & Global Icons)",
  "Open for Quotation / To be Discussed",
];

export const CRICKETERS_DATA: Cricketer[] = [
  {
    id: "tamim-iqbal",
    name: "Tamim Iqbal",
    bengaliName: "তামিম ইকবাল খান",
    role: "Former Captain & Legendary Opening Batter",
    tier: "National Legend",
    specialties: [
      "Corporate Brand Ambassador",
      "Tournament Chief Guest",
      "Motivational Speaking",
      "High-Profile Gala Appearance",
    ],
    imageSrc: "/images/reviews/tamim_iqbal.jpg",
    shortBio:
      "One of Bangladesh's most prolific batsmen in history, former national captain, and the leading international run-scorer across all formats.",
    fullBio:
      "Tamim Iqbal Khan is widely celebrated as the greatest opening batsman Bangladesh has produced. With over 15,000 international runs and 25 centuries, he led Bangladesh to monumental ODI series victories and has represented international franchises globally. Known for his charismatic presence, authoritative leadership, and media eloquence, Tamim is the premier choice for major corporate events, tournament inaugurations, and brand ambassadorships.",
    careerHighlights: [
      "15,000+ International Runs across Tests, ODIs & T20Is",
      "25 International Centuries (Most for Bangladesh)",
      "Lord's Test Century (Honours Board inductee in 2010)",
      "Captained Bangladesh to historic ODI series wins in South Africa and home series against top nations",
      "Multiple BPL championship-winning captain with Fortune Barishal & Comilla Victorians",
    ],
    stats: {
      matches: "391",
      runs: "15,249",
      centuries: 25,
      fifties: 94,
      catches: 130,
    },
    suitableEvents: [
      "Corporate Annual Gala & Awards",
      "Tournament Chief Guest & Trophy Unveiling",
      "Brand Ambassador & Commercial Shoot",
      "Keynote Motivational Speech",
      "High-End Brand Launches",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: true,
  },
  {
    id: "shakib-al-hasan",
    name: "Shakib Al Hasan",
    bengaliName: "সাকিব আল হাসান",
    role: "Former Captain & World-Class All-Rounder",
    tier: "National Legend",
    specialties: [
      "Global Brand Campaign",
      "Corporate Summit Keynote",
      "Tournament Inauguration",
      "Elite Cricket Masterclass",
    ],
    imageSrc: "/images/reviews/shakib_al_hasan.jpg",
    shortBio:
      "Considered the greatest cricketer in Bangladesh's history and undisputed #1 ICC all-rounder across all three formats for over a decade.",
    fullBio:
      "Shakib Al Hasan is a bona fide global icon and the undisputed pinnacle of Bangladesh cricket. Ranking as the world's premier all-rounder across Tests, ODIs, and T20Is simultaneously, Shakib has achieved historic double feats including 14,000+ international runs and 690+ wickets. His presence elevates international brand campaigns, corporate leadership summits, and world-class sporting tournaments.",
    careerHighlights: [
      "Over 14,000 International Runs & 690+ International Wickets",
      "Ranked ICC #1 All-Rounder across Tests, ODIs & T20Is simultaneously",
      "Historic 2019 ICC World Cup: 606 runs and 11 wickets",
      "Fastest cricketer in history to achieve 5,000 runs and 250 wickets in ODIs",
      "Global franchise star in IPL (KKR, SRH), CPL, BBL, PSL, and BPL",
    ],
    stats: {
      matches: "447",
      runs: "14,406",
      wickets: "712",
      centuries: 14,
      fifties: 99,
      bestBowling: "7/36",
    },
    suitableEvents: [
      "Brand Ambassador & Commercial Shoot",
      "Corporate Summit Keynote",
      "Tournament Chief Guest & Trophy Unveiling",
      "Global Brand Campaigns",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: true,
  },
  {
    id: "mushfiqur-rahim",
    name: "Mushfiqur Rahim",
    bengaliName: "মুশফিকুর রহিম",
    role: "Former Captain & Veteran Wicketkeeper-Batter",
    tier: "National Legend",
    specialties: [
      "Youth & Academy Masterclass",
      "Sports Day Chief Guest",
      "Discipline & Work-Ethic Talk",
      "Cricket Gear Brand Ambassador",
    ],
    imageSrc: "/images/reviews/mushfiqur_rahim.jpg",
    shortBio:
      "The symbol of relentless work ethic and resilience, first Bangladeshi to score a Test double-century, and holder of 14,000+ international runs.",
    fullBio:
      "Mushfiqur Rahim is revered as the epitome of hard work, dedication, and technical discipline in Bangladesh cricket. Having made his international debut at just 16 years old at Lord's, he went on to become Bangladesh's first Test double-centurion and one of the finest wicketkeeper-batters in Asian cricket. Mushfiqur is exceptionally popular for inspiring young athletes, academic institutions, and brands emphasizing precision and dedication.",
    careerHighlights: [
      "First Bangladeshi batter to score an international Test Double Century (200 vs Sri Lanka)",
      "Only Bangladeshi cricketer with multiple Test double centuries",
      "14,000+ International runs and 450+ wicketkeeping dismissals",
      "Captained Bangladesh to famous Test wins over England and Australia",
      "Awarded National Sports Recognition for longevity and sportsmanship",
    ],
    stats: {
      matches: "450+",
      runs: "14,800+",
      centuries: 19,
      fifties: 78,
      catches: "400+ dismissals",
    },
    suitableEvents: [
      "Youth Masterclass & Cricket Clinic",
      "School / College Sports Day Chief Guest",
      "Motivational Work-Ethic Speech",
      "Tournament Chief Guest",
      "Sports Equipment Endorsements",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: true,
  },
  {
    id: "mahmudullah-riyad",
    name: "Mahmudullah Riyad",
    bengaliName: "মাহমুদুল্লাহ রিয়াদ",
    role: "Senior All-Rounder, T20 Specialist & Clutch Finisher",
    tier: "National Legend",
    specialties: [
      "Clutch Performance Mentorship",
      "Corporate Team Building Keynote",
      "Tournament Final Chief Guest",
      "Commercial Endorsement",
    ],
    imageSrc: "/images/reviews/mahmudullah_riyad.jpg",
    shortBio:
      "Bangladesh's legendary clutch player, first Bangladeshi to score a century in a World Cup, and respected captain known as 'Silent Killer'.",
    fullBio:
      "Mahmudullah Riyad is loved for his cool composure under immense match pressure and clutch performances in world tournaments. Famous for scoring back-to-back World Cup centuries against England and New Zealand in 2015, Riyad has been the backbone of Bangladesh's middle order for nearly two decades. His calm personality and strategic acumen make him an outstanding guest for corporate team-building events and awards ceremonies.",
    careerHighlights: [
      "First Bangladeshi to score a century in ICC Cricket World Cup history (103 vs England, 2015)",
      "Back-to-back World Cup centuries in 2015 against England & New Zealand",
      "10,000+ International runs and 160+ wickets across formats",
      "Former Bangladesh T20I captain and multi-time BPL winning skipper",
      "Celebrated as 'Mr. Composure' for ice-cold match finishes",
    ],
    stats: {
      matches: "420+",
      runs: "10,800+",
      wickets: 165,
      centuries: 8,
      fifties: 55,
      bestBowling: "5/51",
    },
    suitableEvents: [
      "Corporate Team Building & Pressure Management",
      "Tournament Final Chief Guest",
      "Brand Ambassador & Commercial Shoot",
      "Private Meet & Greet Session",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: true,
  },
  {
    id: "mohammad-ashraful",
    name: "Mohammad Ashraful",
    bengaliName: "মোহাম্মদ আশরাফুল",
    role: "Former Captain & Prodigious International Batter",
    tier: "National Legend",
    specialties: [
      "Youth Talent Development",
      "Inspirational Comeback Stories",
      "Tournament Chief Guest",
      "Exhibition Match Player",
    ],
    imageSrc: "/images/reviews/mohammad_ashraful.jpg",
    shortBio:
      "The youngest Test centurion in cricket history (17y 61d), former national captain, and one of the most naturally gifted stroke-makers in the game.",
    fullBio:
      "Mohammad Ashraful captivated the cricket universe in 2001 by becoming the youngest Test centurion in cricket history at Colombo against Sri Lanka at just 17 years old. Known for his sensational batting masterclasses against Australia (Cardiff 2005) and South Africa (World Cup 2007), Ashraful remains a widely beloved cricket personality who continues to inspire grassroots cricketers with his pure passion for the sport.",
    careerHighlights: [
      "Youngest Test Centurion in cricket history at age 17 years 61 days",
      "Architect of the historic 2005 Cardiff triumph over world champions Australia (100 off 101 balls)",
      "Sensational 87 vs South Africa in 2007 World Cup",
      "Former captain of Bangladesh across all formats",
      "Level-3 Certified Coach and active domestic cricket mentor",
    ],
    stats: {
      matches: "261",
      runs: "6,655",
      centuries: 6,
      fifties: 30,
      wickets: 47,
    },
    suitableEvents: [
      "School / College Sports Day Chief Guest",
      "Youth Masterclass & Cricket Clinic",
      "Exhibition & Friendly Match Appearance",
      "Tournament Chief Guest & Trophy Unveiling",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "taskin-ahmed",
    name: "Taskin Ahmed",
    bengaliName: "তাসকিন আহমেদ",
    role: "National Fast Bowler & Pace Spearhead",
    tier: "Active International",
    specialties: [
      "Youth Fitness & Fast Bowling Clinic",
      "Brand Ambassador for Lifestyle & Sports",
      "Corporate Keynote on Resilience",
      "Sports Gala Chief Guest",
    ],
    imageSrc: "/images/experts/fast_bowling_coach.png",
    shortBio:
      "Bangladesh's charismatic express pace spearhead, renowned for 145+ km/h thunderbolts, infectious energy, and immense youth fan following.",
    fullBio:
      "Taskin Ahmed represents the heart and speed of modern Bangladesh fast bowling. Clocking 140-148 km/h consistently, Taskin made history on his ODI debut taking 5 wickets against India. Having engineered an inspirational fitness and technical transformation, Taskin is one of the most marketable and dynamic athletes in Bangladesh, adored for his positive spirit, work ethic, and stylish media presence.",
    careerHighlights: [
      "ODI debut 5-wicket haul (5/28) against India at Mirpur",
      "Pace spearhead in back-to-back T20 World Cups and ODI World Cups",
      "Key match-winner in historic Test and ODI series victories in South Africa",
      "Icon player and pace talisman across Bangladesh Premier League",
    ],
    stats: {
      matches: "155+",
      wickets: "210+",
      bestBowling: "5/28",
      pace: "140 - 148 km/h",
    },
    suitableEvents: [
      "Youth Fitness & Fast Bowling Clinic",
      "Brand Ambassador & Commercial Shoot",
      "Corporate Keynote on Resilience & Fitness",
      "Tournament Inauguration & Chief Guest",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: true,
  },
  {
    id: "mustafizur-rahman",
    name: "Mustafizur Rahman",
    bengaliName: "মুস্তাফিজুর রহমান (দ্য ফিজ)",
    role: "International Pacer & World-Renowned Cutter Specialist",
    tier: "Active International",
    specialties: [
      "Global Tournament Chief Guest",
      "Brand Ambassador & Commercial Shoot",
      "Bowling Masterclass on Cutters & Variations",
      "Youth Sports Academy Visits",
    ],
    imageSrc: "/images/foundation/card_1_rafi_islam.jpg",
    shortBio:
      "World-famous 'The Fizz', IPL champion, and the master of disguised off-cutters and lethal death overs bowling in international cricket.",
    fullBio:
      "Mustafizur Rahman took the international cricket arena by storm in 2015 with his unplayable off-cutters, taking 11 wickets in his first two ODIs against India. He went on to win the IPL with Sunrisers Hyderabad (named Emerging Player of the Tournament) and remains one of the world's most sought-after death bowlers in franchise leagues worldwide. Mustafizur brings authentic grassroots charm and global pedigree to any event.",
    careerHighlights: [
      "First bowler in cricket history to win Player of the Match in both Test & ODI debuts",
      "IPL Emerging Player of the Year (2016) with Sunrisers Hyderabad & Chennai Super Kings mainstay",
      "Over 320 international wickets across formats",
      "World record for most wickets in first 2 ODIs (11 wickets)",
    ],
    stats: {
      matches: "220+",
      wickets: "330+",
      bestBowling: "6/43",
      economy: "Lethal Death Specialist",
    },
    suitableEvents: [
      "Brand Ambassador & Commercial Shoot",
      "Tournament Chief Guest & Trophy Unveiling",
      "Youth Cricket Academy Visits",
      "Corporate Sports Day Appearances",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "mehidy-hasan-miraz",
    name: "Mehidy Hasan Miraz",
    bengaliName: "মেহেদী হাসান মিরাজ",
    role: "National Vice Captain & Spin Bowling All-Rounder",
    tier: "Active International",
    specialties: [
      "Leadership & All-Rounder Masterclass",
      "Corporate Leadership Talks",
      "Brand Ambassador & Commercials",
      "Tournament Chief Guest",
    ],
    imageSrc: "/images/foundation/card_3_tariq_ahmed.jpg",
    shortBio:
      "Former U-19 World Cup winning captain, senior national vice-captain, and one of the finest all-round talents with centuries and 10-wicket match hauls.",
    fullBio:
      "Mehidy Hasan Miraz burst onto the Test scene in 2016 by dismantling England with 19 wickets in a two-match series at just 19 years old. Since then, Miraz has transformed into a world-class all-rounder, smashing match-winning ODI centuries against India and batting heroics under high pressure. With his leadership experience and infectious enthusiasm, Miraz is a sensational speaker for youth and corporate audiences.",
    careerHighlights: [
      "19 wickets in debut Test series against England (2016)",
      "Player of the Tournament at the 2016 ICC U-19 Cricket World Cup",
      "Spectacular match-winning ODI century batting at #8 against India",
      "Vice Captain of the Bangladesh National Cricket Team",
      "Over 3,000 international runs and 280+ wickets",
    ],
    stats: {
      matches: "190+",
      runs: "3,200+",
      wickets: "295+",
      centuries: 3,
      bestBowling: "7/58",
    },
    suitableEvents: [
      "Corporate Leadership & Teamwork Talks",
      "Youth Masterclass & Cricket Clinic",
      "Tournament Chief Guest & Trophy Unveiling",
      "Brand Ambassador & Commercial Shoot",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "habibul-bashar",
    name: "Habibul Bashar Sumon",
    bengaliName: "হাবিবুল বাশার সুমন",
    role: "Former National Captain, Selector & Cricket Analyst",
    tier: "National Legend",
    specialties: [
      "Cricket Governance & Leadership Talk",
      "Tournament Chief Guest & Analyst",
      "Corporate Strategy & Team Building",
      "Panel Discussion & Media Expert",
    ],
    imageSrc: "/images/experts/head_coach.jpg",
    shortBio:
      "Bangladesh's historic winning captain known as 'Mr. Fifty', who steered Bangladesh to their first Test victory and 2007 World Cup triumphs.",
    fullBio:
      "Habibul Bashar Sumon is one of the most respected figures in Bangladesh cricket history. As captain, he led Bangladesh to its very first Test match victory in 2005 against Zimbabwe and captained the team during the fairytale 2007 World Cup victories over India and South Africa. Sumon has served as a senior BCB National Selector and cricket administrator, bringing unparalleled strategic insight and executive presence to events.",
    careerHighlights: [
      "Captained Bangladesh to their historic first-ever Test victory in 2005",
      "Led Bangladesh to 2007 World Cup victories over India and South Africa",
      "First Bangladeshi batter to score 3,000 Test runs",
      "Served over a decade as BCB National Selector and cricket administrator",
    ],
    stats: {
      matches: "161",
      runs: "5,190",
      fifties: 38,
      captaincyWins: "Historic First Test & ODI series wins",
    },
    suitableEvents: [
      "Corporate Strategy & Cricket Governance Talks",
      "Tournament Chief Guest & Awards Ceremony",
      "Panel Discussions & Media Appearances",
      "Annual Sports Gala Speaker",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "shahriar-nafees",
    name: "Shahriar Nafees",
    bengaliName: "শাহরিয়ার নাফীস",
    role: "Former International Opener & BCB Operations In-Charge",
    tier: "National Legend",
    specialties: [
      "Cricket Administration & Professionalism",
      "Batting Clinic & Left-Handed Technique",
      "Corporate Chief Guest & Speaker",
      "School Sports Day Guest",
    ],
    imageSrc: "/images/foundation/card_2_mahdi_hasan.jpg",
    shortBio:
      "First Bangladeshi to score 1,000 ODI runs in a calendar year, stylish left-handed batsman, and respected cricket operations executive.",
    fullBio:
      "Shahriar Nafees was the premier left-handed batsman who took Bangladesh cricket to new heights in 2006, scoring over 1,000 ODI runs in a single year with three centuries against Zimbabwe and Australia. Known for his elegant cover drives and articulate communication, Nafees holds executive roles in cricket administration and is a favored speaker on sports professionalism, education, and career management.",
    careerHighlights: [
      "First Bangladeshi to score 1,000+ ODI runs in a single calendar year (2006)",
      "Magnificent Test century against Australia at Fatullah (138 runs)",
      "Former Bangladesh vice-captain and T20 international captain",
      "Prominent cricket administrator and operations specialist",
    ],
    stats: {
      matches: "99",
      runs: "3,478",
      centuries: 5,
      fifties: 17,
    },
    suitableEvents: [
      "School / College Sports Day Chief Guest",
      "Cricket Operations & Professionalism Talks",
      "Batting Masterclass & Cricket Clinics",
      "Corporate Gala & Awards Ceremony",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "towhid-hridoy",
    name: "Towhid Hridoy",
    bengaliName: "তাওহীদ হৃদয়",
    role: "Dynamic Middle-Order International Batter",
    tier: "Rising Talent",
    specialties: [
      "T20 Batting & Power Hitting Clinic",
      "Youth Sports Inspiration",
      "Brand Shoot & Youth Ambassador",
      "College Tournament Chief Guest",
    ],
    imageSrc: "/images/foundation/card_4_naeem_uddin.jpg",
    shortBio:
      "2020 U-19 World Cup champion, dynamic T20 middle-order batter, and one of Bangladesh's most exciting young generation stars.",
    fullBio:
      "Towhid Hridoy represents the bold, fearless new wave of Bangladesh cricket. A core pillar of Bangladesh's historic 2020 ICC U-19 World Cup triumph in South Africa, Hridoy has seamlessly transitioned to the national team with explosive strike-rates and tactical maturity in pressure chases. His relatable journey and youthful dynamism resonate exceptionally well with students and modern lifestyle brands.",
    careerHighlights: [
      "2020 ICC U-19 Cricket World Cup Champion with Bangladesh",
      "Highest run-scorer and breakout sensation in Bangladesh Premier League",
      "Fastest rising T20 international batsman for Bangladesh",
    ],
    stats: {
      matches: "60+",
      runs: "1,500+",
      fifties: 11,
      strikeRate: "135+ in T20s",
    },
    suitableEvents: [
      "Youth Sports Inspiration & Meet & Greet",
      "T20 Power Hitting Masterclass",
      "College & University Tournament Chief Guest",
      "Youth Lifestyle Brand Ambassador",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
  {
    id: "ebadot-hossain",
    name: "Ebadot Hossain",
    bengaliName: "এবাদত হোসেন চৌধুরী",
    role: "Express Test & ODI Pacer (Famous Salute Celebration)",
    tier: "Domestic / BPL Icon",
    specialties: [
      "High Pace Bowling Clinic",
      "Discipline & Armed Forces Values",
      "Tournament Chief Guest",
      "Sports Day Guest of Honour",
    ],
    imageSrc: "/images/foundation/card_5_imran_hossain.jpg",
    shortBio:
      "Hero of the historic Mount Maunganui Test victory in New Zealand (6/46), Bangladesh Air Force veteran, and express fast bowler.",
    fullBio:
      "Ebadot Hossain wrote his name into world cricket folklore in January 2022 with his fiery spell of 6/46 at Mount Maunganui, bowling Bangladesh to their first-ever victory on New Zealand soil against the reigning World Test champions. Known for his iconic military salute celebration, relentless discipline, and genuine pace, Ebadot is a crowd favorite for athletic academies and military/corporate sports events.",
    careerHighlights: [
      "Historic 6/46 to defeat World Champions New Zealand at Mount Maunganui (2022)",
      "Player of the Match in Bangladesh's most historic overseas Test victory",
      "Proud Bangladesh Air Force officer and athlete",
      "High-pace enforcer across Asia Cup and World Cup tournaments",
    ],
    stats: {
      matches: "50+",
      wickets: "80+",
      bestBowling: "6/46",
      pace: "140+ km/h",
    },
    suitableEvents: [
      "School & College Sports Day Guest of Honour",
      "High-Pace Fast Bowling Masterclass",
      "Corporate Talks on Discipline & Courage",
      "Tournament Inauguration",
    ],
    languages: ["Bangla", "English"],
    verified: true,
    featured: false,
  },
];
