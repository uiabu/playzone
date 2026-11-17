import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { BookingStatus } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_EXPERT_BOOKINGS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_EXPERT_BOOKINGS__) {
  globalThis.__PLAYZONE_EXPERT_BOOKINGS__ = [];
}

export async function GET() {
  try {
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbBookings = await prisma.expertBooking.findMany({
        include: { expert: true },
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
      count: (globalThis.__PLAYZONE_EXPERT_BOOKINGS__ || []).length,
      data: globalThis.__PLAYZONE_EXPERT_BOOKINGS__ || [],
    });
  } catch (error) {
    console.error("GET /api/expert-bookings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve expert bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const expertId = body.expertId;
    const customerPhone = body.customerPhone;
    const bookingDate = body.bookingDate || body.date;

    if (!expertId || !customerPhone || !bookingDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Expert ID, customer phone, and booking date are required.",
        },
        { status: 400 }
      );
    }

    const bookingId = `EXP-${Math.floor(100000 + Math.random() * 900000)}`;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      // Find expert by id or slug
      let targetExpert = await prisma.expert.findUnique({ where: { id: expertId } });
      if (!targetExpert) {
        targetExpert = await prisma.expert.findUnique({ where: { slug: expertId } });
      }

      if (targetExpert) {
        const createdDbBooking = await prisma.expertBooking.create({
          data: {
            id: bookingId,
            expertId: targetExpert.id,
            customerName: body.customerName ? body.customerName.trim() : "Cricket Enthusiast",
            customerPhone: customerPhone.trim(),
            customerEmail: body.customerEmail ? body.customerEmail.trim() : null,
            bookingDate,
            timeSlot: body.timeSlot || "Morning Slot",
            serviceMode: body.serviceMode || "ground",
            locationDetails: body.locationDetails ? body.locationDetails.trim() : null,
            notes: body.notes ? body.notes.trim() : null,
            totalFee: Number(body.totalFee) || targetExpert.hourlyRate || 0,
            status: BookingStatus.PENDING,
          },
        });

        if (!globalThis.__PLAYZONE_EXPERT_BOOKINGS__) globalThis.__PLAYZONE_EXPERT_BOOKINGS__ = [];
        globalThis.__PLAYZONE_EXPERT_BOOKINGS__.unshift(createdDbBooking);

        return NextResponse.json(
          {
            success: true,
            message: "Expert booking request confirmed and saved to database successfully!",
            data: createdDbBooking,
          },
          { status: 201 }
        );
      }
    }

    // In-memory fallback
    const booking = {
      id: bookingId,
      expertId,
      expertName: body.expertName || "Cricket Expert",
      customerName: body.customerName || "Player",
      customerPhone,
      customerEmail: body.customerEmail || undefined,
      date: bookingDate,
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
