import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import LoadingSpinner from "../common/loadingSpinner";
import ErrorMessage from "../common/productFetchError";

const selectProductData = createSelector(
	(state) => state.products?.products,
	(state) => state.products?.status,
	(state) => state.products?.error,
	(products, status, error) => ({
		products: products || [],
		status: status || "idle",
		error: error || null,
	})
);

const ProductListing = () => {
	const { products, status, error } = useSelector(selectProductData);

	// Loading state
	if (status === "loading") {
		return <LoadingSpinner />;
	}

	// Error state
	if (status === "failed") {
		return <ErrorMessage message={error} />;
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
