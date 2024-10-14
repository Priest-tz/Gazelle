import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const isAdminFromStorage = localStorage.getItem("isAdmin") === "true";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: !!tokenFromStorage,
		user: JSON.parse(localStorage.getItem("user")) || null,
		token: tokenFromStorage,
		isAdmin: isAdminFromStorage,
		isLoading: false,
		error: null,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAdmin = action.payload.isAdmin;
			state.isLoading = false;
			state.error = null;

			// Persist user information in localStorage
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("isAdmin", action.payload.isAdmin);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.isAdmin = false;
			state.isLoading = false;
			state.error = null;
			localStorage.removeItem("token");
			localStorage.removeItem("isAdmin");
			localStorage.removeItem("user");
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

			// Persist user information in localStorage
			localStorage.setItem("token", action.payload.token);
			localStorage.setItem("isAdmin", action.payload.isAdmin);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		registrationFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	loginSuccess,
	logout,
	registrationStart,
	registrationSuccess,
	registrationFailure,
} = authSlice.actions;
export default authSlice.reducer;
