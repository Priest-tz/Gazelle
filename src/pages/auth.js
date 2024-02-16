import React from "react";
import { useAuth } from "../context/authContext";
import { NavLink } from "react-router-dom";
import SpinLoader from "../components/spinningLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Navbar from "../components/navigation";
import Footer from "../components/footer";

const AuthPage = () => {
	const { user, isLoading, signInWithGoogle, signOutUser } = useAuth();

	return (
		<div className="authPage">
			{isLoading || (user && !user.displayName) ? (
				<SpinLoader />
			) : (
				<>
					{user ? (
						<>
							<Navbar />
							<div className="userLogged">
								<span className="userName">
									Welcome, {user.displayName}!
								</span>
								<button
									className="logOut"
									onClick={signOutUser}>
									Log Out
								</button>
							</div>
							<Footer />
						</>
					) : (
						<div className="noUser">
							<NavLink to="/">Gazelle</NavLink>

							<button
								className="login"
								onClick={signInWithGoogle}>
								<FontAwesomeIcon
									className="googleIcon"
									icon={faGoogle}
								/>
								Sign in with Google
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AuthPage;
