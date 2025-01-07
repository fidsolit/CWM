import connectMongoDB from "../../../libs/mongodb";
import Product from "../../../models/product";
import { NextResponse } from "next/server";

//insert into table in sql
export async function POST(request) {
  const {
    brand,
    description,
    sellingprice,
    unitprice,
    availableqty,
    sku,
    ram,
    Videocard,
    storage,
    color,
    inches,
    Freebies,
    Warranty,
  } = await request.json();
  await connectMongoDB();
  await Product.create({
    brand,
    description,
    sellingprice,
    unitprice,
    availableqty,
    sku,
    ram,
    Videocard,
    storage,
    color,
    inches,
    Freebies,
    Warranty,
  });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

//select * from table in SQL
export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

//delete * from where column name = variable/variable request = in sql
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
