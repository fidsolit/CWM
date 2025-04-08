// Import required modules
"use client";

import Cookies from "js-cookie";
import GCashPaymentModal from "@/app/components/GCashPaymentModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import CartCard from "@/app/components/CartCard";
import { get_all_cart_Items } from "@/app/Services/common/cart";
import { setCart } from "@/utils/CartSlice";
import { setNavActive } from "@/utils/AdminNavSlice";
import { create_a_new_order } from "@/app/Services/common/order";
import axios from "axios";

// Form types
type Inputs = {
  fullName: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
};

// User data types
interface userData {
  email: string;
  role: string;
  _id: string;
  name: string;
}

type Data = {
  productID: {
    productName: string;
    productPrice: string;
    _id: string;
    productImage: string;
    productQuantity: number;
  };
  userID: {
    email: string;
    _id: string;
  };
  _id: string;
  quantity: number;
};

export default function Page() {
  const [isGCashModalOpen, setIsGCashModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.User.userData
  ) as userData | null;
  const cartData = useSelector((state: RootState) => state.Cart.cart) as
    | Data[]
    | null;

  useEffect(() => {
    if (!Cookies.get("token") || user === null) {
      Router.push("/");
    }
    dispatch(setNavActive("Base"));
  }, [dispatch, Router]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    if (!user?._id) return Router.push("/");
    const cartData = await get_all_cart_Items(user?._id);
    if (cartData?.success) {
      dispatch(setCart(cartData?.data));
      toast.success(cartData?.message);
    } else {
      toast.error(cartData?.message);
    }
    setLoading(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const handleGcashPayment = async (amount: number) => {
    try {
      setLoader(true);
      setIsGCashModalOpen(true); // Open the modal first
      const response = await axios.post(
        "https://api.gcash.com/v1/payments/pay",
        {
          amount,
          userID: user?._id,
        }
      );
      if (response.data.success) {
        toast.success("Payment successful via GCash!");
        setIsGCashModalOpen(false); // Close modal on success
      } else {
        toast.error("Payment failed: " + response.data.message);
      }
    } catch (error: any) {
      toast.error("Error processing payment: " + error.message);
    } finally {
      setLoader(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoader(true);

    const finalData = {
      user: user?._id,
      orderItems: cartData?.map((item) => {
        return {
          product: item?.productID?._id,
          qty: item?.quantity,
        };
      }),
      shippingAddress: {
        fullName: data?.fullName,
        address: data?.address,
        city: data?.city,
        postalCode: data?.postalCode,
        country: data?.country,
      },
      paymentMethod,
      itemsPrice: totalPrice,
      taxPrice: 100,
      shippingPrice: 500,
      totalPrice: totalPrice + 100 + 500,
      isPaid: paymentMethod === "GCash" ? true : false,
      paidAt: paymentMethod === "GCash" ? new Date() : undefined,
      isDelivered: false,
      deliveredAt: new Date(),
    };

    if (paymentMethod === "GCash") {
      await handleGcashPayment(finalData.totalPrice);
    } else {
      const res = await create_a_new_order(finalData);
      if (res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          Router.push("/");
        }, 1000);
      } else {
        toast.error(res?.message);
      }
    }

    setLoader(false);
  };

  function calculateTotalPrice(myCart: Data[]) {
    const totalPrice = myCart?.reduce((acc, item) => {
      return (
        acc + Number(item?.quantity) * Number(item?.productID?.productPrice)
      );
    }, 0);

    return totalPrice;
  }

  const totalPrice = calculateTotalPrice(cartData as Data[]);

  return (
    <div className="w-full bg-gray-50 h-screen px-2 md:mt-20 py-2">
      <div className="text-sm breadcrumbs  border-b-2 border-b-blue-600">
        <ul className="dark:text-black">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>Order</li>
        </ul>
      </div>
      <div className="w-full h-20 my-4 text-center">
        <h1 className="text-3xl font-bold dark:text-black">Your Order</h1>
      </div>

      {loading || loader ? (
        <div className="w-full flex-col h-96 flex items-center justify-center">
          <div className="loader" />
          <p className="text-sm mt-2 font-semibold text-orange-500">
            Loading... Hold Tight
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-2/3 w-full px-4">
            <div className="flex flex-col space-y-4 overflow-auto h-96">
              {cartData?.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center">
                  <p className="my-4 text-lg font-semibold">No Items in Cart</p>
                  <Link href={"/"} className="btn text-white">
                    Shop Now
                  </Link>
                </div>
              ) : (
                cartData?.map((item: Data) => (
                  <CartCard
                    key={item?._id}
                    productID={item?.productID}
                    userID={item?.userID}
                    _id={item?._id}
                    quantity={item?.quantity}
                  />
                ))
              )}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between border-b py-2">
                <span>Original Price:</span>
                <span className="font-bold">Php {totalPrice || 0}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Shipping Price:</span>
                <span className="font-bold">Php 500</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Tax Price:</span>
                <span className="font-bold">Php 100</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span>Total Order Price:</span>
                <span className="font-bold">Php {totalPrice + 600}</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/3 w-full max-w-lg px-4 space-y-4"
          >
            <div className="form-control">
              <label className="label">Full Name</label>
              <input
                {...register("fullName", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">Address</label>
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">City</label>
              <input
                {...register("city", { required: true })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.city && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">Postal Code</label>
              <input
                {...register("postalCode", { required: true })}
                type="number"
                className="input input-bordered w-full"
              />
              {errors.postalCode && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">Country</label>
              <input
                {...register("country", { required: true })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.country && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">Payment Method</label>
              <select
                className="select select-bordered w-full"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="PayPal">PayPal</option>
                <option value="GCash">GCash</option>
                <option value="COD">COD</option>
                <option value="cash">CASH</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loader}
            >
              {loader ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      )}
      <GCashPaymentModal
        isOpen={isGCashModalOpen}
        onClose={() => setIsGCashModalOpen(false)}
        amount={totalPrice + 600}
        onConfirm={() => handleGcashPayment(totalPrice + 600)}
        loading={loader}
      />

      <ToastContainer aria-label="Notifications" />
    </div>
  );
}
