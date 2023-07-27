import { apiSlice } from "../api/apiSlice";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      query: () => "/categories",
    }),

    // delete users
    deleteUser: builder.mutation({
      query: (id) => {
        console.log("id", id);
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },

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

export const { useGetCategoriesQuery } = categoriesApi;
