"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FaShieldAlt } from "react-icons/fa";

interface WarrantyClaim {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  product: {
    productName: string;
    productImage: string;
  };
  order: {
    orderNumber: string;
  };
  status: "pending" | "approved" | "rejected" | "completed";
  issue: string;
  description: string;
  images: string[];
  adminNotes: string;
  resolution: string;
  resolvedAt: string;
  createdAt: string;
}

export default function WarrantyClaimsDataTable() {
  const [claims, setClaims] = useState<WarrantyClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await fetch("/api/admin/warranty-claims");
      const data = await response.json();
      if (data.success) {
        setClaims(data.claims);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch warranty claims");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaShieldAlt className="mr-2 text-orange-500" />
          Warranty Claims
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim) => (
                <tr key={claim._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10">
                        <Image
                          src={claim.product.productImage}
                          alt={claim.product.productName}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {claim.product.productName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Order #{claim.order.orderNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {claim.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {claim.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{claim.issue}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {claim.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        claim.status
                      )}`}
                    >
                      {claim.status.charAt(0).toUpperCase() +
                        claim.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(claim.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/warranty-claims/${claim._id}`}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        aria-label="Notifications"
      />
    </div>
  );
}
