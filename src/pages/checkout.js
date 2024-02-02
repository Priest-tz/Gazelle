import React from "react";
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

const Checkout = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [shippingData, setShippingData] = React.useState(null);
	const { cartState } = useShoppingCart();
	const { items: cart } = cartState;
	const isMounted = React.useRef(true);
	const { dispatch } = useShoppingCart();
	const { user } = useAuth();
	const [localCart, setLocalCart] = React.useState(cart);

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

	const handleContinue = (data) => {
		setShippingData(data);
	};

	const calculateTotalProductPrice = (cart) => {
		let totalProductPrice = 0;

		cart.forEach((product) => {
			totalProductPrice += product.price * product.quantity;
		});

		return totalProductPrice;
	};

	const totalProductPrice = calculateTotalProductPrice(cart);

	const calculateTotalSum = () => {
		const totalProductPrice = calculateTotalProductPrice(cart);
		const totalSum = totalProductPrice + defaultShippingFee;
		return totalSum;
	};

	const totalSum = calculateTotalSum();

	const handlePayNow = () => {
		const totalSum = calculateTotalSum();

		const orderData = {
			products: cart,
			totalProductPrice,
			totalSum,
			shippingData,
		};

		console.log("Order Data:", orderData);
	};

	const handleRemoveFromCart = async (itemKey) => {
		try {
			const uid = user.uid;

			const updatedCartItems = await removeCartItem(uid, itemKey);

			setLocalCart(updatedCartItems);
			dispatch({ type: "UPDATE_CART", payload: updatedCartItems });
		} catch (error) {
			console.error("Error removing item from cart: ", error.message);
		}
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
							<p>
								Your cart is empty. Add some products from the
								shop.
							</p>
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
											<span className="totalPrice">
												Total Product Price: ₦
												{totalProductPrice}
											</span>
											<span className="totalshipFee">
												Shipping Fees: ₦
												{defaultShippingFee}
											</span>
											<span className="totalSum">
												Total: ₦{totalSum}
											</span>
										</div>
									</div>
									<button
										className="checkoutBtn"
										onClick={handlePayNow}>
										Pay Now
									</button>
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
