import { apiSlice } from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		users: builder.query({
			query: () => '/users',
		}),
	}),
});

export const { useUsersQuery } = userApi;
