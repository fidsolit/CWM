import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Joi from "joi";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

// Define interfaces for the request data
interface OrderItemRequest {
  product: string;
  qty: number;
}

interface OrderRequest {
  user: string;
  orderNumber?: string;
  paymentMethod?: string;
  notes?: string;
  orderItems?: OrderItemRequest[];
  shippingAddress?: {
    fullName: string;
    address: string;
    city: string;
    postalCode: number;
    country: string;
  };
  itemsPrice?: number;
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}

const createOrderSchema = Joi.object({
  user: Joi.string().required(),
  paymentMethod: Joi.string()
    .valid("cash", "card", "gcash", "PayPal", "COD")
    .default("cash"),
  notes: Joi.string().allow(""),
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        qty: Joi.number().required(),
      })
    )
    .optional(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.number().required(),
    country: Joi.string().required(),
  }).optional(),
  itemsPrice: Joi.number().optional(),
  taxPrice: Joi.number().optional(),
  shippingPrice: Joi.number().optional(),
  totalPrice: Joi.number().optional(),
  isPaid: Joi.boolean().optional(),
  paidAt: Joi.date().optional(),
  isDelivered: Joi.boolean().optional(),
  deliveredAt: Joi.date().optional(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const data = (await req.json()) as OrderRequest;
      console.log("Received order data:", data);

      const { error } = createOrderSchema.validate(data);

      if (error)
        return NextResponse.json({
          success: false,
          message: error.details[0].message.replace(/['"]+/g, ""),
        });

      let orderItems = [];
      let totalAmount = 0;

      // If orderItems are provided directly (from checkout page)
      if (data.orderItems && data.orderItems.length > 0) {
        orderItems = await Promise.all(
          data.orderItems.map(async (item: OrderItemRequest) => {
            const product = await Product.findById(item.product);
            if (!product) {
              throw new Error(`Product not found: ${item.product}`);
            }
            const price = product.productPrice || 0;
            const subtotal = price * item.qty;
            totalAmount += subtotal;

            return {
              product: product._id,
              productName: product.productName || "Unknown Product",
              quantity: item.qty,
              price: price,
              subtotal: subtotal,
            };
          })
        );
      } else {
        // Get cart items for the user
        const cartItems = await Cart.find({ userID: data.user }).populate(
          "productID"
        );

        if (!cartItems || cartItems.length === 0) {
          return NextResponse.json({
            success: false,
            message: "Your cart is empty. Please add items before checkout.",
          });
        }

        orderItems = cartItems
          .map((item) => {
            if (!item.productID) {
              console.error("Product not found for cart item:", item);
              return null;
            }

            const product = item.productID;
            const quantity = item.quantity;
            const price = product.productPrice || 0;
            const subtotal = price * quantity;

            totalAmount += subtotal;

            return {
              product: product._id,
              productName: product.productName || "Unknown Product",
              quantity: quantity,
              price: price,
              subtotal: subtotal,
            };
          })
          .filter((item) => item !== null);
      }

      if (orderItems.length === 0) {
        return NextResponse.json({
          success: false,
          message: "No valid products found for the order.",
        });
      }

      // Create order with properly formatted data
      const orderData = {
        user: data.user,

        orderItems: orderItems,
        totalAmount: data.totalPrice || totalAmount,
        paymentMethod: data.paymentMethod || "cash",
        cashier: "system", // Default cashier for online orders
        notes: data.notes || "",
        shippingAddress: data.shippingAddress,
        isPaid: data.isPaid || false,
        paidAt: data.paidAt,
        isDelivered: data.isDelivered || false,
        deliveredAt: data.deliveredAt,
      };

      console.log("Creating order with data:", orderData);

      try {
        const saveData = await Order.create(orderData);

        if (saveData) {
          // Update product quantities
          for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
              $inc: { productQuantity: -item.quantity },
            });
          }

          // Clear the cart if this was a cart-based order
          if (!data.orderItems) {
            await Cart.deleteMany({ userID: data.user });
          }

          return NextResponse.json({
            success: true,
            message: "Order created successfully!",
            order: {
              _id: saveData._id,
              orderNumber: saveData.orderNumber,
              totalAmount: saveData.totalAmount,
              status: saveData.status,
              createdAt: saveData.createdAt,
            },
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Failed to create Order. Please try again!",
          });
        }
      } catch (orderError: any) {
        console.error("Error creating order:", orderError);
        return NextResponse.json({
          success: false,
          message: `Failed to create order: ${
            orderError.message || "Unknown error"
          }`,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized Please login!",
      });
    }
  } catch (error) {
    console.log("Error in creating order :", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
