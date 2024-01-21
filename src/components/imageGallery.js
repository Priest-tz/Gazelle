import React from "react";

const Gallery = ({ product }) => {
	const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

	return (
		<div className="imgGallery">
			<div className="bigFrame">
				{product.imageUrl && (
					<img
						src={product.imageUrl[selectedImageIndex]}
						alt={`${product.brandName} - Image ${
							selectedImageIndex + 1
						}`}
					/>
				)}
			</div>

			<div className="smallFrames">
				{product.imageUrl &&
					product.imageUrl.length > 0 &&
					product.imageUrl.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`${product.brandName} - Image ${index + 1}`}
							className={
								index === selectedImageIndex ? "active" : ""
							}
							onClick={() => setSelectedImageIndex(index)}
						/>
					))}
			</div>
		</div>
	);
};

export default Gallery;
