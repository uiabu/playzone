export type InjuryCategory =
  | "ACL Injury"
  | "Meniscus Injury"
  | "Fracture"
  | "Ligament Injury"
  | "Knee Injury"
  | "Surgery Required";

export interface SupportedCricketer {
  id: string;
  name: string;
  injury: string;
  category: InjuryCategory;
  role: string;
  club: string;
  district: string;
  locationLabel: string;
  image: string;
  status: "Under Treatment" | "In Rehabilitation" | "Returned to Cricket";
  recoveryProgressPercent: number;
  treatmentDetails: string;
  hospital: string;
  supportedYear: number;
  isSampleCase: boolean;
}

export interface EligibleInjury {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: "acl" | "fracture" | "surgery";
  coverageHighlights: string[];
}

export interface FoundationApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  district: string;
  clubOrAcademy: string;
  playingRole: string;
  injuryCategory: InjuryCategory;
  dateOfInjury: string;
  groundOrTournament: string;
  injuryDescription: string;
  hospitalName: string;
  treatingDoctor: string;
  playzoneOrderId?: string;
  estimatedCost?: string;
  documents: { name: string; size: string }[];
  status: "Submitted" | "Under Review" | "Approved" | "Completed";
  submittedAt: string;
}

// Sample cases representing realistic supported cricketers as shown in the design reference
export const SAMPLE_SUPPORTED_CRICKETERS: SupportedCricketer[] = [
  {
    id: "case-1",
    name: "Rafi Islam",
    injury: "ACL Injury",
    category: "ACL Injury",
    role: "Top-Order Batsman",
    club: "Dhanmondi Club",
    district: "Dhaka",
    locationLabel: "Club Cricketer, Dhaka",
    image: "/images/foundation/card_1_rafi_islam.jpg",
    status: "In Rehabilitation",
    recoveryProgressPercent: 75,
    treatmentDetails:
      "Full ACL reconstruction surgery support followed by 6 months of supervised sports physiotherapy and strength conditioning.",
    hospital: "National Institute of Traumatology & Orthopaedic Rehabilitation (NITOR), Dhaka",
    supportedYear: 2025,
    isSampleCase: true,
  },
  {
    id: "case-2",
    name: "Mahdi Hasan",
    injury: "Meniscus Injury",
    category: "Meniscus Injury",
    role: "Fast Bowler",
    club: "Port City Cricket Academy",
    district: "Chattogram",
    locationLabel: "Academy Player, Chattogram",
    image: "/images/foundation/card_2_mahdi_hasan.jpg",
    status: "In Rehabilitation",
    recoveryProgressPercent: 85,
    treatmentDetails:
      "Arthroscopic partial meniscectomy with joint stabilization and specialized bio-mechanical bowling load rehabilitation.",
    hospital: "Chattogram Medical Center Orthopaedic Unit",
    supportedYear: 2025,
    isSampleCase: true,
  },
  {
    id: "case-3",
    name: "Tariq Ahmed",
    injury: "Fracture",
    category: "Fracture",
    role: "Wicketkeeper Batsman",
    club: "Khulna Youth Cricket Club",
    district: "Khulna",
    locationLabel: "Club Cricketer, Khulna",
    image: "/images/foundation/card_3_tariq_ahmed.jpg",
    status: "Returned to Cricket",
    recoveryProgressPercent: 100,
    treatmentDetails:
      "Surgical reduction and internal fixation for compound finger and metacarpal fracture incurred while wicketkeeping in premier league.",
    hospital: "Khulna Specialized Hospital",
    supportedYear: 2024,
    isSampleCase: true,
  },
  {
    id: "case-4",
    name: "Naeem Uddin",
    injury: "Ligament Injury",
    category: "Ligament Injury",
    role: "All-Rounder",
    club: "Dhaka University Cricket Team",
    district: "Dhaka",
    locationLabel: "University Cricketer, Dhaka",
    image: "/images/foundation/card_4_naeem_uddin.jpg",
    status: "In Rehabilitation",
    recoveryProgressPercent: 65,
    treatmentDetails:
      "Medial collateral ligament (MCL) repair and platelet-rich plasma (PRP) therapy to avoid permanent joint instability.",
    hospital: "Apollo Hospital Sports Medicine Unit, Dhaka",
    supportedYear: 2025,
    isSampleCase: true,
  },
  {
    id: "case-5",
    name: "Imran Hossain",
    injury: "Knee Injury",
    category: "Knee Injury",
    role: "Opening Bowler",
    club: "Rajshahi District Cricket Association",
    district: "Rajshahi",
    locationLabel: "District Cricketer, Rajshahi",
    image: "/images/foundation/card_5_imran_hossain.jpg",
    status: "Under Treatment",
    recoveryProgressPercent: 40,
    treatmentDetails:
      "Patellar tendon tear surgery and complete brace immobilization with dedicated physical therapy grants.",
    hospital: "Rajshahi Medical College Hospital",
    supportedYear: 2026,
    isSampleCase: true,
  },
];

