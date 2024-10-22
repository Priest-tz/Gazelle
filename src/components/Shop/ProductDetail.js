import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/shop/CartSlice";
import { FaArrowLeft } from "react-icons/fa";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import notFoundImage from "../../data/images/Productnotfound.jpg";
import sizeguide from "../../data/images/size_guide.jpg";
import Trending from "./Trending";

const ProductDetail = () => {
	const { productId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const products = useSelector((state) => state.products?.products || []);
	const product = products.find((p) => p._id === productId);

	const [selectedSize, setSelectedSize] = useState("");
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedShipping, setSelectedShipping] = useState("");
	const [showSizeGuide, setShowSizeGuide] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [errors, setErrors] = useState({});
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	if (!product) {
		return (
			<div className="flex flex-col items-center p-10">
				<img
					src={notFoundImage}
					alt="Product not found"
					className="w-full h-64 object-cover mb-4"
				/>
				<h2 className="text-2xl font-bold mb-4">Product not found</h2>
				<p className="text-gray-500 mb-4">
					The product you're looking for is not available.
				</p>
				<button
					className="bg-primaryGreen text-white py-2 px-4 rounded-lg mt-4"
					onClick={() => navigate(-1)}>
					Go Back
				</button>
			</div>
		);
	}

	const handleAddToCart = () => {
		const newErrors = {};
		if (!selectedSize) newErrors.size = "Please select a size.";
		if (!selectedColor) newErrors.color = "Please select a color.";
		if (!selectedShipping)
			newErrors.shipping = "Please select a shipping option.";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		} else {
			setErrors({});
		}

		dispatch(
			addToCart({
				id: product.id,
				name: product.name,
				price: parseFloat(product.price.replace("$", "")),
				quantity,
				size: selectedSize,
				color: selectedColor,
				shipping: selectedShipping,
			})
		);

		alert("Product added to cart!");
	};

	const handleProceedToCheckout = () => {
		navigate("/cart");
	};

	const handleIncreaseQuantity = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const handleDecreaseQuantity = () => {
		setQuantity((prevQuantity) =>
			prevQuantity > 1 ? prevQuantity - 1 : 1
		);
	};

	const handleBackToShop = () => {
		navigate("/shop");
	};

	const handleImageChange = (index) => {
		setCurrentImageIndex(index);
	};

	return (
		<div className="w-full">
			<div className="p-6 md:px-2 md:py-16 max-w-7xl mx-auto">
				{/* Back to Shop Button */}
				<div className="mb-6">
					<button
						onClick={handleBackToShop}
						className="flex items-center text-primaryGreen hover:underline">
						<FaArrowLeft className="mr-2" /> Back to Shop
					</button>
				</div>

				{/* Product Checkout Section */}
				<div className="flex flex-col lg:flex-row items-start">
					{/* Product Image */}
					<div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-6">
						<img
							src={product.images[currentImageIndex].url}
							alt={`${product.name} - ${
								selectedColor || "No color selected"
							}`}
							className="w-full h-auto object-cover"
						/>
						{/* Image Toggle */}
						<div className="flex justify-center space-x-4 mt-4">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => handleImageChange(index)}
									className={`w-14 h-14 border-2 ${
										currentImageIndex === index
											? "border-black"
											: "border-transparent"
									}`}>
									<img
										src={product.images[0].url}
										alt={`Thumbnail ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="w-full lg:w-1/2 lg:pl-6 flex flex-col gap-2">
						<h3 className="text-2xl font-semibold mb-2">
							{product.name}
						</h3>
						<p className="text-xl font-bold mb-4">
							{" "}
							&#x20A6; {product.price}
						</p>
						<p className="text-gray-600 mb-6">
							{product.description}
						</p>

						{/* Size Selection */}
						<div className="mb-4">
							<label className="block mb-2 text-gray-700 font-semibold">
								Select Size
							</label>
							<div className="flex space-x-2">
								{product.sizes.map((size) => (
									<button
										key={size}
										className={`border px-4 py-2 rounded-md text-gray-700 font-semibold ${
											selectedSize === size
												? "border-black"
												: "border-gray-300"
										} hover:border-black transition duration-300`}
										onClick={() => setSelectedSize(size)}>
										{size}
									</button>
								))}
							</div>
							{errors.size && (
								<p className="text-red-600 text-sm mt-1">
									{errors.size}
								</p>
							)}
						</div>

						{/* Size Guide */}
						<div className="mb-4">
							<button
								className="flex items-center text-blue-600 hover:text-blue-800"
								onClick={() =>
									setShowSizeGuide(!showSizeGuide)
								}>
								Size Guide
								{showSizeGuide ? (
									<GoChevronUp className="h-5 w-5 ml-1" />
								) : (
									<GoChevronDown className="h-5 w-5 ml-1" />
								)}
							</button>
							{showSizeGuide && (
								<img
									src={sizeguide}
									alt="Size Guide"
									className="mt-2 w-full h-auto"
								/>
							)}
						</div>

						{/* Color Selection */}
						<div className="mb-4">
							<label className="block mb-2 text-gray-700 font-semibold">
								Select Color
							</label>
							<div className="flex space-x-2">
								{product.colors.map((color) => (
									<button
										key={color}
										className={`w-8 h-8 rounded-md border-2 ${
											selectedColor === color
												? "border-black"
												: "border-transparent"
										}`}
										style={{
											backgroundColor:
												color.toLowerCase(),
										}}
										onClick={() => setSelectedColor(color)}
									/>
								))}
							</div>
							{errors.color && (
								<p className="text-red-600 text-sm mt-1">
									{errors.color}
								</p>
							)}
						</div>

						{/* Quantity Selection */}
						<div className="mb-6">
							<label className="block mb-2 text-gray-700 font-semibold">
								Quantity
							</label>
							<div className="flex items-center space-x-4 rounded-lg p-2">
								<button
									onClick={handleDecreaseQuantity}
									className="bg-gray-300 text-black w-10 h-10 rounded-lg text-lg font-bold">
									-
								</button>
								<span className="w-16 h-10 text-center flex items-center justify-center border border-gray-300 rounded-lg bg-white">
									{quantity}
								</span>
								<button
									onClick={handleIncreaseQuantity}
									className="bg-gray-300 text-black w-10 h-10 rounded-lg text-lg font-bold">
									+
								</button>
							</div>
						</div>

						{/* Shipping Selection */}
						<div className="mb-4">
							<label className="block mb-2 text-gray-700 font-semibold">
								Select Shipping Method
							</label>
							<select
								className="border rounded-lg w-full p-2"
								value={selectedShipping}
								onChange={(e) =>
									setSelectedShipping(e.target.value)
								}>
								<option value="" disabled>
									Choose shipping method
								</option>
								<option value="standard">
									Standard Shipping
								</option>
								<option value="express">
									Express Shipping
								</option>
							</select>
							{errors.shipping && (
								<p className="text-red-600 text-sm mt-1">
									{errors.shipping}
								</p>
							)}
						</div>

						{/* Add to Cart Button */}
						<div className="mb-4 mt-10 flex space-x-3  ">
							<button
								className="bg-green-600 text-white py-4 px-6 rounded-lg"
								onClick={handleAddToCart}>
								Add to Cart
							</button>
							<button
								className="bg-gray-500 text-white py-4 px-6 rounded-lg"
								onClick={handleProceedToCheckout}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Trending Section */}
			<Trending />
		</div>
	);
};

export default ProductDetail;
