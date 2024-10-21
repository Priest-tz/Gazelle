import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
	isAdmin: false,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAdmin = action.payload.isAdmin;
			state.isLoading = false;
			state.error = null;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.isAdmin = false;
			state.isLoading = false;
			state.error = null;
		},
		registrationStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		registrationSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAdmin = action.payload.isAdmin;
			state.isLoading = false;
			state.error = null;
		},
		registrationFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

// Export actions
export const {
	loginSuccess,
	logout,
	registrationStart,
	registrationSuccess,
	registrationFailure,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
