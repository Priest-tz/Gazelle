import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productslice";
import cartReducer from "./cartslice";
import authReducer from "../auth/authSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		auth: authReducer,
	},
});

export default store;
