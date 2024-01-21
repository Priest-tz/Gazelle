import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/cartContext";

const Checkout = () => {
	const { cartState, dispatch } = useShoppingCart();
	const { items: cart } = cartState;

	const handleRemoveFromCart = (productId) => {
		dispatch({
			type: "REMOVE_FROM_CART",
			payload: productId,
		});
	};

	return (
		<div className="checkoutPage">
			<div className="checkoutHeader">
				<Link to="/shop" className="backLink">
					<FontAwesomeIcon icon={faArrowLeft} />
					Back to Shop
				</Link>
				<h2>Checkout</h2>
			</div>

			{cart.length === 0 ? (
				<p>Your cart is empty. Add some products from the shop.</p>
			) : (
				<div className="cartContainer">
					{cart.map((product) => (
						<div key={product.id} className="cartItem">
							<img
								src={product.imageUrl}
								alt={product.brandName}
								className="cartItemImage"
							/>
							<div className="cartItemContent">
								<span>{product.brandName}</span>
								<p>{product.description}</p>
								<p>{product.price}</p>
								<button
									onClick={() =>
										handleRemoveFromCart(product.id)
									}
									className="removeFromCartBtn">
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{cart.length > 0 && (
				<div className="checkoutFooter">
					<p>Total: </p>
					<button className="checkoutBtn">Proceed to Payment</button>
				</div>
			)}
		</div>
	);
};

export default Checkout;
