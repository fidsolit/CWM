"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const width = "auto";
  const height = "auto";

  useEffect(() => {
    setIsClient(true); // Ensures animations and video are rendered only on the client
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {isClient && (
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
              src="/videobackground.mp4" // Replace with the actual path or URL to your video
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
                    className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                  >
                    View Products
                  </Link>
                  <Link
                    href="/About"
                    className="px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                  >
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
              <div className="absolute inset-x-0 bottom-0  h-auto w-auto mx-auto translate-y-1/2 flex justify-center">
                <Image
                  // src="/images/listofproducts2.png"
                  src="/images/listofproducts.png"
                  // layout="intrinsic"
                  className="drop-shadow-lg"
                  width={1500}
                  height={700}
                  alt="product list"
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
