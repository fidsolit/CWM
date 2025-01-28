"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const About = () => {
  console.log("You're on the about page");

  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Array of background images
  const backgrounds = [
    "/images/hero-bg.jpg",
    "/images/hero-bg2.jpg",
    "/images/hero-bg3.jpg",
  ];

  // Change background every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [backgrounds.length]);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white-800 via-white-700 to-transparent opacity-75"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-red space-y-6">
          {/* Fancy Heading */}
          <h1 className="text-6xl text-red-600 font-extrabold tracking-wide animate-fade-in-up">
            CENTRAL WEST MEDICALE INC.
          </h1>

          {/* Subheading */}
          <p className="text-xl font-light max-w-2xl animate-fade-in-down">
            Discover high-quality healthcare solutions and expert services
            tailored for you. Let's power your potential.
          </p>

          {/* Call to Action Button */}
          <Link
            href="/products"
            className="inline-block text-white px-8 py-4 bg-gradient-to-r from-red-500 to-red-500 rounded-full text-lg font-semibold hover:scale-110 transition-transform animate-bounce-slow"
          >
            Shop Now
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex justify-center w-full">
          <a href="#background" className="text-white animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Our Background Section */}
      <section id="background" className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Our Background
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Central West Medicale Inc. was formed by our President and CEO, Ms.
            Hamela Juson, in July 2010. Based in Cebu, Philippines, Central West
            offers registered pharmaceutical products to cater to the needs of
            patients seeking quality alternative healthcare.
          </p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center mt-4">
            From our humble beginnings, CWMI is now present in almost all
            private hospitals in the Visayas and Mindanao regions. With the
            support of our distribution channels, our products are available in
            almost every part of the Philippines.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 px-6 bg-gray-100 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            What We Do
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Central West Medicale Inc. and its people do business with honesty
            and integrity. We extend our services to all healthcare partners and
            Filipinos by providing access to global products at the best
            competitive prices.
          </p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center mt-4">
            Our people are trained to deliver excellent service at all times. We
            value the trust of our customers and strive to be the best in the
            industry. As healthcare is one of the most critical aspects of life,
            we ensure all our products are effective and conform to all FDA
            requirements and laboratory tests.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Our mission at Central West Marketing is to empower individuals and
            businesses by providing exceptional healthcare solutions. We deliver
            high-quality pharmaceutical products, software solutions, and expert
            services that ensure the best care and health outcomes.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 px-6 bg-gray-100 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Our Vision
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Our vision is to be the leading healthcare partner for individuals
            and institutions across the Philippines. We strive to create a
            seamless experience by offering a comprehensive range of quality
            products and services, fostering growth and innovation in the
            industry.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
