"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { setUserData } from "@/utils/UserDataSlice";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  // Initialize store based on cookies/localStorage before rendering
  const token = Cookies.get("token");

  if (token === undefined) {
    console.log("no cookies found, if no token found");
  } else {
    const userData = localStorage.getItem("user");
    const userDataString = typeof userData === "string" ? userData : "";
    // Dispatch directly to store instead of using useDispatch hook
    store.dispatch(setUserData(JSON.parse(userDataString)));
  }

  // Always wrap children with Provider
  return <Provider store={store}>{children}</Provider>;
}
