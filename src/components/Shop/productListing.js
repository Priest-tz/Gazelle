import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductListing = () => {
	const { products, status, error } = useSelector((state) => ({
		products: state.products?.products || [],
		status: state.products?.status || "idle",
		error: state.products?.error || null,
	}));

	// Loading state
	if (status === "loading") {
		return (
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
					<p className="mt-2 text-lg text-gray-700">Loading...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (status === "failed") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-red-600 text-lg">
					{error || "Failed to load products"}
				</p>
			</div>
		);
	}

	// If no products are found
	if (!products || products.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-600 text-lg">No products available</p>
			</div>
		);
	}

	// Render products
	return (
		<div className="flex flex-wrap mx-2 p-2 select-none">
			{products.map((product) => (
				<div
					key={product._id}
					className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 px-2">
					<div className="relative overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
						<Link
							to={`/shop/${product._id}`}
							className="block h-full">
							<div className="relative w-full md:h-[350px] h-[200px]">
								<img
									src={product.images[0].url}
									alt={product.name}
									className="w-full h-full object-cover rounded-md"
								/>
							</div>
							<div className="flex md:flex-row flex-col justify-between md:p-4 p-2">
								<h3 className="text-lg font-semibold mb-2 truncate">
									{product.name}
								</h3>
								<p className="text-gray-600 text-base font-medium">
									&#8358;{product.price}
								</p>
							</div>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductListing;
