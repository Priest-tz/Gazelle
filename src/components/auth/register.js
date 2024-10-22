import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/AuthActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineUser,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from "react-icons/ai";
import home from "../../data/images/home.jpg";
import { nigerianStates as states } from "../../data/nigerianStates";

// Admin email list
const adminEmails = ["admin1@example.com", "admin2@example.com"];

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [selectedState, setSelectedState] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate(); 
	const { isLoading, error } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();

		const isAdmin = adminEmails.includes(email);

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		dispatch(
			register(
				{
					firstName,
					lastName,
					email,
					password,
					isAdmin,
					userState: selectedState,
				},
				navigate("/login")
			)
		);
	};

	return (
		<div
			className="relative flex justify-center items-center h-screen bg-center bg-cover"
			style={{ backgroundImage: `url(${home})` }}>
			{/* Black inset overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50"></div>

			{/* Content above the overlay */}
			<div className="relative z-10 bg-white p-6 m-3 rounded-md shadow-md w-full max-w-md bg-opacity-70">
				<h2 className="text-5xl font-kingthings mb-2 text-center">
					Gazelle
				</h2>
				<h4 className="text-base mb-6 text-center text-gray-600">
					Create an account
				</h4>

				{error && <p className="text-red-500 text-center">{error}</p>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					{/* First Name */}
					<div className="mb-4 relative">
						<AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
							className="w-full pl-10 p-3 border rounded-md"
							required
						/>
					</div>

					{/* Last Name */}
					<div className="mb-4 relative">
						<AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
							className="w-full pl-10 p-3 border rounded-md"
							required
						/>
					</div>

					{/* Email */}
					<div className="mb-4 relative">
						<AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="w-full pl-10 p-3 border rounded-md"
							required
						/>
					</div>

					{/* State Dropdown */}
					<div className="mb-4 relative">
						<select
							value={selectedState}
							onChange={(e) => setSelectedState(e.target.value)}
							className="w-full pl-9 p-3 border rounded-md text-gray-500"
							required>
							<option className="text-gray-500" value="">
								Select State
							</option>
							{states.map((state) => (
								<option
									key={state}
									value={state}
									className="text-gray-500">
									{state}
								</option>
							))}
						</select>
					</div>

					{/* Password */}
					<div className="mb-4 relative">
						<AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className="w-full pl-10 p-3 border rounded-md"
							required
						/>
						<button
							type="button"
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? (
								<AiOutlineEye />
							) : (
								<AiOutlineEyeInvisible />
							)}
						</button>
					</div>

					{/* Confirm Password */}
					<div className="mb-4 relative">
						<AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
						<input
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm Password"
							className="w-full pl-10 p-3 border rounded-md"
							required
						/>
						<button
							type="button"
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}>
							{showConfirmPassword ? (
								<AiOutlineEye />
							) : (
								<AiOutlineEyeInvisible />
							)}
						</button>
					</div>

					{/* Register Button */}
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-md"
						disabled={isLoading}>
						{isLoading
							? "Creating Account..."
							: "Create an account"}
					</button>
				</form>

				<p className="text-center text-gray-600 mt-5 text-sm">
					Already have an account?{" "}
					<a href="/login" className="text-green-600 font-semibold">
						Login instead
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
