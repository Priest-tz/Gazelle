import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	const [isHamburgerActive, setHamburgerActive] = React.useState(false);

	const toggleHamburger = () => {
		setHamburgerActive(!isHamburgerActive);
	};

	return (
		<div className="navBar">
			<div className="logo">
				<NavLink to="/">
					<img
						src="https://res.cloudinary.com/dgnb567j3/image/upload/v1704987291/Gazelle/Logo.png"
						className="name"
						alt="Logo"
					/>
				</NavLink>
			</div>

			<nav className={` ${isHamburgerActive ? "active" : ""}`}>
				<ul className="mainMenu">
					<li>
						<NavLink to="/shop" activeClassName="active">
							Shop
						</NavLink>
					</li>
					<li>
						<NavLink to="/" activeClassName="active">
							Gallery
						</NavLink>
					</li>

					<li>
						<NavLink to="/" activeClassName="active">
							Contact us
						</NavLink>
					</li>
				</ul>

				<ul className="userMenu">
					<li>
						<NavLink to="/auth" activeClassName="active">
							<FontAwesomeIcon icon={faUser} />
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/checkout"
							title="Cart"
							activeClassName="active">
							<FontAwesomeIcon icon={faShoppingCart} />
						</NavLink>
					</li>
				</ul>
			</nav>

			<div
				className={`hamburger ${isHamburgerActive ? "active" : ""}`}
				onClick={toggleHamburger}>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
		</div>
	);
};

export default Navbar;
