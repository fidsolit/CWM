import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { items, totalAmount, paymentMethod, cashier, notes } = body;

    // Validate required fields
    if (!items || !items.length || !totalAmount || !cashier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the order
    const order = new Order({
      items,
      totalAmount,
      paymentMethod: paymentMethod || "cash",
      cashier,
      notes: notes || "",
    });

    // Save the order
    await order.save();

    // Update product quantities
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { productQuantity: -item.quantity },
      });
    }

    return NextResponse.json(
      {
        success: true,
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
