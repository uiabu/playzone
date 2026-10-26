import {
  HeroSection,
  FeatureCategoiesSection,
  HireExpertsSection,
  ExclusiveProductsSection,
  BattingEssentialsSection,
  CtaBannerSection,
  BowlingFieldingSection,
  ShoesKitBagsSection,
  FeaturedCricketGearSection,
  VideoReviewSection,
} from "@/components/homePage";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section with Carousel & Stacked Cards */}
      <HeroSection />

      {/* 2. Featured Categories Section (12 Categories) */}
      <FeatureCategoiesSection />

      {/* 3. Hire Cricket Experts Section */}
      <HireExpertsSection />

      {/* 4. Bats for Every Innings Section */}
      <ExclusiveProductsSection />

      {/* 4. Batting Essentials Section */}
      <BattingEssentialsSection />

      {/* 5. Great Gear Smarter Prices CTA Banner */}
      <CtaBannerSection />

      {/* 6. Bowling & Fielding Section */}
      <BowlingFieldingSection />

      {/* 7. Shoes & Kit Bags Section */}
      <ShoesKitBagsSection />

      {/* 8. Featured Cricket Gear (Best Deals & New Arrivals) */}
      <FeaturedCricketGearSection />

      {/* 9. Video Review Section (Trusted by Bangladesh's Top Cricketers) */}
      <VideoReviewSection />
    </div>
  );
}
