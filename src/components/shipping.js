import React from "react";

// Function to calculate the shipping fee based on the state
const calculateShippingFee = (state) => {
	const isLagos = state.trim().toLowerCase() === "lagos";
	const shippingFee = isLagos ? 4000 : 5000;
	return shippingFee;
};

// ShippingOptions component for selecting shipping options and providing address details
const ShippingOptions = ({ cart, onContinue, onBack }) => {
	// State to manage selected shipping option and address details
	const [shippingOption, setShippingOption] = React.useState("");
	const [address, setAddress] = React.useState({
		shippingAddress: "",
	});
	const [shippingFee, setShippingFee] = React.useState(0);

	// Handler for changing the selected shipping option
	const handleOptionChange = (e) => {
		setShippingOption(e.target.value);

		// If the selected option is "Pickup at the Station," clear the address fields
		if (e.target.value === "pickup") {
			setAddress({
				shippingAddress: "",
			});
		}
	};

	// Handler for changing address details
	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
	};

	// Form submission handler
	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate address fields
		const errors = validateForm(address);

		// If no validation errors, proceed to continue with the selected shipping option and address details
		if (Object.keys(errors).length === 0) {
			const productDetails = cart.map((product) => ({
				productId: product.id,
				...address,
			}));

			const calculatedShippingFee = calculateShippingFee(address.state);
			setShippingFee(calculatedShippingFee);

			onContinue({
				shippingOption,
				productDetails,
				shippingFee: calculatedShippingFee,
			});
		} else {
			console.error("Validation errors:", errors);
		}
	};

	// Function to validate address fields
	const validateForm = (address) => {
		const errors = {};

		if (!address.houseNumber.trim()) {
			errors.houseNumber = "House Number is required";
		}

		if (!address.streetName.trim()) {
			errors.streetName = "Street Name is required";
		}

		if (!address.phoneNumber.trim()) {
			errors.phoneNumber = "Phone Number is required";
		} else if (!/^\d{10}$/.test(address.phoneNumber)) {
			errors.phoneNumber = "Invalid Phone Number format";
		}

		if (!address.state.trim()) {
			errors.state = "State is required";
		}

		if (!address.emailAddress.trim()) {
			errors.emailAddress = "Email Address is required";
		} else if (!/\S+@\S+\.\S+/.test(address.emailAddress)) {
			errors.emailAddress = "Invalid Email Address format";
		}

		return errors;
	};

	// JSX structure for the ShippingOptions component
	return (
		<div className="shippingContainer">
			<span className="shipHead">Delivery Information</span>
			<form onSubmit={handleSubmit}>
				<div className="options">
					<span className="shipOptions">Shipping Options: </span>
					<label>
						<input
							type="radio"
							value="pickup"
							checked={shippingOption === "pickup"}
							onChange={handleOptionChange}
						/>
						Pickup at the Station
					</label>
					<label>
						<input
							type="radio"
							value="delivery"
							checked={shippingOption === "delivery"}
							onChange={handleOptionChange}
						/>
						Delivery to an Address
					</label>
				</div>

				{/* Display address input fields only when "Delivery" option is selected */}
				{shippingOption === "delivery" && (
					<div className="shippingAddress">
						<span className="addHead">Shipping Address: </span>
						<label>
							House Number:
							<input
								type="text"
								name="houseNumber"
								value={address.houseNumber}
								onChange={handleAddressChange}
								placeholder="Enter house number"
							/>
						</label>
						<label>
							Street Name:
							<input
								type="text"
								name="streetName"
								value={address.streetName}
								onChange={handleAddressChange}
								placeholder="Enter street name"
							/>
						</label>
						<label>
							Phone Number:
							<input
								type="tel"
								name="phoneNumber"
								value={address.phoneNumber}
								onChange={handleAddressChange}
								placeholder="Enter phone number"
							/>
						</label>
						<label>
							State:
							<input
								type="text"
								name="state"
								value={address.state}
								onChange={handleAddressChange}
								placeholder="Enter state"
							/>
						</label>
						<label>
							Email Address:
							<input
								type="email"
								name="emailAddress"
								value={address.emailAddress}
								onChange={handleAddressChange}
								placeholder="Enter email address"
							/>
						</label>
					</div>
				)}
			</form>
		</div>
	);
};

export default ShippingOptions;
