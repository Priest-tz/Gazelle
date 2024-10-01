/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				kingthings: ["Kingthings Spikeless", "sans-serif"],
				lato: ["Lato", "sans-serif"],
			},
			colors: {
				productText: "#606063",
			},
		},
	},
	plugins: [],
};
