import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/slideshow";
import Shop from "./pages/shop";
import ProductCheckout from "./components/Shop/productCheckout";
import Navbar from "./components/Shop/navbar";
import Cart from "./components/Shop/cart";
import Checkout from "./components/Shop/checkout";
import Footer from "./components/Shop/footer";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route
							path="/*"
							element={
								<>
									<Navbar />
									<div className="flex-grow">
										<Routes>
											<Route
												path="/shop"
												element={<Shop />}
											/>
											<Route
												path="/shop/:productId"
												element={<ProductCheckout />}
											/>
											<Route
												path="/cart"
												element={<Cart />}
											/>
											<Route
												path="/pay"
												element={<Checkout />}
											/>
										</Routes>
									</div>
									<Footer />
								</>
							}
						/>
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
