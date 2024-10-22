import React from "react";
import Navbar from "../shop/Navbar";
import Footer from "../shop/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => (
	<>
		<Navbar />
		<div className="flex-grow">
			<Outlet />
		</div>
		<Footer />
	</>
);

export default UserLayout;
