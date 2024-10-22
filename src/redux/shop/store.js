import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./CartSlice";
import authReducer from "../auth/AuthSlice";
import productsReducer from "./ProductSlice";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token", "user", "isAuthenticated", "isAdmin"],
};

const productsPersistConfig = {
	key: "products",
	storage,
	whitelist: ["products"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProductsReducer = persistReducer(
	productsPersistConfig,
	productsReducer
);

const store = configureStore({
	reducer: {
		products: persistedProductsReducer,
		cart: cartReducer,
		auth: persistedAuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
