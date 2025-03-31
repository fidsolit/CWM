import mongoose from "mongoose";

const WarrantyClaimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    issue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
    adminNotes: String,
    resolution: String,
    resolvedAt: Date,
  },
  { timestamps: true }
);

const WarrantyClaim =
  mongoose.models.WarrantyClaims ||
  mongoose.model("WarrantyClaims", WarrantyClaimSchema);

export default WarrantyClaim;
