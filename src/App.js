import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home";
import SpinLoader from "./components/spinningLoader";
import ShopPage from "./pages/shop";
import ProductPage from "./pages/singleProduct";
import Checkout from "./pages/checkout";
import AuthPage from "./pages/auth";
import { ProductsProvider } from "./context/productsContext";
import { ShoppingCartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";

function App() {
	const [loading, setLoading] = React.useState(true);
	const isMounted = React.useRef(true);

	React.useEffect(() => {
		isMounted.current = true;
		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setLoading(false);
			}
		}, 2000);

		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	return (
		<Router>
			<AuthProvider>
				<ShoppingCartProvider>
					<ProductsProvider>
						{loading ? (
							<SpinLoader />
						) : (
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="/shop" element={<ShopPage />} />
								<Route
									path="/checkout"
									element={<Checkout />}
								/>
								<Route
									path="/sproduct/:id"
									element={<ProductPage />}
								/>
								<Route path="/auth" element={<AuthPage />} />
							</Routes>
						)}
					</ProductsProvider>
				</ShoppingCartProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
