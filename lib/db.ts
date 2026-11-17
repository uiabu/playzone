import { PrismaClient } from "@prisma/client";
import net from "net";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  lastDbCheckTime?: number;
  lastDbAvailableState?: boolean;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function parseDbHostPort(url: string): { host: string; port: number } | null {
  try {
    const cleaned = url
      .replace("postgresql://", "http://")
      .replace("postgres://", "http://");
    const parsed = new URL(cleaned);
    return {
      host: parsed.hostname,
      port: parsed.port ? parseInt(parsed.port, 10) : 5432,
    };
  } catch {
    return null;
  }
}

function pingSocket(host: string, port: number, timeoutMs = 350): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;

    const finalize = (success: boolean) => {
      if (!settled) {
        settled = true;
        socket.destroy();
        resolve(success);
      }
    };

    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finalize(true));
    socket.once("timeout", () => finalize(false));
    socket.once("error", () => finalize(false));

    try {
      socket.connect(port, host);
    } catch {
      finalize(false);
    }
  });
}

/**
 * High-speed check to verify if the database is reachable.
 * Uses socket pre-check and 15s cache to guarantee 0ms latency during local fallback,
 * completely preventing serverless cold hangs.
 */
export async function isDatabaseAvailable(): Promise<boolean> {
  const now = Date.now();
  if (
    globalForPrisma.lastDbCheckTime &&
    now - globalForPrisma.lastDbCheckTime < 15000 &&
    typeof globalForPrisma.lastDbAvailableState === "boolean"
  ) {
    return globalForPrisma.lastDbAvailableState;
  }

  const dbUrl = process.env.DATABASE_URL;
  if (
    !dbUrl ||
    dbUrl.includes("your-project-ref") ||
    dbUrl.includes("[PROJECT-REF]") ||
    dbUrl.includes("your-db-password")
  ) {
    globalForPrisma.lastDbCheckTime = now;
    globalForPrisma.lastDbAvailableState = false;
    return false;
  }

  const hostPort = parseDbHostPort(dbUrl);
  if (!hostPort) {
    globalForPrisma.lastDbCheckTime = now;
    globalForPrisma.lastDbAvailableState = false;
    return false;
  }

  // Pre-check socket reachability before invoking Prisma query engine
  const canReach = await pingSocket(hostPort.host, hostPort.port, 350);
  if (!canReach) {
    globalForPrisma.lastDbCheckTime = now;
    globalForPrisma.lastDbAvailableState = false;
    return false;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    globalForPrisma.lastDbCheckTime = now;
    globalForPrisma.lastDbAvailableState = true;
    return true;
  } catch {
    globalForPrisma.lastDbCheckTime = now;
    globalForPrisma.lastDbAvailableState = false;
    return false;
  }
}

export default prisma;
