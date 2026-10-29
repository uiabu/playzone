import { NextResponse } from "next/server";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_PRE_ORDERS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_PRE_ORDERS__) {
  globalThis.__PLAYZONE_PRE_ORDERS__ = [];
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: (globalThis.__PLAYZONE_PRE_ORDERS__ || []).length,
    data: globalThis.__PLAYZONE_PRE_ORDERS__ || [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.productInfo) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer name, phone number, and product specifications are required.",
        },
        { status: 400 }
      );
    }

    const refNumber = `PZ-PRE-${Math.floor(100000 + Math.random() * 900000)}`;

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
      isOtpVerified: Boolean(body.isOtpVerified),
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

