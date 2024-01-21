import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import StartUploader from "./components/startUpLoader";
import ShopPage from "./pages/shop";
import ProductPage from "./pages/singleProduct";
import Checkout from "./pages/checkout";
import { ProductsProvider } from "./context/productsContext";
import { generateProducts } from "./utils/productsData";
import { ShoppingCartProvider } from "./context/cartContext";

function App() {
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 10000);
		return () => clearTimeout(timer);
	}, []);

	const products = generateProducts();

	return (
		<BrowserRouter>
			{loading ? (
				<StartUploader />
			) : (
				<ShoppingCartProvider>
					<ProductsProvider value={products}>
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
