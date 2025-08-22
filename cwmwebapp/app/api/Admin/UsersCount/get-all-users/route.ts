import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
// import Order from "@/model/Order";
import Order from "@/models/Order";
import AuthCheck from "@/middleware/AuthCheck";

import Product from "@/models/Product";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === "admin") {
      // Simple find query to get all users
      const users = await User.find({})
        .select("-password") // Exclude password field for security
        .sort({ createdAt: -1 }); // Optional: sort by creation date, newest first

      if (users && users.length > 0) {
        return NextResponse.json({
          success: true,
          data: users,
          total: users.length,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No users found.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized. Please login! from get all users",
      });
    }
  } catch (error) {
    console.error("Error getting all users:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
