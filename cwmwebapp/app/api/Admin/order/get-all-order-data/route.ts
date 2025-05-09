import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
// import Order from "@/model/Order";
import Order from "@/models/Order";
import AuthCheck from "@/middleware/AuthCheck";
// import Product from "@/models/Product";
import Product from "@/models/Product";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectDB();
  try {
    const registerProductModel = await Product.init();
    const registerUserModel = await User.init();

    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === "admin") {
      const getData = await Order.find({});
      // .populate("orderItems.product")
      // .populate("user");
      if (getData) {
        return NextResponse.json({ success: true, data: getData });
      } else {
        return NextResponse.json({
          status: 204,
          success: false,
          message: "No bookmark Item found.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized Please login!",
      });
    }
  } catch (error) {
    console.log("Error in getting all Orders data  feds:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong fede . Please try again!",
    });
  }
}
