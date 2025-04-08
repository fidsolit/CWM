"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  FaPrint,
  FaCheck,
  FaBarcode,
  FaHistory,
  FaKeyboard,
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

interface OrderResponse {
  success: boolean;
  order: {
    _id: string;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  };
  error?: string;
}

interface OrderHistory {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: CartItem[];
  paymentMethod: string;
  cashier: string;
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
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "gcash">(
    "cash"
  );
  const [cashierName, setCashierName] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderResponse["order"] | null>(
    null
  );
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

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

  // Quick quantity selection
  const quickAddToCart = (product: Product, quantity: number) => {
    if (product.productQuantity < quantity) {
      toast.error("Not enough stock available!");
      return;
    }
    addToCart(product, quantity);
  };

  // Modified addToCart to accept quantity
  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.productQuantity <= 0) {
      toast.error("Product is out of stock!");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.productQuantity) {
        toast.error("Not enough stock available!");
        return;
      }

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: newQuantity,
                subtotal: newQuantity * Number(item.productPrice),
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: quantity,
          subtotal: quantity * Number(product.productPrice),
        },
      ]);
    }

    toast.success(`${quantity}x ${product.productName} added to cart`);
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

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === "products" ? "cart" : "products");
  };

  // Open checkout modal
  const openCheckoutModal = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }
    setShowCheckoutModal(true);
  };

  // Close checkout modal
  const closeCheckoutModal = () => {
    setShowCheckoutModal(false);
    setPaymentMethod("cash");
    setCashierName("");
    setOrderNotes("");
  };

  // Process checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    if (!cashierName.trim()) {
      toast.error("Please enter cashier name");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          productName: item.productName,
          quantity: item.quantity,
          price: Number(item.productPrice),
          subtotal: item.subtotal,
        })),
        totalAmount: calculateTotal(),
        paymentMethod,
        cashier: cashierName,
        notes: orderNotes,
      };

      // Send order to backend
      const response = await fetch("/api/pos/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result: OrderResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to process order");
      }

      // Show success message
      setLastOrder(result.order);
      setShowOrderSuccess(true);
      setShowCheckoutModal(false);

      // Clear cart
      setCart([]);

      toast.success(
        `Order #${result.order.orderNumber} processed successfully!`
      );
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process order"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Close order success modal
  const closeOrderSuccess = () => {
    setShowOrderSuccess(false);
    setLastOrder(null);
  };

  // Print receipt
  const printReceipt = () => {
    if (!lastOrder) return;

    const receiptWindow = window.open("", "_blank");
    if (!receiptWindow) {
      toast.error("Please allow popups to print receipt");
      return;
    }

    const receiptContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - Order #${lastOrder.orderNumber}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              width: 300px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .store-name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .store-info {
              font-size: 12px;
              margin-bottom: 20px;
            }
            .order-info {
              margin-bottom: 20px;
            }
            .items {
              width: 100%;
              margin-bottom: 20px;
            }
            .items th {
              text-align: left;
              border-bottom: 1px dashed #000;
            }
            .total {
              text-align: right;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
            }
            @media print {
              body {
                width: 80mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="store-name">Your Store Name</div>
            <div class="store-info">
              123 Store Street<br>
              City, Country<br>
              Tel: (123) 456-7890
            </div>
          </div>
          <div class="order-info">
            Order #: ${lastOrder.orderNumber}<br>
            Date: ${new Date(lastOrder.createdAt).toLocaleString()}<br>
            Cashier: ${cashierName}
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.quantity}</td>
                  <td>₱${item.subtotal.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">
            Total: ₱${lastOrder.totalAmount.toFixed(2)}<br>
            Payment Method: ${paymentMethod.toUpperCase()}
          </div>
          <div class="footer">
            Thank you for your purchase!<br>
            Please come again
          </div>
        </body>
      </html>
    `;

    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  // Order success modal
  const renderOrderSuccessModal = () => {
    if (!showOrderSuccess || !lastOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Successful!
            </h2>
            <p className="text-gray-600 mb-4">Order #{lastOrder.orderNumber}</p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">
                  ₱{lastOrder.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  {paymentMethod.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cashier:</span>
                <span className="font-semibold">{cashierName}</span>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={printReceipt}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPrint />
                Print Receipt
              </button>
              <button
                onClick={closeOrderSuccess}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fetch order history
  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("/api/pos/order-history");
      const data = await response.json();
      if (data.success) {
        setOrderHistory(data.orders);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Failed to fetch order history");
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle view mode with Ctrl + V
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        toggleViewMode();
      }
      // Open checkout with Ctrl + Enter
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        openCheckoutModal();
      }
      // Clear cart with Ctrl + Backspace
      if (e.ctrlKey && e.key === "Backspace") {
        e.preventDefault();
        setCart([]);
        toast.info("Cart cleared");
      }
      // Toggle barcode scanning with Ctrl + B
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setIsScanning(!isScanning);
        if (!isScanning && barcodeInputRef.current) {
          barcodeInputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isScanning]);

  // Barcode scanning
  const handleBarcodeScan = async (barcode: string) => {
    try {
      const response = await fetch(`/api/pos/product-by-barcode/${barcode}`);
      const data = await response.json();
      if (data.success) {
        addToCart(data.product);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error scanning barcode:", error);
      toast.error("Failed to scan barcode");
    }
    if (barcodeInputRef.current) {
      barcodeInputRef.current.value = "";
    }
  };

  // Render keyboard shortcuts modal
  const renderKeyboardShortcutsModal = () => {
    if (!showKeyboardShortcuts) return null;

    const shortcuts = [
      { key: "Ctrl + V", description: "Toggle view mode" },
      { key: "Ctrl + Enter", description: "Open checkout" },
      { key: "Ctrl + Backspace", description: "Clear cart" },
      { key: "Ctrl + B", description: "Toggle barcode scanning" },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
            <button
              onClick={() => setShowKeyboardShortcuts(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-2">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex justify-between items-center"
              >
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {shortcut.key}
                </span>
                <span className="text-gray-600">{shortcut.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render order history modal
  const renderOrderHistoryModal = () => {
    if (!showOrderHistory) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Order History</h2>
            <button
              onClick={() => setShowOrderHistory(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-bold">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span className="font-bold">
                    ₱{order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Cashier: {order.cashier}</div>
                  <div>Payment: {order.paymentMethod.toUpperCase()}</div>
                  <div>Status: {order.status}</div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="font-semibold mb-1">Items:</div>
                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.productName}
                        </span>
                        <span>₱{item.subtotal.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Add to the header section
  const renderHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">POS System</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowKeyboardShortcuts(true)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title="Keyboard Shortcuts"
            >
              <FaKeyboard />
            </button>
            <button
              onClick={() => {
                setShowOrderHistory(true);
                fetchOrderHistory();
              }}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title="Order History"
            >
              <FaHistory />
            </button>
            <button
              onClick={() => setIsScanning(!isScanning)}
              className={`p-2 rounded-lg transition-colors ${
                isScanning ? "bg-green-500" : "hover:bg-blue-700"
              }`}
              title="Toggle Barcode Scanning"
            >
              <FaBarcode />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add to the product card section
  const renderProductCard = (product: Product) => (
    <div
      key={product._id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        <Image
          src={product.productImage}
          alt={product.productName}
          fill
          className="object-cover"
        />
        {product.productQuantity <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.productName}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {product.productDescription}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">₱{product.productPrice}</span>
          <span className="text-sm text-gray-500">
            Stock: {product.productQuantity}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => quickAddToCart(product, 1)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add 1
          </button>
          <button
            onClick={() => quickAddToCart(product, 5)}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add 5
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {renderHeader()}

      {/* Barcode Scanner Input */}
      {isScanning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 p-2 z-50">
          <input
            ref={barcodeInputRef}
            type="text"
            placeholder="Scan barcode..."
            className="w-full p-2 border rounded"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleBarcodeScan(e.currentTarget.value);
              }
            }}
          />
        </div>
      )}

      <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
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
              {filteredProducts.map((product) => renderProductCard(product))}
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
                    onClick={openCheckoutModal}
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

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">Complete Order</h2>
                <button
                  onClick={closeCheckoutModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cashier Name
                  </label>
                  <input
                    type="text"
                    value={cashierName}
                    onChange={(e) => setCashierName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cashier name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={`flex-1 py-2 rounded-md border ${
                        paymentMethod === "cash"
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Cash
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 py-2 rounded-md border ${
                        paymentMethod === "card"
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("gcash")}
                      className={`flex-1 py-2 rounded-md border ${
                        paymentMethod === "gcash"
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      GCash
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any notes about this order"
                    rows={3}
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₱{calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors shadow-md disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCashRegister className="text-xl" />
                        <span className="font-medium">Complete Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Success Modal */}
        {renderOrderSuccessModal()}

        {/* Modals */}
        {renderKeyboardShortcutsModal()}
        {renderOrderHistoryModal()}
      </div>
    </div>
  );
}
