import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../../redux/shop/CartSlice";
import { FaArrowLeft } from "react-icons/fa";

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cart);

	const [shippingDetails, setShippingDetails] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		zip: "",
	});

	const totalPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setShippingDetails({
			...shippingDetails,
			[name]: value,
		});
	};

	const handleBackToShop = () => {
		navigate("/shop");
	};

	const handlePayNow = () => {
		alert("Payment processed!");
		dispatch(clearCart());
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Back to Shop Button at the top */}
			<button
				onClick={handleBackToShop}
				className="flex items-center text-primaryGreen mb-6 md:mb-10 hover:underline">
				<FaArrowLeft className="mr-2" /> Back to Shop
			</button>

			<div className="flex flex-col md:flex-row gap-6 md:gap-10">
				{/* Shipping Details */}
				<div className="w-full md:w-2/3 mb-6 md:mb-0">
					<h2 className="text-2xl font-semibold mb-4">
						Shipping Details
					</h2>
					<form>
						<div className="mb-4">
							<label className="block mb-1">Name</label>
							<input
								type="text"
								name="name"
								value={shippingDetails.name}
								onChange={handleInputChange}
								className="border rounded-md w-full p-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-1">Email</label>
							<input
								type="email"
								name="email"
								value={shippingDetails.email}
								onChange={handleInputChange}
								className="border rounded-md w-full p-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-1">Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={shippingDetails.phone}
								onChange={handleInputChange}
								className="border rounded-md w-full p-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-1">Address</label>
							<input
								type="text"
								name="address"
								value={shippingDetails.address}
								onChange={handleInputChange}
								className="border rounded-md w-full p-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-1">City</label>
							<input
								type="text"
								name="city"
								value={shippingDetails.city}
								onChange={handleInputChange}
								className="border rounded-md w-full p-2"
								required
							/>
						</div>
					</form>
				</div>

				{/* Order Summary */}
				<div className="w-full md:w-1/3">
					<h2 className="text-2xl font-semibold mb-4">
						Order Summary
					</h2>
					<div className="bg-white border rounded-lg p-4 shadow">
						<table className="w-full">
							<tbody>
								{cartItems.map((item) => (
									<tr
										key={item.id}
										className="flex justify-between items-center mb-4">
										<td className="flex items-center space-x-4">
											<img
												src={item.image}
												alt={item.name}
												className="w-16 h-16 object-cover rounded"
											/>
											<span>
												{item.name} x {item.quantity}
											</span>
										</td>
										<td>
											$
											{(
												item.price * item.quantity
											).toFixed(2)}
										</td>
									</tr>
								))}
								<tr className="flex justify-between font-bold">
									<td>Total:</td>
									<td>${totalPrice.toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
						<button
							className="bg-green-700 text-white py-3 px-4 rounded-lg mt-4 w-full"
							onClick={handlePayNow}>
							Pay Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
