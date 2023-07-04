import { apiSlice } from '../api/apiSlice';

import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		logout: builder.mutation({
			query: () => ({
				url: '/api/auth/logout',
				method: 'POST',
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(userLoggedOut());
				} catch (err) {
					//
				}
			},
		}),
		login: builder.mutation({
			query: (data) => ({
				url: 'api/auth/login',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						userLoggedIn({
							accessToken: result.data.accessToken,
							user: result.data.user,
						})
					);
				} catch (err) {
					//
				}
			},
		}),
		register: builder.mutation({
			query: (data) => ({
				url: '/api/auth/register',
				method: 'POST',
				body: data,
			}),
		}),
		verifyEmail: builder.mutation({
			query: (data) => ({
				url: '/api/auth/verify',
				method: 'POST',
				body: data,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: `/api/auth/forgot-password`,
				method: 'POST',
				body: {
					email,
				},
			}),
		}),
		resetPassword: builder.mutation({
			query: (data) => ({
				url: `/api/auth/reset-password?resettoken=${data.token}`,
				method: 'POST',
				body: {
					password: data.password,
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useVerifyEmailMutation,
	useResetPasswordMutation,
	useForgotPasswordMutation,
} = authApi;
