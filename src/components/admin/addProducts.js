import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/shop/productActions"; 
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [sizes, setSizes] = useState([]);
	const [sizeInput, setSizeInput] = useState("");
	const [colors, setColors] = useState([]);
	const [colorInput, setColorInput] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [images, setImages] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth); 

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		setImages((prevImages) => [...prevImages, ...files]);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Create FormData to handle file upload
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("quantity", quantity);
		sizes.forEach((size) => formData.append("sizes[]", size));
		colors.forEach((color) => formData.append("colors[]", color));
		images.forEach((image) => formData.append("images", image));

		// Dispatch createProduct action
		dispatch(createProduct({ productData: formData, token }))
			.unwrap()
			.then(() => {
				navigate("/admin/products"); 
			})
			.catch((error) => {
				console.error("Failed to create product: ", error);
			});
	};

	const handleAddSize = () => {
		if (sizeInput && !sizes.includes(sizeInput)) {
			setSizes((prevSizes) => [...prevSizes, sizeInput]);
			setSizeInput("");
		}
	};

	const handleAddColor = () => {
		if (colorInput && !colors.includes(colorInput)) {
			setColors((prevColors) => [...prevColors, colorInput]);
			setColorInput("");
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100 p-4 mt-16 md:mt-0">
			<form
				className="w-full max-w-lg lg:max-w-5xl p-8 bg-white rounded-lg shadow-md space-y-6"
				onSubmit={handleFormSubmit}>
				{/* Header */}
				<span className="text-center text-lg md:text-2xl font-semibold text-gray-700 mb-6">
					Please Enter Product Information
				</span>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Product Name */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Product Name
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
							placeholder="Enter product name"
						/>
					</div>

					{/* Price */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Price
						</label>
						<input
							type="text"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
							placeholder="Enter product price"
						/>
					</div>
				</div>

				{/* Quantity */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Quantity
					</label>
					<input
						type="number"
						min="1"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
						className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
						placeholder="Enter product quantity"
					/>
				</div>

				{/* Image Upload */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Upload Images
					</label>
					<div className="flex flex-wrap gap-4">
						{images.map((image, index) => (
							<img
								key={index}
								src={URL.createObjectURL(image)}
								alt={`Uploaded ${index + 1}`}
								className="w-20 h-20 object-cover border rounded-lg"
							/>
						))}
					</div>
					<input
						type="file"
						accept="image/*"
						multiple
						onChange={handleImageUpload}
						className="mt-2 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
					/>
				</div>

				{/* Dropdowns for Sizes, Colors */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Sizes */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Sizes
						</label>
						<div className="flex gap-2">
							<input
								type="text"
								value={sizeInput}
								onChange={(e) => setSizeInput(e.target.value)}
								className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
								placeholder="Add size"
							/>
							<button
								type="button"
								onClick={handleAddSize}
								className="bg-green-500 text-white px-4 rounded-lg">
								Add
							</button>
						</div>
						<ul className="mt-2">
							{sizes.map((size, index) => (
								<li key={index} className="text-gray-600">
									{size}
								</li>
							))}
						</ul>
					</div>

					{/* Colors */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Colors
						</label>
						<div className="flex gap-2">
							<input
								type="text"
								value={colorInput}
								onChange={(e) => setColorInput(e.target.value)}
								className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500"
								placeholder="Add color"
							/>
							<button
								type="button"
								onClick={handleAddColor}
								className="bg-green-500 text-white px-4 rounded-lg">
								Add
							</button>
						</div>
						<ul className="mt-2">
							{colors.map((color, index) => (
								<li key={index} className="text-gray-600">
									{color}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Description */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-4 h-32 border rounded-lg focus:ring-2 focus:ring-green-500"
						placeholder="Enter product description"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 transition">
					Add Product
				</button>
			</form>
		</div>
	);
};

export default AddProductForm;
