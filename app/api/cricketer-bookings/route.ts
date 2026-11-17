import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { createCricketerBookingSchema } from "@/lib/validations/inquirySchema";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_CRICKETER_BOOKINGS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_CRICKETER_BOOKINGS__) {
  globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ = [];
}

export async function GET() {
  try {
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbBookings = await prisma.cricketerBooking.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (dbBookings && dbBookings.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbBookings.length,
          data: dbBookings,
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: (globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ || []).length,
      data: globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ || [],
    });
  } catch (error) {
    console.error("GET /api/cricketer-bookings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve cricketer bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const validation = createCricketerBookingSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields correctly.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const body = validation.data;
    const requestId = `CRIC-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      // Check if cricketer exists in DB
      let validCricketerId: string | null = null;
      if (body.cricketerId && body.cricketerId !== "custom") {
        const cExists = await prisma.cricketer.findFirst({
          where: {
            OR: [
              { id: body.cricketerId },
              { slug: body.cricketerId },
            ],
          },
        });
        if (cExists) validCricketerId = cExists.id;
      }

      const createdDbBooking = await prisma.cricketerBooking.create({
        data: {
          id: requestId,
          cricketerId: validCricketerId,
          cricketerName: body.cricketerName,
          eventType: body.eventType,
          preferredDate: body.preferredDate,
          backupDate: body.backupDate || null,
          duration: body.duration || "2-3 Hours",
          venue: body.venue || null,
          budgetRange: body.budgetRange || "To be discussed",
          organizationName: body.organizationName || null,
          contactName: body.contactName,
          contactPhone: body.contactPhone,
          contactEmail: body.contactEmail || null,
          eventDescription: body.eventDescription || null,
          status: "Coordination in Progress",
        },
      });

      // Keep in-memory cache updated
      if (!globalThis.__PLAYZONE_CRICKETER_BOOKINGS__) globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ = [];
      globalThis.__PLAYZONE_CRICKETER_BOOKINGS__.unshift(createdDbBooking);

      return NextResponse.json(
        {
          success: true,
          message: "Cricketer booking request submitted successfully. Playzone concierge will contact you.",
          data: createdDbBooking,
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    const bookingRequest = {
      id: requestId,
      cricketerId: body.cricketerId || "custom",
      cricketerName: body.cricketerName,
      eventType: body.eventType,
      preferredDate: body.preferredDate || "",
      backupDate: body.backupDate || undefined,
      duration: body.duration || "2-3 Hours",
      venue: body.venue || "",
      budgetRange: body.budgetRange || "To be discussed",
      organizationName: body.organizationName || undefined,
      contactName: body.contactName || "Client",
      contactPhone: body.contactPhone,
      contactEmail: body.contactEmail || "",
      eventDescription: body.eventDescription || "",
      status: "Coordination in Progress",
      createdAt: new Date().toISOString(),
    };

    if (!globalThis.__PLAYZONE_CRICKETER_BOOKINGS__) {
      globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ = [];
    }
    globalThis.__PLAYZONE_CRICKETER_BOOKINGS__.unshift(bookingRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Cricketer booking request submitted successfully. Playzone concierge will contact you.",
        data: bookingRequest,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/cricketer-bookings error:", err);
    return NextResponse.json(
      { success: false, message: "Error processing cricketer booking request." },
      { status: 500 }
    );
  }
}
