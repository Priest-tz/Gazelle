import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productslice";
import cartReducer from "./cartslice";
import authReducer from "../auth/authSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["products"],
};

const persistedProductsReducer = persistReducer(persistConfig, productsReducer);

const store = configureStore({
	reducer: {
		products: persistedProductsReducer,
		cart: cartReducer,
		auth: authReducer,
	},	
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);
export default store;
