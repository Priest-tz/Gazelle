import { createSlice } from "@reduxjs/toolkit";
import shirtFront from "../data/images/T_shirt_front.jpg";
import shirtBack from "../data/images/T_shirt_back.jpg";
import backpack from "../data/images/products/backpack.jpg";
import cargo1 from "../data/images/products/cargo1.jpg";
import cargo2 from "../data/images/products/cargo2.jpg";
import chinos from "../data/images/products/chinos.jpg";
import denim from "../data/images/products/denim.jpg";
import hoodie from "../data/images/products/hoodie.jpg";
import sneaker from "../data/images/products/sneaker.jpg";
import jacket from "../data/images/products/jacket.jpg";
import tee from "../data/images/products/tee.jpeg";

const initialState = {
	products: [
		{
			id: 1,
			name: "Classic T-Shirt",
			price: "$25.00",
			image: shirtFront,
			shirtBack,
			sizes: ["Small", "Medium", "Large"],
			colors: ["Red", "Blue", "Green"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"A classic t-shirt made from premium cotton for all-day comfort.",
			available: true,
		},
		{
			id: 2,
			name: "Urban Bomber Jacket",
			price: "$85.00",
			image: jacket,
			sizes: ["Small", "Medium", "Large", "X-Large"],
			colors: ["Black", "Olive Green", "Navy Blue"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Trendy bomber jacket with a classic fit, perfect for layering.",
			available: false,
		},
		{
			id: 3,
			name: "Graphic Tee",
			price: "$25.00",
			image: tee,
			sizes: ["Small", "Medium", "Large", "X-Large"],
			colors: ["White", "Black", "Heather Gray"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Stylish graphic tee that makes a statement wherever you go.",
			available: false,
		},
		{
			id: 4,
			name: "Cargo Pants",
			price: "$60.00",
			image: cargo1,
			cargo2,
			sizes: ["30", "32", "34", "36"],
			colors: ["Khaki", "Black"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Comfortable cargo pants with multiple pockets for a functional look.",
			available: false,
		},
		{
			id: 5,
			name: "Chino Shorts",
			price: "$40.00",
			image: chinos,
			sizes: ["30", "32", "34", "36"],
			colors: ["Navy", "Beige", "Gray"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description: "Versatile chino shorts for a laid-back urban style.",
			available: false,
		},
		{
			id: 6,
			name: "Classic Hoodie",
			price: "$55.00",
			image: hoodie,
			sizes: ["Small", "Medium", "Large", "X-Large"],
			colors: ["Black", "Charcoal", "Maroon"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Cozy and stylish hoodie for a relaxed fit, great for layering.",
			available: false,
		},
		{
			id: 7,
			name: "Denim Jacket",
			price: "$70.00",
			image: denim,
			sizes: ["Small", "Medium", "Large", "X-Large"],
			colors: ["Light Wash", "Dark Wash"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Classic denim jacket that adds an edgy touch to any outfit.",
			available: false,
		},
		{
			id: 8,
			name: "Athletic Sneakers",
			price: "$90.00",
			image: sneaker,
			sizes: ["8", "9", "10", "11", "12"],
			colors: ["Black", "White", "Red"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Stylish athletic sneakers for comfort and performance.",
			available: false,
		},
		{
			id: 9,
			name: "Backpack",
			price: "$45.00",
			image: backpack,
			sizes: ["One Size"],
			colors: ["Black", "Gray", "Green"],
			shippingOptions: ["Standard Shipping", "Express Shipping"],
			description:
				"Durable backpack with multiple compartments for urban living.",
			available: false,
		},
	],
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
});

export default productsSlice.reducer;
