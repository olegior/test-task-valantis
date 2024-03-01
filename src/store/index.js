import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./productsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})