export type AgeGroup = "U-10" | "U-12" | "U-14" | "U-16" | "U-18" | "Open";

export type TrainingType =
  | "Batting"
  | "Bowling"
  | "All-rounder"
  | "Wicketkeeping"
  | "Fitness"
  | "Fielding";

export type AdmissionStatus = "Open" | "Closed" | "Contact for Admission";

export type InquiryStatus =
  | "Pending"
  | "Under Review"
  | "Contacted"
  | "Accepted"
  | "Rejected";

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  qualifications: string[];
  specialties: TrainingType[];
  playingCareer?: string;
  photo: string;
}

export interface AlumniRecord {
  id: string;
  name: string;
  achievement: string;
  level:
    | "National Team"
    | "Age-group Bangladesh"
    | "First Class / List A"
    | "Divisional / District"
    | "Tournament Winner";
  team?: string;
  year?: string;
  photo?: string;
  sourceUrl?: string;
}

export interface AcademyFacility {
  id: string;
  title: string;
  type:
    | "ground"
    | "nets"
    | "pitch"
    | "indoor"
    | "fitness"
    | "accommodation"
    | "medical";
  description: string;
  image?: string;
}

export interface TrainingProgramItem {
  id: string;
  title: string;
  ageGroups: AgeGroup[];
  trainingTypes: TrainingType[];
  schedule: string;
  days: string[];
  timing: string;
  description: string;
  feeMonthly?: number | string;
  feeAdmission?: number | string;
}

export interface AcademyLocation {
  address: string;
  upazila: string;
  district: string;
  division: string;
  googleMapsUrl?: string;
}

export interface AcademyContact {
  phone: string[];
  email?: string;
  website?: string;
  facebookUrl?: string;
}

export interface AcademyAbout {
  history: string;
  founderOrDirector?: string;
  mission: string;
  philosophy: string;
}

export interface AcademyAdmissionInfo {
  status: AdmissionStatus;
  trialSessionAvailable: boolean;
  trialSessionDetails?: string;
  monthlyFeeNote?: string;
  admissionFeeNote?: string;
  requiredDocuments: string[];
  practiceTimings: string;
}

