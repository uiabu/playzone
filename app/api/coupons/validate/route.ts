import { NextResponse } from "next/server";

interface CouponRule {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  minSubtotal?: number;
  description: string;
}

const AVAILABLE_COUPONS: CouponRule[] = [
  {
    code: "PLAYZONE10",
    discountType: "percent",
    discountValue: 10,
    description: "10% off your entire cricket gear order",
  },
  {
    code: "CRICKET10",
    discountType: "percent",
    discountValue: 10,
    description: "10% cricket season promotional discount",
  },
  {
    code: "CRICKET2026",
    discountType: "percent",
    discountValue: 15,
    minSubtotal: 3000,
    description: "15% off on orders above ৳3,000",
  },
  {
    code: "WELCOME500",
    discountType: "fixed",
    discountValue: 500,
    minSubtotal: 2500,
    description: "Flat ৳500 off on first order above ৳2,500",
  },
  {
    code: "BANGLADESH",
    discountType: "percent",
    discountValue: 12,
    description: "12% National cricket support discount",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawCode = body.code ? String(body.code).trim().toUpperCase() : "";
    const subtotal = Number(body.subtotal) || 0;

    if (!rawCode) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid coupon code." },
        { status: 400 }
      );
    }

    const matched = AVAILABLE_COUPONS.find((c) => c.code === rawCode);

    if (!matched) {
      return NextResponse.json(
        {
          success: false,
          message: `Coupon "${rawCode}" is invalid or expired. Try PLAYZONE10.`,
        },
        { status: 400 }
      );
    }

    if (matched.minSubtotal && subtotal < matched.minSubtotal) {
      return NextResponse.json(
        {
          success: false,
          message: `Coupon "${rawCode}" requires a minimum subtotal of ৳${matched.minSubtotal.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    const calculatedDiscount =
      matched.discountType === "percent"
        ? Math.round(subtotal * (matched.discountValue / 100))
        : Math.min(matched.discountValue, subtotal);

    return NextResponse.json({
      success: true,
      message: `Coupon "${matched.code}" applied! ${matched.description}`,
      data: {
        code: matched.code,
        discountType: matched.discountType,
        discountValue: matched.discountValue,
        calculatedDiscount,
      },
    });
  } catch (err) {
    console.error("POST /api/coupons/validate error:", err);
    return NextResponse.json(
      { success: false, message: "Error validating coupon." },
      { status: 500 }
    );
  }
}