export const ELIGIBLE_INJURIES: EligibleInjury[] = [
  {
    id: "injury-acl",
    title: "ACL / Meniscus",
    subtitle: "Knee Ligament & Cartilage Tears",
    description:
      "Support for ACL or meniscus injuries requiring treatment or surgery.",
    type: "acl",
    coverageHighlights: [
      "Anterior Cruciate Ligament (ACL) full or partial tears",
      "Medial & lateral meniscus tears requiring arthroscopy",
      "Post-operative sports physiotherapy & knee braces",
    ],
  },
  {
    id: "injury-fracture",
    title: "Fractures",
    subtitle: "Bone Fractures from Impact",
    description:
      "Support for major fractures (hairline or severe) due to cricket activities.",
    type: "fracture",
    coverageHighlights: [
      "Hand, wrist, finger and thumb fractures from ball impact",
      "Clavicle, rib, ankle or tibial stress fractures",
      "Surgical plating, casting and bone healing medications",
    ],
  },
  {
    id: "injury-surgery",
    title: "Surgery Required",
    subtitle: "Major Surgeries & Hospitalization",
    description:
      "Support for other serious cricket-related injuries that require surgery.",
    type: "surgery",
    coverageHighlights: [
      "Shoulder labral / rotator cuff repair surgeries",
      "Tendon ruptures (Achilles, patellar) requiring fixation",
      "Emergency maxillofacial or eye trauma surgical care",
    ],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "1. Check Eligibility",
    subtitle: "Verify your purchase history and injury details.",
    description:
      "Must be an active player injured during genuine cricket activities with qualifying PLAYZONE order history in the last 12 months.",
    icon: "clipboard",
  },
  {
    step: "2. Submit Application",
    subtitle: "Provide medical reports and required information.",
    description:
      "Fill out the secure application form and upload MRI/X-ray scans, hospital prescriptions, and doctor's diagnostic notes.",
    icon: "document",
  },
  {
    step: "3. Get Reviewed",
    subtitle: "Our team reviews your application and informs you about the support.",
    description:
      "The Foundation medical panel verifies diagnosis and hospital quotes, disbursing direct financial grants subject to fund allocation.",
    icon: "shield",
  },
];

export const FOUNDATION_FAQ = [
  {
    q: "Who is eligible to apply for the PLAYZONE Foundation grant?",
    a: "Any dedicated cricketer in Bangladesh (club, academy, district, university, or division level) who suffers a severe cricket-related injury requiring surgical or intensive medical treatment and has a completed PLAYZONE purchase within the last 12 months.",
  },
  {
    q: "How does PLAYZONE purchase history affect my eligibility?",
    a: "Recent purchase history verifies you are an active cricketer within the PLAYZONE sports ecosystem. However, purchase history alone does not guarantee approval; all cases undergo stringent medical review by our sports physio panel.",
  },
  {
    q: "How is financial assistance disbursed?",
    a: "To guarantee transparency and prevent fraud, funds are paid directly to verified hospitals, orthopedic clinics, or accredited physical therapy centers on behalf of the athlete.",
  },
  {
    q: "What medical documents are mandatory?",
    a: "1) Hospital registration or doctor's prescription, 2) Official MRI, CT scan, or X-ray reports, 3) Estimated treatment or surgery cost breakdown on hospital letterhead.",
  },
];
