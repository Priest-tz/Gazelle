import React from "react";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/shop/CartSlice";
import Trending from "./Trending";

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart);

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const handleRemoveItem = (id, size, color) => {
		dispatch(removeFromCart({ id, size, color }));
	};

	const handleUpdateQuantity = (id, size, color, newQuantity) => {
		dispatch(updateQuantity({ id, size, color, quantity: newQuantity }));
	};

	const handleProceedToCheckout = () => {
		navigate("/pay");
	};

	const handleBackToShop = () => {
		navigate("/shop");
	};

	return (
		<div className="w-full">
			<div className="p-6 max-w-7xl mx-auto">
				<button
					onClick={handleBackToShop}
					className="flex items-center text-primaryGreen mb-6 hover:underline">
					<FaArrowLeft className="mr-2" /> Back to Shop
				</button>
				<div className="flex flex-col lg:flex-row">
					{/* Left Side - Cart Items */}
					<div className="w-full lg:w-2/3 mb-6 lg:mb-0 lg:pr-6">
						<h2 className="text-2xl font-semibold mb-4">
							Your Cart
						</h2>
						{cartItems.length === 0 ? (
							<p>Your cart is empty.</p>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full hidden lg:table">
									<thead>
										<tr className="border-b">
											<th className="text-left p-4">
												Product
											</th>
											<th className="text-left p-4">
												Size
											</th>
											<th className="text-left p-4">
												Quantity
											</th>
											<th className="text-right p-4">
												Price
											</th>
											<th className="text-right p-4">
												Subtotal
											</th>
											<th className="p-4"></th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item) => (
											<tr
												key={`${item.id}-${item.size}-${item.color}`}
												className="border-b">
												<td className="p-4">
													<div className="flex items-center">
														<img
															src={item.image}
															alt={item.name}
															className="w-12 h-12 object-cover rounded-md mr-2"
														/>
														<span>{item.name}</span>
													</div>
												</td>
												<td className="p-4">
													{item.size}
												</td>
												<td className="p-4">
													<input
														type="number"
														value={item.quantity}
														onChange={(e) =>
															handleUpdateQuantity(
																item.id,
																item.size,
																item.color,
																parseInt(
																	e.target
																		.value
																)
															)
														}
														min="1"
														className="w-16 border rounded p-1"
													/>
												</td>
												<td className="text-right p-4">
													${item.price}
												</td>
												<td className="text-right p-4">
													$
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</td>
												<td className="p-4">
													<button
														onClick={() =>
															handleRemoveItem(
																item.id,
																item.size,
																item.color
															)
														}
														className="text-red-500 flex items-center justify-center p-2 rounded-lg bg-red-100 hover:bg-red-200 transition duration-300">
														<CiTrash size={24} />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>

								{/* Mobile View - List Style */}
								<div className="lg:hidden">
									{cartItems.map((item) => (
										<div
											key={`${item.id}-${item.size}-${item.color}`}
											className="border-b p-4 flex flex-col mb-6">
											<div className="flex items-center mb-2">
												<img
													src={item.image}
													alt={item.name}
													className="w-16 h-16 object-cover rounded-md mr-2"
												/>
												<span className="font-semibold">
													{item.name}
												</span>
											</div>
											<div className="flex justify-between">
												<span>Size: {item.size}</span>
												<span>
													Price: ${item.price}
												</span>
											</div>
											<div className="flex justify-between items-center mt-2">
												<div className="flex items-center">
													<input
														type="number"
														value={item.quantity}
														onChange={(e) =>
															handleUpdateQuantity(
																item.id,
																item.size,
																item.color,
																parseInt(
																	e.target
																		.value
																)
															)
														}
														min="1"
														className="w-16 border rounded p-1 mr-2"
													/>
												</div>
												<span>
													Subtotal: $
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</span>
											</div>
											<div className="flex justify-center mt-4">
												<button
													onClick={() =>
														handleRemoveItem(
															item.id,
															item.size,
															item.color
														)
													}
													className="text-red-500 flex items-center justify-center p-2 rounded-lg bg-red-100 hover:bg-red-200 transition duration-300">
													<CiTrash size={24} />
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Right Side - Total Table */}
					<div className="w-full lg:w-1/3 lg:ml-6">
						<h2 className="text-2xl font-semibold mb-4">Total</h2>
						<div className="bg-white border rounded-lg p-8 shadow">
							<table className="w-full">
								<tbody>
									<tr className="flex justify-between">
										<td>Subtotal:</td>
										<td>${totalPrice.toFixed(2)}</td>
									</tr>
									<tr className="flex justify-between">
										<td>Shipping:</td>
										<td>$5.00</td>
									</tr>
									<tr className="flex justify-between font-bold text-xl border-t pt-4">
										<td>Total:</td>
										<td>${(totalPrice + 5).toFixed(2)}</td>
									</tr>
								</tbody>
							</table>
							<button
								className="bg-green-400 text-white py-3 px-6 rounded-md mt-6 w-full"
								onClick={handleProceedToCheckout}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
			<Trending />
		</div>
	);
};

export default Cart;
