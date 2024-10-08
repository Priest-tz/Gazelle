import React from "react";
import AdminNavbar from "../admin/navbar";

const AdminLayout = ({ children }) => (
	<>
		<AdminNavbar />
		<div className="flex-grow">{children}</div>
	</>
);

export default AdminLayout;
