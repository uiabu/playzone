import { NextResponse } from "next/server";

export async function GET() {
  const reviews = [
    {
      id: "rev-tamim",
      author: "Tamim Iqbal",
      role: "Former Captain, Bangladesh",
      image: "/images/reviews/tamim_iqbal.jpg",
      quote: "The punch and balance of Playzone bats is top class. Perfect ping off the middle.",
      rating: 5,
    },
    {
      id: "rev-mushfiqur",
      author: "Mushfiqur Rahim",
      role: "Wicketkeeper Batter, Bangladesh",
      image: "/images/reviews/mushfiqur_rahim.jpg",
      quote: "Flexibility and palm padding are essential behind the stumps. Playzone nailed it.",
      rating: 5,
    },
    {
      id: "rev-shakib",
      author: "Shakib Al Hasan",
      role: "Former Captain, Bangladesh",
      image: "/images/reviews/shakib_al_hasan.jpg",
      quote: "Plenty of room for all my match bats, pads, and gear. Built tough for touring.",
      rating: 5,
    },
  ];

  return NextResponse.json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
}

