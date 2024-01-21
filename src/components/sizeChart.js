import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SizeChartDropdown = () => {
	const [isImageVisible, setIsImageVisible] = useState(false);

	const toggleImageVisibility = () => {
		setIsImageVisible(!isImageVisible);
	};

	return (
		<div className={`sizeChartDropdown ${isImageVisible ? "open" : ""}`}>
			<div className="head">
				<FontAwesomeIcon icon={faChartBar} /> <span> Size Chart</span>
				<FontAwesomeIcon
				className="dropDown"
					icon={faChevronDown}
					onClick={toggleImageVisibility}
				/>
			</div>

			<div className="img">
				{isImageVisible && (
					<img
						src="https://res.cloudinary.com/dgnb567j3/image/upload/v1704974059/Gazelle/size_guide.jpg"
						alt="Size Chart"
					/>
				)}
			</div>
		</div>
	);
};

export default SizeChartDropdown;
