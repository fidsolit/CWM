import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WarrantyClaim from "@/models/WarrantyClaim";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const claims = await WarrantyClaim.find()
      .populate("user", "name email")
      .populate("product", "productName productImage")
      .populate("order", "orderNumber")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, claims }, { status: 200 });
  } catch (error) {
    console.error("Error fetching warranty claims:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch warranty claims" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    await dbConnect();

    const claim = await WarrantyClaim.create(body);
    return NextResponse.json(
      { success: true, message: "Warranty claim created successfully", claim },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating warranty claim:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create warranty claim" },
      { status: 500 }
    );
  }
}
