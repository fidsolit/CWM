// pages/index.js
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}

      {/* Hero Section */}
      <section id="home" className="relative bg-blue-950 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold">
            Your Trusted Partner in Pharmacy Distribution
          </h1>
          <p className="mt-4 text-lg">
            Central West Marketing delivers healthcare products with reliability
            and excellence.
          </p>
          <div className="mt-6 space-x-4">
            <Link
              href="/products"
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded hover:bg-gray-100"
            >
              View Products
            </Link>
            <a
              href="#about"
              className="px-6 py-3 bg-teal-700 font-semibold rounded hover:bg-teal-600"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Why Central West Marketing?
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded text-center">
              <div className="text-teal-600 text-4xl">🚚</div>
              <h3 className="mt-4 text-xl font-semibold">Reliable Delivery</h3>
              <p className="mt-2 text-gray-600">
                Guaranteed timely delivery for all orders, nationwide.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded text-center">
              <div className="text-teal-600 text-4xl">💊</div>
              <h3 className="mt-4 text-xl font-semibold">
                Trusted Partnerships
              </h3>
              <p className="mt-2 text-gray-600">
                Partnering with certified pharmaceutical manufacturers.
              </p>
            </div>
            <div className="p-6 bg-white shadow rounded text-center">
              <div className="text-teal-600 text-4xl">💵</div>
              <h3 className="mt-4 text-xl font-semibold">Affordable Pricing</h3>
              <p className="mt-2 text-gray-600">
                Competitive prices with bulk discounts for distributors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Our Product Categories
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-100 rounded shadow text-center">
              <div className="h-40 bg-gray-200 rounded"></div>
              <h3 className="mt-4 font-semibold">Pharmaceuticals</h3>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow text-center">
              <div className="h-40 bg-gray-200 rounded"></div>
              <h3 className="mt-4 font-semibold">Medical Supplies</h3>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow text-center">
              <div className="h-40 bg-gray-200 rounded"></div>
              <h3 className="mt-4 font-semibold">Health Supplements</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Central West Marketing. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-teal-400 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-400 hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
