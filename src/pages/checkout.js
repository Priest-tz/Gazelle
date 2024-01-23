import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/cartContext";
import Navbar from "../components/navigation";
import SpinLoader from "../components/spinningLoader";
import Footer from "../components/footer";
import ShippingOptions from "../components/shipping";

const Checkout = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentStep, setCurrentStep] = React.useState(1);
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

	const handleRemoveFromCart = (productId) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: { id: productId },
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

	const moveToNextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	return (
		<div className="checkoutPage">
			{/* Navbar component */}
			<Navbar
				isNavVisible={isNavVisible}
				toggleNavVisibility={toggleNavVisibility}
				closeNav={closeNav}
			/>

			<div className="checkoutHeader">
				{currentStep > 1 && (
					<Link
						to="/shop"
						className="backLink"
						onClick={() => setCurrentStep(1)}>
						<FontAwesomeIcon icon={faArrowLeft} />
						Back to Shop
					</Link>
				)}
				<h2>Checkout - Step {currentStep}</h2>
			</div>

			<div className="checkoutContainer">
				{isLoading ? (
					// Render a spinner while loading
					<SpinLoader />
				) : (
					// Render the main content after loading
					<>
						{/* Checkout content based on current step */}
						{currentStep === 1 && (
							<>
								{cart.length === 0 ? (
									<p>
										Your cart is empty. Add some products
										from the shop.
									</p>
								) : (
									<>
										{/* Products in the cart */}
										<div className="cartContainer">
											{cart.map((product) => (
												<div
													key={product.id}
													className="cartItem">
													<span>
														{product.brandName}
													</span>
													<p>{product.description}</p>
													<p>
														Quantity:{" "}
														{product.quantity}
													</p>
													<p>Size: {product.size}</p>
													<p>
														Price: {product.price}
													</p>
													<button
														onClick={() =>
															handleRemoveFromCart(
																product.id
															)
														}
														className="removeFromCartBtn">
														Remove
													</button>
												</div>
											))}
										</div>
										<button
											className="checkoutBtn"
											onClick={moveToNextStep}>
											Proceed to Shipping
										</button>
									</>
								)}
							</>
						)}

						{currentStep === 2 && (
							<>
								<ShippingOptions cart={cart} />
								<button
									className="checkoutBtn"
									onClick={moveToNextStep}>
									Proceed to Payment
								</button>
							</>
						)}

						{currentStep === 3 && (
							<>
								{/* Total summary and Pay button */}
								<div className="checkoutFooter">
									<div className="totalSummary">
										<p>
											Total Product Price:{" "}
											{/* Calculate total product price */}
										</p>
										<p>
											Shipping Fees:{" "}
											{/* Calculate shipping fees */}
										</p>
										<p>
											Total:{" "}
											{/* Calculate total including product price and shipping fees */}
										</p>
									</div>
									<button className="checkoutBtn">
										Pay Now
									</button>
								</div>
							</>
						)}
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Checkout;
