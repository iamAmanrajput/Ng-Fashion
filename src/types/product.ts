import { ProductType } from "@/utils/product";

export interface IProductImage {
  public_id: string;
  url: string;
}

export interface IProduct {
  title: string;
  link: string;

  category: "women" | "men";
  type: ProductType;

  image: IProductImage;

  sizes: string[];
  color: string;

  createdAt?: Date;
  updatedAt?: Date;
}
