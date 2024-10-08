import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
	const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

	if (!isAuthenticated || !isAdmin) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};

export default PrivateRoute;
