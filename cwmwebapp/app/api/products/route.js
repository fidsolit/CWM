import connectMongoDB from "../../../libs/mongodb";
import Product from "../../../models/Product";
import { NextResponse } from "next/server";

// Insert into table in SQL
export async function POST(request) {
  const {
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
  } = await request.json();
  await connectMongoDB();
  await Product.create({
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
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

// Select * from table in SQL
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

// Delete * from table where column name = variable (in SQL)
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
