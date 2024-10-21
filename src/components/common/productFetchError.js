import React from "react";

const ErrorMessage = ({ message }) => {
	const displayMessage =
		typeof message === "string"
			? message
			: message?.message || "Failed to load products";

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p className="text-red-600 text-lg">{displayMessage}</p>
		</div>
	);
};

export default ErrorMessage;
