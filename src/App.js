import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAllProducts } from "./Redux/Shop/ProductActions";

import UserLayout from "./Components/layout/UserLayout";
import AdminLayout from "./Components/layout/AdminLayout";
import PrivateRoute from "./Components/common/PrivateRoute";

import Home from "./Pages/Home/Index";
import Shop from "./Pages/Shop/Index";
import Admin from "./Pages/Admin/Index";
import ProductDetail from "./Components/shop/ProductDetail";
import Cart from "./Components/shop/Cart";
import Checkout from "./Components/shop/Checkout";
import AddProduct from "./Components/admin/AddProducts";
import LiveOrders from "./Components/admin/OrderList";
import ProductManager from "./Components/admin/Products";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";

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
