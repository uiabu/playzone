import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";
import { prisma, isDatabaseAvailable } from "@/lib/db";
import { InquiryStatus } from "@prisma/client";

const BD_PHONE_REGEX = /^(?:\+?880|0)?1[3-9]\d{8}$/;

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const academyId = searchParams.get("academyId") || undefined;
    const status = searchParams.get("status") || undefined;

    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      const where: any = {};
      if (academyId) where.academyId = academyId;
      if (status && status !== "All") {
        where.status = mapDisplayStatusToEnum(status);
      }

      const dbInquiries = await prisma.academyInquiry.findMany({
        where,
        include: { academy: true },
        orderBy: { createdAt: "desc" },
      });

      if (dbInquiries && dbInquiries.length > 0) {
        const formatted = dbInquiries.map((i) => ({
          id: i.id,
          academyId: i.academyId,
          academyName: i.academy?.name || "Cricket Academy",
          studentName: i.studentName,
          dateOfBirth: i.dateOfBirth || "",
          age: i.studentAge,
          guardianName: i.guardianName,
          guardianPhone: i.guardianPhone,
          guardianEmail: i.guardianEmail || undefined,
          district: i.address || "Dhaka",
          preferredTrainingType: i.playingRole,
          previousExperience: i.experienceYears || "Beginner level",
          preferredSchedule: i.preferredBatch || "Regular Session",
          status: mapEnumToDisplayStatus(i.status),
          adminNotes: i.adminNotes || undefined,
          createdAt: i.createdAt.toISOString(),
        }));

        return NextResponse.json({
          success: true,
          count: formatted.length,
          data: formatted,
        });
      }
    }

    // In-memory fallback
    let inquiries = academiesStore.getInquiries(academyId);

    if (status && status !== "All") {
      inquiries = inquiries.filter((i) => i.status === status);
    }

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("GET /api/academies/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve admission inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      academyId,
      academyName,
      studentName,
      dateOfBirth,
      age,
      guardianName,
      guardianPhone,
      guardianEmail,
      district,
      preferredTrainingType,
      previousExperience,
      preferredSchedule,
      message,
    } = body;

    // Validation
    if (!studentName || typeof studentName !== "string" || studentName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid student name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const numericAge = Number(age);
    if (!numericAge || numericAge < 5 || numericAge > 40) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid age between 5 and 40 years." },
        { status: 400 }
      );
    }

    if (!guardianPhone || !BD_PHONE_REGEX.test(guardianPhone.replace(/[\s-]/g, ""))) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a valid Bangladesh mobile number (e.g., 017XXXXXXXX, 018XXXXXXXX).",
        },
        { status: 400 }
      );
    }

    if (numericAge < 18 && (!guardianName || guardianName.trim().length < 2)) {
      return NextResponse.json(
        {
          success: false,
          message: "Guardian name is required for applicants under 18 years of age.",
        },
        { status: 400 }
      );
    }

    const normalizedPhone = guardianPhone.replace(/[\s-]/g, "");
    const finalAcademyId = academyId || "pubergaon-cricket-academy";
    const isDbReady = await isDatabaseAvailable();

    if (isDbReady) {
      // Check if academy exists in DB
      let targetAcademy = await prisma.academy.findUnique({
        where: { id: finalAcademyId },
      });

      if (!targetAcademy) {
        // Find by slug
        targetAcademy = await prisma.academy.findUnique({
          where: { slug: finalAcademyId },
        });
      }

      if (targetAcademy) {
        // Duplicate check within 10 minutes
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const existingRecent = await prisma.academyInquiry.findFirst({
          where: {
            academyId: targetAcademy.id,
            studentName: { equals: studentName.trim(), mode: "insensitive" },
            guardianPhone: normalizedPhone,
            createdAt: { gte: tenMinutesAgo },
          },
        });

        if (existingRecent) {
          return NextResponse.json(
            {
              success: false,
              message: `An admission inquiry for "${studentName}" was recently submitted. Application Ref: ${existingRecent.id}`,
              existingRefId: existingRecent.id,
            },
            { status: 409 }
          );
        }

        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const inquiryId = `ADM-INQ-2026-${randomDigits}`;

        const createdDbInquiry = await prisma.academyInquiry.create({
          data: {
            id: inquiryId,
            academyId: targetAcademy.id,
            studentName: studentName.trim(),
            studentAge: numericAge,
            dateOfBirth: dateOfBirth || null,
            playingRole: preferredTrainingType || "All-rounder",
            guardianName: guardianName ? guardianName.trim() : studentName.trim(),
            guardianPhone: normalizedPhone,
            guardianEmail: guardianEmail ? guardianEmail.trim() : null,
            address: district ? district.trim() : null,
            preferredBatch: preferredSchedule || "Regular Session",
            experienceYears: previousExperience ? previousExperience.trim() : "Beginner",
            status: InquiryStatus.PENDING,
            adminNotes: message ? `Notes: ${message.trim()}` : null,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: "Admission inquiry submitted and saved to database successfully!",
            data: {
              referenceId: createdDbInquiry.id,
              studentName: createdDbInquiry.studentName,
              academyName: targetAcademy.name,
              status: "Pending",
              createdAt: createdDbInquiry.createdAt.toISOString(),
            },
          },
          { status: 201 }
        );
      }
    }

    // Fallback to in-memory store
    const newInquiry = academiesStore.createInquiry({
      academyId: finalAcademyId,
      academyName: academyName || "Cricket Academy",
      studentName: studentName.trim(),
      dateOfBirth: dateOfBirth || "",
      age: numericAge,
      guardianName: guardianName ? guardianName.trim() : undefined,
      guardianPhone: normalizedPhone,
      guardianEmail: guardianEmail ? guardianEmail.trim() : undefined,
      district: district ? district.trim() : "Dhaka",
      preferredTrainingType: preferredTrainingType || "All-rounder",
      previousExperience: previousExperience ? previousExperience.trim() : "Beginner level",
      preferredSchedule: preferredSchedule || "Regular Session",
      message: message ? message.trim() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admission inquiry submitted successfully!",
        data: {
          referenceId: newInquiry.id,
          studentName: newInquiry.studentName,
          academyName: newInquiry.academyName,
          status: newInquiry.status,
          createdAt: newInquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/academies/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Server error processing admission inquiry." },
      { status: 500 }
    );
  }
}
