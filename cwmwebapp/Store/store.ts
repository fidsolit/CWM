"use client";

import { AdminNavReducer } from "@/utils/AdminNavSlice";
import { AdminReducer } from "@/utils/AdminSlice";
import { UserReducer } from "@/utils/UserDataSlice";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/utils/CartSlice";
import { bookmarkReducer } from "@/utils/Bookmark";
import { OrderReducer } from "@/utils/OrderSlice";
import { UsersCountReducer } from "@/utils/UserCount";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    AdminNav: AdminNavReducer,
    Admin: AdminReducer,
    Cart: cartReducer,
    Bookmark: bookmarkReducer,
    Order: OrderReducer,
    UsersCount: UsersCountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
