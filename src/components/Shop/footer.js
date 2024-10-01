import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";

const Footer = () => {
	return (
		<footer className="bg-black text-productText py-8 mt-auto w-full">
			<div className="w-full px-4">
				{/* Newsletter Section */}
				<div className="border-b border-gray-700 p-4 w-full bg-white">
					<div className="flex flex-col md:flex-row justify-around items-center w-full py-6">
						<div className="mb-4 md:mb-0 text-center md:text-left">
							<h2 className="text-lg md:text-xl font-bold mb-2">
								Subscribe to our newsletter
							</h2>
							<p className="text-sm md:text-base">
								Get E-mail updates about our latest releases and
								offers
							</p>
						</div>
						<form className="flex w-full md:w-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-grow px-2 py-3 md:w-96 w-full rounded-l-md focus:outline-none text-gray-800 border border-black"
							/>
							<button
								type="submit"
								className="bg-gray-500 text-white px-4 py-3 rounded-r-md hover:bg-gray-700 transition duration-300">
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Privacy & Social Media Links Section */}
				<div className="border-b border-gray-700 py-4 flex justify-around items-center w-full bg-white">
					<div className="flex gap-4 mb-4 md:mb-0 justify-center items-center">
						<Link
							to="/privacy-policy"
							className="hover:text-blue-300 transition duration-300 text-xs md:text-base">
							Privacy Policy
						</Link>
						<Link
							to="/terms-of-service"
							className="hover:text-blue-300 transition duration-300 text-xs md:text-base">
							Terms of Service
						</Link>
						<Link
							to="/refund-policy"
							className="hover:text-blue-300 transition duration-300 text-xs md:text-base">
							Return Policy
						</Link>
					</div>
					<div className="flex items-center space-x-2">
						<a
							href="https://instagram.com"
							className="text-gray-400 hover:text-gray-300 transition duration-300">
							<FaInstagram size={28} />
						</a>
						<FaCcMastercard size={28} className="text-gray-400" />
						<RiVisaLine size={28} className="text-gray-400" />
					</div>
				</div>

				{/* Logo & Copyright Section */}
				<div className="flex justify-around items-center pt-4 w-full bg-white">
					<div className="text-3xl md:text-4xl">
						<a href="/" className="font-kingthings text-black">
							Gazelle
						</a>
					</div>
					<p className="text-xs md:text-sm mt-4 md:mt-0 text-black">
						&copy; 2024 by Dara
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
