"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ALL_PRODUCTS, Product } from "@/lib/productsData";
import { websiteApi } from "@/lib/api";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  getProductBySlugOrId: (slugOrId: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType>({
  products: ALL_PRODUCTS,
  isLoading: false,
  refreshProducts: async () => {},
  getProductBySlugOrId: () => undefined,
});

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProducts = useCallback(async () => {
    try {
      const res = await websiteApi.getProducts();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        // Map backend products to guarantee required fields
        const formatted: Product[] = res.data.map((p) => ({
          ...p,
          images: p.images && p.images.length > 0 ? p.images : ["/images/products/bats/sg_bat.png"],
          rating: p.rating || 4.8,
          reviewsCount: p.reviewsCount || 1,
          inStock: p.inStock !== undefined ? p.inStock : true,
          stockCount: p.stockCount !== undefined ? p.stockCount : 10,
          specs: p.specs || [],
          highlights: p.highlights || [],
          reviews: p.reviews || [],
        }));
        setProducts(formatted);
      }
    } catch {
      // Fallback silently to static data
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();

    // Auto-refresh when user switches back to this tab (e.g. after updating a product in dashboard!)
    const handleFocus = () => refreshProducts();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshProducts]);

  const getProductBySlugOrId = useCallback(
    (slugOrId: string) => {
      const normalized = (slugOrId || "").trim().toLowerCase();
      return (
        products.find(
          (p) =>
            p.slug?.toLowerCase() === normalized ||
            p.id?.toLowerCase() === normalized
        ) ||
        ALL_PRODUCTS.find(
          (p) =>
            p.slug?.toLowerCase() === normalized ||
            p.id?.toLowerCase() === normalized
        )
      );
    },
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        refreshProducts,
        getProductBySlugOrId,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
