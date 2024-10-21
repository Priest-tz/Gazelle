import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
	createProduct,
	updateProduct,
	deleteProduct,
} from "../../redux/shop/productActions";
import LoadingSpinner from "../common/loadingSpinner";
import ErrorMessage from "../common/productFetchError";
import { FiPlus, FiX } from "react-icons/fi";

// Selector for product data
const selectProductData = createSelector(
	(state) => state.products?.products,
	(state) => state.products?.status,
	(state) => state.products?.error,
	(products, status, error) => ({
		products: products || [],
		status: status || "idle",
		error: error || null,
	})
);

// Button Component
const Button = ({
	onClick,
	children,
	type = "button",
	variant = "solid",
	disabled = false,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 rounded-md ${
				variant === "outline"
					? "border border-gray-300 text-white bg-red-400"
					: "bg-green-500 text-white"
			} hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200`}>
			{children}
		</button>
	);
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg md:p-6 p-4 m-4 md:m-0 w-full md:w-1/3 shadow-lg">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">{title}</h2>
					<Button onClick={onClose} variant="outline">
						<FiX />
					</Button>
				</div>
				{children}
			</div>
		</div>
	);
};

// Tag Component
const Tag = ({ children, onRemove }) => {
	return (
		<div className="inline-flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2">
			<span>{children}</span>
			<button
				onClick={onRemove}
				className="ml-2 font-semibold text-red-500">
				<FiX />
			</button>
		</div>
	);
};

// ProductCard Component
const ProductCard = ({ product, onDelete, onEdit, isLoading }) => {
	return (
		<div className="border p-4 rounded-md shadow-md bg-white transition-transform duration-200 hover:shadow-lg">
			<h3 className="text-lg font-semibold">{product.name}</h3>
			<p className="text-sm text-gray-600 mt-1">{product.description}</p>
			<div className="mt-2 space-y-1">
				<p className="text-sm">
					<span className="font-medium">Sizes:</span>{" "}
					{product.sizes.join(", ")}
				</p>
				<p className="text-sm">
					<span className="font-medium">Colors:</span>{" "}
					{product.colors.join(", ")}
				</p>
				<p className="text-sm">
					<span className="font-medium">Quantity:</span>{" "}
					{product.quantity}
				</p>
			</div>
			<div className="flex flex-col sm:flex-row gap-2 mt-4">
				<Button onClick={() => onEdit(product)} disabled={isLoading}>
					Edit
				</Button>
				<Button
					onClick={() => onDelete(product._id)}
					variant="outline"
					disabled={isLoading}>
					Delete
				</Button>
			</div>
		</div>
	);
};

// AddProductForm Component
const AddProductForm = ({
	onAddProduct,
	editingProduct,
	onUpdateProduct,
	onClose,
}) => {
	const [formData, setFormData] = useState(
		editingProduct || {
			name: "",
			description: "",
			sizes: [],
			colors: [],
			quantity: "",
		}
	);
	const [sizeInput, setSizeInput] = useState("");
	const [colorInput, setColorInput] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddSize = () => {
		if (sizeInput && !formData.sizes.includes(sizeInput)) {
			setFormData((prev) => ({
				...prev,
				sizes: [...prev.sizes, sizeInput],
			}));
			setSizeInput("");
		}
	};

	const handleRemoveSize = (size) => {
		setFormData((prev) => ({
			...prev,
			sizes: prev.sizes.filter((s) => s !== size),
		}));
	};

	const handleAddColor = () => {
		if (colorInput && !formData.colors.includes(colorInput)) {
			setFormData((prev) => ({
				...prev,
				colors: [...prev.colors, colorInput],
			}));
			setColorInput("");
		}
	};

	const handleRemoveColor = (color) => {
		setFormData((prev) => ({
			...prev,
			colors: prev.colors.filter((c) => c !== color),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editingProduct) {
			onUpdateProduct({ ...formData, id: editingProduct._id });
		} else {
			onAddProduct(formData);
		}
		onClose();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Product Name
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Description
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Sizes
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={sizeInput}
						onChange={(e) => setSizeInput(e.target.value)}
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<Button type="button" onClick={handleAddSize}>
						<FiPlus className="inline-block mr-1" /> Add
					</Button>
				</div>
				<div className="mt-2">
					{formData.sizes.map((size) => (
						<Tag key={size} onRemove={() => handleRemoveSize(size)}>
							{size}
						</Tag>
					))}
				</div>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Colors
				</label>
				<div className="flex gap-2">
					<input
						type="text"
						value={colorInput}
						onChange={(e) => setColorInput(e.target.value)}
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
					/>
					<Button type="button" onClick={handleAddColor}>
						<FiPlus className="inline-block mr-1" /> Add
					</Button>
				</div>
				<div className="mt-2">
					{formData.colors.map((color) => (
						<Tag
							key={color}
							onRemove={() => handleRemoveColor(color)}>
							{color}
						</Tag>
					))}
				</div>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Quantity
				</label>
				<input
					type="number"
					name="quantity"
					value={formData.quantity}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div className="mt-6 flex justify-end gap-3">
				<Button type="button" onClick={onClose} variant="outline">
					Cancel
				</Button>
				<Button type="submit">
					{editingProduct ? "Update" : "Add"}
				</Button>
			</div>
		</form>
	);
};

//ProductManager Component
const ProductManager = () => {
	const dispatch = useDispatch();
	const { products, status, error } = useSelector(selectProductData);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	const handleAddProduct = (newProduct) => {
		dispatch(createProduct(newProduct));
	};

	const handleUpdateProduct = (updatedProduct) => {
		dispatch(updateProduct(updatedProduct));
	};

	const handleDeleteProduct = (productId) => {
		dispatch(deleteProduct(productId));
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
		setIsModalOpen(false);
		setEditingProduct(null);
	};

	const handleEditProduct = (product) => {
		setEditingProduct(product);
		openModal();
	};

	return (
		<div className="p-6 md:ml-[250px] lg:ml-[300px]">
			{" "}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold">Product Manager</h1>
			</div>
			{/* Loading Spinner */}
			{status === "loading" && <LoadingSpinner />}
			{/* Product Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products && products.length > 0 ? (
					products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							onDelete={handleDeleteProduct}
							onEdit={handleEditProduct}
							isLoading={status === "loading"}
						/>
					))
				) : (
					<p className="col-span-full">No products available.</p>
				)}
			</div>
			{/* Modal for Adding/Editing Products */}
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				title={editingProduct ? "Edit Product" : "Add New Product"}>
				<AddProductForm
					onAddProduct={handleAddProduct}
					editingProduct={editingProduct}
					onUpdateProduct={handleUpdateProduct}
					onClose={closeModal}
				/>
			</Modal>
		</div>
	);
};

export default ProductManager;
