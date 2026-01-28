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

const ProductCard = ({
  title,
  sizes,
  image,
  color,
  link,
}: ProductCardProps) => {
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
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group rounded-2xl border bg-background p-3 sm:p-4 h-full"
    >
      <Link href={link} className="flex flex-col h-full">
        {/* Image - Top par hi rahega */}
        <div className="relative mb-4 aspect-3/4 overflow-hidden rounded-xl shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        <div className="space-y-3 grow">
          <h3 className="text-base font-medium">{title}</h3>

          {/* Sizes */}
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              return (
                <button
                  key={size}
                  className="rounded-md border px-3 py-1 text-xs font-medium transition
                  border-muted bg-background hover:border-primary uppercase"
                >
                  {size}
                </button>
              );
            })}
          </div>
          {/* Color */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-muted/20 px-3 py-1.5 text-xs">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Color</span>
            <span className="rounded-md bg-background px-2.5 py-0.5 font-medium">
              {color}
            </span>
          </div>
        </div>

        <div className="mt-4 shrink-0">
          <Button asChild className="w-full">
            <Link href={link}>Buy Now</Link>
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
