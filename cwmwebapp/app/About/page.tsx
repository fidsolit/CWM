"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const About = () => {
  // console.log("You're on the about page");

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

  // Client testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "/images/pic1.jpg",
      quote:
        "FCODES has transformed our business operations with their exceptional tech solutions. Their team's expertise and dedication are unmatched.",
      company: "TechStart Solutions",
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      image: "/images/pic2.jpg",
      quote:
        "The quality of their products and the level of customer service is exceptional. They've become our trusted partner for all tech needs.",
      company: "Global Innovations Inc.",
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image: "/images/pic3.jpg",
      quote:
        "Working with FCODES has been a game-changer for our creative team. Their solutions have streamlined our workflow significantly.",
      company: "Creative Studios",
    },
  ];

  // Client logos data
  const clientLogos = [
    { src: "/images/pic4.jpg", alt: "TechCorp" },
    { src: "/images/pic5.jpg", alt: "InnovateTech" },
    { src: "/images/pic6.jpg", alt: "Digital Solutions" },
    { src: "/images/pic7.jpg", alt: "Future Systems" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-purple-700 to-transparent opacity-75"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white space-y-6">
          {/* Fancy Heading */}
          <h1 className="text-6xl font-extrabold tracking-wide animate-fade-in-up">
            Elevate Your Tech Experience
          </h1>

          {/* Subheading */}
          <p className="text-xl font-light max-w-2xl animate-fade-in-down">
            Discover top-tier computer supplies and expert services tailored for
            you. Let's power your potential.
          </p>

          {/* Call to Action Button */}
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:scale-110 transition-transform animate-bounce-slow"
          >
            Shop Now
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex justify-center w-full">
          <a href="#mission" className="text-white animate-bounce">
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

      {/* Mission Section */}
      <section id="mission" className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            "Our mission at FCODES is to make technology work for you. We
            provide high-quality computer supplies, software solutions, and
            services that help you navigate the digital world with ease. Whether
            you're looking for the right hardware, the perfect software, or
            expert support, we're here to guide you every step of the way with
            friendly, knowledgeable service."
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
            "Our vision is to be the go-to tech partner for both individuals and
            businesses. We aim to create a seamless tech experience by offering
            everything you need under one roof—from the latest hardware to
            cutting-edge software and reliable support. At FCODES, we're
            dedicated to helping our customers stay ahead in an ever-evolving
            digital landscape, fostering growth, and driving innovation."
          </p>
        </div>
      </section>

      {/* Satisfied Clients Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-4">
            Our Satisfied Clients
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Join hundreds of satisfied customers who trust FCODES for their
            technology needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden transition-all duration-300"
              >
                {/* Large background image with overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <Image
                    src={testimonial.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center mb-4 relative z-10">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 border-4 border-blue-500 group-hover:border-purple-500 transition-colors duration-300">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic relative z-10 group-hover:text-gray-900 transition-colors duration-300">
                  "{testimonial.quote}"
                </p>

                {/* Quote icon */}
                <div className="absolute bottom-2 right-2 text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Client Logos */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">
              Trusted By Industry Leaders
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
              {clientLogos.map((logo, index) => (
                <div
                  key={index}
                  className="relative w-40 h-24 grayscale hover:grayscale-0 transition-all duration-500 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-lg"></div>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
