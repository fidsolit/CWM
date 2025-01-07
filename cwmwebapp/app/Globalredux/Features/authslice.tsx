"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: string; isAdmin: boolean }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
    },
  },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
