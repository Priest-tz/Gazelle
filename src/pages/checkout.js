import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/cartContext";
import Navbar from "../components/navigation";
import SpinLoader from "../components/spinningLoader";
import Footer from "../components/footer";
import ShippingOptions from "../components/shipping";

const Checkout = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [isNavVisible, setIsNavVisible] = React.useState(false);
	const { cartState, dispatch } = useShoppingCart();
	const { items: cart } = cartState;
	const isMounted = React.useRef(true);

	// Effect to handle loading and cleanup
	React.useEffect(() => {
		isMounted.current = true;

		// Simulate a loading delay for 2 seconds
		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}, 2000);

		// Cleanup function to avoid memory leaks
		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	const handleRemoveFromCart = (product) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: product,
		});
	};

	// Toggle navigation visibility
	const toggleNavVisibility = () => {
		setIsNavVisible(!isNavVisible);
	};

	// Close navigation
	const closeNav = () => {
		setIsNavVisible(false);
	};

	// Function to calculate the total product price
	const calculateTotalProductPrice = () => {
		return cart.reduce(
			(total, product) => total + product.price * product.quantity,
			0
		);
	};

	const totalProductPrice = calculateTotalProductPrice();
	const { shippingFee } = calculateShippingFee();
	const totalAmount = totalProductPrice + shippingFee;

	return (
		<div className="checkoutPage">
			{isLoading ? (
				// Render a spinner while loading
				<SpinLoader />
			) : (
				<>
					{/* Navbar component */}
					<Navbar
						isNavVisible={isNavVisible}
						toggleNavVisibility={toggleNavVisibility}
						closeNav={closeNav}
					/>

					<div className="checkoutHeader">
						<Link to="/shop" className="backLink">
							<FontAwesomeIcon icon={faArrowLeft} />
							&nbsp;Back to Shop
						</Link>
					</div>

					<div className="checkoutContainer">
						{/* Checkout content */}
						{cart.length === 0 ? (
							<p>
								Your cart is empty. Add some products from the
								shop.
							</p>
						) : (
							<>
								{/* Products in the cart */}
								<div className="cartContainer">
									<span className="order">Order Summary</span>
									{cart.map((product) => (
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
														{product.price}
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
													onClick={() =>
														handleRemoveFromCart(
															product
														)
													}
													className="removeFromCartBtn"
													title="Remove from cart"
												/>
											</div>
										</div>
									))}
								</div>

								{/* Shipping options */}
								<ShippingOptions
									cart={cart}
									onContinue={handleContinue}
								/>

								{/* Total summary and Pay button */}
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
												Shipping Fees: ₦{shippingFee}
											</span>
											<span className="totalSum">
												Total: ₦{totalAmount}
											</span>
										</div>
									</div>
									<button className="checkoutBtn">
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
