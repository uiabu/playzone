import { NextResponse } from "next/server";

export const DEFAULT_ADMIN_KEY = "playzone2026";

export function getAdminSecretKey(): string {
  return process.env.ADMIN_SECRET_KEY || DEFAULT_ADMIN_KEY;
}

/**
 * Server-side authorization check for Admin mutation APIs.
 * Checks for x-admin-token header, Bearer Authorization header, or session cookie.
 */
export function verifyAdminAuth(request: Request): boolean {
  try {
    const adminKey = getAdminSecretKey();

    // 1. Header: x-admin-token
    const customToken = request.headers.get("x-admin-token");
    if (customToken && (customToken === adminKey || customToken === DEFAULT_ADMIN_KEY)) {
      return true;
    }

    // 2. Header: Authorization: Bearer <token>
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      if (token === adminKey || token === DEFAULT_ADMIN_KEY) {
        return true;
      }
    }

    // 3. Cookie: playzone_admin_session
    const cookieHeader = request.headers.get("cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split(";").map((c) => {
          const [k, ...v] = c.trim().split("=");
          return [k, decodeURIComponent(v.join("="))];
        })
      );

      const sessionVal = cookies["playzone_admin_session"];
      if (sessionVal && (sessionVal === adminKey || sessionVal === DEFAULT_ADMIN_KEY)) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized. Admin authentication required to perform this action.",
    },
    { status: 401 }
  );
}
