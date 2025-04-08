import { NextResponse } from "next/server";
import connectDB from "@/DB/connectDB";
import Order from "@/models/Order";
import AuthCheck from "@/middleware/AuthCheck";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      // Get orders from the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const orders = await Order.find({
        createdAt: { $gte: sevenDaysAgo },
      })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate("orderItems.product");

      return NextResponse.json({
        success: true,
        orders: orders.map((order) => ({
          _id: order._id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt,
          items: order.orderItems.map((item: any) => ({
            _id: item.product._id,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
          paymentMethod: order.paymentMethod,
          cashier: order.cashier,
        })),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized. Please login!",
      });
    }
  } catch (error) {
    console.log("Error in fetching order history:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
