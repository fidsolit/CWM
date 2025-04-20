"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  const [currentLogo, setCurrentLogo] = useState(0);

  const logos = [
    { src: "/companylogos/company1.jpg", alt: "com1" },
    { src: "/companylogos/company2.jpg", alt: "comp2" },
    { src: "/companylogos/company3.jpg", alt: "comp3" },
    { src: "/companylogos/company4.png", alt: "comp4" },
  ];

  // Automatically change logos every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev === logos.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left gap-y-12">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Stay Connected!
            </h4>
            <h5 className="text-xl mt-0 mb-8 text-gray-300 leading-relaxed">
              Follow us on social media for updates, news, and exclusive
              content. We respond within 1-2 business days.
            </h5>
            <div className="mt-6 flex space-x-6">
              <a
                href="https://www.facebook.com/FCodesCompany"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-lg hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-lg hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300"
              >
                <FaInstagramSquare size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg font-normal h-12 w-12 flex items-center justify-center rounded-lg hover:scale-110 hover:shadow-blue-600/50 transition-all duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap mb-6 gap-y-8">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blue-300 text-sm font-bold mb-4">
                  Useful Links
                </span>
                <ul className="list-none space-y-3">
                  <li>
                    <Link
                      href="/About"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blue-300 text-sm font-bold mb-4">
                  Other Resources
                </span>
                <ul className="list-none space-y-3">
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-300 hover:text-white font-medium flex items-center transition-all hover:translate-x-2"
                    >
                      <span className="mr-2">→</span> Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Carousel for satisfied companies */}
        <div className="my-16">
          <h4 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            Trusted By Leading Companies
          </h4>
          <div className="relative h-[120px] flex justify-center items-center overflow-hidden bg-white/5 rounded-xl backdrop-blur-sm p-4">
            {logos.map((logo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                  index === currentLogo ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transform: `translateX(${(index - currentLogo) * 100}%)`,
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={80}
                  className="mx-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            {/* <img
              className="w-auto h-auto"
              src="/companylogos/company1.jpg"
              alt="company1"
            />
            <img
              className="w-auto h-auto"
              src="/companylogos/company2.jpg"
              alt="company1"
            /> */}
          </div>
        </div>

        <hr className="my-8 border-white/10" />
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-400 font-medium py-1">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://www.facebook.com/FCodesCompany"
                className="text-white hover:text-blue-300 transition-colors font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                FCODES
              </a>{" "}
              by{" "}
              <a
                href="https://www.facebook.com/PARDILLONABLEFIDELITO/"
                className="text-white hover:text-blue-300 transition-colors font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                FIDEL
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
