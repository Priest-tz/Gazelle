import { createSlice } from "@reduxjs/toolkit";

const adminEmails = ["admin1@example.com", "admin2@example.com"];

const saveTokenToLocalStorage = (token) => {
	if (token) {
		localStorage.setItem("token", token);
	}
};

const removeTokenFromLocalStorage = () => {
	localStorage.removeItem("token");
};

const tokenFromLocalStorage = localStorage.getItem("token");

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: !!tokenFromLocalStorage,
		user: null,
		token: tokenFromLocalStorage,
		isAdmin: false,
		isLoading: false,
		error: null,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAdmin = adminEmails.includes(action.payload.user.email);
			state.isLoading = false;
			state.error = null;
			saveTokenToLocalStorage(action.payload.token);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.isAdmin = false;
			state.isLoading = false;
			state.error = null;
			removeTokenFromLocalStorage();
		},
		registrationStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		registrationSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAdmin = adminEmails.includes(action.payload.user.email);
			state.isLoading = false;
			state.error = null;
			saveTokenToLocalStorage(action.payload.token);
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
