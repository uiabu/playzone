import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { createFoundationApplicationSchema } from "@/lib/validations/inquirySchema";
import { FoundationAppStatus } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_FOUNDATION_APPS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_FOUNDATION_APPS__) {
  globalThis.__PLAYZONE_FOUNDATION_APPS__ = [];
}

export async function GET() {
  try {
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbApps = await prisma.foundationApplication.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (dbApps && dbApps.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbApps.length,
          data: dbApps,
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: (globalThis.__PLAYZONE_FOUNDATION_APPS__ || []).length,
      data: globalThis.__PLAYZONE_FOUNDATION_APPS__ || [],
    });
  } catch (error) {
    console.error("GET /api/foundation/apply error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve foundation applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const validation = createFoundationApplicationSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required application fields correctly.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const body = validation.data;
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `PZF-${year}-${randomDigits}`;

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbApp = await prisma.foundationApplication.create({
        data: {
          id: applicationId,
          applicantName: body.applicantName.trim(),
          phone: body.phone.trim(),
          email: body.email ? body.email.trim() : null,
          district: body.district.trim(),
          clubOrAcademy: body.clubOrAcademy ? body.clubOrAcademy.trim() : null,
          playingRole: body.playingRole,
          injuryCategory: body.injuryCategory,
          dateOfInjury: body.dateOfInjury,
          venue: body.venue ? body.venue.trim() : null,
          injuryDescription: body.injuryDescription.trim(),
          hospitalName: body.hospitalName ? body.hospitalName.trim() : null,
          doctorName: body.doctorName ? body.doctorName.trim() : null,
          estimatedCost: body.estimatedCost ? body.estimatedCost.trim() : null,
          playzoneOrderId: body.playzoneOrderId ? body.playzoneOrderId.trim() : null,
          documentStorageKeys: body.documentStorageKeys || [],
          status: FoundationAppStatus.SUBMITTED,
        },
      });

      if (!globalThis.__PLAYZONE_FOUNDATION_APPS__) globalThis.__PLAYZONE_FOUNDATION_APPS__ = [];
      globalThis.__PLAYZONE_FOUNDATION_APPS__.unshift(dbApp);

      return NextResponse.json(
        {
          success: true,
          message: "Foundation medical aid application submitted and saved to database successfully!",
          data: {
            referenceId: dbApp.id,
            applicantName: dbApp.applicantName,
            status: "Submitted",
            createdAt: dbApp.createdAt.toISOString(),
          },
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    const fallbackApp = {
      id: applicationId,
      ...body,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    if (!globalThis.__PLAYZONE_FOUNDATION_APPS__) {
      globalThis.__PLAYZONE_FOUNDATION_APPS__ = [];
    }
    globalThis.__PLAYZONE_FOUNDATION_APPS__.unshift(fallbackApp);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        data: {
          referenceId: applicationId,
          applicantName: body.applicantName,
          status: "Submitted",
          createdAt: fallbackApp.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/foundation/apply error:", error);
    return NextResponse.json(
      { success: false, message: "Server error processing foundation application." },
      { status: 500 }
    );
  }
}
