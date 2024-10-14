import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getAllProducts } from "./redux/shop/productActions";
import store, { persistor } from "./redux/shop/store";

import UserLayout from "./components/layout/userLayout";
import AdminLayout from "./components/layout/adminLayout";
import PrivateRoute from "./components/common/privateRoute";

import Home from "./pages/home/Index";
import Shop from "./pages/shop/index";
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
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className="min-h-screen flex flex-col">
			<Routes>
				<Route path="/" element={<Home />} />
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

				{/* Admin routes */}
				<Route path="/admin" element={<PrivateRoute />}>
					<Route element={<AdminLayout />}>
						<Route index element={<Admin />} />
						<Route path="addproduct" element={<AddProduct />} />
						<Route path="liveorders" element={<LiveOrders />} />
						<Route path="products" element={<ProductManager />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

const RootApp = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<App />
			</Router>
		</PersistGate>
	</Provider>
);

export default RootApp;
