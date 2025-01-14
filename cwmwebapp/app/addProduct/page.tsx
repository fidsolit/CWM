"use client";
import { useSelector } from "react-redux";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "../Globalredux/store";
import { motion } from "framer-motion";

interface ProductData {
  name: string;
  brand: string;
  description: string;
  category: string;
  sellingPrice: number;
  unitPrice: number;
  availableQty: number;
  dosageForm: string;
  strength: string;
  sku: string;
  expirationDate: string;
  batchNumber: string;
  storageConditions: string;
}

export default function AddProduct() {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    brand: "",
    description: "",
    category: "",
    sellingPrice: 0,
    unitPrice: 0,
    availableQty: 0,
    dosageForm: "",
    strength: "",
    sku: "",
    expirationDate: "",
    batchNumber: "",
    storageConditions: "",
  });

  if (!authState.isAdmin) {
    router.push("/products");
    return null;
  }
  const categories = ["Antibiotics", "Painkillers", "Vitamins", "Supplements"];
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, description } = productData;
    if (!name || !description)
      return alert("Product name and description are required.");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) router.push("/admindashboard");
      else throw new Error("Failed to create product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex rounded-xl mt-5 shadow-lg border bg-gradient-to-br from-indigo-100 to-white p-8 md:w-3/4 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Add New Product
        </h2>

        {Object.keys(productData).map((field, idx) => (
          <div key={idx} className="relative">
            <motion.label
              htmlFor={field}
              className="absolute left-3 top-3 text-gray-500 transition-all pointer-events-none"
              animate={{
                top: productData[field as keyof ProductData]
                  ? "-0.5rem"
                  : "0.75rem",
                fontSize: productData[field as keyof ProductData]
                  ? "0.75rem"
                  : "1rem",
                color: productData[field as keyof ProductData]
                  ? "rgb(99 102 241)"
                  : "rgb(156 163 175)",
              }}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </motion.label>
            <input
              id={field}
              name={field}
              value={productData[field as keyof ProductData]}
              onChange={handleChange}
              className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm mt-3"
              type={
                ["sellingPrice", "unitPrice", "availableQty"].includes(field)
                  ? "number"
                  : field === "expirationDate"
                  ? "date"
                  : "text"
              }
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
