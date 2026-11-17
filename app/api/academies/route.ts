import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";
import { AgeGroup, TrainingType, AdmissionStatus } from "@/lib/academiesData";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/adminAuth";
import { prisma, isDatabaseAvailable } from "@/lib/db";

function mapDbAcademyToFrontend(a: any) {
  return {
    id: a.id,
    slug: a.slug,
    name: a.name,
    shortName: a.shortName || a.name,
    tagline: a.tagline || "",
    logo: a.logo,
    coverImage: a.coverImage,
    establishedYear: a.establishedYear,
    isVerified: a.isVerified,
    isPublished: a.isPublished,
    admissionStatus: a.admissionStatus,
    location: {
      address: a.address,
      upazila: a.upazila,
      district: a.district,
      division: a.division,
    },
    contact: {
      phone: a.phones || [],
      email: a.email || undefined,
      website: a.website || undefined,
    },
    headCoachName: a.headCoachName || undefined,
    headCoachRole: a.headCoachRole || undefined,
    eligibleAgeGroups: a.eligibleAgeGroups || [],
    availableTrainingTypes: a.trainingTypes || [],
    facilities: (a.facilities || []).map((f: string, i: number) => ({
      id: `fac-${i}`,
      title: f,
      type: "ground",
    })),
    about: a.aboutJson || {
      history: "Premier cricket academy in Bangladesh.",
      mission: "Nurturing young cricketers with modern techniques.",
      philosophy: "Discipline, consistency, and professional mentorship.",
    },
    coaches: [],
    programs: (a.programsJson as any) || [],
    galleryImages: [a.coverImage],
    alumni: [],
    admissionInfo: {
      status: a.admissionStatus,
      trialSessionAvailable: true,
      requiredDocuments: ["Birth certificate / NID copy", "2 passport photos"],
      practiceTimings: "Morning and afternoon batches",
    },
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  };
}

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

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const where: any = {};
      if (!includeUnpublished) where.isPublished = true;
      if (verifiedOnly) where.isVerified = true;
      if (division && division !== "All") where.division = { equals: division, mode: "insensitive" };
      if (district && district !== "All") where.district = { equals: district, mode: "insensitive" };
      if (upazila && upazila !== "All") where.upazila = { equals: upazila, mode: "insensitive" };
      if (admissionStatus && admissionStatus !== ("All" as any)) where.admissionStatus = admissionStatus;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
          { headCoachName: { contains: search, mode: "insensitive" } },
        ];
      }

      const dbAcademies = await prisma.academy.findMany({
        where,
        orderBy: [{ isVerified: "desc" }, { establishedYear: "asc" }],
      });

      if (dbAcademies && dbAcademies.length > 0) {
        let filtered = dbAcademies.map(mapDbAcademyToFrontend);
        if (ageGroup && ageGroup !== ("All" as any)) {
          filtered = filtered.filter((a) => a.eligibleAgeGroups.includes(ageGroup));
        }
        if (trainingType && trainingType !== ("All" as any)) {
          filtered = filtered.filter((a) => a.availableTrainingTypes.includes(trainingType));
        }

        return NextResponse.json({
          success: true,
          count: filtered.length,
          data: filtered,
        });
      }
    }

    // High performance fallback to in-memory store
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
  if (!verifyAdminAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { success: false, message: "Academy name and slug are required" },
        { status: 400 }
      );
    }

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const existing = await prisma.academy.findUnique({ where: { slug: body.slug } });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "An academy with this slug already exists" },
          { status: 409 }
        );
      }

      const dbCreated = await prisma.academy.create({
        data: {
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
          address: body.location?.address || "Dhaka, Bangladesh",
          upazila: body.location?.upazila || "Dhaka",
          district: body.location?.district || "Dhaka",
          division: body.location?.division || "Dhaka",
          phones: body.contact?.phone || ["+8801700000000"],
          email: body.contact?.email || null,
          website: body.contact?.website || null,
          headCoachName: body.headCoachName || null,
          headCoachRole: body.headCoachRole || null,
          eligibleAgeGroups: body.eligibleAgeGroups || ["U-12", "U-14", "U-16", "Open"],
          trainingTypes: body.availableTrainingTypes || ["Batting", "Bowling", "Fitness"],
          facilities: body.facilities ? body.facilities.map((f: any) => f.title || f) : [],
          aboutJson: body.about || {
            history: "Dedicated cricket training institution in Bangladesh.",
            mission: "Nurturing young cricketers with modern technique.",
            philosophy: "Discipline, consistency, and professional mentorship.",
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Academy created successfully in database",
          data: mapDbAcademyToFrontend(dbCreated),
        },
        { status: 201 }
      );
    }

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
