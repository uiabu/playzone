import { PrismaClient, ProductCondition, Prisma } from "@prisma/client";
import { ALL_PRODUCTS } from "../lib/productsData";
import { INITIAL_ACADEMIES } from "../lib/academiesData";
import { CRICKETERS_DATA } from "../components/inviteCricketer/cricketersData";
import { EXPERTS_DATA, getExpertType } from "../components/hireExperts/expertsData";

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "cricket-bats", name: "Cricket Bats", description: "Master bats for every innings, Grade 1 English and Kashmir willow." },
  { slug: "batting", name: "Batting Gear", description: "Batting gloves, leg guards, thigh protectors and helmets." },
  { slug: "bowling", name: "Bowling & Fielding", description: "Cricket leather balls, training balls and fielding equipment." },
  { slug: "shoes", name: "Cricket Shoes & Spikes", description: "All-rounder spikes and turf shoes for maximum grip." },
  { slug: "wicketkeeping", name: "Wicketkeeping Gear", description: "Pro keeping gloves, inners, pads and accessories." },
  { slug: "accessories", name: "Kit Bags & Accessories", description: "Wheelie kit bags, bat mallets, grips and maintenance essentials." },
  { slug: "protection", name: "Protection & Helmets", description: "Helmets, abdominal guards, arm guards and chest guards." },
  { slug: "general", name: "Cricket Gear & Equipment", description: "All-round cricket essentials and team sportswear." },
];

