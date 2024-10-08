import React from "react";
import { Link } from "react-router-dom";

import home from "../../data/images/home.jpg";

const Homeslide = () => {
	return (
		<div
			className="relative flex flex-col items-center justify-center h-screen select-none space-y-12 md:space-y-20 bg-center bg-cover"
			style={{
				backgroundImage: `url(${home})`,
			}}>
			{/* Black inset overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50"></div>

			{/* Content above the overlay */}
			<span className="relative z-10 text-6xl font-light text-white font-kingthings md:text-8xl">
				GAZELLE
			</span>
			<nav className="relative z-10">
				<ul className="flex flex-col items-center justify-center space-y-8 text-center text-lg">
					<li>
						<Link to="/shop" className="text-3xl text-white">
							Shop
						</Link>
					</li>
					<li>
						<Link to="/" className="text-3xl text-white">
							Gallery
						</Link>
					</li>
					<li>
						<Link to="/" className="text-3xl text-white">
							Contact Us
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Homeslide;
