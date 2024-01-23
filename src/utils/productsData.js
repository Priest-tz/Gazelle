export const generateProducts = () => {
	const products = [];

	const createProduct = ({
		id,
		model,
		modelName,
		descriptions,
		price,
		imageUrl,
		colors,
		sizes,
	}) => ({
		id,
		brandName: `Gazelle`,
		model,
		modelName,
		descriptions,
		price: `₦${price.toFixed(2)}`,
		imageUrl,
		colors,
		sizes,
	});

	const mainProduct = createProduct({
		id: "1",
		model: "Cotton T-Shirts",
		descriptions: [
			"Explore the universe with our Astronaut T-Shirts.",
			"Made from 100% premium cotton for maximum comfort.",
			"High-quality printing for vibrant and lasting designs.",
			"Unique and stylish astronaut-themed graphics.",
			"Available in a variety of colors to suit your style.",
			"Sizes ranging from small to extra-large for the perfect fit.",
		],
		price: Math.random() * 100,
		imageUrl: [
			"https://res.cloudinary.com/dgnb567j3/image/upload/v1704974061/Gazelle/T_shirt_front.jpg",
			"https://res.cloudinary.com/dgnb567j3/image/upload/v1704974063/Gazelle/T_shirt_back.jpg",
		],
		colors: ["Red", "Blue", "Green"],
		sizes: ["S", "M", "L", "XL"],
	});

	products.push(mainProduct);

	// Other Products
	const otherProducts = [
		{
			model: " Stealth Snapback",
			descriptions: ["Comfortable and stylish Gazelle Cap."],
			price: Math.random() * 100,
		},
		{
			model: "Arctic Frost Hoodie",
			descriptions: ["Warm and trendy Gazelle Hoodie."],
			price: Math.random() * 100,
		},
		{
			model: "Urban Explorer Sweatshirt",
			descriptions: ["Casual and cozy Gazelle Sweatshirt."],
			price: Math.random() * 100,
		},
		{
			model: "Luxe Velvet Socks",
			descriptions: ["Soft and durable Gazelle Socks."],
			price: Math.random() * 100,
		},
		{
			model: " Mirage Silk Bandana",
			descriptions: ["Fashionable Gazelle Bandana for any occasion."],
			price: Math.random() * 100,
		},
		{
			model: "Maverick Flight Jacket",
			descriptions: ["Stylish and functional Gazelle Jacket."],
			price: Math.random() * 100,
		},
		{
			model: "Nebula Custom Sneakers",
			descriptions: ["Unique and personalized Gazelle Air Force 1s."],
			price: Math.random() * 100,
		},
		{
			model: "Tech Cargo Pant",
			descriptions: ["Durable and versatile Gazelle Cargo Pant."],
			price: Math.random() * 100,
		},
	];

	const imageUrl =
		"https://res.cloudinary.com/dgnb567j3/image/upload/v1705958970/gazelle/y744h6e4vwhetwdwifxm.jpg";

	otherProducts.forEach((product, index) => {
		const { model, descriptions, price } = product;
		const id = (index + 2).toString();
		const imageUrlArray = [imageUrl];
		const colorsArray = ["Black", "White", "Gray"];
		const sizesArray = ["S", "M", "L", "XL"];

		products.push(
			createProduct({
				id,
				model,
				modelName: model,
				descriptions,
				price,
				imageUrl: imageUrlArray,
				colors: colorsArray,
				sizes: sizesArray,
			})
		);
	});

	return products;
};
