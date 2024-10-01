import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiLogoWhatsapp } from "react-icons/bi";
import bg1 from "../../data/images/slideshow_1.jpg";
import bg2 from "../../data/images/slideshow_2.jpg";

const HomePage = () => {
	const [backgroundImage, setBackgroundImage] = useState(bg1);
	const [backgroundPosition, setBackgroundPosition] = useState("top right");

	const positions = [
		"right-top",
		"top",
		"bottom",
		"center",
		"right bottom",
		" left",
		"left-bottom",
		"left-top",
		"right",
	];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setBackgroundImage((prevImage) => {
				if (prevImage === bg1) {
					return bg2;
				} else {
					return bg1;
				}
			});

			setBackgroundPosition((prevPosition) => {
				const index = positions.indexOf(prevPosition);
				if (index === positions.length - 1) {
					return positions[0];
				} else {
					return positions[index + 1];
				}
			});
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div
			className="flex flex-col items-center justify-center select-none h-screen relative bg-cover bg-opacity-50 space-y-12 md:space-y-20"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundPosition,
				transition:
					"background-image 4s ease-in-out, background-position 4s ease-in-out",
			}}>
			<span className="md:text-8xl text-6xl font-light font-kingthings text-white">
				GAZELLE
			</span>
			<nav>
				<ul className="flex flex-col justify-center items-center text-center space-y-6 text-lg">
					<li>
						<Link to="/shop" className="text-white text-3xl">
							Shop
						</Link>
					</li>
					<li>
						<Link to="/" className="text-white text-3xl">
							Sale
						</Link>
					</li>
					<li>
						<Link to="/contact" className="text-white text-3xl">
							Contact Us
						</Link>
					</li>
				</ul>
			</nav>

			<div className="absolute bottom-8 right-8 md:bottom-20 md:right-20 p-2 bg-white rounded-full">
				<Link to="/contact">
					<BiLogoWhatsapp className="text-4xl text-black" />
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
