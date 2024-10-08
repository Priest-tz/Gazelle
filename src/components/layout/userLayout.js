import React from "react";
import Navbar from "../shop/navbar";
import Footer from "../shop/footer";

const UserLayout = ({ children }) => (
	<>
		<Navbar />
		<div className="flex-grow">{children}</div>
		<Footer />
	</>
);

export default UserLayout;
