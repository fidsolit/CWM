"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { setUserData } from "@/utils/UserDataSlice";
import { RootState } from "@/Store/store";
import { get_all_products } from "../Services/Admin/product";
import useSWR from "swr";
import {
  setCatLoading,
  setCategoryData,
  setOrderData,
  setProdLoading,
  setProductData,
} from "@/utils/AdminSlice";

interface User {
  email: string;
  name: string;
  _id: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.User.userData
  ) as User | null;
  // console.log("this is the user data from navbar", user); // this is the user data from navbar {email: "fede@gmail", name: "fede", _id: "61f4

  const [scrolled, setScrolled] = useState(false);

  // Check if user is admin directly from the Redux state
  const isAdmin = user?.role === "admin";
  // const { data: productData, isLoading: productLoading } = useSWR(
  //   "/gettingAllProductsFOrAdmin",
  //   get_all_products
  // );
  // useEffect(() => {
  //   dispatch(setProductData(productData?.data));
  //   dispatch(setProdLoading(productLoading));
  // }, [productData, productLoading]);

  //this will removed 2/1/2025 commented
  // useEffect(() => {
  //   const userJson = localStorage.getItem("user");
  //   if (userJson) {
  //     const user = JSON.parse(userJson);
  //     dispatch(setUserData(user));
  //     if (user.role === "admin") {
  //       setIsAdmin(true);
  //     }
  //   }
  // }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!Cookies.get("token") || !user) {
      router.push("/");
    }
  }, [router, user]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    dispatch(setUserData(null));
    router.push("/");
  };
  return (
    <div
      className="navbar ease-in transition-all fixed top-0 left-0 w-full z-50 shadow-md"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)" // Background with higher opacity when scrolled
          : "rgba(255, 255, 255, 0.1)", // Background with lower opacity when not scrolled
      }}
    >
      {/* Start Section */}
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-active text-black btn-circle lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-gray-50 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Homepage</Link>
            </li>
            <li>
              <Link href={"/products"}>Products</Link>
            </li>
            <li>
              <Link href={"/order/view-orders"}>My Orders</Link>
            </li>
            {isAdmin && (
              <li>
                <Link href={"/Dashboard"}>Dashboard</Link>
              </li>
            )}
            <li>
              <Link href={"/About"}>About us</Link>
            </li>
            <li>
              <Link href={"/warranty"}>Warranty</Link>
            </li>
            <li>
              <Link href={"/TestingArea"}>BETA TEST</Link>
            </li>
          </ul>
        </div>
        <h1 className="text-black font-bold text-xl hidden lg:block">
          <Link href="/">
            <img src="/logonobg.png" alt="Logo CWM" className="w-20" />
          </Link>
        </h1>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex font-bold">
        <ul className="menu menu-horizontal px-1">
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/"}>Homepage</Link>
          </li>
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/products"}>Products</Link>
          </li>
          {user && (
            <li className="hover:bg-gray-100 rounded-lg">
              <Link href={"/order/view-orders"}>My Orders</Link>
            </li>
          )}
          {isAdmin && (
            <li className="hover:bg-gray-100 rounded-lg">
              <Link href={"/Dashboard"}>Dashboard</Link>
            </li>
          )}
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/About"}>About us</Link>
          </li>
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/warranty"}>Warranty</Link>
          </li>
           <li>
              <Link href={"/TestingArea"}>BETA TEST</Link>
            </li>
        </ul>
      </div>

      {/* End Section */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-2">
            <button onClick={handleLogout} className="btn text-black mx-2">
              Logout
            </button>
            <button
              onClick={() => router.push("/order/create-order")}
              className="btn btn-circle mx-2"
            >
              <FaCartArrowDown className="text-black text-xl" />
            </button>
            <button
              onClick={() => router.push("/bookmark")}
              className="btn btn-circle mx-2"
            >
              <MdFavorite className="text-black text-xl" />
            </button>
            <button
              onClick={() => router.push("/order/view-orders")}
              className="btn btn-circle mx-2"
            >
              <CiDeliveryTruck className="text-black text-xl" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="btn text-white mx-2"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
