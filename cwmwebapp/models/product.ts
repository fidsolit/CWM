import mongoose from "mongoose";
import Category from "./Category";

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    productDescription: String,
    productImage: String,
    productSlug: String,
    productPrice: Number,
    productQuantity: Number,
    productFeatured: Boolean,
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    warranty: {
      type: {
        type: String,
        enum: ["standard", "extended"],
        default: "standard",
      },
      duration: {
        type: Number,
        default: 12, // months
      },
      description: String,
      startDate: Date,
      endDate: Date,
      terms: [String],
      coverage: [String],
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
