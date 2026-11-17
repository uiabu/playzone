import { NextResponse } from "next/server";
import { ALL_PRODUCTS } from "@/lib/productsData";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { ProductCondition } from "@prisma/client";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

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

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const normalized = (slug || "").trim().toLowerCase();

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbProduct = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: { equals: normalized, mode: "insensitive" } },
            { id: { equals: normalized, mode: "insensitive" } },
          ],
        },
        include: { category: true },
      });

      if (dbProduct) {
        return NextResponse.json({
          success: true,
          data: mapDbProductToFrontend(dbProduct),
        });
      }
    }

    // Static in-memory fallback
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
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED"
    ) {
      throw err;
    }
    console.error("GET /api/products/[slug] error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
