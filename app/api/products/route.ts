import { NextResponse } from "next/server";
import { ALL_PRODUCTS } from "@/lib/productsData";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { ProductCondition } from "@prisma/client";

function mapDbProductToFrontend(p: any): any {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category?.name || "Cricket Equipment",
    categorySlug: p.category?.slug || p.categoryId || "cricket-bats",
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    discountPercent: p.discountPercent ?? undefined,
    badge: p.badge ?? undefined,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    viewsCount: p.viewsCount,
    inStock: p.inStock,
    stockCount: p.stockCount,
    images: p.images || [],
    image: p.images?.[0] || "/images/products/bats/mrf.png",
    shortDescription: p.shortDescription,
    description: p.description,
    highlights: p.highlights || [],
    specs: p.specs || [],
    sizes: p.sizes || [],
    weights: p.weights || [],
    colors: p.colors || [],
    extraServices: p.extraServices || [],
    condition: p.condition === ProductCondition.PRE_OWNED ? "pre-owned" : "new",
    conditionGrade: p.conditionGrade ?? undefined,
    warranty: p.warranty || "100% Genuine Quality Guarantee",
    deliveryDaysDhaka: p.deliveryDaysDhaka || "24 Hours",
    deliveryDaysNationwide: p.deliveryDaysNationwide || "2 - 3 Days",
    videoUrl: p.videoUrl ?? undefined,
  };
}

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

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const where: any = {};

      if (category) {
        where.OR = [
          { categoryId: { equals: category, mode: "insensitive" } },
          { category: { slug: { equals: category, mode: "insensitive" } } },
          { category: { name: { equals: category, mode: "insensitive" } } },
        ];
      }

      if (brand) {
        where.brand = { equals: brand, mode: "insensitive" };
      }

      if (isNew === "true") {
        where.condition = ProductCondition.NEW;
      }

      if (isPreOwned === "true") {
        where.condition = ProductCondition.PRE_OWNED;
      }

      if (featured === "true") {
        where.isFeatured = true;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
          { shortDescription: { contains: search, mode: "insensitive" } },
        ];
      }

      const dbProducts = await prisma.product.findMany({
        where,
        include: { category: true },
        take: limit > 0 ? limit : undefined,
        orderBy: [{ isFeatured: "desc" }, { rating: "desc" }],
      });

      if (dbProducts && dbProducts.length > 0) {
        return NextResponse.json({
          success: true,
          count: dbProducts.length,
          data: dbProducts.map(mapDbProductToFrontend),
        });
      }
    }

    // High-performance fallback to static in-memory catalog
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
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED"
    ) {
      throw err;
    }
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
