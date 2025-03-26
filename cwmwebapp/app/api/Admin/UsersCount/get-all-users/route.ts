import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import User from "@/models/User"; // Make sure you have your User model imported

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === "admin") {
      const totalUsers = await User.countDocuments();

      return NextResponse.json({
        success: true,
        usersCount: totalUsers,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized.",
      });
    }
  } catch (error) {
    console.log("Error in getting users count:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
