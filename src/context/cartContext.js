import React, { createContext, useContext, useReducer } from "react";

const ShoppingCartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				items: [...state.items, action.payload],
			};

		default:
			return state;
	}
};

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
	const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

	return (
		<ShoppingCartContext.Provider value={{ cartState, dispatch }}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
