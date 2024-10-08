import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://gazelle.onrender.com";

// Create Product
export const createProduct = createAsyncThunk(
	"products/createProduct",
	async ({ productData, token }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/api/admin/products`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Update Product
export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ id, productData, token }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				`${BASE_URL}/api/admin/products/${id}`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Delete Product
export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async ({ id, token }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`${BASE_URL}/api/admin/products/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return { id, ...response.data };
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Get All Products (Public)
export const getAllProducts = createAsyncThunk(
	"products/getAllProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/api/products`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Get Admin Products (Requires Token)
export const getAdminProducts = createAsyncThunk(
	"products/getAdminProducts",
	async (token, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/api/admin/products`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
