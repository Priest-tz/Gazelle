import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/shop/productActions";

const LiveOrders = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const {
		products: orders,
		loading,
		error,
	} = useSelector((state) => state.product);

	useEffect(() => {
		if (token) {
			dispatch(getAdminProducts(token));
		}

		const interval = setInterval(() => {
			if (token) {
				dispatch(getAdminProducts(token));
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [dispatch, token]);

	return (
		<div className="flex flex-col items-center p-4">
			<h2 className="text-2xl font-semibold mb-4">
				Live Customer Orders
			</h2>
			<div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
				{loading ? (
					<p>Loading orders...</p>
				) : error ? (
					<p className="text-red-600">Error: {error.message}</p>
				) : orders.length === 0 ? (
					<p className="p-4 text-gray-600">
						No live orders at the moment.
					</p>
				) : (
					<ul className="divide-y divide-gray-200">
						{orders.map((order) => (
							<li
								key={order.id}
								className="p-4 hover:bg-gray-100">
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-medium text-gray-800">
											{order.customerName}
										</h3>
										<p className="text-gray-600">
											Order ID: {order.id}
										</p>
										<p className="text-gray-600">
											Total: ${order.total}
										</p>
									</div>
									<span className="text-sm text-gray-500">
										{new Date(
											order.timestamp
										).toLocaleString()}
									</span>
								</div>

								<div className="mt-2">
									<h4 className="font-medium">Items:</h4>
									<ul className="list-disc list-inside ml-4">
										{order.items.map((item) => (
											<li
												key={item.productId}
												className="text-gray-600">
												{item.productName} (x
												{item.quantity})
											</li>
										))}
									</ul>
								</div>

								<div className="mt-4">
									<h4 className="font-medium">
										Shipping Details:
									</h4>
									<p className="text-gray-600">
										Address: {order.shippingAddress}
									</p>
									<p className="text-gray-600">
										Contact Number: {order.contactNumber}
									</p>
									<p className="text-gray-600">
										Shipping Method: {order.shippingMethod}
									</p>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default LiveOrders;
