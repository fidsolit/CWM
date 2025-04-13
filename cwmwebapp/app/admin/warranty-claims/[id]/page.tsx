"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

interface User {
  role?: string;
  [key: string]: any;
}

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

export default function WarrantyClaimDetail({
  params,
}: {
  params: { id: string };
}) {
  const [claim, setClaim] = useState<WarrantyClaim | null>(null);

  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [resolution, setResolution] = useState("");
  const router = useRouter();
  const user = useSelector((state: RootState) => state.User.userData) as User;

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
      return;
    }
    fetchClaim();
  }, [user, router, params.id]);

  const fetchClaim = async () => {
    try {
      const response = await fetch(`/api/admin/warranty-claims/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setClaim(data.claim);
        setAdminNotes(data.claim.adminNotes || "");
        setResolution(data.claim.resolution || "");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch warranty claim");
    } finally {
      setLoading(false);
    }
  };

  const updateClaim = async (status: string) => {
    try {
      const response = await fetch(`/api/admin/warranty-claims/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          adminNotes,
          resolution: status === "completed" ? resolution : undefined,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Claim updated successfully");
        fetchClaim();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update claim");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Claim not found</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <Link
          href="/admin/warranty-claims"
          className="inline-flex items-center text-orange-600 hover:text-orange-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Claims
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FaShieldAlt className="mr-2 text-orange-500" />
            Warranty Claim Details
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              claim.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : claim.status === "approved"
                ? "bg-green-100 text-green-800"
                : claim.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>
            <div className="flex items-center space-x-4">
              <div className="relative h-20 w-20">
                <Image
                  src={claim.product.productImage}
                  alt={claim.product.productName}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{claim.product.productName}</p>
                <p className="text-sm text-gray-600">
                  Order #{claim.order.orderNumber}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <p className="font-medium">{claim.user.name}</p>
            <p className="text-sm text-gray-600">{claim.user.email}</p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Issue Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">{claim.issue}</p>
              <p className="text-gray-600">{claim.description}</p>
            </div>
          </div>

          {claim.images && claim.images.length > 0 && (
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Supporting Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {claim.images.map((image, index) => (
                  <div key={index} className="relative h-32">
                    <Image
                      src={image}
                      alt={`Supporting image ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Admin Notes</h2>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
              placeholder="Add notes about the claim..."
            />
          </div>

          {claim.status === "approved" && (
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Resolution Details</h2>
              <textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
                placeholder="Enter resolution details..."
              />
            </div>
          )}

          <div className="md:col-span-2 flex justify-end space-x-4">
            {claim.status === "pending" && (
              <>
                <button
                  onClick={() => updateClaim("approved")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve Claim
                </button>
                <button
                  onClick={() => updateClaim("rejected")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject Claim
                </button>
              </>
            )}
            {claim.status === "approved" && (
              <button
                onClick={() => updateClaim("completed")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mark as Completed
              </button>
            )}
          </div>
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
