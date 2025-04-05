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
  FaFilter,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
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
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"products" | "cart">("products");

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

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === "products" ? "cart" : "products");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
            <button
              onClick={toggleViewMode}
              className="md:hidden bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {viewMode === "products" ? "View Cart" : "View Products"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Products Section - Hidden on mobile when in cart view */}
        <div
          className={`w-full md:w-2/3 p-4 overflow-y-auto ${
            viewMode === "cart" ? "hidden md:block" : "block"
          }`}
        >
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 border border-gray-200 rounded-lg flex items-center gap-2 bg-white hover:bg-gray-50"
                >
                  <FaFilter className="text-blue-600" />
                  <span className="hidden md:inline">Filter</span>
                  {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Categories</h3>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-50">
                  <Image
                    src={product.productImage || "/placeholder.png"}
                    alt={product.productName}
                    fill
                    className="object-contain p-2"
                  />
                  {product.productQuantity <= 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.productCategory.categoryName}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-600 text-xl">
                      ₱{Number(product.productPrice).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.productQuantity}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className={`w-full mt-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      product.productQuantity > 0
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={product.productQuantity <= 0}
                  >
                    <FaShoppingCart />
                    <span>
                      {product.productQuantity > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section - Hidden on mobile when in products view */}
        <div
          className={`w-full md:w-1/3 bg-white border-l border-gray-200 flex flex-col ${
            viewMode === "products" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaShoppingCart className="text-xl text-blue-600" />
                <h2 className="text-xl font-bold">Shopping Cart</h2>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
              <FaShoppingCart className="text-5xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">
                Add some products to get started
              </p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-50 p-3 rounded-lg mb-3 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden">
                        <Image
                          src={item.productImage || "/placeholder.png"}
                          alt={item.productName}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.productCategory.categoryName}
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
                          <div className="flex items-center border border-gray-200 rounded bg-white">
                            <button
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className="font-semibold text-green-600">
                            ₱{item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₱{calculateTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                >
                  <FaCashRegister className="text-xl" />
                  <span className="font-medium">Checkout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
