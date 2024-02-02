import React from "react";
import { useReducer, createContext, useContext } from "react";
import { useAuth } from "./authContext";
import { addCartItem, removeCartItem } from "../firebase/firestoreUtils";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ShoppingCartContext = createContext();

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const SET_CART = "SET_CART";

const cartReducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				items: state.items.filter(
					(_, index) => index !== action.payload
				),
			};
		case SET_CART:
			return {
				...state,
				items: action.payload,
			};
		default:
			return state;
	}
};

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
	const { user } = useAuth();
	const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

	const addToCart = async (cartItem) => {
		const itemKey = `${cartItem.productId}-${cartItem.size}`;
		const existingItemIndex = cartState.items.findIndex(
			(item) => item.key === itemKey
		);

		if (existingItemIndex !== -1) {
			dispatch({
				type: ADD_TO_CART,
				payload: {
					...cartItem,
					quantity:
						cartState.items[existingItemIndex].quantity +
						cartItem.quantity,
				},
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				payload: { ...cartItem, key: itemKey },
			});
		}

		await addCartItem(user?.uid, { ...cartItem, key: itemKey });
	};

	const removeFromCart = async (itemIndex) => {
		const itemKey = cartState.items[itemIndex].key;
		dispatch({ type: REMOVE_FROM_CART, payload: itemIndex });
		await removeCartItem(user?.uid, itemKey);
	};

	React.useEffect(() => {
		const setCartFromFirestore = async () => {
			try {
				if (user) {
					const userDocRef = doc(db, "users", user.uid);
					const userDoc = await getDoc(userDocRef);
					const userData = userDoc.data();

					dispatch({
						type: SET_CART,
						payload: userData.cart.items || [],
					});
				}
			} catch (error) {
				console.error(
					"Error setting cart from Firestore: ",
					error.message
				);
			}
		};

		setCartFromFirestore();
	}, [user]);

	return (
		<ShoppingCartContext.Provider
			value={{ cartState, dispatch, addToCart, removeFromCart }}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
