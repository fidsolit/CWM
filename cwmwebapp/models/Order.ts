import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
}

interface IOrder extends Document {
  orderNumber: string;
  orderItems: IOrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  paymentMethod: "cash" | "card" | "gcash" | "PayPal" | "COD";
  cashier: string;
  user?: mongoose.Types.ObjectId;
  notes?: string;
  shippingAddress?: IShippingAddress;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "gcash", "PayPal", "COD"],
      default: "cash",
    },
    cashier: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: function (this: IOrder) {
          return this.paymentMethod === "PayPal";
        },
      },
      address: {
        type: String,
        required: function (this: IOrder) {
          return this.paymentMethod === "PayPal";
        },
      },
      city: {
        type: String,
        required: function (this: IOrder) {
          return this.paymentMethod === "PayPal";
        },
      },
      postalCode: {
        type: Number,
        required: function (this: IOrder) {
          return this.paymentMethod === "PayPal";
        },
      },
      country: {
        type: String,
        required: function (this: IOrder) {
          return this.paymentMethod === "PayPal";
        },
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate order number
orderSchema.pre("save", async function (next) {
  try {
    if (!this.orderNumber) {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // Get count of orders created today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const count = await mongoose.model("Order").countDocuments({
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      });

      // Generate order number: YYMMDD-XXXX (where XXXX is the sequential number for the day)
      this.orderNumber = `${year}${month}${day}-${(count + 1)
        .toString()
        .padStart(4, "0")}`;
    }
    next();
  } catch (error: any) {
    next(error as Error);
  }
});

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
