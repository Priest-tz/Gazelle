import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation";
import Spinloader from "../components/spinningLoader";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../context/productsContext";

const ShopPage = () => {
	// State variables
	const [isNavVisible, setIsNavVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigate = useNavigate();
	const products = useProducts();

	// Ref to track component mounting state
	const isMounted = React.useRef(true);

	// Effect to handle component mounting and loading state
	React.useEffect(() => {
		isMounted.current = true;

		// Simulate a loading delay of 2 seconds
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

	// Toggle navigation visibility
	const toggleNavVisibility = () => {
		setIsNavVisible(!isNavVisible);
	};

	// Close navigation
	const closeNav = () => {
		setIsNavVisible(false);
	};

	// Handle click on a product card
	const handleProductClick = (product) => {
		navigate(`/sproduct/${product.id}`);
	};

	// Event handler for adding the product to the cart
	const handleAddToCart = (productId, dispatch) => {
		// Check if productId is provided
		if (productId) {
			// Create a cart item object with only the product ID
			const cartItem = {
				id: productId,
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

	// Render the component
	return (
		<div className="shopPage">
			{isLoading ? (
				// Render a spinner while loading
				<Spinloader />
			) : (
				// Render the main content after loading
				<>
					{/* Navbar component */}
					<Navbar
						isNavVisible={isNavVisible}
						toggleNavVisibility={toggleNavVisibility}
						closeNav={closeNav}
					/>

					{/* Product container */}
					<div className="productContainer">
						{/* Map through products and render product cards */}
						{products.map((product) => (
							<div
								key={product.id}
								className="productCard"
								onClick={() => handleProductClick(product)}>
								{/* Product image */}
								<img
									src={product.imageUrl[0]}
									alt={product.brandName}
									className="productImage"
								/>

								{/* Product details */}
								<div className="content">
									<span>{product.brandName}</span>
									<p>{product.model}</p>

									{/* Product card footer */}
									<div className="cardFooter">
										<p>{product.price}</p>
										{/* Link to add product to cart */}
										<Link title="Add to Cart">
											<FontAwesomeIcon
												icon={faShoppingCart}
											/>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* See more button */}
					<div className="seeMore">
						<Link to="/all-products">
							<button type="button">See More</button>
						</Link>
					</div>

					{/* Footer component */}
					<Footer />
				</>
			)}
		</div>
	);
};

export default ShopPage;
