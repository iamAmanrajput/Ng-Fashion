import product from "@/models/product";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const products = await product.find().limit(4);

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
