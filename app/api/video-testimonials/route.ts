import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = [
    {
      id: "vid-tamim",
      player: "Tamim Iqbal",
      title: "Tamim Iqbal tests Playzone Grade 1 English Willow Bats",
      image: "/images/reviews/tamim_iqbal.jpg",
      featured: true,
    },
    {
      id: "vid-mushfiqur",
      player: "Mushfiqur Rahim",
      title: "Mushfiqur Rahim reviews Playzone Lightweight Keeping Gear",
      image: "/images/reviews/mushfiqur_rahim.jpg",
      featured: true,
    },
    {
      id: "vid-ashraful",
      player: "Mohammad Ashraful",
      title: "Mohammad Ashraful on leather match balls and seam quality",
      image: "/images/reviews/mohammad_ashraful.jpg",
      featured: true,
    },
  ];

  return NextResponse.json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
}

