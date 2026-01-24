"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_TYPES } from "@/utils/product";
import ProductCard from "@/components/custom/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsClient = () => {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 URL params state (NO useSearchParams)
  const [searchQuery, setSearchQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [pageQuery, setPageQuery] = useState("1");

  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Read params safely from browser
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search") || "";
    const type = params.get("type") || "";
    const page = params.get("page") || "1";

    setSearchQuery(search);
    setTypeQuery(type);
    setPageQuery(page);
    setSearchTerm(search);
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/products", {
        params: {
          search: searchQuery,
          type: typeQuery,
          page: pageQuery,
          limit: 10,
        },
      });

      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, typeQuery, pageQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== searchQuery) {
        updateParam("search", searchTerm);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, searchQuery]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") params.set("page", "1");

    router.push(`/products?${params.toString()}`, { scroll: false });

    // sync local state
    setSearchQuery(params.get("search") || "");
    setTypeQuery(params.get("type") || "");
    setPageQuery(params.get("page") || "1");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-14 text-center"
      >
        <h1 className="text-4xl font-semibold">Our Products</h1>
      </motion.div>

      <div className="mb-12 grid gap-6 sm:grid-cols-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select value={typeQuery} onValueChange={(v) => updateParam("type", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {PRODUCT_TYPES.map((t) => (
              <SelectItem key={t} value={t} className="capitalize">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard
                    title={product.title}
                    image={product.image.url}
                    link={`/products/${product._id}`}
                    sizes={product.sizes}
                    color={product.color}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {products.length === 0 && (
            <div className="py-20 text-center">
              <p>No products found.</p>
              <Button variant="link" onClick={() => router.push("/products")}>
                Reset Filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        updateParam("page", String(Number(pageQuery) - 1))
                      }
                      className={
                        Number(pageQuery) <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <span className="px-4 text-sm font-medium">
                      Page {pageQuery} of {totalPages}
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        updateParam("page", String(Number(pageQuery) + 1))
                      }
                      className={
                        Number(pageQuery) >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProductsClient;
