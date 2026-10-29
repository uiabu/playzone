import { NextResponse } from "next/server";
import { ALL_PRODUCTS } from "@/lib/productsData";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const normalized = (slug || "").trim().toLowerCase();

    const product = ALL_PRODUCTS.find(
      (p) =>
        p.slug.toLowerCase() === normalized ||
        p.id.toLowerCase() === normalized
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: `Product not found for: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("GET /api/products/[slug] error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

