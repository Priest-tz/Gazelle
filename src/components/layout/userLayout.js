import React from "react";
import Navbar from "../shop/navbar";
import Footer from "../shop/footer";
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
