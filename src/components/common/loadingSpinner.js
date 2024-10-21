import React from "react";

const LoadingSpinner = () => {
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
};

export default LoadingSpinner;
