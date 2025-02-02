// "use client";

// // import Navbar from '@/app/components/Navbar';
// import Navbar from "@/app/components/navbar";
// // import { forget_password } from "@app/Services/auth";
// import { forget_password } from "@/app/Services/auth";
// import { useRouter } from "next/navigation";
// import React, { useState, FormEvent } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { TailSpin } from 'react-loader-spinner';

// export default function ForgetPassword() {
//   const Router = useRouter();
//   const toreset, setToreset = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoding] = useState(false);

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoding(true);

//     if (!formData.email) {
//       setError({ ...error, email: "Email Field is Required" });
//       return;
//     }
//     if (!formData.password) {
//       setError({ ...error, password: "Password Field is required" });
//       return;
//     }
//     if (!formData.confirmPassword) {
//       setError({
//         ...error,
//         confirmPassword: "Confirm Password Field is required",
//       });
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Password and Confirm Password does not match");
//     }

//     const res = await forget_password(formData);
//     if (res.success) {
//       setLoding(false);
//       toast.success(res.message);
//       setTimeout(() => {
//         Router.push("/auth/login");
//       }, 1000);
//     } else {
//       setLoding(false);
//       toast.error(res.message);
//     }
//   };

//   return (
//     <>
//       {/* <Navbar /> */}
//       <section className="bg-gray-50  text-center">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//           <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md  sm:p-8">
//             <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
//               Change Password
//             </h2>
//             <form
//               onSubmit={handleSubmit}
//               className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
//             >
//               <div className="text-left">
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 "
//                 >
//                   Your email
//                 </label>
//                 <input
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 "
//                   placeholder="name@company.com"
//                 />
//                 {error.email && (
//                   <p className="text-sm text-red-500">{error.email}</p>
//                 )}
//               </div>
//               <div className="text-left">
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 "
//                 >
//                   New Password
//                 </label>
//                 <input
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 "
//                 />
//                 {error.password && (
//                   <p className="text-sm text-red-500">{error.password}</p>
//                 )}
//               </div>
//               <div className="text-left">
//                 <label
//                   htmlFor="confirm-password"
//                   className="block mb-2 text-sm font-medium text-gray-900 "
//                 >
//                   Confirm password
//                 </label>
//                 <input
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       confirmPassword: e.target.value,
//                     })
//                   }
//                   type="password"
//                   name="confirm-password"
//                   id="confirm-password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 "
//                 />
//                 {error.confirmPassword && (
//                   <p className="text-sm text-red-500">
//                     {error.confirmPassword}
//                   </p>
//                 )}
//               </div>
//               {loading ? (
//                 <button
//                   type="button"
//                   className="w-full flex items-center justify-center text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
//                 >
//                   {/* <TailSpin
//                     height="20"
//                     width="20"
//                     color="white"
//                     ariaLabel="tail-spin-loading"
//                     radius="1"
//                     wrapperStyle={{}}
//                     wrapperClass=""
//                     visible={true}
//                   /> */}
//                   <h6>Loading..</h6>
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="w-full text-white bg-orange-600    hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
//                 >
//                   Reset
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//         {/* <ToastContainer /> */}
//       </section>
//     </>
//   );
// }

"use client";

import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Verification
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRequestCode = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with your API call to send verification code
      const response = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Verification code sent to your email");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with your API call to verify code and reset password
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: verificationCode,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successfully");
        // Redirect to login page
        window.location.href = "/login";
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {step === 1 ? "Reset Password" : "Verify Code"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-orange-600 bg-transparent py-2 px-4 rounded-md hover:bg-orange-50 transition duration-200"
            >
              Back to Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
