import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faCcMastercard,
	faCcVisa,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="emailSub">
				<div className="text">
					<h4>Subscribe to our newsletter</h4>
					<p>
						Get E-mail updates about our latest releases and offers
					</p>
				</div>

				<form className="form">
					<input type="email" placeholder="Enter your email" />
					<button type="submit">Subscribe</button>
				</form>
			</div>

			<div className="policyLinks">
				<Link to="/privacy-policy">Privacy Policy</Link>
				<Link to="/terms-of-service">Terms of Service</Link>
				<Link to="/refund-policy">Return Policy</Link>
			</div>

			<div className="payMedia">
				<a href="instagram.com">
					<FontAwesomeIcon icon={faInstagram} size="2x" />
				</a>

				<div className="media">
					<FontAwesomeIcon icon={faCcMastercard} size="2x" />
					<FontAwesomeIcon
						icon={faCcVisa}
						size="2x"
						style={{ marginRight: "10px" }}
					/>
				</div>
			</div>

			<div className="copyright">
				<p>© 2024 by Dara</p>
			</div>
		</footer>
	);
};

export default Footer;
