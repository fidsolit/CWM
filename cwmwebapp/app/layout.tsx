import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
// import { Providers } from "./Globalredux/provider"; //old provider by fede

import { Providers } from "@/Store/Provider";

import Footer from "./components/footer";

import { SessionProvider } from "next-auth/react";
import Toastcomponent from "./components/toastcomponent";
import TopCategories from "./components/TopCategories";
import FeaturedProduct from "./components/FeaturedProduct";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FCODES",
  description: "FCODES COMPUTER SUPPLY AND SERVICES",
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
          <FeaturedProduct />
          <TopCategories />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
