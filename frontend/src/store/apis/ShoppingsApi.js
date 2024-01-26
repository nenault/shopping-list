import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingsApi = createApi({
  reducerPath: "shoppings",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints(builder) {
    return {
      addShopping: builder.mutation({
        invalidatesTags: ["Shopping"],
        query: (shopping) => {
          return {
            url: "/api/shops",
            method: "POST",
            body: {
              text: shopping,
            },
          };
        },
      }),
      deleteShopping: builder.mutation({
        invalidatesTags: ["Shopping"],
        query: (shopping) => {
          return {
            url: `/api/shops/${shopping._id}`,
            method: "PATCH",
            body: {
              isDeleted: !shopping.isDeleted,
            },
          };
        },
      }),
      fetchShoppings: builder.query({
        providesTags: ["Shopping"],
        query: () => {
          return {
            url: "/api",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchShoppingsQuery,
  useAddShoppingMutation,
  useDeleteShoppingMutation,
} = shoppingsApi;
export { shoppingsApi };
