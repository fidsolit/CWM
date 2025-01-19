// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Globalredux/Features/authslice";
// import { RootState } from "../Globalredux/store";
// import { useRouter } from "next/navigation";

// export default function Navbar(): JSX.Element {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

//   const handleMenuToggle = (): void => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const handleDropdownToggle = (): void => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const authState = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();

//   const handleLogout = (): void => {
//     dispatch(logout());
//     router.push("/");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-white-500 to-indigo-600 text-black shadow-lg flex flex-wrap w-full z-50 transition-all duration-300 ease-in-out">
//       <div className="container mx-auto px-4 flex justify-between items-center py-3">
//         {/* Logo */}
//         <Link href="/" className="flex items-center space-x-2">
//           <img
//             src="LOGO_TRANSPARENT.avif"
//             width={150}
//             height={50}
//             alt="Logo"
//             className="bg-white p-1 rounded-sm "
//           />
//           {/* <span className="text-2xl hidden md:block font-bold">CWM</span> */}
//         </Link>

//         {/* Main Menu - Desktop */}
//         <div className="hidden md:flex space-x-6 items-center">
//           {authState.isAdmin && (
//             <Link
//               href="/admindashboard"
//               className="hover:text-yellow-300 transition duration-300 font-semibold"
//             >
//               ADMIN DASHBOARD
//             </Link>
//           )}

//           <Link
//             href="/products"
//             className="hover:text-yellow-300 transition duration-300 font-semibold"
//           >
//             PRODUCTS
//           </Link>
//           <Link
//             href="/services"
//             className="hover:text-yellow-300 transition duration-300 font-semibold"
//           >
//             SERVICES
//           </Link>
//           <Link
//             href="/About"
//             className="hover:text-yellow-300 transition duration-300 font-semibold"
//           >
//             ABOUT
//           </Link>

//           {authState.isAuthenticated ? (
//             <div className="relative">
//               <button
//                 onClick={handleDropdownToggle}
//                 className="hover:text-yellow-300 transition duration-300 font-semibold"
//               >
//                 {authState.user || "User"}
//               </button>
//               {isDropdownOpen && (
//                 <div
//                   className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50 opacity-0 transition-opacity duration-300 ease-in-out transform scale-95"
//                   style={{
//                     opacity: isDropdownOpen ? 1 : 0,
//                     transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
//                   }}
//                 >
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     PROFILE
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     LOGOUT
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="hover:text-yellow-300 transition duration-300 font-semibold"
//             >
//               LOGIN
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={handleMenuToggle}
//             className="p-2 hover:text-yellow-300 transition duration-300"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 transition-all w-full duration-500 ease-in-out ${
//           isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="flex flex-col items-center rounded-sm shadow-md space-y-6 py-4">
//           <Link
//             href="/admindashboard"
//             data-aos="fade-right"
//             data-aos-duration="3000"
//             onClick={handleMenuToggle}
//             className="text-white hover:text-blue-300 hover:bg-sky-50 transition duration-500 ease-in-out font-semibold"
//           >
//             ADMIN DASHBOARD
//           </Link>
//           <Link
//             href="/store"
//             onClick={handleMenuToggle}
//             className="text-white hover:bg-sky-50 transition duration-300 font-semibold"
//           >
//             STORE
//           </Link>
//           <Link
//             href="/pages/About"
//             onClick={handleMenuToggle}
//             className="text-white hover:bg-sky-50 transition duration-300 font-semibold"
//           >
//             ABOUT
//           </Link>
//           {authState.isAuthenticated ? (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 handleMenuToggle();
//               }}
//               className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
//             >
//               LOGOUT
//             </button>
//           ) : (
//             <Link
//               href="/login"
//               onClick={handleMenuToggle}
//               className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
//             >
//               LOGIN
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// new navbar

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import { useSelector } from "react-redux";
// // import { RootState } from "@/Store/store";
// import { RootState } from "@/Store/store";
// import { FaCartArrowDown } from "react-icons/fa";
// import { CiDeliveryTruck } from "react-icons/ci";
// import { MdFavorite } from "react-icons/md";

