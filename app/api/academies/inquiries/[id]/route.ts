import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/adminAuth";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { InquiryStatus } from "@prisma/client";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function mapDisplayStatusToEnum(status: string): InquiryStatus {
  const norm = status.toLowerCase().replace(/[\s_-]+/g, "");
  if (norm.includes("review")) return InquiryStatus.UNDER_REVIEW;
  if (norm.includes("contact")) return InquiryStatus.CONTACTED;
  if (norm.includes("accept")) return InquiryStatus.ACCEPTED;
  if (norm.includes("reject")) return InquiryStatus.REJECTED;
  return InquiryStatus.PENDING;
}

function mapEnumToDisplayStatus(status: InquiryStatus | string): string {
  switch (status) {
    case InquiryStatus.UNDER_REVIEW:
      return "Under Review";
    case InquiryStatus.CONTACTED:
      return "Contacted";
    case InquiryStatus.ACCEPTED:
      return "Accepted";
    case InquiryStatus.REJECTED:
      return "Rejected";
    case InquiryStatus.PENDING:
    default:
      return "Pending";
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbInquiry = await prisma.academyInquiry.findUnique({
        where: { id },
        include: { academy: true },
      });

      if (dbInquiry) {
        return NextResponse.json({
          success: true,
          data: {
            id: dbInquiry.id,
            academyId: dbInquiry.academyId,
            academyName: dbInquiry.academy?.name || "Cricket Academy",
            studentName: dbInquiry.studentName,
            dateOfBirth: dbInquiry.dateOfBirth || "",
            age: dbInquiry.studentAge,
            guardianName: dbInquiry.guardianName,
            guardianPhone: dbInquiry.guardianPhone,
            guardianEmail: dbInquiry.guardianEmail || undefined,
            district: dbInquiry.address || "Dhaka",
            preferredTrainingType: dbInquiry.playingRole,
            previousExperience: dbInquiry.experienceYears || "Beginner level",
            preferredSchedule: dbInquiry.preferredBatch || "Regular Session",
            status: mapEnumToDisplayStatus(dbInquiry.status),
            adminNotes: dbInquiry.adminNotes || undefined,
            createdAt: dbInquiry.createdAt.toISOString(),
          },
        });
      }
    }

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
  if (!verifyAdminAuth(request)) {
    return unauthorizedResponse();
  }

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

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const dbInquiry = await prisma.academyInquiry.findUnique({
        where: { id },
      });

      if (dbInquiry) {
        const updateData: any = {};
        if (status) updateData.status = mapDisplayStatusToEnum(status);
        if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

        const updated = await prisma.academyInquiry.update({
          where: { id },
          data: updateData,
          include: { academy: true },
        });

        // Also update in-memory cache
        academiesStore.updateInquiryStatus(id, status, adminNotes);

        return NextResponse.json({
          success: true,
          message: "Inquiry status updated successfully in database",
          data: {
            id: updated.id,
            status: mapEnumToDisplayStatus(updated.status),
            adminNotes: updated.adminNotes,
          },
        });
      }
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
