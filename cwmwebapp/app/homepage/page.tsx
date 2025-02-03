"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
// import {
//   ShoppingCartIcon,
//   TruckIcon,
//   ShieldCheckIcon,
//   UserGroupIcon,
//   ChartBarIcon,
//   HeartIcon,
// } from "@heroicons/react/24/outline";
import { FaTruck } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const width = "auto";
  const height = "auto";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const features = [
    {
      icon: <FaShoppingCart className="w-8 h-8" />,
      title: "Easy Shopping",
      description: "Browse and purchase healthcare products with ease",
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your location",
    },
    {
      icon: <IoShieldCheckmark className="w-8 h-8" />,
      title: "Quality Assured",
      description: "All products meet highest quality standards",
    },
  ];

  const stats = [
    {
      icon: <FaUserGroup className="w-8 h-8" />,
      value: "10,000+",
      label: "Happy Customers",
    },
    {
      icon: <FaChartBar className="w-8 h-8" />,
      value: "5,000+",
      label: "Products Delivered",
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      value: "99%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {isClient && (
        <>
          <motion.section
            id="home"
            className="relative text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="relative h-screen">
              {/* Background Video */}
              <video
                className="absolute inset-0 object-cover w-full h-full"
                src="/videobackground.mp4"
                autoPlay
                loop
                playsInline
                muted
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-teal-700/60"></div>
              {/* Content */}
              <div className="relative flex items-center justify-center h-full text-center px-6">
                <div>
                  <motion.h1
                    className="text-4xl sm:text-5xl font-bold leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Central West Shop
                  </motion.h1>
                  <motion.p
                    className="mt-6 text-lg sm:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    Central West Marketing delivers healthcare products with
                    reliability and excellence.
                  </motion.p>
                  <motion.div
                    className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                  >
                    <Link
                      href="/products"
                      className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      View Products
                    </Link>
                    <Link
                      href="/About"
                      className="px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <FaUserGroup className="w-5 h-5" />
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Curved Section */}
              <div className="absolute bottom-0 left-0 right-0">
                <svg
                  viewBox="0 0 1440 320"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full relative"
                >
                  <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,128L40,138.7C80,149,160,171,240,160C320,149,400,107,480,101.3C560,96,640,128,720,154.7C800,181,880,203,960,213.3C1040,224,1120,224,1200,197.3C1280,171,1360,117,1400,90.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                  ></path>
                </svg>
                {/* Image inside the curve */}
                <div className="absolute inset-x-0 bottom-0 h-auto w-auto mx-auto translate-y-1/2 flex justify-center">
                  <Image
                    src="/images/listofproducts.png"
                    className="drop-shadow-lg"
                    width={1500}
                    height={700}
                    alt="product list"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="py-24 mt-48 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">
                  Why Choose Us?
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-lg opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
}

//new code from AI
