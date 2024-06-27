import React from "react";
import { Link } from "react-router-dom";
import Slideshow1 from "../Assets/slideshow_1.jpg";
import Slideshow2 from "../Assets/slideshow_2.jpg";

const Homepage = () => {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

	const cloudinaryImages = [Slideshow1, Slideshow2];

	const images = cloudinaryImages;

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 10000);

		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<>
			<div className="homePage">
				<div
					className="slideShow"
					style={{
						backgroundImage: `url(${images[currentImageIndex]})`,
					}}></div>

				<div className="content">
					<div className="logoName">GAZELLE</div>
					<nav>
						<ul>
							<li>
								<Link to="/shop">Shop</Link>
							</li>
							<li>
								<Link to="/">Sale</Link>
							</li>
							<li>
								<Link to="/contact">Contact us</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Homepage;
