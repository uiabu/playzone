import { NextResponse } from "next/server";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_CRICKETER_BOOKINGS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_CRICKETER_BOOKINGS__) {
  globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ = [];
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: (globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ || []).length,
    data: globalThis.__PLAYZONE_CRICKETER_BOOKINGS__ || [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.cricketerName || !body.contactPhone || !body.eventType) {
      return NextResponse.json(
        {
          success: false,
          message: "Cricketer name, event type, and contact phone are required.",
        },
        { status: 400 }
      );
    }

    const requestId = `CRIC-REQ-${Math.floor(100000 + Math.random() * 900000)}`;

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

