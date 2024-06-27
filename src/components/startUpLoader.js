import React from "react";
import Loaderimage from "../Assets/Actualbull.png";

const startUploader = () => {
	return (
		<>
			<div className="loaderImg">
				<img src={Loaderimage} />
			</div>
		</>
	);
};

export default startUploader;
