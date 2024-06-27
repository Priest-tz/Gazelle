import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionStatus = ({ isSuccessful, orderData }) => {
	const navigate = useNavigate();

	return (
		<div>
			{isSuccessful ? (
				<SuccessTransactionUI orderData={orderData} />
			) : (
				<FailedTransactionUI navigate={navigate} />
			)}
		</div>
	);
};

const SuccessTransactionUI = ({ orderData }) => (
	<div>
		<h2>Payment Successful!</h2>
		<p>Thank you for your order.</p>
		<button onClick={() => navigate(`/shop`)}>Go to Shop Page</button>
	</div>
);

const FailedTransactionUI = ({ navigate }) => (
	<div>
		<h2>Transaction Failed</h2>
		<p>We are sorry, your payment could not be processed.</p>
		<button onClick={() => navigate("/cart")}>Back to Checkout</button>
	</div>
);

export default TransactionStatus;
