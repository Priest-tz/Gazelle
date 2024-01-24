import React, { createContext, useContext, useReducer } from "react";

// Creating a context for the shopping cart to share state
const ShoppingCartContext = createContext();

// Defining action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Defining a reducer function to manage state changes for the shopping cart
const cartReducer = (state, action) => {
	// Switching based on the action type
	switch (action.type) {
		// If the action type is "ADD_TO_CART"
		case ADD_TO_CART:
			// Returning a new state with the added item to the cart
			return {
				...state,
				items: [...state.items, action.payload],
			};

		// If the action type is "REMOVE_FROM_CART"
		case REMOVE_FROM_CART:
			// Returning a new state with the entry removed from the cart
			return {
				...state,
				items: state.items.filter((item) => item !== action.payload),
			};

		// If the action type doesn't match any case, return the current state
		default:
			return state;
	}
};

// Creating a custom hook to easily access the shopping cart context
export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

// Creating a provider component to wrap the application and provide shopping cart state
export const ShoppingCartProvider = ({ children }) => {
	// Using the useReducer hook to manage state with the defined reducer function
	const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

	// Providing the shopping cart state and dispatch function through context
	return (
		<ShoppingCartContext.Provider value={{ cartState, dispatch }}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
