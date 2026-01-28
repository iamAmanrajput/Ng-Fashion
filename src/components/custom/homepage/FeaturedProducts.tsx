"use client";

import { motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import ProductCard from "../common/ProductCard";
import axios from "axios";
import { toast } from "sonner";
import { PackageX } from "lucide-react";
import Loader from "../common/Loader";

// 1. Precise Interface
interface Product {
  _id: string;
  title: string;
  link: string;
  image: { url: string };
  sizes: string[];
  color: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }, // Thoda fast stagger for better feel
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true

  // 2. Wrap in useCallback if you ever need to move this outside useEffect
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products/featured-products");
      setProducts(data?.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch featured products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {" "}
      {/* Added px-4 for mobile spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Products
        </h2>
        <p className="mt-4 text-muted-foreground">
          Handpicked styles crafted for modern fashion
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers slightly before reaching view
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {loading ? (
          <div className="col-span-full flex h-40 items-center justify-center">
            <Loader width={9} height={40} />
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full py-20">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <PackageX className="h-10 w-10 opacity-20" />
              <p>No products found in this category.</p>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard
                title={product.title}
                sizes={product.sizes}
                image={product.image?.url}
                link={product.link}
                color={product.color}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
