import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authActions";
import home from "../../data/images/home.jpg";
import {
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineEye,
	AiOutlineEyeInvisible,
} from "react-icons/ai";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginResult = await dispatch(login(email, password));
			if (loginResult) {
				if (loginResult.user.isAdmin) {
					navigate("/admin/products");
				} else {
					navigate("/shop");
				}
			}
		} catch (err) {
			setError("Login failed. Please check your credentials.");
		}
	};

	return (
		<div
			className="relative flex justify-center items-center h-screen bg-center bg-cover"
			style={{
				backgroundImage: `url(${home})`,
			}}>
			{/* Black inset overlay */}
			<div className="absolute inset-0 bg-black bg-opacity-50"></div>

			{/* Content above the overlay */}
			<div className="relative z-10 bg-white p-6 m-3 rounded-md shadow-md w-full max-w-md bg-opacity-60">
				<h2 className="text-5xl font-kingthings mb-2 text-center">
					Gazelle
				</h2>
				<h4 className="text-base  mb-6 text-center text-gray-600">
					Login to your account
				</h4>

				{/* Error Message */}
				{error && (
					<p className="text-red-500 text-center mb-4">{error}</p>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
						{/* Eye toggle button */}
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

					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-md">
						Login
					</button>
				</form>
				<p className="text-center text-gray-600 mt-5 text-sm">
					Don't have an account?{" "}
					<a
						href="/register"
						className="text-green-600 font-semibold">
						Register instead
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
