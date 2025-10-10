import { configureStore } from "@reduxjs/toolkit";
import { dummyjsonApi } from "../api/api";
import { productsSlice } from "../slices/products/productsSlice";
import { toastSlice } from "../slices/toast/toastSlice";

export const store = configureStore({
    reducer: {
        [dummyjsonApi.reducerPath]: dummyjsonApi.reducer,
        [productsSlice.reducerPath]: productsSlice.reducer,
        [toastSlice.reducerPath]: toastSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyjsonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;