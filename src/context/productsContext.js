import React, { createContext, useContext } from "react";

// Create a context object to hold the state and provide it to components
const ProductsContext = createContext();

// Custom hook to conveniently access the context value within components
export const useProducts = () => {
	// Retrieve the context value using the useContext hook
	const context = useContext(ProductsContext);

	// Throw an error if the hook is used outside of a ProductsProvider
	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}

	// Return the context value
	return context;
};

// Provider component to wrap the part of the component tree where the context is needed
export const ProductsProvider = ({ children, value }) => {
	// Render the context provider with the provided value and nested child components
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
