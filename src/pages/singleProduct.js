import React from "react";
import { useLocation } from "react-router-dom";
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

const ProductPage = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedSize, setSelectedSize] = React.useState("");
	const [selectedQuantity, setSelectedQuantity] = React.useState(1);
	const products = useProducts();
	const location = useLocation();
	const isMounted = React.useRef(true);
	const { dispatch } = useShoppingCart();

	const productId = String(location.pathname.split("/").pop());

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

	const handleSizeChange = (size) => {
		setSelectedSize(size);
	};

	const handleQuantityChange = (quantity) => {
		setSelectedQuantity(quantity);
	};

	const handleAddToCart = () => {
		if (product && selectedSize) {
			const cartItem = {
				id: product.id,
				name: product.modelName,
				size: selectedSize,
				quantity: selectedQuantity,
				price: product.price,
			};

			dispatch({
				type: "ADD_TO_CART",
				payload: cartItem,
			});

			console.log("Added to Cart", cartItem);
		}
	};

	const product = products.find((p) => p.id === productId);

	return (
		<div className="productPage">
			{isLoading ? (
				<Spinloader />
			) : (
				<>
					<Navbar />

					<div className="sProductContainer">
						{product ? (
							<>
								<Gallery product={product} />

								<div className="productDetails">
									<h2>{product.modelName}</h2>
									<p>{product.price}</p>

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

									<QuantityPicker
										selectedQuantity={selectedQuantity}
										handleQuantityChange={
											handleQuantityChange
										}
									/>

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
											className="buyNowBtn"
											onClick={() => {
												// Handle buy now logic
												console.log("Buy Now");
											}}>
											<span className="buttonText">
												Proceed to checkout
											</span>
										</button>
									</div>

									<SizeChartDropdown />
								</div>
							</>
						) : (
							<p>Oops! Product not found</p>
						)}
					</div>

					<Footer />
				</>
			)}
		</div>
	);
};

export default ProductPage;
