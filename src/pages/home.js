import React from "react";
import { Link } from "react-router-dom";
import SpinLoader from "../components/spinningLoader";

const Homepage = () => {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

	const cloudinaryImages = [
		"https://res.cloudinary.com/dgnb567j3/image/upload/v1704974060/Gazelle/slideshow_2.jpg",
		"https://res.cloudinary.com/dgnb567j3/image/upload/v1704987292/Gazelle/slideshow_1.jpg",
	];

	const images = cloudinaryImages;

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 10000);

		return () => clearInterval(interval);
	}, [currentImageIndex, images.length]);

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
								<Link to="">Sale</Link>
							</li>
							<li>
								<Link to="">Contact us</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Homepage;
