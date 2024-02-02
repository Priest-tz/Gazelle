import React, { createContext, useContext, useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase/firebase";
import Spinloader from "../components/spinningLoader";

const ProductsContext = createContext();

export const useProducts = () => {
	const context = useContext(ProductsContext);

	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}

	return context;
};

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsCollection = collection(db, "products");
				const productsSnapshot = await getDocs(productsCollection);
				const productsData = productsSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) {
		return <Spinloader />;
	}

	return (
		<ProductsContext.Provider value={products}>
			{children}
		</ProductsContext.Provider>
	);
};
