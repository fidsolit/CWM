"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Contact Support
          </h1>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            Need help with your warranty claim or have questions about our
            products? Our support team is here to assist you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">
                    123 Tech Street, Digital City, 12345
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">support@fcodes.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="product">Product Support</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                How do I check my warranty status?
              </h3>
              <p className="text-gray-600">
                You can check your warranty status by logging into your account
                and viewing your order history. Each product will show its
                warranty period and remaining time.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                What documents do I need for a warranty claim?
              </h3>
              <p className="text-gray-600">
                You'll need your original purchase receipt, product serial
                number, and a description of the issue. For extended warranty
                claims, you'll also need your warranty certificate.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                How long does warranty repair take?
              </h3>
              <p className="text-gray-600">
                Standard warranty repairs typically take 5-7 business days.
                Extended warranty repairs may take longer depending on the
                complexity of the issue and parts availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
