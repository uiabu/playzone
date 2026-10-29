import { NextResponse } from "next/server";
import { EXPERTS_DATA } from "@/components/hireExperts/expertsData";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: EXPERTS_DATA.length,
    data: EXPERTS_DATA,
  });
}

