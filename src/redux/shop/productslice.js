import { createSlice } from "@reduxjs/toolkit";
import {
	createProduct,
	updateProduct,
	deleteProduct,
	getAllProducts,
} from "./ProductActions";

const initialState = {
	products: [],
	status: "idle",
	error: null,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Fetch all products (public)
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getAllProducts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products = action.payload;

				console.log("Fetched products:", action.payload);
			})
			.addCase(getAllProducts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});

		// Create product
		builder
			.addCase(createProduct.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});

		// Update product
		builder
			.addCase(updateProduct.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.status = "succeeded";
				const index = state.products.findIndex(
					(p) => p.id === action.payload.id
				);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});

		// Delete product
		builder
			.addCase(deleteProduct.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.products = state.products.filter(
					(p) => p.id !== action.payload.id
				);
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export default productSlice.reducer;
