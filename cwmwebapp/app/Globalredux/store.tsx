"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authslice"; // Import your auth slice

import counterReducer from "./Features/counterSlice";
// Import other reducers if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
    counter: counterReducer,
  },
});
export type RootState = ReturnToType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
