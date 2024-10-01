import React from "react";
import bannerImg from "../../data/images/banner.jpg";

const Banner = () => {
	return (
		<div className="relative w-full h-[200px] md:h-[300px] my-4">
			<img
				src={bannerImg}
				alt="Banner"
				className="object-cover w-full h-full"
			/>

			<div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-end items-center text-center p-4">
				<span className="text-white text-base md:text-lg">
					Explore our new collection
					<a href="/shop" className="underline ml-1">
						here
					</a>
					.
				</span>
			</div>
		</div>
	);
};

export default Banner;
