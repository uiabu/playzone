import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const academy = academiesStore.getBySlug(slug);

    if (!academy) {
      return NextResponse.json(
        { success: false, message: `Academy not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: academy,
    });
  } catch (error) {
    console.error("GET /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const updates = await request.json();

    const updated = academiesStore.update(slug, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Academy with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academy updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update academy" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const deleted = academiesStore.delete(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: `Academy with slug "${slug}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academy deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/academies/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete academy" },
      { status: 500 }
    );
  }
}
