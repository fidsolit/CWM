import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
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
      enum: ["cash", "card", "gcash"],
      default: "cash",
    },
    cashier: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a unique order number before saving
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    // Get count of orders for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = await mongoose.model("Order").countDocuments({
      createdAt: { $gte: today },
    });

    // Format: YYMMDD-XXXX (where XXXX is a sequential number for the day)
    this.orderNumber = `${year}${month}${day}-${(count + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
