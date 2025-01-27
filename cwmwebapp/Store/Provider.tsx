"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import Cookies from "js-cookie";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  console.log("ito ang cookies from paul 1 28 2025", Cookies.get("token"));
  return <Provider store={store}>{children}</Provider>;
}
