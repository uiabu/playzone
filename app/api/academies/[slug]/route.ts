import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/adminAuth";
import { prisma, isDatabaseAvailable } from "@/lib/db";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

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

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbAcademy = await prisma.academy.findFirst({
        where: {
          OR: [
            { slug: { equals: slug, mode: "insensitive" } },
            { id: { equals: slug, mode: "insensitive" } },
          ],
        },
      });

      if (dbAcademy) {
        return NextResponse.json({
          success: true,
          data: mapDbAcademyToFrontend(dbAcademy),
        });
      }
    }

    const academy = academiesStore.getBySlug(slug);

    if (!academy) {
      return NextResponse.json(
        { success: false, message: `Academy not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: academy,
    });
  } catch (error) {
    console.error("GET /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  if (!verifyAdminAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const { slug } = await params;
    const updates = await request.json();
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const existing = await prisma.academy.findFirst({
        where: {
          OR: [
            { slug: { equals: slug, mode: "insensitive" } },
            { id: { equals: slug, mode: "insensitive" } },
          ],
        },
      });

      if (existing) {
        const updateData: any = {};
        if (updates.name) updateData.name = updates.name;
        if (updates.admissionStatus) updateData.admissionStatus = updates.admissionStatus;
        if (updates.isVerified !== undefined) updateData.isVerified = Boolean(updates.isVerified);
        if (updates.isPublished !== undefined) updateData.isPublished = Boolean(updates.isPublished);
        if (updates.tagline) updateData.tagline = updates.tagline;

        const updated = await prisma.academy.update({
          where: { id: existing.id },
          data: updateData,
        });

        // Also update in-memory
        academiesStore.update(slug, updates);

        return NextResponse.json({
          success: true,
          message: "Academy updated successfully in database",
          data: mapDbAcademyToFrontend(updated),
        });
      }
    }

    const updated = academiesStore.update(slug, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Academy with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academy updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update academy" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!verifyAdminAuth(request)) {
    return unauthorizedResponse();
  }

  try {
    const { slug } = await params;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const existing = await prisma.academy.findFirst({
        where: {
          OR: [
            { slug: { equals: slug, mode: "insensitive" } },
            { id: { equals: slug, mode: "insensitive" } },
          ],
        },
        include: { inquiries: true },
      });

      if (existing) {
        if (existing.inquiries.length > 0) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Cannot delete academy with existing admission inquiries (referential integrity restriction).",
            },
            { status: 400 }
          );
        }

        await prisma.academy.delete({ where: { id: existing.id } });
        academiesStore.delete(slug);

        return NextResponse.json({
          success: true,
          message: "Academy deleted successfully from database",
        });
      }
    }

    const deleted = academiesStore.delete(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: `Academy with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academy deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete academy" },
      { status: 500 }
    );
  }
}
