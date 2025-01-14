import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
// import { Providers } from "./Globalredux/provider"; //old provider by fede

import { Providers } from "@/Store/Provider";

import Footer from "./components/footer";

import { SessionProvider } from "next-auth/react";
import Toastcomponent from "./components/toastcomponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CENTRAL WEST MARKETING",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}

          {/* <Footer /> */}
          <Toastcomponent
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
