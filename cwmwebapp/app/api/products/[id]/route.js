import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newbrand: brand, newDescription: description } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, {
    brand,
    description,
    availableqty,
    unitprice,
    sku,
    ram,
    videocard,
    storage,
    color,
    inches,
    Freebies,
    warranty,
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
