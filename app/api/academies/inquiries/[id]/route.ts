import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const inquiry = academiesStore.getInquiryById(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: `Inquiry with ID "${id}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("GET /api/academies/inquiries/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const validStatuses = [
      "Pending",
      "Under Review",
      "Contacted",
      "Accepted",
      "Rejected",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Invalid status: ${status}` },
        { status: 400 }
      );
    }

    const updated = academiesStore.updateInquiryStatus(id, status, adminNotes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Inquiry with ID "${id}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/academies/inquiries/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
