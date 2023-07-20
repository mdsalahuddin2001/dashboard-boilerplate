import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get users
    getUsers: builder.query({
      query: () => "/users",
    }),

    // delete users
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.data.users = draft.data.users.filter((user) => {
                return user._id !== arg;
              });
            })
          );
        } catch (err) {
          //
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
