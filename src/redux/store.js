import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productslice";
import cartReducer from "./cartslice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
	},
});

export default store;
