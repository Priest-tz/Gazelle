import React from "react";
import Loaderimage from "../Assets/Actualbull.png";

const StartUploader = () => {
	return (
		<>
			<div className="loaderImg">
				<img src={Loaderimage} alt="Loader" />
			</div>
		</>
	);
};

export default StartUploader;
