import { PRODUCT_TYPES } from "@/utils/product";
import { z } from "zod";

const CategoryEnum = z.enum(["men", "women"]);

const ProductTypeEnum = z.enum(PRODUCT_TYPES);

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long")
    .trim(),

  color: z
    .string()
    .min(1, "Color is required")
    .regex(/^[a-zA-Z\s]+$/, "Color should only contain letters")
    .trim(),

  sizes: z
    .array(
      z
        .string()
        .min(1, "Size cannot be empty")
        .transform((val) => val.toUpperCase()),
    )
    .min(1, "Add at least one size"),

  category: CategoryEnum,

  type: ProductTypeEnum,

  link: z
    .string()
    .url("Please enter a valid URL (e.g., https://example.com)")
    .trim(),

  image: z
    .any()
    .refine((file) => file && file.size > 0, "Product image is required")
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
