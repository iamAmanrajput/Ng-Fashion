"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette } from "lucide-react";

type ProductCardProps = {
  title: string;
  sizes: string[];
  image: string;
  color?: string;
  link: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ProductCard = ({
  title,
  sizes,
  image,
  color,
  link,
}: ProductCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group flex h-full flex-col rounded-2xl border bg-background p-3 sm:p-4"
    >
      {/* Image */}
      <Link
        href={link}
        className="relative mb-4 aspect-3/4 overflow-hidden rounded-xl"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      {/* Content */}
      <div className="grow space-y-3">
        <Link href={link}>
          <h3 className="text-base font-medium hover:underline">{title}</h3>
        </Link>

        {/* Sizes */}
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              className="rounded-md border border-muted bg-background px-3 py-1 text-xs font-medium uppercase transition hover:border-primary"
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color */}
        {color && (
          <div className="inline-flex items-center gap-2 rounded-lg bg-muted/20 px-3 py-1.5 text-xs">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Color</span>
            <span className="rounded-md bg-background px-2.5 py-0.5 font-medium">
              {color}
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Button asChild className="w-full">
          <Link href={link}>Buy Now</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
