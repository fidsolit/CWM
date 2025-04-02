import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
      default: 0,
    },
    warranty: {
      type: {
        type: String,
        enum: ["standard", "extended"],
        default: "standard",
      },
      duration: {
        type: Number,
        default: 12,
      },
      description: String,
      terms: [String],
      coverage: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
