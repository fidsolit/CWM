import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Providers } from "./Globalredux/provider";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
import Footer from "./components/footer";

import { SessionProvider } from "next-auth/react";
import Toastcomponent from "./components/toastcomponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CENTRAL WEST MARKETINGnpm ",
  description: "FCODES IT SERVICES THAT YOU CAN TRUST",
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

          <Footer />
          <Toastcomponent />
        </Providers>
      </body>
    </html>
  );
}