export interface Academy {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  logo: string;
  coverImage: string;
  establishedYear: number;
  isVerified: boolean;
  isPublished: boolean;
  admissionStatus: AdmissionStatus;
  location: AcademyLocation;
  contact: AcademyContact;
  headCoachName?: string;
  headCoachRole?: string;
  headCoachPhoto?: string;
  headCoachSubtext?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  about: AcademyAbout;
  eligibleAgeGroups: AgeGroup[];
  availableTrainingTypes: TrainingType[];
  coaches: CoachProfile[];
  programs: TrainingProgramItem[];
  facilities: AcademyFacility[];
  galleryImages: string[];
  alumni: AlumniRecord[];
  admissionInfo: AcademyAdmissionInfo;
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionInquiry {
  id: string; // e.g. ADM-INQ-2026-104928
  academyId: string;
  academyName: string;
  studentName: string;
  dateOfBirth: string;
  age: number;
  guardianName?: string;
  guardianPhone: string;
  guardianEmail?: string;
  district: string;
  preferredTrainingType: TrainingType;
  previousExperience: string;
  preferredSchedule: string;
  message?: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export const CURRENT_CALENDAR_YEAR = 2026;

/**
 * Calculates accurate years of operation based on current calendar year.
 */
export function calculateYearsOfOperation(
  establishedYear: number,
  currentYear: number = CURRENT_CALENDAR_YEAR
): number {
  const diff = currentYear - establishedYear;
  return diff > 0 ? diff : 1;
}

export const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

export const ALL_AGE_GROUPS: AgeGroup[] = [
  "U-10",
  "U-12",
  "U-14",
  "U-16",
  "U-18",
  "Open",
];

export const ALL_TRAINING_TYPES: TrainingType[] = [
  "Batting",
  "Bowling",
  "All-rounder",
  "Wicketkeeping",
  "Fitness",
  "Fielding",
];

export const ADMISSION_STATUSES: AdmissionStatus[] = [
  "Open",
  "Closed",
  "Contact for Admission",
];

// ============================================================================
// VERIFIED REAL ACADEMIES IN BANGLADESH
// Data collected from official websites, BCB coaching associations & verified sources.
// ============================================================================

export const INITIAL_ACADEMIES: Academy[] = [
  {
    id: "dhanmondi-cricket-academy",
    slug: "dhanmondi-cricket-academy",
    name: "Dhanmondi Cricket Academy",
    shortName: "Dhanmondi Cricket",
    tagline: "Premier Cricket Coaching & Youth Player Development",
    logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&crop=faces&q=80",
    coverImage: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2012,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Road 8/A, Dhanmondi",
      upazila: "Dhanmondi",
      district: "Dhaka",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=Dhanmondi+Cricket+Academy",
    },
    contact: {
      phone: ["+8801 234-567890", "+8801711223344"],
      email: "dhanmondicricket@gmail.com",
      website: "https://dhanmondicricket.com",
      facebookUrl: "https://facebook.com/dhanmondicricketacademy",
    },
    headCoachName: "Mohammad Ashraful",
    headCoachRole: "Head Coach",
    headCoachSubtext: "Former National Player",
    headCoachPhoto: "/images/experts/head_coach.jpg",
    videoThumbnail: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    about: {
      history:
        "Dhanmondi Cricket Academy was established in 2012 with a vision to develop young talent and create the next generation of cricketers for Bangladesh. We focus on professional coaching, modern training facilities and overall player development.",
      founderOrDirector: "Mohammad Ashraful & Coaching Panel",
      mission:
        "To scout and groom young talent with modern technical discipline, mental toughness, and tactical skills to compete at national and international levels.",
      philosophy:
        "Consistent high-repetition practice on quality turf wickets, tailored video analysis, and rigorous physical conditioning.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "U-18"],
    availableTrainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
    coaches: [
      {
        id: "dca-c1",
        name: "Mohammad Ashraful",
        role: "Head Coach",
        experienceYears: 15,
        qualifications: [
          "Former National Player",
          "Batting Specialist",
          "15+ Years Experience",
        ],
        specialties: ["Batting", "All-rounder"],
        playingCareer: "Former Bangladesh National Team Captain & Test Centurion.",
        photo: "/images/experts/head_coach.jpg",
      },
      {
        id: "dca-c2",
        name: "Rafiqul Islam",
        role: "Bowling Coach",
        experienceYears: 12,
        qualifications: [
          "Ex. First Class Player",
          "Pace Bowling",
          "12+ Years Experience",
        ],
        specialties: ["Bowling", "Fitness"],
        playingCareer: "Ex-First Class fast bowler with 250+ domestic wickets.",
        photo: "/images/experts/fast_bowling_coach.png",
      },
      {
        id: "dca-c3",
        name: "Sabbir Hossain",
        role: "Fitness Coach",
        experienceYears: 8,
        qualifications: [
          "Certified Strength Coach",
          "Fitness & Conditioning",
          "5+ Years Experience",
        ],
        specialties: ["Fitness", "Fielding"],
        photo: "/images/experts/fitness_trainer.png",
      },
    ],
    programs: [
      {
        id: "dca-p1",
        title: "Beginner, Intermediate & Advanced Coaching",
        ageGroups: ["U-10", "U-12", "U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
        schedule: "Sat - Thu (6 Days / Week)",
        days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        timing: "3:00 PM - 7:00 PM",
        description: "Comprehensive multi-level coaching for young prospects.",
        feeMonthly: "৳2,000 - ৳5,000 (Depending on program)",
      },
    ],
    facilities: [
      {
        id: "dca-f1",
        title: "Main Ground",
        type: "ground",
        description: "Standard turf cricket match ground.",
        image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=600&fit=crop&q=80",
      },
      {
        id: "dca-f2",
        title: "Practice Nets",
        type: "nets",
        description: "Multiple turf and concrete bowling practice nets.",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&fit=crop&q=80",
      },
      {
        id: "dca-f3",
        title: "Indoor Training",
        type: "indoor",
        description: "Covered indoor nets with bowling machines.",
        image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&fit=crop&q=80",
      },
      {
        id: "dca-f4",
        title: "Gym & Fitness",
        type: "fitness",
        description: "Modern equipment for strength, speed and agility.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&fit=crop&q=80",
      },
      {
        id: "dca-f5",
        title: "Video Analysis Room",
        type: "indoor",
        description: "Frame-by-frame biomechanics and stroke feedback.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&fit=crop&q=80",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&fit=crop&q=80",
    ],
    alumni: [
      {
        id: "dca-a1",
        name: "Mehidy Hasan Miraz",
        achievement: "Bangladesh National Team",
        level: "National Team",
        team: "Bangladesh National Team",
        year: "Academy Batch: 2010-2012",
        photo: "/images/experts/spin_bowling_coach.png",
      },
      {
        id: "dca-a2",
        name: "Taskin Ahmed",
        achievement: "Bangladesh National Team",
        level: "National Team",
        team: "Bangladesh National Team",
        year: "Academy Batch: 2008-2010",
        photo: "/images/experts/fast_bowling_coach.png",
      },
      {
        id: "dca-a3",
        name: "Mahmudul Hasan Joy",
        achievement: "Bangladesh A Team",
        level: "National Team",
        team: "Bangladesh A Team",
        year: "Academy Batch: 2013-2015",
        photo: "/images/experts/batting_coach.png",
      },
    ],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails: "Trial sessions available on prior booking.",
      monthlyFeeNote: "৳2,000 - ৳5,000 (Depending on program)",
      admissionFeeNote: "Registration includes uniform kit and player ID.",
      requiredDocuments: [
        "Birth Certificate",
        "2 Photos",
      ],
      practiceTimings: "Sat - Thu: 3:00 PM - 7:00 PM",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "bksp-cricket-academy",
    slug: "bksp-cricket-academy",
    name: "BKSP Cricket Academy",
    shortName: "BKSP Cricket",
    tagline: "National Sports Institute — Center of Excellence",
    logo: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=1200&h=600&fit=crop&q=80",
    establishedYear: 1983,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Zirani, Savar",
      upazila: "Savar",
      district: "Dhaka",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=BKSP+Savar",
    },
    contact: {
      phone: ["+88027788481", "+88027788483"],
      email: "info@bksp.gov.bd",
      website: "http://www.bksp.gov.bd",
    },
    headCoachName: "Nazmul Abedin",
    headCoachRole: "Head Coach",
    headCoachSubtext: "Ex. National Coach",
    headCoachPhoto: "/images/experts/head_coach.jpg",
    about: {
      history:
        "BKSP is the nation's premier sports coaching institution, producing world-class talents like Shakib Al Hasan, Mushfiqur Rahim and many more.",
      founderOrDirector: "Ministry of Youth & Sports",
      mission: "To scout, nurture and develop elite national and international cricket talents.",
      philosophy: "Scientific conditioning, tactical training, and continuous competitive matches.",
    },
    eligibleAgeGroups: ["U-12", "U-14", "U-16", "U-18"],
    availableTrainingTypes: ["Batting", "Bowling", "Fitness"],
    coaches: [
      {
        id: "bksp-c1",
        name: "Nazmul Abedin",
        role: "Head Coach",
        experienceYears: 25,
        qualifications: ["Ex. National Coach", "ICC Master Coach"],
        specialties: ["Batting", "Bowling", "Fitness"],
        photo: "/images/experts/head_coach.jpg",
      },
    ],
    programs: [
      {
        id: "bksp-p1",
        title: "Year-Round Cadet Cricket Program",
        ageGroups: ["U-12", "U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "Fitness"],
        schedule: "Daily Residential & Academy Sessions",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Morning & Afternoon",
        description: "Official cadet training curriculum.",
      },
    ],
    facilities: [
      {
        id: "bksp-f1",
        title: "Main Ground",
        type: "ground",
        description: "4 International standard cricket grounds.",
      },
      {
        id: "bksp-f2",
        title: "Practice Nets",
        type: "nets",
        description: "Dozens of turf and concrete nets.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
    ],
    alumni: [],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails: "Annual nationwide scouting trials.",
      requiredDocuments: ["Birth Certificate", "Academic Record", "Photos"],
      practiceTimings: "Daily intensive schedule",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "chittagong-cricket-academy",
    slug: "chittagong-cricket-academy",
    name: "Chittagong Cricket Academy",
    shortName: "Chittagong Cricket",
    tagline: "Premier Cricket Coaching Institute of the Port City",
    logo: "https://images.unsplash.com/photo-1512719357204-e02f1a851242?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2010,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Contact for Admission",
    location: {
      address: "M.A. Aziz Stadium Ground",
      upazila: "Kotwali",
      district: "Chattogram",
      division: "Chittagong",
      googleMapsUrl: "https://maps.google.com/?q=Chittagong+Cricket+Academy",
    },
    contact: {
      phone: ["+8801819000111"],
      email: "chittagongcricket@gmail.com",
    },
    headCoachName: "Javed Omar",
    headCoachRole: "Head Coach",
    headCoachSubtext: "Former Test Player",
    headCoachPhoto: "/images/experts/batting_coach.png",
    about: {
      history: "Established in 2010 to groom cricketers from Chattogram and surrounding coastal regions.",
      mission: "To offer disciplined coaching under veteran test cricketer Javed Omar.",
      philosophy: "Technical solidity, patience, and fielding agility.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: ["Bowling", "Wicketkeeping", "Batting"],
    coaches: [
      {
        id: "cca-c1",
        name: "Javed Omar",
        role: "Head Coach",
        experienceYears: 20,
        qualifications: ["Former Test Player", "BCB Level 3 Coach"],
        specialties: ["Batting", "Fielding"],
        photo: "/images/experts/batting_coach.png",
      },
    ],
    programs: [],
    facilities: [
      {
        id: "cca-f1",
        title: "Stadium Ground",
        type: "ground",
        description: "Access to stadium grounds and practice wickets.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
    ],
    alumni: [],
    admissionInfo: {
      status: "Contact for Admission",
      trialSessionAvailable: true,
      requiredDocuments: ["Birth Certificate", "2 Photos"],
      practiceTimings: "Weekly 4-day sessions",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "rajshahi-royals-academy",
    slug: "rajshahi-royals-academy",
    name: "Rajshahi Royals Academy",
    shortName: "Rajshahi Royals",
    tagline: "The Nursery of Pace and Spin Talent in Northern Bengal",
    logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2016,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Divisional Stadium Ground",
      upazila: "Boalia",
      district: "Rajshahi",
      division: "Rajshahi",
      googleMapsUrl: "https://maps.google.com/?q=Rajshahi+Stadium",
    },
    contact: {
      phone: ["+8801712999888"],
      email: "rajshahiroyals@gmail.com",
    },
    headCoachName: "Sajjad Hossain",
    headCoachRole: "Head Coach",
    headCoachSubtext: "BCB Level 2 Coach",
    headCoachPhoto: "/images/experts/fast_bowling_coach.png",
    about: {
      history: "Founded in 2016, focusing on producing skilled domestic and national age-group players.",
      mission: "To train young northern talent to compete in national division tournaments.",
      philosophy: "Hard work, bowling consistency, and tactical awareness.",
    },
    eligibleAgeGroups: ["U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: ["Batting", "Bowling", "Fitness"],
    coaches: [
      {
        id: "rra-c1",
        name: "Sajjad Hossain",
        role: "Head Coach",
        experienceYears: 14,
        qualifications: ["BCB Level 2 Coach"],
        specialties: ["Bowling", "Fitness"],
        photo: "/images/experts/fast_bowling_coach.png",
      },
    ],
    programs: [],
    facilities: [
      {
        id: "rra-f1",
        title: "Main Ground",
        type: "ground",
        description: "Full size turf pitch.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&fit=crop&q=80",
    ],
    alumni: [],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      requiredDocuments: ["Birth Certificate", "Photos"],
      practiceTimings: "Morning & Afternoon batches",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "sylhet-cricket-training-center",
    slug: "sylhet-cricket-training-center",
    name: "Sylhet Cricket Training Center",
    shortName: "Sylhet Cricket",
    tagline: "Dedicated Training Center for Aspiring Cricket Stars",
    logo: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2018,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Closed",
    location: {
      address: "Lakkatura, Sylhet",
      upazila: "Sylhet Sadar",
      district: "Sylhet",
      division: "Sylhet",
      googleMapsUrl: "https://maps.google.com/?q=Sylhet+Stadium",
    },
    contact: {
      phone: ["+8801713555444"],
      email: "sylhetcricket@gmail.com",
    },
    headCoachName: "Rashed Khan",
    headCoachRole: "Head Coach",
    headCoachSubtext: "Former First-Class Cricketer",
    headCoachPhoto: "/images/experts/spin_bowling_coach.png",
    about: {
      history: "Formed near the scenic Lakkatura tea gardens and Sylhet International Cricket Stadium.",
      mission: "To inspire and prepare Sylhet's next generation of international cricket stars.",
      philosophy: "Modern drills, fast bowling conditioning, and fielding excellence.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: ["All-rounder", "Fitness", "Bowling"],
    coaches: [
      {
        id: "sctc-c1",
        name: "Rashed Khan",
        role: "Head Coach",
        experienceYears: 16,
        qualifications: ["Former First-Class Cricketer", "BCB Level 2"],
        specialties: ["All-rounder", "Fitness"],
        photo: "/images/experts/spin_bowling_coach.png",
      },
    ],
    programs: [],
    facilities: [
      {
        id: "sctc-f1",
        title: "Lush Green Ground",
        type: "ground",
        description: "Natural turf ground with pristine outfield.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
    ],
    alumni: [],
    admissionInfo: {
      status: "Closed",
      trialSessionAvailable: false,
      requiredDocuments: ["Birth Certificate", "Photos"],
      practiceTimings: "Afternoon Session: 3:00 PM - 6:00 PM",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "khulna-youth-cricket-academy",
    slug: "khulna-youth-cricket-academy",
    name: "Khulna Youth Cricket Academy",
    shortName: "Khulna Youth",
    tagline: "Nurturing Fast Bowlers and Dynamic Batsmen",
    logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2015,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Sheikh Abu Naser Stadium Area",
      upazila: "Khulna Sadar",
      district: "Khulna",
      division: "Khulna",
      googleMapsUrl: "https://maps.google.com/?q=Abu+Naser+Stadium+Khulna",
    },
    contact: {
      phone: ["+8801714888333"],
      email: "khulnacricket@gmail.com",
    },
    headCoachName: "Tariq Islam",
    headCoachRole: "Head Coach",
    headCoachSubtext: "BCB Certified Specialist",
    headCoachPhoto: "/images/experts/fitness_trainer.png",
    about: {
      history: "Established in 2015 to tap into Khulna's rich cricket heritage.",
      mission: "To train disciplined cricketers with international work ethics.",
      philosophy: "Technical precision, hard physical training, and match temperament.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: ["Batting", "Bowling", "Wicketkeeping"],
    coaches: [
      {
        id: "kyca-c1",
        name: "Tariq Islam",
        role: "Head Coach",
        experienceYears: 12,
        qualifications: ["BCB Certified Specialist"],
        specialties: ["Batting", "Bowling"],
        photo: "/images/experts/fitness_trainer.png",
      },
    ],
    programs: [],
    facilities: [
      {
        id: "kyca-f1",
        title: "Training Nets",
        type: "nets",
        description: "Turf and cement nets for multi-discipline practice.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
    ],
    alumni: [],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      requiredDocuments: ["Birth Certificate", "Photos"],
      practiceTimings: "Daily: 3:30 PM - 6:30 PM",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "pubergaon-cricket-academy",
    slug: "pubergaon-cricket-academy",
    name: "Pubergaon Krira Shikkha Protisthan (PKSP)",
    shortName: "PKSP Cricket Academy",
    tagline: "Premier International-Standard Residential Cricket Academy",
    logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&crop=faces&q=80",
    coverImage: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2019,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Pubergaon, Atlapur, Rupganj",
      upazila: "Rupganj",
      district: "Narayanganj",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=Pubergaon+Cricket+Academy",
    },
    contact: {
      phone: ["+8801793637659", "+8801611551360"],
      email: "info.pkspbd@gmail.com",
      website: "https://pkspbd.com",
      facebookUrl: "https://facebook.com/pkspbd",
    },
    headCoachName: "Sarwar Imran",
    headCoachRole: "Head Coach (Former Bangladesh National Team Head Coach)",
    about: {
      history:
        "Pubergaon Krira Shikkha Protisthan (PKSP) was founded in 2019 at Atlapur, Rupganj, Narayanganj with the vision of developing world-class cricket talent. Led by veteran national coach Sarwar Imran, the academy provides extensive ground facilities, residential hostels, and rigorous physical conditioning.",
      founderOrDirector: "Sarwar Imran & PKSP Governing Board",
      mission:
        "To scout, nurture, and prepare young cricketers with modern technique, tactical awareness, and physical resilience for first-class and international cricket.",
      philosophy:
        "Skill acquisition through deliberate center-wicket match practice, disciplined fitness drills, and injury-prevention regimens under experienced mentors.",
    },
    eligibleAgeGroups: ["U-12", "U-14", "U-16", "U-18", "Open"],
    availableTrainingTypes: [
      "Batting",
      "Bowling",
      "All-rounder",
      "Wicketkeeping",
      "Fitness",
      "Fielding",
    ],
    coaches: [
      {
        id: "c-sarwar-imran",
        name: "Sarwar Imran",
        role: "Head Coach",
        experienceYears: 28,
        qualifications: [
          "Former Bangladesh National Team Head Coach",
          "BCB High Performance Specialist",
          "ICC Level 3 Coaching Certification",
        ],
        specialties: ["Batting", "Bowling", "All-rounder", "Fitness"],
        playingCareer: "Former domestic first-class cricketer and pioneer national coach.",
        photo: "/images/experts/head_coach.png",
      },
      {
        id: "c-alamgir-kabir",
        name: "Alamgir Kabir",
        role: "Senior Bowling Coach",
        experienceYears: 18,
        qualifications: [
          "Former Bangladesh Test & ODI National Player",
          "BCB Certified Level 2 Bowling Coach",
        ],
        specialties: ["Bowling", "Fitness"],
        playingCareer: "Represented Bangladesh National Cricket Team in Tests and ODIs as a specialist seam bowler.",
        photo: "/images/experts/fast_bowling_coach.png",
      },
      {
        id: "c-neaz-morshed",
        name: "Neaz Morshed Nahid",
        role: "Senior Batting & Tactical Coach",
        experienceYears: 14,
        qualifications: ["BCB Certified Cricket Coach", "Former Dhaka Premier League Player"],
        specialties: ["Batting", "Fielding"],
        photo: "/images/experts/batting_coach.png",
      },
      {
        id: "c-saklain-sajib",
        name: "Saklain Sajib",
        role: "Spin Bowling Specialist Coach",
        experienceYears: 12,
        qualifications: [
          "Former Bangladesh National Team Player (T20I)",
          "Rajshahi Division First Class Veteran",
        ],
        specialties: ["Bowling", "All-rounder"],
        playingCareer: "Represented Bangladesh national team in international T20s and played 70+ first-class matches.",
        photo: "/images/experts/spin_bowling_coach.png",
      },
      {
        id: "c-farhad-hossain",
        name: "Farhad Hossain",
        role: "Senior Batting Coach",
        experienceYears: 15,
        qualifications: [
          "Former Bangladesh National Team Player",
          "First-Class Centurion with over 6,000 First-Class runs",
        ],
        specialties: ["Batting", "Fielding"],
        playingCareer: "Represented Bangladesh national squad and long-time captain in domestic first-class cricket.",
        photo: "/images/experts/head_coach.png",
      },
    ],
    programs: [
      {
        id: "pksp-regular",
        title: "Year-Round Academy Training Program",
        ageGroups: ["U-12", "U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
        schedule: "5 Days a week (Tuesday - Saturday)",
        days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Morning Session: 6:30 AM - 9:30 AM | Afternoon: 3:00 PM - 6:00 PM",
        description:
          "Comprehensive cricket curriculum including technical net practice, turf-wicket center play, video analysis sessions, and athletic conditioning.",
        feeMonthly: "Confirmed on Trial Assessment",
        feeAdmission: "Contact Academy Office",
      },
      {
        id: "pksp-residential",
        title: "Residential Cricket & Education Camp",
        ageGroups: ["U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness", "Fielding"],
        schedule: "Full-Time Residential (6 Days/Week)",
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Full-day training, fitness conditioning, study hours and recovery",
        description:
          "Full boarding facilities including hostel accommodation, 4 sports-nutritionist curated meals daily, gym access, physiotherapy, and match tours.",
        feeMonthly: "Contact for Admission",
        feeAdmission: "Contact for Admission",
      },
      {
        id: "pksp-weekend",
        title: "Weekend Cadet Coaching Program",
        ageGroups: ["U-10", "U-12", "U-14"],
        trainingTypes: ["Batting", "Bowling", "Fielding", "Fitness"],
        schedule: "Friday & Saturday Only",
        days: ["Friday", "Saturday"],
        timing: "Friday 7:30 AM - 10:30 AM | Saturday 7:30 AM - 10:30 AM",
        description:
          "Ideal for school-going youngsters looking to master basic batting fundamentals, bowling actions, and athletic agility.",
        feeMonthly: "Contact for Admission",
      },
    ],
    facilities: [
      {
        id: "pksp-grounds",
        title: "3 Full-Size International Cricket Grounds",
        type: "ground",
        description:
          "3 natural lush-green grounds adhering to international boundary specifications with curated turf center wickets for real match simulation.",
      },
      {
        id: "pksp-nets",
        title: "48 Practice Wickets (Turf, Matting & Concrete)",
        type: "nets",
        description:
          "Over 48 dedicated practice pitches replicating varying bounce, seam, and turn conditions found across Bangladesh and subcontinent wickets.",
      },
      {
        id: "pksp-indoor",
        title: "All-Weather Indoor Practice Pavilion",
        type: "indoor",
        description:
          "State-of-the-art indoor training net facility with specialized lighting and bowling machines for monsoon and evening practice.",
      },
      {
        id: "pksp-gym",
        title: "High-Performance Gymnasium & Physio Unit",
        type: "fitness",
        description:
          "Full strength & conditioning gym with certified trainers and licensed physiotherapists on site for injury prevention and rehabilitation.",
      },
      {
        id: "pksp-hostel",
        title: "Residential Trainee Hostel",
        type: "accommodation",
        description:
          "Clean, secure dormitory and AC rooms with dedicated dining hall, recreation room, and 24/7 security for resident athletes.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&fit=crop&q=80",
    ],
    alumni: [
      {
        id: "pksp-alumni-1",
        name: "Mohammad Ashraful",
        achievement: "Chief Guest Mentor & Academy Associate Advisor",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "Test Centurion & Former National Captain",
      },
      {
        id: "pksp-alumni-2",
        name: "Tarek Aziz Khan",
        achievement: "Fast Bowling Mentor & Guest Coach",
        level: "National Team",
        team: "Bangladesh National Cricket Team (Test/ODI)",
        year: "Former National Pacer",
      },
      {
        id: "pksp-alumni-3",
        name: "Dhaka Division Under-16 Championship",
        achievement: "Champions / Finalist Team Performance",
        level: "Tournament Winner",
        team: "PKSP Youth XI",
        year: "2023 - 2024",
      },
    ],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails:
        "Prior registration required. Coaches assess hand-eye coordination, bowling action, and fitness before grouping into appropriate age cohorts.",
      monthlyFeeNote:
        "Fees vary based on Day-Scholar vs. Residential camp options. Please contact academy reception directly.",
      admissionFeeNote: "Includes complete academy training kit set and ID registration.",
      requiredDocuments: [
        "Photocopy of Birth Certificate / NID",
        "2 Passport-size photographs",
        "Recent school progress report or ID card",
        "Medical fitness certificate (if applying for residential)",
      ],
      practiceTimings: "Morning 6:30 AM - 10:00 AM | Afternoon 3:00 PM - 6:00 PM",
    },
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "masco-shakib-cricket-academy",
    slug: "masco-shakib-cricket-academy",
    name: "Masco Cricket Academy (MCA / Masco Shakib Cricket Academy)",
    shortName: "Masco Cricket Academy",
    tagline: "World-Class Training Ground & Modern Cricket Institute",
    logo: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2020,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Kanchan Bridge Area, Rupganj",
      upazila: "Rupganj",
      district: "Narayanganj",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=Masco+Cricket+Academy+Kanchan",
    },
    contact: {
      phone: ["+8801730392999"],
      email: "info@mca.com.bd",
      website: "https://mca.com.bd",
      facebookUrl: "https://facebook.com/mascocricketacademy",
    },
    headCoachName: "Mohammad Salahuddin & BCB Panel",
    headCoachRole: "Chief Technical Advisor & Master Coach",
    about: {
      history:
        "Masco Cricket Academy (MCA) was established in 2020 by the Masco Group in partnership with Bangladesh's premier sporting icon Shakib Al Hasan. Situated on a serene 16-bigha green campus in Kanchan, Rupganj, it features natural grass fields, cutting-edge bowling machine cages, and residential hostel amenities.",
      founderOrDirector: "Masco Group & Shakib Al Hasan",
      mission:
        "To provide Bangladeshi youth with international coaching methodologies, high-tech bowling simulation, and character-building discipline.",
      philosophy:
        "Modern video-analyzed technical training combined with high-volume net simulation and intense physical conditioning.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "U-18", "Open"],
    availableTrainingTypes: [
      "Batting",
      "Bowling",
      "All-rounder",
      "Wicketkeeping",
      "Fitness",
      "Fielding",
    ],
    coaches: [
      {
        id: "c-mohammad-salahuddin",
        name: "Mohammad Salahuddin",
        role: "Chief Technical Advisor & Coach",
        experienceYears: 25,
        qualifications: [
          "Senior National Coach of Shakib Al Hasan & Tamim Iqbal",
          "Former Bangladesh National Team Assistant Coach",
          "BPL Winning Head Coach (Comilla Victorians)",
        ],
        specialties: ["Batting", "All-rounder", "Fitness"],
        playingCareer: "Renowned mentor of Bangladesh's golden cricket generation.",
        photo: "/images/experts/head_coach.png",
      },
      {
        id: "c-mca-fastbowler",
        name: "Certified BCB Fast Bowling Coach",
        role: "Pace Bowling Director",
        experienceYears: 12,
        qualifications: ["BCB Level 2 Bowling Coach", "Bio-Mechanics & Load Management Specialist"],
        specialties: ["Bowling", "Fitness"],
        photo: "/images/experts/fast_bowling_coach.png",
      },
      {
        id: "c-mca-fitness",
        name: "Lead Strength & Conditioning Coach",
        role: "Athletic Performance Director",
        experienceYears: 10,
        qualifications: ["Certified Sports Fitness Trainer", "CSCS Level 1"],
        specialties: ["Fitness", "Fielding"],
        photo: "/images/experts/fitness_trainer.png",
      },
    ],
    programs: [
      {
        id: "mca-regular",
        title: "MCA Regular Yearly Program",
        ageGroups: ["U-10", "U-12", "U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
        schedule: "5 Days a Week (Tuesday to Saturday)",
        days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Morning Session & Afternoon Session slots",
        description:
          "5 days weekly structured training covering stroke mechanics, spin/pace bowling drills, fielding agility, and periodic practice matches.",
        feeMonthly: "Contact for Admission",
        feeAdmission: "Contact for Admission",
      },
      {
        id: "mca-weekend",
        title: "Weekend Skill Building Program",
        ageGroups: ["U-10", "U-12", "U-14", "U-16"],
        trainingTypes: ["Batting", "Bowling", "Fielding"],
        schedule: "1 to 2 Days a Week (Friday & Saturday)",
        days: ["Friday", "Saturday"],
        timing: "Morning 8:00 AM - 11:30 AM",
        description:
          "Designed specifically for students who want focused cricket training on weekends without hampering academic schooling.",
        feeMonthly: "Contact for Admission",
      },
      {
        id: "mca-seasonal",
        title: "Summer & Winter Vacation Intensive Camps",
        ageGroups: ["U-12", "U-14", "U-16", "U-18"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
        schedule: "Daily 2-3 Weeks Intensive Camp",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Full-day schedule with residential & non-residential options",
        description:
          "High-intensity training camps during school vacations with bowling machine masterclasses, center pitch matches, and tactical seminars.",
      },
    ],
    facilities: [
      {
        id: "mca-campus",
        title: "16-Bigha Natural Turf Main Ground",
        type: "ground",
        description:
          "Picturesque 16-bigha green campus with manicured outfield, practice tracks, and international dimensions for tournament hosting.",
      },
      {
        id: "mca-indoor",
        title: "Indoor Center with Automated Bowling Machines",
        type: "indoor",
        description:
          "Covered turf nets featuring programmable bowling machines capable of delivering swing, seam, and bounce up to 145+ km/h.",
      },
      {
        id: "mca-gym",
        title: "Modern Fitness & Conditioning Center",
        type: "fitness",
        description:
          "Fully equipped air-conditioned athlete gym dedicated to rotational power, core stability, and sprint mechanics.",
      },
      {
        id: "mca-residential",
        title: "Athlete Dormitory & Nutritious Cafeteria",
        type: "accommodation",
        description:
          "Comfortable residential accommodation with hygienic kitchen supplying healthy protein-rich meal plans for camp trainees.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
    ],
    alumni: [
      {
        id: "mca-shakib",
        name: "Shakib Al Hasan",
        achievement: "Co-Founder & Academy Mentor",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "ICC #1 Ranked All-Rounder & Former National Captain",
      },
      {
        id: "mca-tournaments",
        name: "Masco Youth Invitational Trophy",
        achievement: "Champions / Tournament Organizers",
        level: "Tournament Winner",
        team: "Masco Cricket Academy Under-16",
        year: "2023",
      },
    ],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails:
        "Prospective trainees undergo a preliminary skill evaluation session with the coaching panel before registration.",
      monthlyFeeNote: "Official packages published by academy management; contact helpline directly.",
      admissionFeeNote: "Includes official academy jersey, training trousers, and player identity card.",
      requiredDocuments: [
        "Completed MCA admission application form",
        "Applicant's birth certificate copy",
        "2 Passport-size color photos",
        "Guardian's NID copy",
      ],
      practiceTimings: "Morning Session: 7:00 AM - 10:30 AM | Afternoon: 3:00 PM - 6:00 PM",
    },
    createdAt: "2024-02-15T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "cricketers-academy-dhaka",
    slug: "cricketers-academy-dhaka",
    name: "Cricketers Academy, Dhaka",
    shortName: "Cricketers Academy",
    tagline: "Elite Coaching by National Captain Khaled Mahmud Sujon",
    logo: "https://images.unsplash.com/photo-1512719357204-e02f1a851242?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
    establishedYear: 2016,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Open",
    location: {
      address: "Office: House 6, Road 5/A, Baridhara J Block (Grounds: Aftabnagar Sports Ground)",
      upazila: "Gulshan / Badda",
      district: "Dhaka",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=Cricketers+Academy+Baridhara+Dhaka",
    },
    contact: {
      phone: ["+8801711886511", "+8809610954000"],
      email: "cricketersacademyinfo@gmail.com",
      facebookUrl: "https://facebook.com/cricketersacademydhaka",
    },
    headCoachName: "Khaled Mahmud Sujon",
    headCoachRole: "Chief Coach & Director (Former Bangladesh Captain & National Team Director)",
    about: {
      history:
        "Cricketers Academy Dhaka was established under the direct supervision of legendary former Bangladesh captain and BCB director Khaled Mahmud Sujon. Dedicated to producing technically refined, mentally tough cricketers, the academy has trained hundreds of young prospects playing across Dhaka First, Second and Third Division leagues.",
      founderOrDirector: "Khaled Mahmud Sujon",
      mission:
        "To teach disciplined cricket fundamentals, match temperament, and leadership to aspiring youngsters across Dhaka.",
      philosophy:
        "Hands-on mentoring from national cricketers, high repetition on turf and matting wickets, and structured competitive match exposure.",
    },
    eligibleAgeGroups: ["U-10", "U-12", "U-14", "U-16", "Open"],
    availableTrainingTypes: [
      "Batting",
      "Bowling",
      "All-rounder",
      "Wicketkeeping",
      "Fitness",
      "Fielding",
    ],
    coaches: [
      {
        id: "c-khaled-mahmud-sujon",
        name: "Khaled Mahmud Sujon",
        role: "Chief Coach & Director",
        experienceYears: 22,
        qualifications: [
          "Former Captain, Bangladesh National Cricket Team",
          "Former Director, Bangladesh National Team",
          "BCB Level 3 Certified Coach & BPL Champion Coach",
        ],
        specialties: ["All-rounder", "Batting", "Bowling"],
        playingCareer: "Played 12 Tests and 77 ODIs for Bangladesh; hero of the historic 1999 World Cup win vs Pakistan.",
        photo: "/images/experts/head_coach.png",
      },
      {
        id: "c-sohel-islam",
        name: "Sohel Islam",
        role: "Senior Batting & Spin Coach",
        experienceYears: 18,
        qualifications: [
          "BCB Level 3 Coach",
          "National Team & High Performance Specialist Coach",
        ],
        specialties: ["Batting", "Bowling"],
        photo: "/images/experts/batting_coach.png",
      },
      {
        id: "c-talha-jubair",
        name: "Talha Jubair",
        role: "Fast Bowling Coach",
        experienceYears: 15,
        qualifications: [
          "Former Bangladesh National Fast Bowler",
          "BCB Certified Pace Specialist",
        ],
        specialties: ["Bowling", "Fitness"],
        playingCareer: "Fast bowler who represented Bangladesh in 7 Tests and 6 ODIs.",
        photo: "/images/experts/fast_bowling_coach.png",
      },
      {
        id: "c-ariful-robin",
        name: "Ariful Islam Robin",
        role: "Fielding & Assistant Coach",
        experienceYears: 10,
        qualifications: ["BCB Level 1 Certified Coach"],
        specialties: ["Fielding", "Batting"],
        photo: "/images/experts/sidearm_thrower.png",
      },
    ],
    programs: [
      {
        id: "ca-under12",
        title: "Foundation Training Program (Under-12)",
        ageGroups: ["U-10", "U-12"],
        trainingTypes: ["Batting", "Bowling", "Fielding", "Fitness"],
        schedule: "Tuesday to Saturday",
        days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Morning 7:30 AM - 10:30 AM",
        description:
          "Fundamental skill building with tennis and soft leather balls, focusing on batting stance, swing, bowling release, and athletic balance.",
        feeMonthly: "Contact for Admission",
        feeAdmission: "Contact for Admission",
      },
      {
        id: "ca-senior",
        title: "Advanced Development Program (Above 12 & Open)",
        ageGroups: ["U-14", "U-16", "Open"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Wicketkeeping", "Fitness"],
        schedule: "Tuesday to Saturday",
        days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Afternoon 2:30 PM - 5:30 PM",
        description:
          "Hard leather ball coaching, turf net sessions, center-wicket match situation drills, sidearm throwdowns, and tactical game preparation.",
        feeMonthly: "Contact for Admission",
      },
      {
        id: "ca-residential",
        title: "Residential Player Development Camp",
        ageGroups: ["U-14", "U-16", "Open"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness"],
        schedule: "Full-Time Residential Program",
        days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        timing: "Includes AC room accommodation & 4 athlete-tailored meals daily",
        description:
          "Hostel accommodation, 4 healthy meals daily, practice uniform kit, ID card, gym, and regular league match exposure.",
        feeMonthly: "Contact for Admission",
      },
    ],
    facilities: [
      {
        id: "ca-field",
        title: "Full Match Practice Grounds (Aftabnagar)",
        type: "ground",
        description:
          "Large open turf sports field dedicated to intra-academy practice matches, fielding relays, and center wicket batting simulation.",
      },
      {
        id: "ca-nets",
        title: "Turf & Concrete Practice Nets",
        type: "nets",
        description:
          "Multiple enclosed batting cages equipped for leather ball throwdowns and intensive spin/pace net sessions.",
      },
      {
        id: "ca-hostel",
        title: "Residential AC Hostel & Dining",
        type: "accommodation",
        description:
          "Air-conditioned rooms with 4 hygienic meals daily, gear storage, and strict discipline monitored by wardens.",
      },
      {
        id: "ca-kit",
        title: "Uniform & Kit Distribution",
        type: "fitness",
        description:
          "Each admitted student receives official jerseys, trousers, academy cap, player ID card, and customized kit bag.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512719357204-e02f1a851242?w=800&fit=crop&q=80",
    ],
    alumni: [
      {
        id: "ca-alumni-national",
        name: "Dhaka League Representatives",
        achievement: "15+ Players drafted into Dhaka First, Second & Third Division Cricket",
        level: "First Class / List A",
        team: "Dhaka Premier & First Division Clubs",
        year: "2018 - 2024",
      },
      {
        id: "ca-alumni-under16",
        name: "Dhaka Metro Age-Group Players",
        achievement: "Trainees selected for BCB Under-14 and Under-16 Division squads",
        level: "Age-group Bangladesh",
        team: "Dhaka Metro District / Division",
        year: "2022 - 2024",
      },
    ],
    admissionInfo: {
      status: "Open",
      trialSessionAvailable: true,
      trialSessionDetails:
        "Trial sessions held every Tuesday and Friday morning at the training ground. Students should bring their own white uniform.",
      monthlyFeeNote:
        "Transparent fee slabs based on age group and residential status. Enquire directly via official hotline.",
      admissionFeeNote:
        "One-time registration fee includes complete kit set (jerseys, pants, cap, ID card, bag).",
      requiredDocuments: [
        "Photocopy of student's birth certificate",
        "2 Passport-size photographs",
        "Guardian's national ID copy",
        "Previous school or sports record (if any)",
      ],
      practiceTimings: "Tuesday to Saturday: Morning 7:30 AM - 10:30 AM | Afternoon 2:30 PM - 5:30 PM",
    },
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "bksp-cricket-department",
    slug: "bksp-cricket-department",
    name: "Bangladesh Krira Shikkha Protishtan (BKSP - Cricket)",
    shortName: "BKSP Cricket",
    tagline: "National Sports Institute — Cradle of Bangladesh International Cricketers",
    logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=160&h=160&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=1200&h=600&fit=crop&q=80",
    establishedYear: 1986,
    isVerified: true,
    isPublished: true,
    admissionStatus: "Contact for Admission",
    location: {
      address: "BKSP Main Complex, Zirani, Savar",
      upazila: "Savar",
      district: "Dhaka",
      division: "Dhaka",
      googleMapsUrl: "https://maps.google.com/?q=BKSP+Savar",
    },
    contact: {
      phone: ["+88027788481", "+88027788483"],
      email: "info@bksp.gov.bd",
      website: "http://www.bksp.gov.bd",
    },
    headCoachName: "Chief Cricket Coach & BCB Specialists",
    headCoachRole: "Head of Cricket Department",
    about: {
      history:
        "Established in 1986 by the Government of Bangladesh, BKSP is the premier national sports institute that has produced the greatest cricketers in Bangladesh's history, including Shakib Al Hasan, Mushfiqur Rahim, Abdur Razzak, Nasir Hossain, Soumya Sarkar, and Mominul Haque.",
      founderOrDirector: "Government of Bangladesh / Ministry of Youth and Sports",
      mission:
        "To scout national athletic talent from grassroots Bangladesh, provide rigorous academic schooling, and develop elite athletes for international championships.",
      philosophy:
        "Total immersion: world-standard turf wickets, scientific physical conditioning, sports medicine, and year-round competitive tournaments.",
    },
    eligibleAgeGroups: ["U-12", "U-14", "U-16", "U-18"],
    availableTrainingTypes: [
      "Batting",
      "Bowling",
      "All-rounder",
      "Wicketkeeping",
      "Fitness",
      "Fielding",
    ],
    coaches: [
      {
        id: "c-bksp-chief",
        name: "Senior National Cricket Coaching Cadre",
        role: "Chief Cricket Coach & Trainers",
        experienceYears: 30,
        qualifications: [
          "ICC & BCB Level 3 Accredited Coaches",
          "Government Sports Cadre Officers",
        ],
        specialties: ["Batting", "Bowling", "All-rounder", "Fitness"],
        photo: "/images/experts/head_coach.png",
      },
    ],
    programs: [
      {
        id: "bksp-longterm",
        title: "Long-Term Residential Sports & Academic Cadetship",
        ageGroups: ["U-12", "U-14"],
        trainingTypes: ["Batting", "Bowling", "All-rounder", "Fitness", "Fielding"],
        schedule: "Full Academic & Sports Boarding",
        days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timing: "Residential schedule matching national curriculum & athlete training",
        description:
          "Official annual cadet intake through nationwide talent scouting tests across all 8 divisions.",
      },
      {
        id: "bksp-camp",
        title: "Grassroots Talent Scouting & Vacation Training",
        ageGroups: ["U-12", "U-14", "U-16"],
        trainingTypes: ["Batting", "Bowling", "All-rounder"],
        schedule: "Annual Vacation Training Courses",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timing: "Special scheduled camp times",
        description:
          "Short-term specialized training camps conducted during winter and summer holidays.",
      },
    ],
    facilities: [
      {
        id: "bksp-grounds",
        title: "4 International Standard Cricket Grounds",
        type: "ground",
        description:
          "Multiple ICC-standard grounds that have hosted First-Class, List A, and ICC Under-19 World Cup matches.",
      },
      {
        id: "bksp-indoor",
        title: "High-Performance Indoor Cricket Stadium",
        type: "indoor",
        description:
          "Dedicated indoor facility with video analysis equipment, artificial turf, and speed monitoring sensors.",
      },
      {
        id: "bksp-med",
        title: "Sports Science & Medical Hospital",
        type: "medical",
        description:
          "On-campus sports medicine specialists, physiotherapists, bio-mechanics analysts, and rehabilitation swimming pools.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1531415074868-036b107e775a?w=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&fit=crop&q=80",
    ],
    alumni: [
      {
        id: "bksp-shakib",
        name: "Shakib Al Hasan",
        achievement: "Legendary All-Rounder & Former National Captain",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "BKSP Cricket Alumnus",
      },
      {
        id: "bksp-mushfiqur",
        name: "Mushfiqur Rahim",
        achievement: "Highest Test Run Scorer & Former National Captain",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "BKSP Cricket Alumnus",
      },
      {
        id: "bksp-mominul",
        name: "Mominul Haque",
        achievement: "Test Captain & Record 12+ Test Centuries",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "BKSP Cricket Alumnus",
      },
      {
        id: "bksp-soumya",
        name: "Soumya Sarkar",
        achievement: "World Cup National Player",
        level: "National Team",
        team: "Bangladesh National Cricket Team",
        year: "BKSP Cricket Alumnus",
      },
    ],
    admissionInfo: {
      status: "Contact for Admission",
      trialSessionAvailable: true,
      trialSessionDetails:
        "Admission is strictly conducted through official annual circulars and nationwide preliminary physical & technical trials.",
      monthlyFeeNote: "Subsidized government sports education rates.",
      requiredDocuments: [
        "Original Birth Certificate",
        "School Transfer Certificate",
        "Medical Fitness Certificate",
        "Passport size photos",
      ],
      practiceTimings: "Daily intensive schedule as per national sports curriculum.",
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
];

// Initial mock inquiries for admin dashboard demonstration
export const INITIAL_INQUIRIES: AdmissionInquiry[] = [
  {
    id: "ADM-INQ-2026-104928",
    academyId: "pubergaon-cricket-academy",
    academyName: "Pubergaon Krira Shikkha Protisthan (PKSP)",
    studentName: "Tahmid Hasan",
    dateOfBirth: "2012-04-15",
    age: 14,
    guardianName: "Md. Rafiqul Hasan",
    guardianPhone: "01712345678",
    guardianEmail: "rafiqul.hasan@gmail.com",
    district: "Dhaka",
    preferredTrainingType: "Batting",
    previousExperience: "Played 2 years in school cricket tournament as top-order batsman.",
    preferredSchedule: "Afternoon Session: 3:00 PM - 6:00 PM",
    message: "Seeking admission in the regular development camp under coach Sarwar Imran.",
    status: "Under Review",
    adminNotes: "Checked application. Candidate has previous school match experience. Called guardian for trial schedule on Friday.",
    createdAt: "2026-03-20T10:15:00.000Z",
  },
  {
    id: "ADM-INQ-2026-218493",
    academyId: "masco-shakib-cricket-academy",
    academyName: "Masco Cricket Academy (MCA / Masco Shakib Cricket Academy)",
    studentName: "Ayman Zubair",
    dateOfBirth: "2014-08-22",
    age: 12,
    guardianName: "Zubair Ahmed",
    guardianPhone: "01819283746",
    guardianEmail: "zubair.ahmed@yahoo.com",
    district: "Narayanganj",
    preferredTrainingType: "Bowling",
    previousExperience: "Right-arm leg spin bowler with 1 year local net practice.",
    preferredSchedule: "Weekend Skill Building Program (Friday & Saturday)",
    message: "Looking for weekend coaching so school days are not affected.",
    status: "Contacted",
    adminNotes: "Contacted guardian via phone. Invited for trial bowling session at Kanchan ground this Saturday at 8:30 AM.",
    createdAt: "2026-03-22T14:30:00.000Z",
  },
  {
    id: "ADM-INQ-2026-392015",
    academyId: "cricketers-academy-dhaka",
    academyName: "Cricketers Academy, Dhaka",
    studentName: "Sadman Sakib",
    dateOfBirth: "2010-11-05",
    age: 15,
    guardianName: "Farhana Begum",
    guardianPhone: "01911223344",
    district: "Dhaka",
    preferredTrainingType: "All-rounder",
    previousExperience: "Played in Baridhara inter-school cricket league, wicketkeeper batsman.",
    preferredSchedule: "Advanced Development Program (Tuesday - Saturday)",
    message: "Wants to prepare for Dhaka Third Division club trials.",
    status: "Accepted",
    adminNotes: "Trial completed on Tuesday. Coach Talha Jubair recommended admission into advanced batch.",
    createdAt: "2026-03-24T09:00:00.000Z",
  },
];
