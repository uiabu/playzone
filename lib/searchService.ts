import { ALL_PRODUCTS, Product } from "./productsData";
import { EXPERTS_DATA, Expert } from "@/components/hireExperts/expertsData";

export interface SearchResults {
  products: Product[];
  experts: Expert[];
  totalCount: number;
}

export function searchEverything(query: string): SearchResults {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return {
      products: ALL_PRODUCTS.slice(0, 8),
      experts: EXPERTS_DATA.slice(0, 4),
      totalCount: ALL_PRODUCTS.length + EXPERTS_DATA.length,
    };
  }

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  // Search Products
  const matchingProducts = ALL_PRODUCTS.filter((product) => {
    const searchableText = [
      product.name,
      product.brand,
      product.category,
      product.categorySlug,
      product.shortDescription || "",
      product.badge || "",
      ...(product.highlights || []),
    ]
      .join(" ")
      .toLowerCase();

    return queryTerms.every((term) => searchableText.includes(term));
  });

  // Search Experts
  const matchingExperts = EXPERTS_DATA.filter((expert) => {
    const searchableText = [
      expert.name,
      expert.role,
      expert.category,
      expert.location,
      expert.bio,
      expert.fullBio || "",
      ...(expert.tags || []),
      ...(expert.certifications || []),
    ]
      .join(" ")
      .toLowerCase();

    return queryTerms.every((term) => searchableText.includes(term));
  });

  return {
    products: matchingProducts,
    experts: matchingExperts,
    totalCount: matchingProducts.length + matchingExperts.length,
  };
}
