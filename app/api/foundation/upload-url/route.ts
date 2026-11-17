import { NextResponse } from "next/server";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, mimeType, fileSize } = body;

    if (!fileName || typeof fileName !== "string") {
      return NextResponse.json(
        { success: false, message: "File name is required." },
        { status: 400 }
      );
    }

    if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid file type. Only JPEG, PNG, WebP, and PDF medical reports are allowed.",
        },
        { status: 400 }
      );
    }

    if (fileSize && Number(fileSize) > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "File exceeds the maximum allowed size of 10 MB.",
        },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const sanitizedName = fileName
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const storageKey = `cases/${year}/${crypto.randomUUID()}_${sanitizedName}`;

    // If external storage credentials exist, return signed upload URL
    const bucket = process.env.PRIVATE_STORAGE_BUCKET;
    const endpoint = process.env.PRIVATE_STORAGE_ENDPOINT;

    let uploadUrl = `/api/foundation/upload-direct?key=${encodeURIComponent(storageKey)}`;
    if (bucket && endpoint) {
      uploadUrl = `${endpoint}/object/upload/sign/${bucket}/${storageKey}`;
    }

    return NextResponse.json({
      success: true,
      data: {
        storageKey,
        uploadUrl,
        expiresInSeconds: 600, // 10 minutes TTL
        maxSizeBytes: MAX_FILE_SIZE_BYTES,
      },
    });
  } catch (error) {
    console.error("POST /api/foundation/upload-url error:", error);
    return NextResponse.json(
      { success: false, message: "Server error generating upload URL." },
      { status: 500 }
    );
  }
}
