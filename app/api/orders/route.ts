import { NextResponse } from "next/server";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_ORDERS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_ORDERS__) {
  globalThis.__PLAYZONE_ORDERS__ = [];
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: (globalThis.__PLAYZONE_ORDERS__ || []).length,
    data: globalThis.__PLAYZONE_ORDERS__ || [],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone) {
      return NextResponse.json(
        { success: false, message: "Customer name and phone number are required." },
        { status: 400 }
      );
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    const timestamp = new Date();
    const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PZ-${dateStr}-${randomSuffix}`;

    const newOrder = {
      id: orderId,
      createdAt: timestamp.toISOString(),
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim() : undefined,
      shippingAddress: body.shippingAddress ? body.shippingAddress.trim() : "",
      city: body.city || "Dhaka",
      items: body.items,
      subtotal: body.subtotal || 0,
      deliveryFee: body.deliveryFee !== undefined ? body.deliveryFee : 80,
      discount: body.discount || 0,
      totalAmount: body.totalAmount || 0,
      paymentMethod: body.paymentMethod || "cod",
      status: "Order Placed",
      notes: body.notes || "",
    };

    if (!globalThis.__PLAYZONE_ORDERS__) {
      globalThis.__PLAYZONE_ORDERS__ = [];
    }
    globalThis.__PLAYZONE_ORDERS__.unshift(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      { success: false, message: "Server error creating order." },
      { status: 500 }
    );
  }
}

