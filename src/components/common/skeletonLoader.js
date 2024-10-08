import React from "react";

const SkeletonLoader = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="animate-pulse space-y-6 w-full max-w-sm p-4">
				{/* Simulating a title */}
				<div className="h-6 bg-gray-300 rounded w-3/4"></div>

				{/* Simulating text */}
				<div className="h-4 bg-gray-300 rounded w-full"></div>
				<div className="h-4 bg-gray-300 rounded w-5/6"></div>

				{/* Simulating image */}
				<div className="h-48 bg-gray-300 rounded-lg"></div>

				{/* Simulating more text */}
				<div className="h-4 bg-gray-300 rounded w-full"></div>
				<div className="h-4 bg-gray-300 rounded w-2/3"></div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
