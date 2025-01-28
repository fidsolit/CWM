"use client";

import React from "react";
import Image from "next/image";

interface GCashPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => void;
  loading: boolean;
}

const GCashPaymentModal: React.FC<GCashPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">GCash Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/images/gcash logo.png"
              alt="GCash Logo"
              className="h-16 object-contain"
              width={100}
              height={100}
            />
          </div>

          <div className="text-center">
            <p className="text-gray-600">Amount to Pay</p>
            <p className="text-2xl font-bold text-blue-600">
              ₱{amount.toFixed(2)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Instructions:</h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Open your GCash app</li>
              <li>Scan the QR code or enter the number below</li>
              <li>Enter the exact amount: ₱{amount.toFixed(2)}</li>
              <li>Complete the payment in your GCash app</li>
              <li>Click "Confirm Payment" below once done</li>
            </ol>
          </div>

          <div className="text-center bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">GCash Number</p>
            <p className="text-xl font-bold text-blue-600">0917-123-4567</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Confirm Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCashPaymentModal;
