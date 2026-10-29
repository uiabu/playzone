import { NextResponse } from "next/server";

// In-memory settings store
declare global {
  // eslint-disable-next-line no-var
  var __PLAYZONE_SETTINGS__:
    | {
        announcementText: string;
        announcementActive: boolean;
      }
    | undefined;
}

if (!globalThis.__PLAYZONE_SETTINGS__) {
  globalThis.__PLAYZONE_SETTINGS__ = {
    announcementText:
      "⚡ FREE Express Delivery across Dhaka on orders over ৳5,000! Pre-orders open for 2026 English Willow bats.",
    announcementActive: true,
  };
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: globalThis.__PLAYZONE_SETTINGS__,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    globalThis.__PLAYZONE_SETTINGS__ = {
      announcementText:
        body.announcementText ??
        globalThis.__PLAYZONE_SETTINGS__?.announcementText ??
        "",
      announcementActive:
        body.announcementActive ??
        globalThis.__PLAYZONE_SETTINGS__?.announcementActive ??
        true,
    };

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      data: globalThis.__PLAYZONE_SETTINGS__,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid settings payload" },
      { status: 400 }
    );
  }
}

