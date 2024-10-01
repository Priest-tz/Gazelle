import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { LiaTimesSolid } from "react-icons/lia";
import { GoSearch } from "react-icons/go";
import { PiBag } from "react-icons/pi";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md p-4 select-none">
			<div className="container mx-auto flex justify-between items-center">
				{/* Hamburger Menu for Mobile */}
				<div
					className="md:hidden text-2xl"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
					{isMobileMenuOpen ? (
						<LiaTimesSolid className="w-7 h-7" />
					) : (
						<RxHamburgerMenu className="w-7 h-7" />
					)}
				</div>

				{/* Links for Desktop */}
				<ul className="hidden md:flex space-x-6">
					<li>
						<a
							href="/shop"
							className="text-gray-700 hover:text-primaryGreen">
							Shop
						</a>
					</li>
					<li>
						<a
							href="/about"
							className="text-gray-700 hover:text-primaryGreen">
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
					<div className="text-2xl">
						<GoSearch />
					</div>

					{/* Cart Icon */}
					<a href="/cart" className="text-2xl">
						<PiBag />
					</a>

					{/* Login Link */}
					<a
						href="/login"
						className="hidden md:block text-gray-700 hover:text-primaryGreen">
						Login
					</a>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<ul className="md:hidden mt-4 space-y-6 text-center">
					<li>
						<a
							href="/shop"
							className="text-gray-700 hover:text-primaryGreen">
							Shop
						</a>
					</li>
					<li>
						<a
							href="/about"
							className="text-gray-700 hover:text-primaryGreen">
							About
						</a>
					</li>
					<li>
						<a
							href="/contact"
							className="text-gray-700 hover:text-primaryGreen">
							Contact
						</a>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
