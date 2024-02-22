import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/style.css";
import StartUploader from "./components/startUpLoader";

const RootComponent = () => {
	const [loading, setLoading] = React.useState(true);
	const isMounted = React.useRef(true);

	React.useEffect(() => {
		const hasRenderedBefore = localStorage.getItem("hasRenderedBefore");

		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setLoading(false);

				if (!hasRenderedBefore) {
					localStorage.setItem("hasRenderedBefore", "true");
				}
			}
		}, 8000);

		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	return (
		<React.StrictMode>
			{loading && !localStorage.getItem("hasRenderedBefore") ? (
				<StartUploader />
			) : (
				<App />
			)}
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
