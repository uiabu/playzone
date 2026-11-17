import { NextResponse } from "next/server";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { OrderStatus, ReservationStatus } from "@prisma/client";

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
          payments: true,
          reservations: true,
        },
      });

      if (order) {
        const payment = order.payments?.[0];
        return NextResponse.json({
          success: true,
          data: {
            id: order.id,
            createdAt: order.createdAt.toISOString(),
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            customerEmail: order.customerEmail || undefined,
            shippingAddress: order.shippingAddress,
            city: order.district,
            district: order.district,
            division: order.division || undefined,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            discount: order.discount,
            totalAmount: order.totalAmount,
            status: mapOrderStatusToDisplay(order.status),
            rawStatus: order.status,
            cancelReason: order.cancelReason || undefined,
            cancelledAt: order.cancelledAt?.toISOString() || undefined,
            paymentMethod: payment ? payment.method.toLowerCase() : "cod",
            paymentStatus: payment ? payment.status : "PENDING",
            items: order.items.map((it) => ({
              id: it.id,
              productId: it.productId,
              productName: it.productNameSnapshot,
              price: it.unitPriceAtPurchase,
              quantity: it.quantity,
              productImage: it.imageSnapshot || "/images/products/bats/mrf.png",
              specifications: it.specificationsSnapshot || undefined,
            })),
          },
        });
      }
    }

    // In-memory fallback
    const orders = globalThis.__PLAYZONE_ORDERS__ || [];
    const matched = orders.find(
      (o: any) => o.id?.toLowerCase() === id.toLowerCase()
    );

    if (matched) {
      return NextResponse.json({ success: true, data: matched });
    }

    return NextResponse.json(
      { success: false, message: "Order not found." },
      { status: 404 }
    );
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED"
    ) {
      throw err;
    }
    console.error("GET /api/orders/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve order." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders/[id]
 * Supports order cancellation and administrative status transitions.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const isDbReady = await isDatabaseAvailable();

    if (!isDbReady) {
      // In-memory update
      const orders = globalThis.__PLAYZONE_ORDERS__ || [];
      const idx = orders.findIndex((o: any) => o.id?.toLowerCase() === id.toLowerCase());
      if (idx !== -1) {
        if (body.action === "cancel" || body.status === "Cancelled") {
          orders[idx].status = "Cancelled";
          orders[idx].cancelReason = body.reason || "Customer requested cancellation";
        } else if (body.status) {
          orders[idx].status = body.status;
        }
        return NextResponse.json({ success: true, data: orders[idx] });
      }
      return NextResponse.json({ success: false, message: "Order not found." }, { status: 404 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, reservations: true },
    });

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found." }, { status: 404 });
    }

    // Order Cancellation Logic
    if (body.action === "cancel" || body.status === "CANCELLED" || body.status === "Cancelled") {
      if (order.status === OrderStatus.DELIVERED) {
        return NextResponse.json(
          { success: false, message: "Delivered orders cannot be cancelled." },
          { status: 400 }
        );
      }

      if (order.status === OrderStatus.CANCELLED) {
        return NextResponse.json(
          { success: false, message: "Order is already cancelled." },
          { status: 400 }
        );
      }

      const reason = body.reason || "Customer requested cancellation";

      // Atomic cancellation transaction
      const cancelledOrder = await prisma.$transaction(async (tx) => {
        // 1. Release active stock reservations
        await tx.stockReservation.updateMany({
          where: {
            orderId: order.id,
            status: ReservationStatus.RESERVED,
          },
          data: {
            status: ReservationStatus.RELEASED,
          },
        });

        // 2. If already packed or in transit, restore product stock
        if (order.status === OrderStatus.PACKED || order.status === OrderStatus.IN_TRANSIT) {
          for (const item of order.items) {
            if (item.productId) {
              await tx.product.update({
                where: { id: item.productId },
                data: {
                  stockCount: { increment: item.quantity },
                  inStock: true,
                },
              });
            }
          }
        }

        // 3. Mark order as CANCELLED
        const updated = await tx.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.CANCELLED,
            cancelReason: reason,
            cancelledAt: new Date(),
          },
        });

        // 4. Record Audit Log
        await tx.auditLog.create({
          data: {
            action: "ORDER_CANCELLED",
            entityType: "Order",
            entityId: order.id,
            metadata: {
              reason,
              previousStatus: order.status,
            },
          },
        });

        return updated;
      });

      return NextResponse.json({
        success: true,
        message: "Order successfully cancelled and stock reservations released.",
        data: cancelledOrder,
      });
    }

    // Administrative status transition (e.g. PACKED, IN_TRANSIT, DELIVERED)
    if (body.status && Object.values(OrderStatus).includes(body.status)) {
      const updated = await prisma.order.update({
        where: { id: order.id },
        data: { status: body.status as OrderStatus },
      });

      return NextResponse.json({
        success: true,
        message: `Order status updated to ${mapOrderStatusToDisplay(updated.status)}`,
        data: updated,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid update payload or unsupported status." },
      { status: 400 }
    );
  } catch (err) {
    console.error("PATCH /api/orders/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update order." },
      { status: 500 }
    );
  }
}
