import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAdminProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../../redux/shop/productActions";
import { FiPlus, FiX } from "react-icons/fi";

// Button Component
const Button = ({ onClick, children, type = "button", variant = "solid" }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`px-4 py-2 rounded-md ${
				variant === "outline"
					? "border border-gray-300 text-gray-700"
					: "bg-blue-500 text-white"
			} hover:bg-blue-600 transition duration-200`}>
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
				<Button
					onClick={() => onEdit(product)}
					className="w-full sm:w-auto"
					disabled={isLoading}>
					Edit
				</Button>
				<Button
					onClick={() => onDelete(product.id)}
					variant="outline"
					className="w-full sm:w-auto"
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
			onUpdateProduct({ ...formData, id: editingProduct.id });
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
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
					Quantity in Stock
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

			<div className="flex justify-end space-x-2 mt-4">
				<Button variant="outline" onClick={onClose}>
					Cancel
				</Button>
				<Button type="submit">
					{editingProduct ? "Update Product" : "Add Product"}
				</Button>
			</div>
		</form>
	);
};

// ProductManager Component
const ProductManager = () => {
	const dispatch = useDispatch();
	const {
		realProducts: products,
		status,
		error,
	} = useSelector((state) => state.products);
	const { token } = useSelector((state) => state.auth);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	useEffect(() => {
		if (token) {
			dispatch(getAdminProducts(token));
		}
	}, [dispatch, token]);

	const handleAddProduct = async (newProduct) => {
		try {
			await dispatch(
				createProduct({ productData: newProduct, token })
			).unwrap();
			setIsModalOpen(false);
		} catch (err) {
			console.error("Failed to create product:", err);
		}
	};

	const handleUpdateProduct = async (updatedProduct) => {
		try {
			await dispatch(
				updateProduct({
					id: updatedProduct.id,
					productData: updatedProduct,
					token,
				})
			).unwrap();
			setIsModalOpen(false);
			setEditingProduct(null);
		} catch (err) {
			console.error("Failed to update product:", err);
		}
	};

	const handleDeleteProduct = async (id) => {
		try {
			await dispatch(deleteProduct({ id, token })).unwrap();
		} catch (err) {
			console.error("Failed to delete product:", err);
		}
	};

	const openModal = () => {
		setEditingProduct(null);
		setIsModalOpen(true);
	};

	const openEditModal = (product) => {
		setEditingProduct(product);
		setIsModalOpen(true);
	};

	if (status === "loading") {
		return <div className="p-4">Loading...</div>;
	}

	if (error) {
		return <div className="p-4 text-red-500">Error: {error}</div>;
	}

	return (
		<div className="flex flex-col p-4 md:p-6 mt-16 md:mt-20 ml-0 md:ml-64">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">Product Manager</h1>
				<Button onClick={openModal}>
					<FiPlus className="inline-block mr-1" /> Add Product
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onEdit={openEditModal}
						onDelete={handleDeleteProduct}
						isLoading={status === "loading"}
					/>
				))}
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={editingProduct ? "Edit Product" : "Add Product"}>
				<AddProductForm
					onAddProduct={handleAddProduct}
					editingProduct={editingProduct}
					onUpdateProduct={handleUpdateProduct}
					onClose={() => setIsModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default ProductManager;
