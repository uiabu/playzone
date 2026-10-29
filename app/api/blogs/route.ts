import { NextResponse } from "next/server";

export async function GET() {
  const blogs = [
    {
      id: "how-to-knock-cricket-bat",
      slug: "how-to-knock-cricket-bat",
      title: "How to Knock In a New English Willow Bat: The Complete Guide",
      excerpt: "Step-by-step master guide on bone knocking, linseed oil application, and seam testing.",
      coverImage: "/images/categories/training_gear.png",
      publishedAt: "2026-03-15",
      readTime: "6 min read",
      author: "Coach Shafikul Islam",
    },
    {
      id: "choosing-cricket-spikes",
      slug: "choosing-cricket-spikes",
      title: "Metal Spikes vs Rubber Studs: Choosing Footwear for Bangladeshi Pitches",
      excerpt: "Understanding traction differences across clay mats, turfs, and hard practice wickets.",
      coverImage: "/images/categories/cricket_shoes.png",
      publishedAt: "2026-03-20",
      readTime: "5 min read",
      author: "Tareq Hasan (Physio)",
    },
  ];

  return NextResponse.json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
}

