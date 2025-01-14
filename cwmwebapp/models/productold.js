import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String, // Name of the product
    brand: String, // Brand or manufacturer
    description: String, // Brief product description
    category: String, // Product category (e.g., Antibiotics)
    sellingPrice: Number, // Selling price per unit
    unitPrice: Number, // Purchase price per unit
    availableQty: Number, // Quantity available in stock
    dosageForm: String, // Dosage form (e.g., Tablet, Syrup)
    strength: String, // Strength (e.g., 500mg, 5%)
    sku: String, // Stock Keeping Unit
    expirationDate: Date, // Expiration date
    batchNumber: String, // Batch or lot number
    storageConditions: String, // Storage instructions (e.g., Refrigerate)
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
