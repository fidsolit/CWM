import { NextResponse } from "next/server";
import connectDB from "@/DB/connectDB";
import Product from "@/models/Product";
import AuthCheck from "@/middleware/AuthCheck";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { barcode: string } }
) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const barcode = params.barcode;

      const product = await Product.findOne({ barcode });

      if (!product) {
        return NextResponse.json({
          success: false,
          message: "Product not found",
        });
      }

      return NextResponse.json({
        success: true,
        product: {
          _id: product._id,
          productName: product.productName,
          productDescription: product.productDescription,
          productImage: product.productImage,
          productPrice: product.productPrice,
          productQuantity: product.productQuantity,
          productCategory: product.productCategory,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized. Please login!",
      });
    }
  } catch (error) {
    console.log("Error in fetching product by barcode:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
