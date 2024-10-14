import React, { useEffect, useState } from "react";

const LiveOrders = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch("/api/orders");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setOrders(data);
			} catch (err) {
				setError("");
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	return (
		<div className="flex flex-col items-center p-4">
			<h2 className="text-2xl font-semibold mb-4">
				Live Customer Orders
			</h2>
			<div className="w-full max-w-2xl bg-white rounded-lg shadow-md">
				{loading ? (
					<div className="flex items-center justify-center min-h-screen">
						<div className="flex flex-col items-center">
							<svg
								className="animate-spin h-10 w-10 text-green-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 108-8 8 8 0 00-8 8zm2-8a6 6 0 106 6A6 6 0 006 4z"
								/>
							</svg>
							<p className="mt-2 text-lg text-gray-700">
								Loading...
							</p>
						</div>
					</div>
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
