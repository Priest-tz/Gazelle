import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAllProducts } from "./redux/shop/ProductActions";

import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import PrivateRoute from "./components/common/PrivateRoute";

import Home from "./pages/home/Index";
import Shop from "./pages/shop/Index";
import Admin from "./pages/admin/Index";
import ProductDetail from "./components/shop/ProductDetail";
import Cart from "./components/shop/Cart";
import Checkout from "./components/shop/Checkout";
import AddProduct from "./components/admin/AddProducts";
import LiveOrders from "./components/admin/OrderList";
import ProductManager from "./components/admin/Products";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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
