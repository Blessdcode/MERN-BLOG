import { apiSlice } from "./apiSlice";

const BASE_URL = "/api/user";

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
      }),
    }),
    getProfile: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/getProfile`,
        method: "GET",
        body: data,
      }),
    }),
    updatedUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/updatedUser`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/deleteUser`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileMutation,
  useUpdatedUserMutation,
  useDeleteUserMutation,
} = UserApiSlice;
