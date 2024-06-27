import { firestore } from "firebase-functions";
import { initializeApp } from "firebase-admin";
import { createTransport } from "nodemailer";

const app = initializeApp();

const transporter = createTransport({
	service: "gmail",
	auth: {
		user: "gazelletja@gmail.com",
		pass: process.env.REACT_APP_SMTP,
	},
});

export const sendOrderConfirmationEmail = firestore
	.document("orders/{orderId}")
	.onCreate(async (snapshot, context) => {
		const orderData = snapshot.data();
		const userEmail = orderData.user.email;

		const mailOptions = {
			from: "gazelletja@gmail.com",
			to: userEmail,
			subject: "Order Confirmation - Gazelle",
			html: `
        <h1>Thank you for your order!</h1>
        <p>Your order details are as follows:</p>
        <ul>
          <li>Order ID: ${orderData.orderId}</li>
          <li>Items:</li>
            <ul>
              ${orderData.products
					.map(
						(item) =>
							`<li>${item.name} (Quantity: ${item.quantity}) - ₦${item.price}</li>`
					)
					.join("")}
            </ul>
          <li>Total Price: ₦${orderData.totalSum}</li>
        </ul>
        <p>We will keep you updated on the status of your order.</p>
        <p>Thanks,</p>
        <p>The Gazelle Team</p>
      `,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log("Email sent successfully");
		} catch (error) {
			console.error("Error sending email:", error);
		}
	});
