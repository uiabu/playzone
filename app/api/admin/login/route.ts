import { NextResponse } from "next/server";
import { getAdminSecretKey, verifyAdminAuth } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const isAuth = verifyAdminAuth(request);
  return NextResponse.json({
    success: true,
    authenticated: isAuth,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const passkey = body?.passkey?.trim();

    const expectedKey = getAdminSecretKey();

    if (passkey && passkey === expectedKey) {
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        token: expectedKey,
      });

      // Set HTTP-only secure cookie for cross-request session
      response.cookies.set("playzone_admin_session", expectedKey, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid admin passkey. Please check your credentials.",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request payload" },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated",
  });

  response.cookies.set("playzone_admin_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
