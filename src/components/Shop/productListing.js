import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductListing = () => {
	const products = useSelector((state) => state.products.products);

	return (
		<div className="flex flex-wrap mx-2 p-8 select-none">
			{products.map((product) => (
				<div
					key={product.id}
					className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 py-8 px-3">
					<div
						className={`relative bg-white rounded-sm shadow-md overflow-hidden h-full transform transition-all duration-300 ${
							product.available
								? "hover:shadow-xl hover:-translate-y-1"
								: "opacity-80"
						}`}>
						{product.available ? (
							<Link
								to={`/shop/${product.id}`}
								className="block h-full">
								<div className="relative w-full md:h-[350px] h-[200px]">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover rounded-md"
									/>
								</div>
								<div className=" flex md:flex-row flex-col justify-between flex-grow">
									<h3 className="text-lg font-semibold mb-2 truncate">
										{product.name}
									</h3>
									<p className="text-gray-600 font-medium">
										{product.price}
									</p>
								</div>
							</Link>
						) : (
							<>
								<div className="relative w-full md:h-[350px] h-[200px]">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover blur-sm round"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
										<span className="text-white text-lg font-semibold px-4 py-2">
											Coming Soon
										</span>
									</div>
								</div>
								<div className="p-2 flex md:flex-row flex-col justify-between flex-grow">
									<h3 className="text-lg font-semibold mb-2 truncate text-gray-400">
										{product.name}
									</h3>
									<p className="text-gray-400">
										{product.price}
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductListing;
