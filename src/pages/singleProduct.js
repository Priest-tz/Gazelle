import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
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
import { addCartItem } from "../firebase/firestoreUtils";

const ProductPage = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedSize, setSelectedSize] = React.useState("");
	const [selectedQuantity, setSelectedQuantity] = React.useState(1);
	const products = useProducts();
	const { user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const isMounted = React.useRef(true);

	const productId = String(location.pathname.split("/").pop()).trim();

	const product = products ? products.find((p) => p.id === productId) : null;

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

	const handleAddToCart = async () => {
		if (product && selectedSize) {
			const cartItem = {
				id: product.id,
				name: product.model,
				image: product.imageUrl[0],
				size: selectedSize,
				quantity: selectedQuantity,
				price: product.price,
			};

			if (user) {
				await addCartItem(user.uid, cartItem);
				console.log("Added to Cart", cartItem);
			} else {
				navigate("/auth");
			}
		}
	};

	const handleCheckout = async () => {
		navigate("/checkout");
	};

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
									<h2>{product.model}</h2>
									<p> ₦{product.price}</p>

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
											className="checkOutBtn"
											onClick={handleCheckout}>
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
