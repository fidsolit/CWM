import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Order from "../../../../models/Order";
import Product from "../../../../models/Product";

// Define types for the request body
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface OrderRequestBody {
  items: OrderItem[];
  totalAmount: number;
  paymentMethod?: string;
  cashier: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = (await request.json()) as OrderRequestBody;
    const { items, totalAmount, paymentMethod, cashier, notes } = body;

    // Validate required fields
    if (!items || !items.length || !totalAmount || !cashier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Transform items to orderItems format
    const orderItems = items.map((item: OrderItem) => ({
      product: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    }));

    // Create the order
    const order = new Order({
      orderItems,
      totalAmount,
      paymentMethod: paymentMethod || "PayPal",
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
