import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { createOrderSchema } from "@/lib/validations/orderSchema";
import { PaymentMethod, DeliveryZone, OrderStatus } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_ORDERS__: any[] | undefined;
}

if (!globalThis.__PLAYZONE_ORDERS__) {
  globalThis.__PLAYZONE_ORDERS__ = [];
}

function mapOrderStatusToDisplay(status: OrderStatus | string): string {
  switch (status) {
    case "ORDER_PLACED":
      return "Order Placed";
    case "VERIFIED":
      return "Order Verified";
    case "PACKED":
      return "Packed & Ready";
    case "IN_TRANSIT":
      return "In Transit";
    case "DELIVERED":
      return "Delivered";
    case "CANCELLED":
      return "Cancelled";
    default:
      return String(status);
  }
}

function formatPrismaOrder(order: any) {
  const payment = order.payments?.[0];
  return {
    id: order.id,
    createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail || undefined,
    shippingAddress: order.shippingAddress,
    city: order.district || "Dhaka",
    district: order.district || "Dhaka",
    division: order.division || undefined,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    discount: order.discount,
    totalAmount: order.totalAmount,
    couponCode: order.couponCode || undefined,
    paymentMethod: payment ? payment.method.toLowerCase() : "cod",
    paymentStatus: payment ? payment.status : "PENDING",
    status: mapOrderStatusToDisplay(order.status),
    notes: order.notes || "",
    items: (order.items || []).map((it: any) => ({
      id: it.id,
      productId: it.productId,
      productName: it.productNameSnapshot || it.productName,
      price: it.unitPriceAtPurchase || it.price,
      quantity: it.quantity,
      productImage: it.imageSnapshot || it.productImage || "/images/products/bats/mrf.png",
      specifications: it.specificationsSnapshot || undefined,
    })),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search =
      searchParams.get("id") ||
      searchParams.get("search") ||
      searchParams.get("query");

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      if (search) {
        const clean = search.trim();
        const cleanDigits = clean.replace(/\D/g, "");

        const dbOrder = await prisma.order.findFirst({
          where: {
            OR: [
              { id: { equals: clean, mode: "insensitive" } },
              cleanDigits.length >= 7
                ? { customerPhone: { contains: cleanDigits } }
                : { customerPhone: { equals: clean } },
            ],
          },
          include: {
            items: true,
            payments: true,
          },
          orderBy: { createdAt: "desc" },
        });

        if (dbOrder) {
          return NextResponse.json({
            success: true,
            data: formatPrismaOrder(dbOrder),
          });
        }
      } else {
        const dbOrders = await prisma.order.findMany({
          take: 50,
          orderBy: { createdAt: "desc" },
          include: {
            items: true,
            payments: true,
          },
        });

        return NextResponse.json({
          success: true,
          count: dbOrders.length,
          data: dbOrders.map(formatPrismaOrder),
        });
      }
    }

    // In-memory fallback
    const orders = globalThis.__PLAYZONE_ORDERS__ || [];

    if (search) {
      const clean = search.trim().toLowerCase();
      const matched = orders.find(
        (o: any) =>
          o.id?.toLowerCase() === clean ||
          (o.customerPhone &&
            o.customerPhone
              .replace(/\D/g, "")
              .includes(clean.replace(/\D/g, "")))
      );

      return NextResponse.json({
        success: true,
        data: matched || null,
      });
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED"
    ) {
      throw err;
    }
    console.error("GET /api/orders error:", err);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // 1. Zod Validation
    const validation = createOrderSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Order validation failed. Please check your submitted details.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const body = validation.data;

    // Generate Order ID
    const timestamp = new Date();
    const dateStr = timestamp.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = body.id || body.orderId || `PZ-${dateStr}-${randomSuffix}`;

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      // Map payment method enum
      let paymentEnum: PaymentMethod = PaymentMethod.CASH_ON_DELIVERY;
      if (body.paymentMethod === "bkash") paymentEnum = PaymentMethod.BKASH;
      else if (body.paymentMethod === "nagad") paymentEnum = PaymentMethod.NAGAD;
      else if (body.paymentMethod === "card") paymentEnum = PaymentMethod.CARD;

      // Map delivery zone
      const zoneEnum: DeliveryZone =
        body.deliveryZone === "outside_dhaka"
          ? DeliveryZone.OUTSIDE_DHAKA
          : DeliveryZone.INSIDE_DHAKA;

      const idempotencyKey = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes TTL

      // Multi-row transaction with stock reservation
      const createdDbOrder = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            id: orderId,
            customerName: body.customerName.trim(),
            customerPhone: body.customerPhone.trim(),
            customerEmail: body.customerEmail ? body.customerEmail.trim() : null,
            shippingAddress: body.shippingAddress.trim(),
            district: body.city || "Dhaka",
            division: body.division || null,
            deliveryZone: zoneEnum,
            subtotal: body.subtotal,
            deliveryFee: body.deliveryFee,
            discount: body.discount,
            totalAmount: body.totalAmount,
            status: OrderStatus.ORDER_PLACED,
            notes: body.notes || null,
            items: {
              create: body.items.map((it) => ({
                productId: it.productId || null,
                productNameSnapshot: it.productName,
                skuSnapshot: it.productId ? `${it.productId}-STD`.toUpperCase() : null,
                unitPriceAtPurchase: it.price,
                specificationsSnapshot: {
                  size: it.selectedSize || null,
                  weight: it.selectedWeight || null,
                  condition: it.condition || "new",
                  category: it.category || null,
                  selectedServices: it.selectedServices || [],
                },
                imageSnapshot: it.productImage || null,
                quantity: it.quantity,
                itemSubtotal: it.price * it.quantity,
              })),
            },
            payments: {
              create: {
                method: paymentEnum,
                idempotencyKey,
                amount: body.totalAmount,
                currency: "BDT",
                status: "PENDING",
              },
            },
          },
          include: {
            items: true,
            payments: true,
          },
        });

        // Reserve stock with 15-minute hold
        for (const it of body.items) {
          if (it.productId) {
            const p = await tx.product.findUnique({ where: { id: it.productId } });
            if (p) {
              await tx.stockReservation.create({
                data: {
                  orderId: order.id,
                  productId: p.id,
                  quantity: it.quantity,
                  expiresAt,
                  status: "RESERVED",
                },
              });
            }
          }
        }

        return order;
      });

      const responseOrder = formatPrismaOrder(createdDbOrder);

      // Keep in-memory in sync for seamless fallback
      if (!globalThis.__PLAYZONE_ORDERS__) globalThis.__PLAYZONE_ORDERS__ = [];
      globalThis.__PLAYZONE_ORDERS__.unshift(responseOrder);

      return NextResponse.json(
        {
          success: true,
          message: "Order placed and reserved successfully in database!",
          data: responseOrder,
        },
        { status: 201 }
      );
    }

    // In-memory fallback
    const fallbackOrder = {
      id: orderId,
      createdAt: timestamp.toISOString(),
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim() : undefined,
      shippingAddress: body.shippingAddress.trim(),
      city: body.city || "Dhaka",
      district: body.city || "Dhaka",
      items: body.items.map((it) => ({
        id: it.productId || "gear",
        productId: it.productId,
        productName: it.productName,
        price: it.price,
        quantity: it.quantity,
        productImage: it.productImage || "/images/products/bats/mrf.png",
      })),
      subtotal: body.subtotal,
      deliveryFee: body.deliveryFee,
      discount: body.discount,
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      status: "Order Placed",
      notes: body.notes || "",
    };

    if (!globalThis.__PLAYZONE_ORDERS__) {
      globalThis.__PLAYZONE_ORDERS__ = [];
    }
    globalThis.__PLAYZONE_ORDERS__.unshift(fallbackOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully!",
        data: fallbackOrder,
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
