import React from "react";
import shirtFront from "../../data/images/shirtFront.png";
import cargo1 from "../../data/images/products/cargo1.jpg";
import jacket from "../../data/images/products/jacket.jpg";
import tee from "../../data/images/products/tee.jpeg";

const Trending = () => {
	const trendingProducts = [
		{
			id: 1,
			name: "Classic T-Shirt",
			price: "$25.00",
			image: shirtFront,
		},
		{
			id: 2,
			name: "Urban Bomber Jacket",
			price: "$85.00",
			image: jacket,
		},
		{
			id: 3,
			name: "Graphic Tee",
			price: "$25.00",
			image: tee,
		},
		{
			id: 4,
			name: "Cargo Pants",
			price: "$60.00",
			image: cargo1,
		},
	];

	// const handleProductClick = (id) => {
	// 	navigate(`/shop/${id}`);
	// };

	return (
		<div className="px-4 py-6 md:px-6 md:py-8 mx-auto">
			<span className="text-base md:text-lg font-light text-gray-800 ">
				You might also be interested in this
			</span>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-8">
				{trendingProducts.map((product) => (
					<div key={product.id} className="w-full border rounded-md">
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-64  md:h-[350px] object-cover"
						/>
						<div className="flex justify-between items-center p-2 sm:p-4">
							<h3 className="text-sm sm:text-md font-semibold">
								{product.name}
							</h3>
							<p className="font-bold text-xs sm:text-sm">
								{product.price}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Trending;
