import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

///this is the old codes

export async function PUT(request, { params }) {
  const { id } = params;
  const { newbrand: brand, newDescription: description } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, {
    name,
    brand,
    description,
    category,
    sellingPrice,
    unitPrice,
    availableQty,
    dosageForm,
    strength,
    sku,
    expirationDate,
    batchNumber,
    storageConditions,
  });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
//  sellingprice: String,
//   unitprice: String,
//   availableqty: String,
//   sku: String,
//   ram: String,
//   Videocard: String,
//   storage: String,
//   color: String,
//   inches: String,
//   Freebies: String,
//   Warranty: String,

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
