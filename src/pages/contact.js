import React from "react";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import SpinLoader from "../components/spinningLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faEnvelope,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";

const ContactPage = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const isMounted = React.useRef(true);
	const [errors, setErrors] = React.useState({});
	const [formData, setFormData] = React.useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		message: "",
	});

	React.useEffect(() => {
		isMounted.current = true;

		const loadingTimer = setTimeout(() => {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}, 3000);

		return () => {
			isMounted.current = false;
			clearTimeout(loadingTimer);
		};
	}, []);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
		phoneNumber: Yup.string()
			.matches(/^\d{11}$/, "Phone number must be 11 digits")
			.required("Phone Number is required"),
		email: Yup.string()
			.email("Invalid email")
			.required("Email is required"),
		message: Yup.string().required("Message is required"),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		validationSchema
			.validate(formData, { abortEarly: false })
			.then(() => {
				console.log("Form submitted:", formData);
				setFormData({
					firstName: "",
					lastName: "",
					phoneNumber: "",
					email: "",
					message: "",
				});
				setErrors({});
			})
			.catch((err) => {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			});
	};

	return (
		<div className="contactPage">
			{isLoading ? (
				<SpinLoader />
			) : (
				<>
					<Navbar />

					<div className="textHeader">
						<span className="major">Contact Us</span>
						<span className="minor">
							Have any question or feedback, feel free to reach
							out to us. We are always available to help
						</span>
					</div>

					<div className="contactContent">
						<div className="left">
							<span className="head">Reach Out to Us</span>
							<span className="sub">
								Feel free to reach out to us, be it in come
								visiting, or on our social media handle.
							</span>

							<div className="contact">
								<span className="number">
									<FontAwesomeIcon
										icon={faPhone}
										style={{
											color: "#606063",
											marginRight: "6px",
										}}
									/>
									+234 80 456 798 21
								</span>
								<span className="mail">
									<FontAwesomeIcon
										icon={faEnvelope}
										style={{
											color: "#606063",
											marginRight: "6px",
										}}
									/>
									Gazelletja@gmail.com
								</span>
								<span className="location">
									<FontAwesomeIcon
										icon={faLocationDot}
										style={{
											color: "#606063",
											marginRight: "6px",
										}}
									/>
									Ikeja, Lagos
								</span>
							</div>
						</div>

						<div className="right">
							<form onSubmit={handleSubmit}>
								<div className="row1">
									<div>
										<label htmlFor="firstName">
											First Name
										</label>
										<input
											type="text"
											id="firstName"
											name="firstName"
											value={formData.firstName}
											onChange={handleChange}
										/>
										{errors.firstName && (
											<div className="error">
												{errors.firstName}
											</div>
										)}
									</div>
									<div>
										<label htmlFor="lastName">
											Last Name
										</label>
										<input
											type="text"
											id="lastName"
											name="lastName"
											value={formData.lastName}
											onChange={handleChange}
										/>
										{errors.lastName && (
											<div className="error">
												{errors.lastName}
											</div>
										)}
									</div>
								</div>
								<div className="row2">
									<div>
										<label htmlFor="phoneNumber">
											Phone Number
										</label>
										<input
											type="text"
											id="phoneNumber"
											name="phoneNumber"
											value={formData.phoneNumber}
											onChange={handleChange}
										/>
										{errors.phoneNumber && (
											<div className="error">
												{errors.phoneNumber}
											</div>
										)}
									</div>
									<div>
										<label htmlFor="email">Email</label>
										<input
											type="text"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
										/>
										{errors.email && (
											<div className="error">
												{errors.email}
											</div>
										)}
									</div>
								</div>

								<div className="msgBody">
									<label htmlFor="message">Message</label>
									<textarea
										id="message"
										value={formData.message}
										onChange={handleChange}
									/>
									{errors.message && (
										<div className="error">
											{errors.message}
										</div>
									)}
								</div>

								<button type="submit">Send Message</button>
							</form>
						</div>
					</div>
					<Footer />
				</>
			)}
		</div>
	);
};

export default ContactPage;
