import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import { GoSearch } from "react-icons/go";
import { PiBag } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/auth/authActions";

const Navbar = () => {
	const dispatch = useDispatch();
	// Assuming you have auth state in Redux, use useSelector to get the user state
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logoutAction());
	};

	return (
		<nav className="bg-white shadow-md p-4 select-none">
			<div className="container mx-auto flex justify-between items-center">
				{/* Hamburger Menu for Mobile */}
				<div
					className="md:hidden text-2xl z-50"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
					{isMobileMenuOpen ? (
						<LiaTimesSolid className="w-7 h-7 hidden" />
					) : (
						<RxHamburgerMenu className="w-7 h-7" />
					)}
				</div>

				{/* Links for Desktop */}
				<ul className="hidden md:flex space-x-6">
					<li>
						<a href="/shop" className="text-gray-700">
							Shop
						</a>
					</li>
					<li>
						<a href="/about" className="text-gray-700">
							About
						</a>
					</li>
				</ul>

				{/* Logo */}
				<div className="text-4xl mx-auto">
					<a href="/" className="font-kingthings">
						Gazelle
					</a>
				</div>

				{/* Right-side icons */}
				<div className="flex items-center space-x-6">
					{/* Search Icon */}
					<div className="text-xl md:text-2xl">
						<GoSearch />
					</div>

					{/* Conditionally render Welcome or Login */}
					{isAuthenticated ? (
						<span className="text-gray-700">
							Welcome, {user.firstName}
						</span>
					) : (
						<a href="/login" className="text-gray-700">
							Login
						</a>
					)}

					{/* Cart Icon */}
					<a href="/cart" className="text-2xl">
						<PiBag />
					</a>

					{/* Conditionally render Logout */}
					{isAuthenticated && (
						<button
							onClick={handleLogout}
							className="text-gray-700 flex items-center space-x-2">
							<BiLogOut className="text-2xl" />
							<span>Logout</span>
						</button>
					)}
				</div>
			</div>

			{/* Mobile Menu Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform ${
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out`}>
				{/* Sidebar Header */}
				<div className="flex items-center justify-between p-4 border-b">
					{/* Close Button */}
					<LiaTimesSolid
						className="w-7 h-7 text-gray-700 cursor-pointer"
						onClick={() => setIsMobileMenuOpen(false)}
					/>

					{/* Logo */}
					<div className="text-4xl text-center mx-auto">
						<a href="/" className="font-kingthings">
							Gazelle
						</a>
					</div>
				</div>

				{/* Sidebar Navigation Links */}
				<ul className="space-y-6 mt-6 px-6 text-center">
					<li>
						<a
							href="/shop"
							className="text-gray-700 block text-lg border-b pb-2">
							Shop
						</a>
					</li>
					<li>
						<a
							href="/about"
							className="text-gray-700 block text-lg border-b pb-2">
							About
						</a>
					</li>
					<li>
						<a
							href="/contact"
							className="text-gray-700 block text-lg border-b pb-2">
							Contact
						</a>
					</li>
				</ul>

				{/* Conditionally render Login/Logout in Mobile Menu */}
				<div className="absolute bottom-10 left-0 w-full px-6 text-center md:hidden">
					{isAuthenticated ? (
						<button
							onClick={handleLogout}
							className="flex items-center space-x-3 text-lg text-gray-700">
							<BiLogOut className="text-2xl" />
							<span>Logout</span>
						</button>
					) : (
						<a
							href="/login"
							className="flex items-center align-center space-x-2 text-gray-700">
							<FaSignInAlt className="text-2xl" />
							<span>Login</span>
						</a>
					)}
				</div>
			</div>

			{/* Overlay for mobile sidebar */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-30"
					onClick={() => setIsMobileMenuOpen(false)}></div>
			)}
		</nav>
	);
};

export default Navbar;
