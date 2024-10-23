import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Shop/ProductActions";
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
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useSelector((state) => state.auth);

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		setImages((prevImages) => [...prevImages, ...files]);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Validate inputs
		if (!name || !price || isNaN(price) || quantity <= 0) {
			setError("Please fill in all fields correctly.");
			return;
		}

		// Create FormData to handle file upload
		const formData = new FormData();
		formData.append("name", name);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("quantity", quantity);

		sizes.forEach((size) => formData.append("sizes[]", size));
		colors.forEach((color) => formData.append("colors[]", color));
		images.forEach((image) => formData.append("images", image));

		dispatch(createProduct({ productData: formData, token }))
			.unwrap()
			.then(() => {
				navigate("/admin/products");
			})
			.catch((error) => {
				console.error("Failed to create product: ", error);
				setError("Failed to create product. Please try again.");
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

	const handleRemoveSize = (sizeToRemove) => {
		setSizes((prevSizes) =>
			prevSizes.filter((size) => size !== sizeToRemove)
		);
	};

	const handleRemoveColor = (colorToRemove) => {
		setColors((prevColors) =>
			prevColors.filter((color) => color !== colorToRemove)
		);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	return (
		<div className="flex justify-center items-center h-full bg-gray-100 p-4 mt-16 md:mt-0">
			<form
				className="w-full max-w-lg lg:max-w-5xl p-8 bg-white rounded-lg shadow-md space-y-6"
				onSubmit={handleFormSubmit}>
				{/* Header */}
				<span className="text-center text-lg md:text-2xl font-semibold text-gray-700 mb-6">
					Please Enter Product Information
				</span>

				{error && (
					<div className="text-red-500 text-center">{error}</div>
				)}

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
							className="w-full p-4 border rounded-lg focus:ring outline-none focus:ring-green-500"
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
							className="w-full p-4 border rounded-lg focus:ring outline-none focus:ring-green-500"
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
						className="w-full p-4 border rounded-lg focus:ring outline-none focus:ring-green-500"
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
							<div key={index} className="relative">
								<img
									src={URL.createObjectURL(image)}
									alt={`Uploaded ${index + 1}`}
									className="w-20 h-20 object-cover border rounded-lg"
								/>
								<button
									type="button"
									onClick={() => handleRemoveImage(index)}
									className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
									&times;
								</button>
							</div>
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
								className="w-full p-4 border rounded-lg focus:ring focus:ring-green-500 outline-none"
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
								<li
									key={index}
									className="text-gray-600 flex justify-between items-center">
									{size}
									<button
										type="button"
										onClick={() => handleRemoveSize(size)}
										className="text-red-500 ml-2">
										&times;
									</button>
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
								className="w-full p-4 border rounded-lg focus:ring focus:ring-green-500 outline-none"
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
								<li
									key={index}
									className="text-gray-600 flex justify-between items-center">
									{color}
									<button
										type="button"
										onClick={() => handleRemoveColor(color)}
										className="text-red-500 ml-2">
										&times;
									</button>
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
						className="w-full p-4 border rounded-lg focus:ring focus:ring-green-500 outline-none"
						placeholder="Enter product description"
						rows="4"></textarea>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
					Add Product
				</button>
			</form>
		</div>
	);
};

export default AddProductForm;
