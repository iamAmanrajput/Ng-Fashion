import { NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/utils/imageUploader";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";

export async function POST(request: Request) {
  try {
    // 1. Database connection check pehle karein
    await dbConnect();

    const formData = await request.formData();

    // Data extract karein
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;
    const link = formData.get("link") as string;
    const category = formData.get("category") as string;
    const type = formData.get("type") as string;
    const sizes = formData.getAll("sizes") as string[];
    const color = formData.get("color") as string;

    // 2. Validation
    if (!title || !imageFile || !link || !category || !type || !color) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!sizes || sizes.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one size must be provided." },
        { status: 400 },
      );
    }

    // 3. Cloudinary Upload with Error Catching
    let uploadResult;
    try {
      uploadResult = await uploadImageToCloudinary(imageFile, {
        folder: process.env.CLOUDINARY_WOMEN_FOLDER || "products",
      });
    } catch (uploadError) {
      console.error("Cloudinary Error:", uploadError);
      return NextResponse.json(
        { success: false, message: "Image upload failed." },
        { status: 500 },
      );
    }

    // 4. Create Product in DB
    const newProduct = await Product.create({
      title,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      link,
      category,
      type,
      sizes,
      color,
    });

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Main API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create product." },
      { status: 500 },
    );
  }
}
