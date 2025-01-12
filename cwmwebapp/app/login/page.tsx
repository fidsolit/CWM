"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Google icon for the button
import Link from "next/link";
import { login } from "../Globalredux/Features/authslice";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../Globalredux/store";
import { toast } from "react-toastify";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { BsShieldFillExclamation } from "react-icons/bs";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/app/firebase/config";

// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "@/app/firebase/config";

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();

    // Here you can implement your login logic
    console.log("Logging in with:", username, password);

    if (username === "admin" && password === "admin12344321") {
      dispatch(
        login({
          user: username,
          isAdmin: true,
        })
      );
      toast.success("Login Successful!", {
        icon: <IoShieldCheckmarkSharp className="w-6 h-6 text-green-500" />,
        position: "top-right",
        autoClose: 3000,
      });
      router.push("/admindashboard");
    }
    if (username === "user" && password === "user") {
      dispatch(
        login({
          user: username,
          isAdmin: false,
        })
      );
      toast.success("Login Successful!", {
        icon: <IoShieldCheckmarkSharp className="w-6 h-6 text-green-500" />,
        position: "top-right",
        autoClose: 3000,
      });

      router.push("/products");
    } else {
      toast.warning("Login failed", {
        icon: <BsShieldFillExclamation className="w-6 h-6 text-red-500" />,
        position: "top-right",
        autoClose: 3000,
      });
      setError("Invalid username or password");
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
    // For example, use OAuth or Firebase authentication
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm animate-pulse">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <span className="border-b border-gray-300 w-1/5"></span>
          <span className="mx-3 text-gray-500">or</span>
          <span className="border-b border-gray-300 w-1/5"></span>
        </div>
        <div className="mx-3 my-3">
          {" "}
          <Link href="/signup">
            {" "}
            <p className="mx-3 text-gray-500">
              {" "}
              dont have an account? click me
            </p>
          </Link>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FcGoogle className="mr-3 text-2xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
