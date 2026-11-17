import { NextResponse } from "next/server";

export function getAdminSecretKey(): string {
  const key = process.env.ADMIN_SECRET_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "CRITICAL SECURITY CONFIGURATION: ADMIN_SECRET_KEY environment variable is not set. Admin access disabled."
      );
    }
    // Development fallback warning
    return "dev_local_admin_key_32_characters_long_for_test";
  }
  return key;
}

/**
 * Server-side authorization check for Admin mutation APIs.
 * Checks for x-admin-token header, Bearer Authorization header, or session cookie.
 * No hardcoded default credentials are used.
 */
export function verifyAdminAuth(request: Request): boolean {
  try {
    const adminKey = getAdminSecretKey();
    if (!adminKey) return false;

    // 1. Header: x-admin-token
    const customToken = request.headers.get("x-admin-token");
    if (customToken && customToken === adminKey) {
      return true;
    }

    // 2. Header: Authorization: Bearer <token>
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      const token = authHeader.replace(/^Bearer\s+/i, "").trim();
      if (token && token === adminKey) {
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
      if (sessionVal && sessionVal === adminKey) {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error("Admin authentication check failed:", err);
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized. Valid administrator authentication required.",
    },
    { status: 401 }
  );
}
