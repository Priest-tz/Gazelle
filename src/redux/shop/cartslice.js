import { createSlice } from "@reduxjs/toolkit";
import shirtFront from "../../data/images/shirtFront.png"
import denim from "../../data/images/products/denim.jpg"
import sneakers from "../../data/images/products/sneaker.jpg"

const initialState = [
	{
		id: 1,
		name: "Classic T-Shirt",
		price: "25.00",
		quantity: 1,
		size: "Medium",
		color: "Red",
		image: shirtFront,
	},
	{
		id: 2,
		name: "Denim Jacket",
		price: "60.00",
		quantity: 1,
		size: "Large",
		color: "Blue",
		image: denim,
	},
	{
		id: 3,
		name: "Leather Boots",
		price: "120.00",
		quantity: 1,
		size: "9",
		color: "Brown",
		image: sneakers,
	},
];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = state.find(
				(i) =>
					i.id === action.payload.id &&
					i.size === action.payload.size &&
					i.color === action.payload.color
			);
			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				return state.concat({
					id: action.payload.id,
					name: action.payload.name,
					price: action.payload.price,
					quantity: action.payload.quantity,
					size: action.payload.size,
					color: action.payload.color,
				});
			}
		},
		removeFromCart: (state, action) => {
			return state.filter((item) => item.id !== action.payload.id);
		},
		clearCart: () => {
			return [];
		},
		updateQuantity: (state, action) => {
			const item = state.find(
				(i) =>
					i.id === action.payload.id &&
					i.size === action.payload.size &&
					i.color === action.payload.color
			);
			if (item) {
				item.quantity = action.payload.quantity;
			}
		},
	},
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
	cartSlice.actions;

export default cartSlice.reducer;
