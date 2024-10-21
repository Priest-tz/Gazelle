import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ isAdminRoute }) => {
	const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (isAdminRoute && !isAdmin) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
