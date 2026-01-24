import mongoose, { Schema, models } from "mongoose";
import { PRODUCT_TYPES } from "@/utils/product";
import { IProduct } from "@/types/product";

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    link: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["women", "men"],
      required: true,
      default: "women",
      lowercase: true,
    },

    type: {
      type: String,
      enum: PRODUCT_TYPES,
      required: true,
    },

    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    sizes: {
      type: [String],
      default: [],
    },

    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
