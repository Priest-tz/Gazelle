import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/style.css";
import StartUploader from "./components/startUpLoader";

const RootComponent = () => {
	// State to manage loading status
	const [loading, setLoading] = React.useState(true);

	// Ref to track whether the component is mounted or not
	const isMounted = React.useRef(true);

	// useEffect hook to simulate a loading delay of 2 seconds
	React.useEffect(() => {
		// Check if the component has been rendered before
		const hasRenderedBefore = localStorage.getItem("hasRenderedBefore");

		// Set up a timer to change loading state after 2 seconds
		const loadingTimer = setTimeout(() => {
			// Checking if the component is still mounted before updating state
			if (isMounted.current) {
				setLoading(false);

				// Set a flag in local storage to indicate that the component has been rendered
				if (!hasRenderedBefore) {
					localStorage.setItem("hasRenderedBefore", "true");
				}
			}
		}, 8000);

		// Cleanup function to run when component unmounts
		return () => {
			// Updating ref to indicate the component is unmounted
			isMounted.current = false;
			// Clearing the loading timer to prevent memory leaks
			clearTimeout(loadingTimer);
		};
	}, []); // Empty dependency array ensures the effect runs only once during component mount

	// Render the main application or loading screen based on the loading state
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
