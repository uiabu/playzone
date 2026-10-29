import { NextResponse } from "next/server";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_EXPERT_BOOKINGS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_EXPERT_BOOKINGS__) {
  globalThis.__PLAYZONE_EXPERT_BOOKINGS__ = [];
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: (globalThis.__PLAYZONE_EXPERT_BOOKINGS__ || []).length,
    data: globalThis.__PLAYZONE_EXPERT_BOOKINGS__ || [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.expertId || !body.customerPhone || !body.date) {
      return NextResponse.json(
        {
          success: false,
          message: "Expert ID, customer phone, and booking date are required.",
        },
        { status: 400 }
      );
    }

    const bookingId = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const booking = {
      id: bookingId,
      expertId: body.expertId,
      expertName: body.expertName || "Cricket Expert",
      customerName: body.customerName || "Player",
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail || undefined,
      date: body.date,
      timeSlot: body.timeSlot || "Morning Slot",
      serviceMode: body.serviceMode || "ground",
      locationDetails: body.locationDetails || "",
      notes: body.notes || "",
      totalFee: body.totalFee || 0,
      status: "Pending Confirmation",
      createdAt: new Date().toISOString(),
    };

    if (!globalThis.__PLAYZONE_EXPERT_BOOKINGS__) {
      globalThis.__PLAYZONE_EXPERT_BOOKINGS__ = [];
    }
    globalThis.__PLAYZONE_EXPERT_BOOKINGS__.unshift(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received. Coordinator will contact you shortly.",
        data: booking,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/expert-bookings error:", err);
    return NextResponse.json(
      { success: false, message: "Server error processing booking." },
      { status: 500 }
    );
  }
}

