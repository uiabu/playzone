import { NextResponse } from "next/server";
import { academiesStore } from "@/lib/academiesStore";

// Bangladesh phone number regex: +8801XXXXXXXXX or 01XXXXXXXXX (11 digits starting with 01)
const BD_PHONE_REGEX = /^(?:\+?880|0)?1[3-9]\d{8}$/;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const academyId = searchParams.get("academyId") || undefined;
    const status = searchParams.get("status") || undefined;

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

    // 1. Validation: Student Name
    if (!studentName || typeof studentName !== "string" || studentName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid student name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // 2. Validation: Age / Date of Birth
    const numericAge = Number(age);
    if (!numericAge || numericAge < 5 || numericAge > 40) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid age between 5 and 40 years." },
        { status: 400 }
      );
    }

    // 3. Validation: Guardian phone (mandatory for applicants under 18, and standard contact)
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

    // If student is under 18, guardian name is strongly required
    if (numericAge < 18 && (!guardianName || guardianName.trim().length < 2)) {
      return NextResponse.json(
        {
          success: false,
          message: "Guardian name is required for applicants under 18 years of age.",
        },
        { status: 400 }
      );
    }

    // 4. District validation
    if (!district || district.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please specify your district or location." },
        { status: 400 }
      );
    }

    // 5. Training type validation
    if (!preferredTrainingType) {
      return NextResponse.json(
        { success: false, message: "Please select your preferred training focus." },
        { status: 400 }
      );
    }

    // 6. Prevent immediate duplicate submissions (same student, phone, and academy within 10 minutes)
    const recent = academiesStore.getInquiries(academyId);
    const normalizedPhone = guardianPhone.replace(/[\s-]/g, "");
    const duplicate = recent.find((i) => {
      const sameStudent =
        i.studentName.toLowerCase().trim() === studentName.toLowerCase().trim();
      const samePhone = i.guardianPhone.replace(/[\s-]/g, "") === normalizedPhone;
      const isRecent =
        Date.now() - new Date(i.createdAt).getTime() < 10 * 60 * 1000; // 10 minutes
      return sameStudent && samePhone && isRecent;
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: `An admission inquiry for "${studentName}" was recently submitted. Application Ref: ${duplicate.id}`,
          existingRefId: duplicate.id,
        },
        { status: 409 }
      );
    }

    // Create and save inquiry
    const newInquiry = academiesStore.createInquiry({
      academyId: academyId || "pubergaon-cricket-academy",
      academyName: academyName || "Cricket Academy",
      studentName: studentName.trim(),
      dateOfBirth: dateOfBirth || "",
      age: numericAge,
      guardianName: guardianName ? guardianName.trim() : undefined,
      guardianPhone: normalizedPhone,
      guardianEmail: guardianEmail ? guardianEmail.trim() : undefined,
      district: district.trim(),
      preferredTrainingType: preferredTrainingType,
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