// export default function Navbar() {
//   const router = useRouter();
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const user = useSelector((state: RootState) => state.User.userData);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.pageYOffset > 30);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove("token");
//     localStorage.clear();
//     location.reload();
//   };

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
//   // useEffect(() => {
//   //   if (Cookies.get("token")) {
//   //     router.push("/");
//   //   }
//   // }, [router]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all   duration-300 ${
//         scrolled ? "bg-transparent" : "bg-white shadow-lg"
//       }`}
//     >
//       <div className="container mx-auto px-4 flex justify-between items-center py-3">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <img
//             src="/LOGO_TRANSPARENT.avif"
//             alt="Logo"
//             className="h-10 w-auto"
//           />
//         </Link>

//         {/* Main Menu - Desktop */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <Link href="/" className="hover:text-blue-500 transition">
//             Home
//           </Link>
//           <Link href="/products" className="hover:text-blue-500 transition">
//             Products
//           </Link>
//           <Link href="/Services" className="hover:text-blue-500 transition">
//             Services
//           </Link>
//           <Link href="/About" className="hover:text-blue-500 transition">
//             About
//           </Link>

//           {user ? (
//             <div className="relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="hover:text-blue-500 transition"
//               >
//                 {user.name || "User"}
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2">
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link href="/auth/login" className="hover:text-blue-500 transition">
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="p-2">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-white text-black transition-all duration-300 ${
//           isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="flex flex-col items-center py-4">
//           <Link href="/" onClick={toggleMenu} className="py-2">
//             Home
//           </Link>
//           <Link href="/products" onClick={toggleMenu} className="py-2">
//             Products
//           </Link>
//           <Link href="/services" onClick={toggleMenu} className="py-2">
//             Services
//           </Link>
//           <Link href="/about" onClick={toggleMenu} className="py-2">
//             About
//           </Link>
//           {user ? (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 toggleMenu();
//               }}
//               className="py-2"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link href="/auth/login" onClick={toggleMenu} className="py-2">
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RootState } from "@/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import { setUserData } from "@/utils/UserDataSlice";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { any } from "joi";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Scrolled, setScrolled] = useState(false);
  const user = useSelector((state: RootState) => state.User.userData);
  const [isAdmin, setisAdmin] = useState(false);

  type User = {
    email: string;
    name: string;
    _id: string;
    role: string;
  };

  useEffect(() => {
    const userJson: any = localStorage.getItem("user");
    if (userJson) {
      // Parse the JSON string
      const user: User = JSON.parse(userJson);
      const userData = localStorage.getItem("user");
      const userDataString = typeof userData === "string" ? userData : "";
      dispatch(setUserData(JSON.parse(userDataString)));
      if (user.role === "admin") {
        setisAdmin(true);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(window.pageYOffset < 30 ? false : true);
      return () => (window.onscroll = null);
    };
    console.log("this is the user data from useeffect2", user);
  }, [Scrolled]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.clear();
    location.reload();
  };

  useEffect(() => {
    if (!Cookies.get("token") || user === null) {
      router.push("/");
    }
  }, [dispatch, router]);

  return (
    <div
      className={`navbar ${
        Scrolled ? "bg-white/95 shadow-md" : "bg-white"
      } fixed top-0 left-0 w-full z-50`}
    >
      {/* Start Section */}
      <div className="navbar-start flex items-center">
        {/* Dropdown for Small Screens */}
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
              <Link href={"/"}>Shop</Link>
            </li>
            <li>
              <Link href={"/order/view-orders"}>My Orders</Link>
            </li>
            {isAdmin ? (
              <li>
                <Link href={"/Dashboard"}>Dashboard</Link>
              </li>
            ) : null}
          </ul>
        </div>
        {/* Logo Section */}
        <h1 className="text-black font-bold text-xl hidden lg:block">
          {/* Replace with your logo */}
          <Link href="/">
            <img
              src="/LOGO_TRANSPARENT.avif"
              alt="Logo CWM"
              className="h-10 w-auto"
            />
          </Link>
        </h1>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/"}>Homepage</Link>
          </li>
          <li className="hover:bg-gray-100 rounded-lg">
            <Link href={"/products"}>Shop</Link>
          </li>

          {user ? (
            <li className="hover:bg-gray-100 rounded-lg">
              <Link href={"/order/view-orders"}>My Orders</Link>
            </li>
          ) : null}
          {isAdmin ? (
            <li className="hover:bg-gray-100 rounded-lg">
              <Link href={"/Dashboard"}>Dashboard</Link>
            </li>
          ) : null}
        </ul>
      </div>

      {/* End Section */}
      <div className="navbar-end">
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center">
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
              className="btn text-black mx-2"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
