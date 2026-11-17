import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { createPreOrderSchema } from "@/lib/validations/inquirySchema";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_PRE_ORDERS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_PRE_ORDERS__) {
  globalThis.__PLAYZONE_PRE_ORDERS__ = [];
}

export async function GET() {
  try {
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbPreOrders = await prisma.preOrder.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (dbPreOrders && dbPreOrders.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbPreOrders.length,
          data: dbPreOrders,
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: (globalThis.__PLAYZONE_PRE_ORDERS__ || []).length,
      data: globalThis.__PLAYZONE_PRE_ORDERS__ || [],
    });
  } catch (error) {
    console.error("GET /api/pre-orders error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve pre-orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    const validation = createPreOrderSchema.safeParse(rawBody);
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
    const refNumber = `PZ-PRE-${Math.floor(100000 + Math.random() * 900000)}`;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbPreOrder = await prisma.preOrder.create({
        data: {
          preOrderReference: refNumber,
          customerName: body.customerName.trim(),
          customerPhone: body.customerPhone.trim(),
          customerEmail: body.customerEmail ? body.customerEmail.trim() : null,
          deliveryAddress: body.deliveryAddress ? body.deliveryAddress.trim() : null,
          productInfo: body.productInfo.trim(),
          referenceUrl: body.referenceUrl || null,
          attachedImageUrl: body.attachedImageUrl || null,
          isOtpVerified: false,
          status: "Pending Review",
        },
      });

      if (!globalThis.__PLAYZONE_PRE_ORDERS__) globalThis.__PLAYZONE_PRE_ORDERS__ = [];
      globalThis.__PLAYZONE_PRE_ORDERS__.unshift({
        ...dbPreOrder,
        refNumber: dbPreOrder.preOrderReference,
        createdAt: dbPreOrder.createdAt.toISOString(),
      });

      return NextResponse.json(
        {
          success: true,
          message: "Pre-order inquiry saved to database successfully!",
          data: {
            id: dbPreOrder.id,
            refNumber: dbPreOrder.preOrderReference,
            customerName: dbPreOrder.customerName,
            status: dbPreOrder.status,
            createdAt: dbPreOrder.createdAt.toISOString(),
          },
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    const preOrder = {
      id: refNumber,
      refNumber,
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim() : undefined,
      deliveryAddress: body.deliveryAddress ? body.deliveryAddress.trim() : "",
      productInfo: body.productInfo.trim(),
      referenceUrl: body.referenceUrl || undefined,
      attachedImageUrl: body.attachedImageUrl || undefined,
      isOtpVerified: false,
      status: "Inquiry Received",
      createdAt: new Date().toISOString(),
    };

    if (!globalThis.__PLAYZONE_PRE_ORDERS__) {
      globalThis.__PLAYZONE_PRE_ORDERS__ = [];
    }
    globalThis.__PLAYZONE_PRE_ORDERS__.unshift(preOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Pre-order submitted successfully!",
        data: preOrder,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/pre-orders error:", err);
    return NextResponse.json(
      { success: false, message: "Error submitting pre-order inquiry." },
      { status: 500 }
    );
  }
}
