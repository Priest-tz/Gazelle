import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinloader from "../components/spinningLoader";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import SizePicker from "../components/sizePicker";
import QuantityPicker from "../components/quantityPicker";
import SizeChartDropdown from "../components/sizeChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Gallery from "../components/imageGallery";
import { useProducts } from "../context/productsContext";
import { useShoppingCart } from "../context/cartContext";

// The main component for rendering a product page
const ProductPage = () => {
	// State variables
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedSize, setSelectedSize] = React.useState("");
	const [selectedQuantity, setSelectedQuantity] = React.useState(1);

	// Accessing data from context and location
	const products = useProducts();
	const location = useLocation();
	const navigate = useNavigate();
	const isMounted = React.useRef(true);
	const { dispatch } = useShoppingCart();

	// Extracting the product ID from the URL
	const productId = String(location.pathname.split("/").pop());

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

	// Event handlers for size and quantity changes
	const handleSizeChange = (size) => {
		setSelectedSize(size);
	};

	const handleQuantityChange = (quantity) => {
		setSelectedQuantity(quantity);
	};

	// Event handler for adding the product to the cart
	const handleAddToCart = () => {
		// Check if product and size are selected
		if (product && selectedSize) {
			// Create a cart item object
			const cartItem = {
				id: product.id,
				name: product.model,
				image: product.imageUrl[0],
				size: selectedSize,
				quantity: selectedQuantity,
				price: product.price,
			};
			// Dispatch an action to add the item to the cart
			dispatch({
				type: "ADD_TO_CART",
				payload: cartItem,
			});

			// Log a message indicating the addition to the cart
			console.log("Added to Cart", cartItem);
		}
	};

	// Event handler for handling the "Buy Now" button click
	const handleCheckout = () => {
		console.log("handleCheckout function called");

		// Check if product and size are selected
		if (product && selectedSize) {
			// Create a cart item object
			const cartItem = {
				id: product.id,
				name: product.model,
				image: product.imageUrl[0],
				size: selectedSize,
				quantity: selectedQuantity,
				price: product.price,
			};

			// Dispatch an action to add the item to the cart
			dispatch({
				type: "ADD_TO_CART",
				payload: cartItem,
			});

			// Log a message indicating the addition to the cart
			console.log("Added to Cart", cartItem);

			// Use the useNavigate hook to navigate to "/checkout"
			navigate("/checkout");
		}
	};

	// Find the product based on the ID from the products array
	const product = products.find((p) => p.id === productId);

	// JSX structure for rendering the product page
	return (
		<div className="productPage">
			{isLoading ? (
				<Spinloader />
			) : (
				<>
					{/* Render navigation bar */}
					<Navbar />

					{/* Main product container */}
					<div className="sProductContainer">
						{product ? (
							<>
								{/* Render image gallery component */}
								<Gallery product={product} />

								{/* Product details section */}
								<div className="productDetails">
									<h2>{product.model}</h2>
									<p>{product.price}</p>

									{/* Render size picker if sizes are available */}
									{product.sizes &&
										product.sizes.length > 0 && (
											<SizePicker
												sizes={product.sizes}
												selectedSize={selectedSize}
												handleSizeChange={
													handleSizeChange
												}
											/>
										)}

									{/* Render quantity picker */}
									<QuantityPicker
										selectedQuantity={selectedQuantity}
										handleQuantityChange={
											handleQuantityChange
										}
									/>

									{/* Render product descriptions */}
									<div className="productDesc">
										<ul>
											{product.descriptions.map(
												(description, index) => (
													<li key={index}>
														{description}
													</li>
												)
											)}
										</ul>
									</div>

									{/* Actions section with Add to Cart and Buy Now buttons */}
									<div className="actions">
										<button
											className="addToCartBtn"
											onClick={handleAddToCart}>
											<FontAwesomeIcon
												icon={faShoppingCart}
											/>
											<span className="buttonText">
												Add to Cart
											</span>
										</button>

										<button
											className="checkOutBtn"
											onClick={handleCheckout}>
											<span className="buttonText">
												Proceed to checkout
											</span>
										</button>
									</div>

									{/* Render size chart dropdown */}
									<SizeChartDropdown />
								</div>
							</>
						) : (
							// Display an error message if product not found
							<p>Oops! Product not found</p>
						)}
					</div>

					{/* Render footer */}
					<Footer />
				</>
			)}
		</div>
	);
};

export default ProductPage;
