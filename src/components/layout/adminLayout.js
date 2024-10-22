import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/Navbar";

const AdminLayout = () => {
	return (
		<div>
			<AdminNavbar />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
