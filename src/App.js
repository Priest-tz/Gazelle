import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import SpinLoader from "./components/spinningLoader";
import ShopPage from "./pages/shop";
import ProductPage from "./pages/singleProduct";
import Checkout from "./pages/checkout";
import { ProductsProvider } from "./context/productsContext";
import { generateProducts } from "./utils/productsData";
import { ShoppingCartProvider } from "./context/cartContext";

function App() {
	// State to track the loading state
	const [loading, setLoading] = React.useState(true);

	// Ref to track if the component is mounted
	const isMounted = React.useRef(true);

	// useEffect to handle the loading state and cleanup
	React.useEffect(() => {
		// Component is mounted
		isMounted.current = true;

		// Set a timer to simulate a loading time of 2000 milliseconds
		const loadingTimer = setTimeout(() => {
			// Check if the component is still mounted before updating the state
			if (isMounted.current) {
				setLoading(false);
			}
		}, 2000);

		// Cleanup function when the component is unmounted or dependencies change
		return () => {
			isMounted.current = false; // Mark the component as unmounted
			clearTimeout(loadingTimer); // Clear the loading timer to prevent memory leaks
		};
	}, []); // Empty dependency array, runs only once after the initial render

	// Generate sample product data
	const products = generateProducts();

	return (
		<BrowserRouter>
			{/* Conditional rendering based on the loading state */}
			{loading ? (
				<SpinLoader /> // Display a loading spinner while data is being loaded
			) : (
				// Once loading is complete, render the main content
				<ShoppingCartProvider>
					<ProductsProvider value={products}>
						{/* Define routes using react-router-dom's Routes and Route components */}
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route path="/shop" element={<ShopPage />} />
							<Route path="/checkout" element={<Checkout />} />
							<Route
								path="/sproduct/:id"
								element={<ProductPage />}
							/>
						</Routes>
					</ProductsProvider>
				</ShoppingCartProvider>
			)}
		</BrowserRouter>
	);
}

export default App;
