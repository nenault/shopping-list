import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shoppingsApi  } from "./apis/ShoppingsApi";


const store = configureStore({
  reducer: {
    [shoppingsApi.reducerPath]: shoppingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
        .concat(shoppingsApi.middleware)
  }
});

setupListeners(store.dispatch)

export { store };
export { useFetchShoppingsQuery, useAddShoppingMutation, useDeleteShoppingMutation } from './apis/ShoppingsApi';
