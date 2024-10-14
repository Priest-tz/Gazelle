import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/auth/authActions";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import {
	FaClipboardList,
	FaChartLine,
	FaBox,
	FaUser,
	FaCog,
	FaLifeRing,
	FaTag,
	FaSignOutAlt,
	FaPlus,
} from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const AdminNavbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();

	const menuItems = [
		{ icon: FaClipboardList, text: "Dashboard", href: "/admin/liveorders" },
		{ icon: FaClipboardList, text: "Orders", href: "/admin/liveorders" },
		{ icon: FaBox, text: "Products", href: "/admin/products" },
		{ icon: FaChartLine, text: "Performance", href: "/admin/liveorders" },
		{ icon: FaCog, text: "Settings", href: "/admin/liveorders" },
		{ icon: FaLifeRing, text: "Support", href: "/admin/liveorders" },
		{ icon: FaTag, text: "Promotions", href: "/admin/liveorders" },
		{ icon: FaSignOutAlt, text: "Logout", href: "/admin" },
	];

	const handleLogout = () => {
		dispatch(logoutAction());
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<nav className="bg-white shadow-md select-none z-50 relative">
				<div className="container mx-auto flex justify-between items-center p-4">
					{/* Mobile menu toggle */}
					<button
						className="md:hidden text-2xl"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
						{isMobileMenuOpen ? (
							<LiaTimesSolid className="w-7 h-7" />
						) : (
							<RxHamburgerMenu className="w-7 h-7" />
						)}
					</button>

					{/* Logo */}
					<div className="text-4xl mx-auto">
						<a href="/dashboard" className="font-kingthings">
							Gazelle
						</a>
					</div>

					{/* Right-side icons */}
					<div className="hidden md:flex items-center space-x-6">
						<button className="text-2xl">
							<GoSearch />
						</button>
						<a href="/admin" className="text-2xl">
							<FaUser />
						</a>
					</div>
				</div>
			</nav>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? "w-64" : "w-0 md:w-64"} md:block`}>
				<div className="h-full flex flex-col">
					{/* Menu items */}
					<ul className="flex-1 space-y-8 px-8 py-2 mt-28">
						{menuItems.map((item, index) => (
							<li key={index}>
								<a
									href={item.href}
									onClick={
										item.text === "Logout"
											? handleLogout // Add the logout handler here
											: () => setIsMobileMenuOpen(false)
									}
									className="flex items-center space-x-4 text-gray-700 hover:text-green-600 transition-colors duration-200">
									<item.icon className="w-6 h-6" />
									<span
										className={`${
											isMobileMenuOpen
												? "opacity-100"
												: "opacity-0 md:opacity-100"
										} transition-opacity duration-200`}>
										{item.text}
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</aside>

			{/* Main content area  */}
			<main
				className={`transition-all duration-300 ease-in-out ${
					isMobileMenuOpen ? "ml-64" : ""
				}`}></main>

			{/* Floating Action Button */}
			<a
				href="/admin/addproduct"
				className="fixed md:bottom-20 md:right-20 bottom-10 right-10 bg-green-600 text-white rounded-full p-5 shadow-lg"
				aria-label="Add new item">
				<FaPlus className="w-6 h-6 font-light" />
			</a>
		</>
	);
};

export default AdminNavbar;
