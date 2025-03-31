"use client";

import React from "react";

const Warranty = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Product Warranty Information
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            At FCODES, we stand behind the quality of our products and services.
            Our warranty program is designed to provide you with peace of mind
            and protect your investment.
          </p>
        </div>
      </section>

      {/* Standard Warranty Section */}
      <section className="py-16 px-6 bg-gray-100 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Standard Warranty Coverage
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Hardware Products</h3>
              <ul className="space-y-2">
                <li>• 3-month warranty on all hardware components</li>
                <li>• Coverage for manufacturing defects</li>
                <li>• 7 days Free replacement of defective parts</li>
                <li>• Technical support included</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Software Products</h3>
              <ul className="space-y-2">
                <li>• 60-day warranty on software licenses</li>
                <li>• Free updates and patches</li>
                <li>• Technical support assistance</li>
                <li>• License replacement if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Warranty Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Extended Warranty Options
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Premium Protection Plan
              </h3>
              <ul className="space-y-2">
                <li>• Extends warranty coverage up to 3 years</li>
                <li>• Accidental damage protection</li>
                <li>• Priority technical support</li>
                <li>• Free shipping for warranty claims</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Contact our sales team for pricing and availability of extended
                warranty options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-16 px-6 bg-gray-100 text-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Warranty Terms and Conditions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">General Terms</h3>
              <ul className="space-y-2">
                <li>• Warranty is non-transferable</li>
                <li>• Original proof of purchase required</li>
                <li>
                  • Warranty void if product is modified or repaired by
                  unauthorized personnel
                </li>
                <li>• Coverage excludes normal wear and tear</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Claim Process</h3>
              <ol className="space-y-2">
                <li>1. Contact our support team with your issue</li>
                <li>2. Provide proof of purchase and product details</li>
                <li>3. Follow troubleshooting steps if provided</li>
                <li>
                  4. If issue persists, we'll arrange for repair or replacement
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Warranty Support?</h2>
          <p className="text-lg mb-8">
            Our support team is here to help you with any warranty-related
            questions or claims.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/faq"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Warranty;
