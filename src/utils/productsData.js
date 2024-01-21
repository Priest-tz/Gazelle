export const generateProducts = () => {
	return Array.from({ length: 8 }, (_, index) => ({
		id: (index + 1).toString(),
		brandName: `Gazelle`,
		model: `Astronaut T-Shirts`,
		modelName: `Gazelle Astronaut T-Shirts`,
		descriptions: [
			"Explore the universe with our Astronaut T-Shirts.",
			"Made from 100% premium cotton for maximum comfort.",
			"High-quality printing for vibrant and lasting designs.",
			"Unique and stylish astronaut-themed graphics.",
			"Available in a variety of colors to suit your style.",
			"Sizes ranging from small to extra-large for the perfect fit.",
		],
		price: `₦${(Math.random() * 100).toFixed(2)}`,
		imageUrl: [
			"https://res.cloudinary.com/dgnb567j3/image/upload/v1704974061/Gazelle/T_shirt_front.jpg",
			"https://res.cloudinary.com/dgnb567j3/image/upload/v1704974063/Gazelle/T_shirt_back.jpg",
		],
		colors: ["Red", "Blue", "Green"],
		sizes: ["S", "M", "L", "XL"],
	}));
};
