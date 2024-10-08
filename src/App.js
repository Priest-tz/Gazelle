import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/shop/store";
import UserLayout from "./components/layout/userLayout";
import AdminLayout from "./components/layout/adminLayout";
import PrivateRoute from "./components/common/privateRoute";

import Home from "./pages/home/Index";
import Shop from "./pages/shop";
import Admin from "./pages/admin/Index";
import ProductCheckout from "./components/shop/productCheckout";
import Cart from "./components/shop/cart";
import Checkout from "./components/shop/checkout";
import AddProduct from "./components/admin/addProducts";
import LiveOrders from "./components/admin/orderlist";
import ProductManager from "./components/admin/products";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Routes>
						<Route path="/" element={<Home />} />

						{/* Auth routes */}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						{/* User routes */}
						<Route element={<UserLayout />}>
							<Route path="/shop" element={<Shop />} />
							<Route
								path="/shop/:productId"
								element={<ProductCheckout />}
							/>
							<Route path="/cart" element={<Cart />} />
							<Route path="/pay" element={<Checkout />} />
						</Route>

						{/* Admin routes - Protected */}
						<Route element={<PrivateRoute />}>
							<Route element={<AdminLayout />}>
								<Route path="/admin" element={<Admin />} />
								<Route
									path="/admin/addproduct"
									element={<AddProduct />}
								/>
								<Route
									path="/admin/liveorders"
									element={<LiveOrders />}
								/>
								<Route
									path="/admin/products"
									element={<ProductManager />}
								/>
							</Route>
						</Route>
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
