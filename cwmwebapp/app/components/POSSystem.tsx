"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import Image from "next/image";
import {
  FaSearch,
  FaShoppingCart,
  FaTrash,
  FaCashRegister,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
  productCategory: {
    _id: string;
    categoryName: string;
  };
}

interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

export default function POSSystem() {
  const products = useSelector((state: RootState) => state.Admin.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.productDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.productCategory.categoryName === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.productCategory.categoryName))
    );
    setCategories(uniqueCategories);
  }, [products]);

  // Add product to cart
  const addToCart = (product: Product) => {
    if (product.productQuantity <= 0) {
      toast.error("Product is out of stock!");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      if (existingItem.quantity >= product.productQuantity) {
        toast.error("Not enough stock available!");
        return;
      }

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * Number(item.productPrice),
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          subtotal: Number(product.productPrice),
        },
      ]);
    }

    toast.success(`${product.productName} added to cart`);
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  // Update quantity in cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    const product = products.find((p) => p._id === productId);

    if (newQuantity > Number(product?.productQuantity)) {
      toast.error("Not enough stock available!");
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * Number(item.productPrice),
            }
          : item
      )
    );
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  // Process checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    // Here you would typically send the order to your backend
    toast.success("Order processed successfully!");
    setCart([]);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* Products Section */}
      <div className="w-full md:w-2/3 p-4 overflow-y-auto">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40 mb-2">
                <Image
                  src={product.productImage || "/placeholder.png"}
                  alt={product.productName}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.productName}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.productCategory.categoryName}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">
                  ₱{Number(product.productPrice).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {product.productQuantity}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={product.productQuantity <= 0}
              >
                {product.productQuantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <FaShoppingCart className="text-xl text-blue-600" />
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-3 rounded-lg mb-2 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.productName}</h3>
                      <p className="text-sm text-gray-600">
                        ₱{Number(item.productPrice).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">
                      ₱{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ₱{calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
              >
                <FaCashRegister />
                <span>Checkout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
