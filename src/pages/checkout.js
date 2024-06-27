import React from "react";
import { app } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navigation";
import SpinLoader from "../components/spinningLoader";
import Footer from "../components/footer";
import ShippingOptions from "../components/shipping";
import { removeCartItem } from "../firebase/firestoreUtils";
import { useShoppingCart } from "../context/cartContext";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import TransactionStatus from "./payment";

const Checkout = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [shippingData, setShippingData] = React.useState(null);
	const { cartState } = useShoppingCart();
	const { items: cart } = cartState;
	const isMounted = React.useRef(true);
	const { dispatch } = useShoppingCart();
	const { user } = useAuth();
	const [localCart, setLocalCart] = React.useState(cart);
	const [totalProductPrice, setTotalProductPrice] = React.useState(0);
	const [totalSum, setTotalSum] = React.useState(0);

	React.useEffect(() => {
		setLocalCart(cart);
	}, [cart]);

	React.useEffect(() => {
		isMounted.current = true;

		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}, 3000);

		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	const defaultShippingFee = 4500;

	React.useEffect(() => {
		const newTotalProductPrice = calculateTotalProductPrice(localCart);
		const newTotalSum = newTotalProductPrice + defaultShippingFee;
		setTotalProductPrice(newTotalProductPrice);
		setTotalSum(newTotalSum);
	}, [localCart]);

	const handleShipping = (data) => {
		setShippingData(data);
	};

	const calculateTotalProductPrice = (cart) => {
		let totalProductPrice = 0;

		cart.forEach((product) => {
			totalProductPrice += product.price * product.quantity;
		});

		return totalProductPrice;
	};

	const calculateTotalSum = () => {
		const totalProductPrice = calculateTotalProductPrice(cart);
		const totalSum = totalProductPrice + defaultShippingFee;
		return totalSum;
	};

	const orderData = {
		products: cart,
		totalProductPrice,
		totalSum,
		shippingData,
		user: {
			email: user.email,
		},
	};

	const handleSuccess = async (orderData) => {
		try {
			const orderRef = await app
				.firestore()
				.collection("Orders")
				.add(orderData);

			console.log("Order Data:", orderData);
			console.log("Order document ID:", orderRef.id);
		} catch (error) {
			console.error("Error processing order:", error.message);
		}
	};

	const handleRemoveFromCart = async (itemKey) => {
		try {
			const uid = user.uid;

			const updatedCartItems = await removeCartItem(uid, itemKey);

			setLocalCart(updatedCartItems);
			dispatch({ type: "UPDATE_CART", payload: updatedCartItems });
		} catch (error) {
			console.error("Error removing item from cart: ", error.message);
			return;
		}
	};

	const config = {
		public_key: process.env.REACT_APP_FLW,
		tx_ref: Date.now(),
		amount: totalSum,
		currency: "NGN",
		payment_options: "card,mobilemoney,ussd",
		customer: {
			email: user.email,
			name: user.displayName,
		},
		customizations: {
			title: "Gazelle",
			description: "Payment for items",
			logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
		},
	};

	const fwConfig = {
		...config,
		text: "Pay now",
		callback: async (response) => {
			const isSuccessful = response.status === "successful";
			if (isSuccessful) {
				await handleSuccess(orderData);
				return (
					<TransactionStatus
						isSuccessful={true}
						orderData={orderData}
					/>
				);
			} else {
				console.log("Transaction failed");
				return (
					<TransactionStatus
						isSuccessful={false}
						orderData={orderData}
					/>
				);
			}
		},
		onClose: () => {},
	};

	return (
		<div className="checkoutPage">
			{isLoading ? (
				<SpinLoader />
			) : (
				<>
					<Navbar />

					<div className="checkoutHeader">
						<Link to="/shop" className="backLink">
							<FontAwesomeIcon icon={faArrowLeft} />
							&nbsp;Back to Shop
						</Link>
					</div>

					<div className="checkoutContainer">
						{!localCart || localCart.length === 0 ? (
							<div className="alternate">
								Your cart is empty. Add some products from the
								shop.
							</div>
						) : (
							<>
								<div className="cartContainer">
									<span className="order">Order Summary</span>
									{localCart.map((product) => (
										<div
											key={product.id}
											className="cartItem">
											<div className="productImg">
												<img
													src={product.image}
													alt={product.brandName}
												/>
											</div>
											<div className="content">
												<span className="header">
													<p className="name">
														{product.name}
													</p>
													<p className="price">
														₦{product.price}
													</p>
												</span>
												<span className="qty">
													Quantity:
													<p>{product.quantity}</p>
												</span>
												<span className="size">
													Size:<p>{product.size}</p>
												</span>
												<FontAwesomeIcon
													icon={faTrash}
													className="removeFromCartBtn"
													title="Remove from cart"
													onClick={() =>
														handleRemoveFromCart(
															product.key
														)
													}
												/>
											</div>
										</div>
									))}
								</div>

								<ShippingOptions />

								<div className="checkoutFooter">
									<div className="totalSummary">
										<span className="summaryHead">
											Total Summary
										</span>

										<div className="content">
											<div className="totalPrice">
												<span>
													Total Product Price:
												</span>
												<span>
													₦{totalProductPrice}
												</span>
											</div>
											<div className="totalshipFee">
												<span>Shipping Fees:</span>
												<span>
													₦{defaultShippingFee}
												</span>
											</div>
											<div className="totalSum">
												<span>Total:</span>
												<span className="value">
													₦{totalSum}
												</span>
											</div>
										</div>
									</div>

									<FlutterWaveButton
										className="payBtn"
										{...fwConfig}
									/>
								</div>
							</>
						)}
					</div>
					<Footer />
				</>
			)}
		</div>
	);
};

export default Checkout;
