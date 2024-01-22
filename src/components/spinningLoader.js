import React from "react";
import { InfinitySpin as Loader } from "react-loader-spinner";

const spinLoader = () => {
	return (
		<div className="spinLoader">
			<Loader
				className="spin"
				color="#606063"
				height={200}
				width={200}
				timeout={3000}
			/>
		</div>
	);
};

export default spinLoader;