async function main() {
  console.log("🌱 Starting PlayZone PostgreSQL Database Seed...");

  // 1. Seed Categories
  console.log("📁 Seeding Categories...");
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        id: cat.slug,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        sortOrder: 0,
      },
    });
  }

  // 2. Seed All 63 Products and Variants
  console.log(`🏏 Seeding ${ALL_PRODUCTS.length} Catalog Products...`);
  for (const p of ALL_PRODUCTS) {
    const catSlug = p.categorySlug || "cricket-bats";
    const catExists = await prisma.category.findUnique({ where: { slug: catSlug } });
    const finalCatId = catExists ? catExists.id : "general";

    const condition: ProductCondition =
      p.condition === "pre-owned" ? ProductCondition.PRE_OWNED : ProductCondition.NEW;

    const images: string[] = Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : [(p as any).image || "/images/products/bats/mrf.png"];

    const seededProduct = await prisma.product.upsert({
      where: { id: p.id },
      update: {
        slug: p.slug || p.id,
        name: p.name,
        brand: p.brand || "PlayZone",
        categoryId: finalCatId,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        discountPercent: p.discountPercent ?? null,
        badge: p.badge ?? null,
        condition,
        conditionGrade: p.conditionGrade ?? null,
        rating: p.rating || 5.0,
        reviewsCount: p.reviewsCount || 10,
        inStock: p.inStock ?? true,
        stockCount: p.stockCount ?? (p.inStock === false ? 0 : 15),
        shortDescription: p.shortDescription || p.name,
        description: p.description || p.shortDescription || p.name,
        images,
        highlights: p.highlights || [],
        specs: (p.specs || []) as unknown as Prisma.InputJsonValue,
        extraServices: [
          { id: "knocking", label: "Full Machine Knocking & Oiling", price: 500 },
          { id: "toe-guard", label: "Rubber Toe Guard Fitting", price: 250 },
          { id: "laser-engrave", label: "Laser Name Engraving", price: 350 },
        ],
        sizes: p.sizes || [],
        weights: p.weights || [],
        colors: p.colors || [],
        warranty: p.warranty || "100% Genuine Quality Guarantee",
        deliveryDaysDhaka: p.deliveryDaysDhaka || "24 Hours",
        deliveryDaysNationwide: p.deliveryDaysNationwide || "2 - 3 Days",
        videoUrl: p.videoUrl ?? null,
        isFeatured: Boolean((p.badge && p.badge.length > 0) || p.rating >= 4.8),
      },
      create: {
        id: p.id,
        slug: p.slug || p.id,
        name: p.name,
        brand: p.brand || "PlayZone",
        categoryId: finalCatId,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        discountPercent: p.discountPercent ?? null,
        badge: p.badge ?? null,
        condition,
        conditionGrade: p.conditionGrade ?? null,
        rating: p.rating || 5.0,
        reviewsCount: p.reviewsCount || 10,
        inStock: p.inStock ?? true,
        stockCount: p.stockCount ?? (p.inStock === false ? 0 : 15),
        shortDescription: p.shortDescription || p.name,
        description: p.description || p.shortDescription || p.name,
        images,
        highlights: p.highlights || [],
        specs: (p.specs || []) as unknown as Prisma.InputJsonValue,
        extraServices: [
          { id: "knocking", label: "Full Machine Knocking & Oiling", price: 500 },
          { id: "toe-guard", label: "Rubber Toe Guard Fitting", price: 250 },
          { id: "laser-engrave", label: "Laser Name Engraving", price: 350 },
        ],
        sizes: p.sizes || [],
        weights: p.weights || [],
        colors: p.colors || [],
        warranty: p.warranty || "100% Genuine Quality Guarantee",
        deliveryDaysDhaka: p.deliveryDaysDhaka || "24 Hours",
        deliveryDaysNationwide: p.deliveryDaysNationwide || "2 - 3 Days",
        videoUrl: p.videoUrl ?? null,
        isFeatured: Boolean((p.badge && p.badge.length > 0) || p.rating >= 4.8),
      },
    });

    // Create default SKU variant for inventory management
    const defaultSku = `${p.id}-STD`.toUpperCase();
    await prisma.productVariant.upsert({
      where: { sku: defaultSku },
      update: {
        stockCount: p.stockCount ?? (p.inStock === false ? 0 : 15),
      },
      create: {
        productId: seededProduct.id,
        sku: defaultSku,
        size: p.sizes?.[0] || "Standard",
        weight: p.weights?.[0] || null,
        stockCount: p.stockCount ?? (p.inStock === false ? 0 : 15),
      },
    });
  }

  // 3. Seed Cricket Academies
  console.log(`🏟️ Seeding ${INITIAL_ACADEMIES.length} Cricket Academies...`);
  for (const a of INITIAL_ACADEMIES) {
    await prisma.academy.upsert({
      where: { id: a.id },
      update: {
        slug: a.slug,
        name: a.name,
        shortName: a.shortName || a.name,
        tagline: a.tagline,
        logo: a.logo,
        coverImage: a.coverImage,
        establishedYear: a.establishedYear,
        isVerified: a.isVerified,
        isPublished: a.isPublished,
        admissionStatus: a.admissionStatus,
        address: a.location.address,
        upazila: a.location.upazila || a.location.district,
        district: a.location.district,
        division: a.location.division,
        phones: a.contact.phone,
        email: a.contact.email || null,
        website: a.contact.website || null,
        headCoachName: a.headCoachName || null,
        headCoachRole: a.headCoachRole || null,
        eligibleAgeGroups: a.eligibleAgeGroups,
        trainingTypes: a.availableTrainingTypes,
        facilities: a.facilities ? a.facilities.map((f: any) => f.title) : [],
        aboutJson: a.about as unknown as Prisma.InputJsonValue,
        programsJson: (a as any).programs || [],
        feeStructureJson: (a as any).feeStructure || {},
      },
      create: {
        id: a.id,
        slug: a.slug,
        name: a.name,
        shortName: a.shortName || a.name,
        tagline: a.tagline,
        logo: a.logo,
        coverImage: a.coverImage,
        establishedYear: a.establishedYear,
        isVerified: a.isVerified,
        isPublished: a.isPublished,
        admissionStatus: a.admissionStatus,
        address: a.location.address,
        upazila: a.location.upazila || a.location.district,
        district: a.location.district,
        division: a.location.division,
        phones: a.contact.phone,
        email: a.contact.email || null,
        website: a.contact.website || null,
        headCoachName: a.headCoachName || null,
        headCoachRole: a.headCoachRole || null,
        eligibleAgeGroups: a.eligibleAgeGroups,
        trainingTypes: a.availableTrainingTypes,
        facilities: a.facilities ? a.facilities.map((f: any) => f.title) : [],
        aboutJson: a.about as unknown as Prisma.InputJsonValue,
        programsJson: (a as any).programs || [],
        feeStructureJson: (a as any).feeStructure || {},
      },
    });
  }

  // 4. Seed VIP Cricketers
  console.log(`⭐ Seeding ${CRICKETERS_DATA.length} VIP Cricketers...`);
  for (const c of CRICKETERS_DATA) {
    await prisma.cricketer.upsert({
      where: { id: c.id },
      update: {
        slug: c.id,
        name: c.name,
        bengaliName: c.bengaliName,
        role: c.role,
        tier: c.tier,
        imageSrc: c.imageSrc,
        shortBio: c.shortBio,
        fullBio: c.fullBio,
        specialties: c.specialties,
        suitableEvents: c.suitableEvents,
        languages: c.languages,
        statsJson: c.stats as unknown as Prisma.InputJsonValue,
        careerHighlights: c.careerHighlights,
        isVerified: c.verified,
        isFeatured: c.featured ?? false,
      },
      create: {
        id: c.id,
        slug: c.id,
        name: c.name,
        bengaliName: c.bengaliName,
        role: c.role,
        tier: c.tier,
        imageSrc: c.imageSrc,
        shortBio: c.shortBio,
        fullBio: c.fullBio,
        specialties: c.specialties,
        suitableEvents: c.suitableEvents,
        languages: c.languages,
        statsJson: c.stats as unknown as Prisma.InputJsonValue,
        careerHighlights: c.careerHighlights,
        isVerified: c.verified,
        isFeatured: c.featured ?? false,
      },
    });
  }

  // 5. Seed Cricket Experts
  console.log(`🧢 Seeding ${EXPERTS_DATA.length} Cricket Experts...`);
  for (const exp of EXPERTS_DATA) {
    await prisma.expert.upsert({
      where: { id: exp.id },
      update: {
        slug: exp.id,
        name: exp.name,
        role: exp.role,
        expertType: getExpertType(exp),
        hourlyRate: exp.price,
        rating: exp.rating,
        reviewsCount: exp.reviewsCount,
        bio: exp.fullBio || exp.bio,
        experienceYears: exp.experienceYears,
        location: exp.location,
        imageSrc: exp.imageSrc,
        isAvailable: true,
        verified: exp.verified,
      },
      create: {
        id: exp.id,
        slug: exp.id,
        name: exp.name,
        role: exp.role,
        expertType: getExpertType(exp),
        hourlyRate: exp.price,
        rating: exp.rating,
        reviewsCount: exp.reviewsCount,
        bio: exp.fullBio || exp.bio,
        experienceYears: exp.experienceYears,
        location: exp.location,
        imageSrc: exp.imageSrc,
        isAvailable: true,
        verified: exp.verified,
      },
    });
  }

  // 6. Seed Coupons
  console.log("🎟️ Seeding Promotional Coupons...");
  const coupons = [
    { code: "PLAYZONE10", discountType: "percentage", discountValue: 10, minOrderValue: 0 },
    { code: "CRICKET10", discountType: "percentage", discountValue: 10, minOrderValue: 0 },
    { code: "CRICKET2026", discountType: "percentage", discountValue: 15, minOrderValue: 3000 },
    { code: "WELCOME500", discountType: "fixed", discountValue: 500, minOrderValue: 2500 },
    { code: "BANGLADESH", discountType: "percentage", discountValue: 12, minOrderValue: 0 },
  ];

  for (const cp of coupons) {
    await prisma.coupon.upsert({
      where: { code: cp.code },
      update: {
        discountType: cp.discountType,
        discountValue: cp.discountValue,
        minOrderValue: cp.minOrderValue,
      },
      create: {
        code: cp.code,
        discountType: cp.discountType,
        discountValue: cp.discountValue,
        minOrderValue: cp.minOrderValue,
      },
    });
  }

  console.log("✅ PlayZone Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
