import React from "react";

const QuantityPicker = ({ selectedQuantity, handleQuantityChange }) => {
	return (
		<div className="quantityPicker">
			<span>Quantity:</span>
			<div className="buttons">
				<button
					onClick={() => handleQuantityChange(selectedQuantity - 1)}
					disabled={selectedQuantity === 1}>
					-
				</button>
				<span>{selectedQuantity}</span>
				<button
					onClick={() => handleQuantityChange(selectedQuantity + 1)}>
					+
				</button>
			</div>
		</div>
	);
};

export default QuantityPicker;
