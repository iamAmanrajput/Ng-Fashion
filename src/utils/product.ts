export const PRODUCT_TYPES = ["shrug", "tshirt", "tops", "nightdress"] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];
