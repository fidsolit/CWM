"use client";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";
// import RemoveBtn from "./removeBtn";
import { useState, useEffect } from "react";
import { FcViewDetails } from "react-icons/fc";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

// Define a type for the product
interface Product {
  _id: string;
  brand: string;
  description: string;
  unitPrice: string;
  sellingPrice: number;
  name: string;
  availableQty: string;
}

// Define a type for the API response
interface ProductResponse {
  products: Product[];
}

// Fetch products from the API
const getallProducts = async (): Promise<ProductResponse | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log("error loading products cause: ", error);
  }
};

export default function AllProduct() {
  // State for products and filtered products
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 5;

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getallProducts();
      if (result) {
        setProducts(result.products);
        console.log("this is all the products", products);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="md:w-3/4 lg:w-2/3 mx-auto md:m-15 shadow-lg rounded-lg z-auto bg-white p-5">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-semibold text-gray-800">Product List</h1>
        <Link
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-400 transition"
          href="/addProduct"
        >
          ADD NEW
        </Link>
      </div>

      <div className="mb-4">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search product by brand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Select</th>
              <th className="px-6 py-3 text-left font-medium">BRAND</th>
              <th className="px-6 py-3 text-left font-medium">Description</th>
              <th className="px-6 py-3 text-left font-medium">Unit Price</th>
              <th className="px-6 py-3 text-left font-medium">Price</th>
              <th className="px-6 py-3 text-left font-medium">
                Available Quantity
              </th>
              <th className="px-6 py-3 text-left font-medium">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-blue-100 border-b border-gray-200"
              >
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" className="checkbox" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300  hidden md:flex justify-center items-center">
                      <img
                        src="/1.jfif"
                        alt="Product"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="font-semibold text-gray-800">{p.name}</div>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-700">{p.description}</td>
                <td className="px-6 py-4 text-gray-700">{p.unitPrice}</td>
                <td className="px-6 py-4 text-green-500 font-semibold">
                  {/* php{p.sellingprice.toFixed(2)} */}₱{" "}
                  {Number(products[0].sellingPrice).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-700">{p.availableQty}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    {/* <RemoveBtn id={p._id} /> */}
                    <Link href={`/updateProduct/${p._id}`}>
                      <button className="hover:scale-110 transition transform">
                        <HiOutlinePencilSquare
                          size={25}
                          className="text-blue-600"
                        />
                      </button>
                    </Link>
                    <Link href={`/productDetails/${p._id}`}>
                      <button className="hover:scale-110 transition transform">
                        <FcViewDetails size={25} className="text-blue-600" />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
