"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import heroimg1 from "../../../../public/heroimg1.webp";
import heroimg2 from "../../../../public/heroimg2.webp";
import heroimg3 from "../../../../public/heroimg3.webp";
import heroimg4 from "../../../../public/heroimg4.webp";
import heroimg6 from "../../../../public/heroimg6.webp";
import ProductCard from "../common/ProductCard";

type Product = {
  id: number;
  title: string;
  link: string;
  image: any;
  sizes: string[];
};

const products: Product[] = [
  {
    id: 1,
    title: "Full Sleeve Pink Shrug Women Jacket",
    link: "https://www.flipkart.com/ng-store-women-shrug/p/itm036067aef3717?pid=RUGGSEF4K5ZTM7D4&lid=LSTRUGGSEF4K5ZTM7D4NEFFSP&marketplace=FLIPKART&sattr[]=color&sattr[]=size&st=color",
    image: heroimg1,
    sizes: ["S", "M", "L", "XL", " XXL", "3XL"],
  },
  {
    id: 2,
    title: "Women Nighty (Dark Blue)",
    link: "https://www.flipkart.com/ng-store-women-nighty/p/itm50f07acbf24bd?pid=NDNG7C7KAZYGSPMC&lid=LSTNDNG7C7KAZYGSPMCXSHT9D&marketplace=FLIPKART&sattr[]=color&st=color",
    image: heroimg6,
    sizes: ["FREE", "L", "XL", "XXL"],
  },
  {
    id: 3,
    title: "Luxury Designer Wear",
    link: "/products/luxury-designer-wear",
    image: heroimg3,
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    title: "Full Sleeve Blue Shrug Women Jacket",
    link: "https://www.flipkart.com/ng-store-women-shrug/p/itm4996ce36e7b2e?pid=RUGGGKVU638GRHXA&lid=LSTRUGGGKVU638GRHXAELKXBA&marketplace=FLIPKART&sattr[]=color&sattr[]=size&st=color",
    image: heroimg4,
    sizes: ["S", "M", "L", "XL", " XXL", "3XL"],
  },
];

/* Animation Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const FeaturedProducts = () => {
  return (
    <section className="mx-auto max-w-7xl py-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Featured Products
        </h2>
        <p className="mt-2 text-muted-foreground">
          Handpicked styles crafted for modern fashion
        </p>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-6
          md:grid-cols-3
          lg:grid-cols-4 lg:gap-6
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            sizes={product.sizes}
            image={product.image}
            link={product.link}
            color="navy blue"
          />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
