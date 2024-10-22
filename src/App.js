import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAllProducts } from "./redux/shop/productActions";

import UserLayout from "./components/layout/userLayout";
import AdminLayout from "./components/layout/adminLayout";
import PrivateRoute from "./components/common/privateRoute";

import Home from "./pages/home/Index";
import Shop from "./pages/shop/index";
import Admin from "./pages/admin/Index";
import ProductDetail from "./components/shop/productdetail";
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
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* User routes */}
					<Route element={<UserLayout />}>
						<Route path="/shop" element={<Shop />} />
						<Route
							path="/shop/:productId"
							element={<ProductDetail />}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/pay" element={<Checkout />} />
					</Route>

					{/* Admin routes protected by PrivateRoute */}
					<Route element={<PrivateRoute isAdminRoute={true} />}>
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
			</Router>
		</div>
	);
}

export default App;
