import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    brand: String,
    description: String,
    sellingprice: String,
    unitprice: String,
    availableqty: String,
    sku: String,
    ram: String,
    Videocard: String,
    storage: String,
    color: String,
    inches: String,
    Freebies: String,
    Warranty: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
