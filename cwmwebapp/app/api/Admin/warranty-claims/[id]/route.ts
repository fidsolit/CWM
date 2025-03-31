import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WarrantyClaim from "@/models/WarrantyClaim";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const claim = await WarrantyClaim.findById(params.id)
      .populate("user", "name email")
      .populate("product", "productName productImage")
      .populate("order", "orderNumber");

    if (!claim) {
      return NextResponse.json(
        { success: false, message: "Warranty claim not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, claim }, { status: 200 });
  } catch (error) {
    console.error("Error fetching warranty claim:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch warranty claim" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const claim = await WarrantyClaim.findById(params.id);
    if (!claim) {
      return NextResponse.json(
        { success: false, message: "Warranty claim not found" },
        { status: 404 }
      );
    }

    // Update claim status and resolution details
    claim.status = body.status;
    if (body.status === "completed") {
      claim.resolution = body.resolution;
      claim.resolvedAt = new Date();
    }
    if (body.adminNotes) {
      claim.adminNotes = body.adminNotes;
    }

    await claim.save();

    return NextResponse.json(
      { success: true, message: "Warranty claim updated successfully", claim },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating warranty claim:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update warranty claim" },
      { status: 500 }
    );
  }
}
