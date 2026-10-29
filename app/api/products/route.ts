import { NextResponse } from "next/server";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const isNew = searchParams.get("isNew");
    const isPreOwned = searchParams.get("isPreOwned");
    const featured = searchParams.get("featured");
    const limit = Number(searchParams.get("limit")) || 0;

    let products = [...ALL_PRODUCTS];

    if (category) {
      products = products.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.categorySlug.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand) {
      products = products.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    if (isNew === "true") {
      products = products.filter(
        (p) => p.condition === "new" || !p.condition || p.badge?.toLowerCase().includes("new")
      );
    }

    if (isPreOwned === "true") {
      products = products.filter(
        (p) => p.condition === "pre-owned" || p.categorySlug.includes("pre-owned")
      );
    }

    if (featured === "true") {
      products = products.filter(
        (p) => (p.badge && p.badge.length > 0) || p.rating >= 4.8
      );
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(search))
      );
    }

    if (limit > 0) {
      products = products.slice(0, limit);
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
