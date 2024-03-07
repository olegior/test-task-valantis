import { configureStore } from "@reduxjs/toolkit";
import { goodsReducer } from "./goodsSlice";

export const store = configureStore({
    reducer: {
        goods: goodsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})