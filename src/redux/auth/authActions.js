import axios from "axios";
import { loginSuccess, logout } from "./AuthSlice";
import {
	registrationStart,
	registrationSuccess,
	registrationFailure,
} from "./AuthSlice";

const BASE_URL = "https://gazelle.onrender.com";

// Login Action
export const login = (email, password) => async (dispatch, getState) => {
	try {
		const { data } = await axios.post(`${BASE_URL}/api/users/auth`, {
			email,
			password,
		});

		dispatch(
			loginSuccess({
				user: data,
				token: data.token,
				isAdmin: data.isAdmin,
			})
		);

		return { user: data };
	} catch (error) {
		console.error(
			"Login failed: ",
			error.response?.data?.message || error.message
		);
		throw new Error(error.response?.data?.message || "Login failed");
	}
};

// Logout Action
export const logoutAction = () => async (dispatch) => {
	try {
		await axios.post(`${BASE_URL}/api/users/logout`);
		dispatch(logout());
	} catch (error) {
		console.error("Logout failed: ", error.message);
	}
};

// Register Action (Handles both User and Admin Registration)
export const register =
	({ firstName, lastName, email, password, userState, isAdmin }) =>
	async (dispatch) => {
		try {
			dispatch(registrationStart());
			const endpoint = isAdmin
				? `${BASE_URL}/api/admin`
				: `${BASE_URL}/api/users`;

			const payload = {
				email,
				firstName,
				lastName,
				password,
				isAdmin,
				...(isAdmin ? { adminState: userState } : { userState }),
			};

			const { data } = await axios.post(endpoint, payload);

			dispatch(registrationSuccess({ user: data, token: data.token }));
		} catch (error) {
			dispatch(
				registrationFailure(
					error.response?.data?.message || "Registration failed"
				)
			);
			console.error(
				"Registration failed: ",
				error.response?.data?.message || error.message
			);
		}
	};
