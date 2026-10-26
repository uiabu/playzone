import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";
import { AgeGroup, TrainingType, AdmissionStatus } from "@/lib/academiesData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim();
    const division = searchParams.get("division");
    const district = searchParams.get("district");
    const upazila = searchParams.get("upazila");
    const ageGroup = searchParams.get("ageGroup") as AgeGroup | null;
    const trainingType = searchParams.get("trainingType") as TrainingType | null;
    const admissionStatus = searchParams.get("admissionStatus") as AdmissionStatus | null;
    const verifiedOnly = searchParams.get("verifiedOnly") === "true";
    const includeUnpublished = searchParams.get("includeUnpublished") === "true";

    let academies = academiesStore.getAll(!includeUnpublished);

    if (search) {
      academies = academies.filter(
        (a) =>
          a.name.toLowerCase().includes(search) ||
          a.location.address.toLowerCase().includes(search) ||
          a.location.district.toLowerCase().includes(search) ||
          a.location.upazila.toLowerCase().includes(search) ||
          (a.headCoachName && a.headCoachName.toLowerCase().includes(search))
      );
    }

    if (division && division !== "All") {
      academies = academies.filter(
        (a) => a.location.division.toLowerCase() === division.toLowerCase()
      );
    }

    if (district && district !== "All") {
      academies = academies.filter(
        (a) => a.location.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (upazila && upazila !== "All") {
      academies = academies.filter(
        (a) => a.location.upazila.toLowerCase() === upazila.toLowerCase()
      );
    }

    if (ageGroup && ageGroup !== ("All" as any)) {
      academies = academies.filter((a) => a.eligibleAgeGroups.includes(ageGroup));
    }

    if (trainingType && trainingType !== ("All" as any)) {
      academies = academies.filter((a) =>
        a.availableTrainingTypes.includes(trainingType)
      );
    }

    if (admissionStatus && admissionStatus !== ("All" as any)) {
      academies = academies.filter((a) => a.admissionStatus === admissionStatus);
    }

    if (verifiedOnly) {
      academies = academies.filter((a) => a.isVerified);
    }

    return NextResponse.json({
      success: true,
      count: academies.length,
      data: academies,
    });
  } catch (error) {
    console.error("GET /api/academies error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve cricket academies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, message: "Academy name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug exists
    if (academiesStore.getBySlug(body.slug)) {
      return NextResponse.json(
        { success: false, message: "An academy with this slug already exists" },
        { status: 409 }
      );
    }

    const created = academiesStore.create({
      id: body.id || body.slug,
      slug: body.slug,
      name: body.name,
      shortName: body.shortName || body.name,
      tagline: body.tagline || "Cricket Training Academy",
      logo: body.logo || "/images/playzone-logo-transparent.png",
      coverImage:
        body.coverImage ||
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop&q=80",
      establishedYear: Number(body.establishedYear) || new Date().getFullYear(),
      isVerified: Boolean(body.isVerified),
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      admissionStatus: body.admissionStatus || "Open",
      location: body.location || {
        address: "Dhaka, Bangladesh",
        upazila: "Dhaka",
        district: "Dhaka",
        division: "Dhaka",
      },
      contact: body.contact || {
        phone: ["+8801700000000"],
      },
      headCoachName: body.headCoachName || "Senior Coaching Panel",
      headCoachRole: body.headCoachRole || "Head Coach",
      about: body.about || {
        history: "Dedicated cricket training institution in Bangladesh.",
        mission: "Nurturing young cricketers with modern technique.",
        philosophy: "Discipline, consistency, and professional mentorship.",
      },
      eligibleAgeGroups: body.eligibleAgeGroups || ["U-12", "U-14", "U-16", "Open"],
      availableTrainingTypes: body.availableTrainingTypes || [
        "Batting",
        "Bowling",
        "Fitness",
      ],
      coaches: body.coaches || [],
      programs: body.programs || [],
      facilities: body.facilities || [],
      galleryImages: body.galleryImages || [],
      alumni: body.alumni || [],
      admissionInfo: body.admissionInfo || {
        status: body.admissionStatus || "Open",
        trialSessionAvailable: true,
        requiredDocuments: ["Birth Certificate copy", "2 passport photos"],
        practiceTimings: "Morning and afternoon sessions",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Academy created successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/academies error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create academy" },
      { status: 500 }
    );
  }
}
