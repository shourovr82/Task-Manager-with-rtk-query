import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import filterSlice from "../features/filterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        filter: filterSlice,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
}) 