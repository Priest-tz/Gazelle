import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navigation";
import Spinloader from "../components/spinningLoader";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../context/productsContext";

const ShopPage = () => {
	const [isNavVisible, setIsNavVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const navigate = useNavigate();
	const products = useProducts();

	const isMounted = React.useRef(true);

	React.useEffect(() => {
		isMounted.current = true;

		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}, 2000);

		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	const toggleNavVisibility = () => {
		setIsNavVisible(!isNavVisible);
	};

	const closeNav = () => {
		setIsNavVisible(false);
	};

	const handleProductClick = (product) => {
		navigate(`/sproduct/${product.id}`);
	};

	const handleAddToCart = (productId, dispatch) => {
		if (productId) {
			const cartItem = {
				id: productId,
			};
			dispatch({
				type: "ADD_TO_CART",
				payload: cartItem,
			});

			console.log("Added to Cart", cartItem);
		}
	};

	return (
		<div className="shopPage">
			{isLoading ? (
				<Spinloader />
			) : (
				<>
					<Navbar
						isNavVisible={isNavVisible}
						toggleNavVisibility={toggleNavVisibility}
						closeNav={closeNav}
					/>

					<div className="productContainer">
						{products.map((product) => (
							<div
								key={product.id}
								className="productCard"
								onClick={() => handleProductClick(product)}>
								<img
									src={product.imageUrl[0]}
									alt={product.brandName}
									className="productImage"
								/>

								<div className="content">
									<span>{product.brandName}</span>
									<p>{product.model}</p>

									<div className="cardFooter">
										<p>₦{product.price}</p>

										<Link title="Add to Cart">
											<FontAwesomeIcon
												icon={faShoppingCart}
												onClick={handleAddToCart}											/>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="seeMore">
						<Link to="/all-products">
							<button type="button">See More</button>
						</Link>
					</div>

					<Footer />
				</>
			)}
		</div>
	);
};

export default ShopPage;
