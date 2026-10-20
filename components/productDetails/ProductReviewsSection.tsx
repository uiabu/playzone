"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, X } from "lucide-react";
import { ProductReview } from "@/lib/productsData";

interface ProductReviewsSectionProps {
  reviews: ProductReview[];
  rating: number;
  reviewsCount: number;
  productName: string;
}

export default function ProductReviewsSection({
  reviews: initialReviews,
  rating,
  reviewsCount,
  productName,
}: ProductReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(
    initialReviews || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newLocation, setNewLocation] = useState("Dhaka");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: ProductReview = {
      author: newAuthor,
      verified: true,
      rating: newRating,
      date: "Just now",
      title: newTitle || "Verified Purchase Review",
      comment: newComment,
      location: newLocation,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor("");
      setNewTitle("");
      setNewComment("");
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* 1. Review Summary Header */}
      <div className="bg-zinc-50/70 rounded-2xl p-6 sm:p-8 border border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Score Block */}
        <div className="flex items-center gap-5">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              {rating.toFixed(1)}
            </span>
            <div className="flex items-center justify-center gap-0.5 text-[#84cc16] mt-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-[#84cc16] text-[#84cc16]"
                      : "text-zinc-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-1 font-medium">
              Based on {reviewsCount} verified ratings
            </p>
          </div>

          {/* Star Breakdown Bars */}
          <div className="hidden sm:flex flex-col gap-1.5 min-w-[200px] border-l border-zinc-200 pl-5">
            {[
              { stars: 5, pct: "82%" },
              { stars: 4, pct: "14%" },
              { stars: 3, pct: "3%" },
              { stars: 2, pct: "1%" },
              { stars: 1, pct: "0%" },
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs text-zinc-600">
                <span className="w-3 text-right">{item.stars}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#84cc16] rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
                <span className="text-[11px] text-zinc-400 w-7 text-right">
                  {item.pct}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action: Write Review Button */}
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#84cc16]" />
            <span>Write a Customer Review</span>
          </button>
        </div>
      </div>

      {/* 2. Reviews Feed */}
      <div className="space-y-4">
        {reviewsList.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-white border border-zinc-200/80 space-y-2">
            <MessageSquarePlus className="w-9 h-9 text-zinc-400 mx-auto stroke-[1.5]" />
            <h4 className="text-sm font-bold text-zinc-900">No reviews yet for {productName}</h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Be the first to share your experience with this equipment. Your review helps other cricket players make informed choices.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 inline-block px-4 py-2 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              Write the First Review
            </button>
          </div>
        ) : (
          reviewsList.map((review, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/80 shadow-2xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-zinc-900">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#65a30d] bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200">
                      <CheckCircle2 className="w-3 h-3 text-[#65a30d]" />
                      Verified Buyer
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 text-[#84cc16]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? "fill-[#84cc16] text-[#84cc16]" : "text-zinc-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title & Comment */}
            {review.title && (
              <h4 className="font-bold text-sm text-zinc-900 leading-snug">
                {review.title}
              </h4>
            )}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {review.comment}
            </p>
          </div>
        )))}
      </div>

      {/* 3. Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-lime-100 text-[#65a30d] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">
                  Review Submitted!
                </h3>
                <p className="text-xs text-zinc-500">
                  Thank you for helping fellow Bangladesh cricketers with your feedback.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-zinc-900">
                    Write a Review
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    For {productName}
                  </p>
                </div>

                {/* Rating select */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? "fill-[#84cc16] text-[#84cc16]"
                              : "text-zinc-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Mahfuzur Rahman"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-zinc-900"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Mirpur, Dhaka"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-zinc-900"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sensational ping and balance"
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-zinc-900"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Review Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share how this gear feels in the hand, match performance, or durability..."
                    className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 text-xs sm:text-sm outline-none focus:border-zinc-900 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#84cc16] hover:bg-[#73b512] text-black font-black text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
