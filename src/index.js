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
        // Set up a timer to change loading state after 2 seconds
        const loadingTimer = setTimeout(() => {
            // Checking if the component is still mounted before updating state
            if (isMounted.current) {
                setLoading(false);
            }
        }, 10000);

        // Cleanup function to run when component unmounts
        return () => {
            // Updating ref to indicate the component is unmounted
            isMounted.current = false;
            // Clearing the loading timer to prevent memory leaks
            clearTimeout(loadingTimer);
        };
    }, []); // Empty dependency array ensures the effect runs only once during component mount

    // Rendering the main application or loading screen based on the loading state
    return (
        <React.StrictMode>
            {loading ? <StartUploader /> : <App />}
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);
