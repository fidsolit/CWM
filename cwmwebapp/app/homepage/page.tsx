// pages/index.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CiDeliveryTruck } from "react-icons/ci";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative bg-gradient-to-r  from-blue-900 to-teal-700 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Your Trusted Partner in Pharmacy Distribution
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Central West Marketing delivers healthcare products with reliability
            and excellence.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col sm:flex-row  justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/products"
              className="px-8 py-4 bg-white z-10 text-blue-900 font-semibold rounded-lg shadow  hover:bg-gray-100 transition"
            >
              View Products
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-blue-800 z-10 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/hero.jpg" // Replace with your hero background image
            alt="Pharmacy Distribution"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Central West Marketing?
          </motion.h2>
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, staggerChildren: 0.2 },
              },
            }}
          >
            {[
              {
                icon: "/images/delivery-icon.png",
                title: "Reliable Delivery",
                description:
                  "Guaranteed timely delivery for all orders, nationwide.",
              },
              {
                icon: "/images/handshake.png",
                title: "Trusted Partnerships",
                description:
                  "Partnering with certified pharmaceutical manufacturers.",
              },
              {
                icon: "/images/best-price.png",
                title: "Affordable Pricing",
                description:
                  "Competitive prices with bulk discounts for distributors.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg text-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="mx-auto"
                />
                <h3 className="mt-6 text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Product Categories
          </motion.h2>
          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, staggerChildren: 0.2 },
              },
            }}
          >
            {[
              {
                image: "/images/pharmaceuticals.jpg",
                title: "Pharmaceuticals",
              },
              {
                image: "/images/medical-supplies.jpg",
                title: "Medical Supplies",
              },
              {
                image: "/images/health-supplements.jpg",
                title: "Health Supplements",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-100 shadow-lg rounded-lg text-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={200}
                  className="rounded"
                />
                <h3 className="mt-6 font-semibold text-gray-800">
                  {category.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Central West Marketing. All rights reserved.</p>
          <div className="mt-6 flex justify-center space-x-8">
            <a href="#" className="text-teal-400 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-teal-400 hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
