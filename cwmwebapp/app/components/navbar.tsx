// import Link from "next/link";
// export default function Navbar() {
//   return (
//     <div>
//       {" "}
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto flex items-center justify-between px-6 py-4">
//           <div className="text-2xl font-bold text-teal-700">
//             <Link href="/products">
//               <img src="LOGO_TRANSPARENT.avif" />
//             </Link>
//           </div>
//           <nav className="hidden md:flex space-x-6">
//             <Link href="/" className="text-gray-600 hover:text-teal-600">
//               Home
//             </Link>
//             <Link
//               href="/products"
//               className="text-gray-600 hover:text-teal-600"
//             >
//               Products
//             </Link>
//             <Link
//               href="/services"
//               className="text-gray-600 hover:text-teal-600"
//             >
//               Services
//             </Link>
//             <Link href="/about" className="text-gray-600 hover:text-teal-600">
//               About Us
//             </Link>
//             <Link href="/contact" className="text-gray-600 hover:text-teal-600">
//               Contact
//             </Link>
//           </nav>
//           <a
//             href="#quote"
//             className="hidden md:inline-block px-6 py-2 text-white bg-teal-600 rounded hover:bg-teal-500"
//           >
//             Get a Quote
//           </a>
//           <button className="block md:hidden text-teal-600">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
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
//       </header>
//     </div>
//   );
// }

// <nav className="bg-slate-200  shadow-md w-full  z-50">
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Globalredux/Features/authslice";
import { RootState } from "../Globalredux/store";
import { useRouter } from "next/navigation";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDropdownToggle = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-white-500 to-indigo-600 text-black shadow-lg flex flex-wrap w-full z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="LOGO_TRANSPARENT.avif"
            width={150}
            height={50}
            alt="Logo"
            className="bg-white p-1 rounded-sm "
          />
          {/* <span className="text-2xl hidden md:block font-bold">CWM</span> */}
        </Link>

        {/* Main Menu - Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {authState.isAdmin && (
            <Link
              href="/admindashboard"
              className="hover:text-yellow-300 transition duration-300 font-semibold"
            >
              ADMIN DASHBOARD
            </Link>
          )}

          <Link
            href="/products"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            PRODUCTS
          </Link>
          <Link
            href="/services"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            SERVICES
          </Link>
          <Link
            href="/pages/About"
            className="hover:text-yellow-300 transition duration-300 font-semibold"
          >
            ABOUT
          </Link>

          {authState.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="hover:text-yellow-300 transition duration-300 font-semibold"
              >
                {authState.user || "User"}
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50 opacity-0 transition-opacity duration-300 ease-in-out transform scale-95"
                  style={{
                    opacity: isDropdownOpen ? 1 : 0,
                    transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
                  }}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    PROFILE
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hover:text-yellow-300 transition duration-300 font-semibold"
            >
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={handleMenuToggle}
            className="p-2 hover:text-yellow-300 transition duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 transition-all w-full duration-500 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center rounded-sm shadow-md space-y-6 py-4">
          <Link
            href="/admindashboard"
            data-aos="fade-right"
            data-aos-duration="3000"
            onClick={handleMenuToggle}
            className="text-white hover:text-blue-300 hover:bg-sky-50 transition duration-500 ease-in-out font-semibold"
          >
            ADMIN DASHBOARD
          </Link>
          <Link
            href="/store"
            onClick={handleMenuToggle}
            className="text-white hover:bg-sky-50 transition duration-300 font-semibold"
          >
            STORE
          </Link>
          <Link
            href="/pages/About"
            onClick={handleMenuToggle}
            className="text-white hover:bg-sky-50 transition duration-300 font-semibold"
          >
            ABOUT
          </Link>
          {authState.isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                handleMenuToggle();
              }}
              className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              href="/login"
              onClick={handleMenuToggle}
              className="text-white hover:text-yellow-300 transition duration-300 font-semibold"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
