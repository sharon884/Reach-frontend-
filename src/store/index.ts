import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import categoryConfigurationReducer from "../features/admin/catalog/category-configuration/store/categoryConfigurationSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    categoryConfiguration: categoryConfigurationReducer,
},

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;