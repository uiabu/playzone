import { NextResponse } from "next/server";

export async function GET() {
  const banners = [
    {
      id: "hero-bats-2026",
      title: "Handcrafted English Willow Bats",
      subtitle: "Grade 1 & Grade 2 match willow tuned for maximum ping.",
      image: "/images/hero/hero_cricket_bats.png",
      href: "/category/cricket-bats",
      active: true,
    },
    {
      id: "pre-owned-gear",
      title: "Playzone Pre-Owned Hub",
      subtitle: "Verified seasoned match gear at 40%-60% savings.",
      image: "/images/hero/pre_owned_pick.png",
      href: "/category/pre-owned-gear",
      active: true,
    },
  ];

  return NextResponse.json({
    success: true,
    count: banners.length,
    data: banners,
  });
}

