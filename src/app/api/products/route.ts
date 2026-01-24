import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // filters
    const search = searchParams.get("search"); // title search
    const type = searchParams.get("type"); // Shrug, Tshirt etc

    const query: any = {};

    // search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // filter by type
    if (type) {
      query.type = type;
    }

    // fetch data
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),

      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      totalProducts: total,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}
