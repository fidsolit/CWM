import { createSlice } from "@reduxjs/toolkit";

interface UsersCountState {
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: UsersCountState = {
  count: 0,
  loading: false,
  error: null,
};

export const UsersCountSlice = createSlice({
  name: "UsersCount",
  initialState,
  reducers: {
    setUsersCount: (state, action) => {
      state.count = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUsersCount, setLoading, setError } = UsersCountSlice.actions;

export const UsersCountReducer = UsersCountSlice.reducer;
