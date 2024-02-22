import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const addUserToFirestore = async (uid, userData) => {
	const userDocRef = doc(db, "users", uid);
	try {
		const updatedUserData = {
			...userData,
			displayName: userData.displayName,
			email: userData.email,
			cart: { items: [] },
		};

		await setDoc(userDocRef, updatedUserData);

		console.log("Document written with ID: ", uid);
	} catch (error) {
		console.error("Error adding document: ", error.message);
	}
};

const addCartItem = async (uid, item) => {
	const userDocRef = doc(db, "users", uid);

	try {
		const userDoc = await getDoc(userDocRef);
		const userData = userDoc.data();
		const itemKey = `${item.productId}-${item.size}`;

		const existingCartItemIndex = userData.cart.items.findIndex(
			(cartItem) => cartItem.key === itemKey
		);

		if (existingCartItemIndex !== -1) {
			const existingItem = userData.cart.items[existingCartItemIndex];
			if (existingItem.size === item.size) {
				existingItem.quantity += item.quantity;
			} else {
				const itemKey = `${item.productId}-${item.size}-${Date.now()}`;
				item.key = itemKey;
				userData.cart.items.push(item);
			}
		} else {
			item.key = itemKey;
			userData.cart.items = [...userData.cart.items, item];
		}

		await updateDoc(userDocRef, {
			cart: userData.cart,
		});

		console.log("Item added to the cart in Firestore.");
	} catch (error) {
		console.error(
			"Error adding item to cart in Firestore: ",
			error.message
		);
	}
};

const removeCartItem = async (uid, itemKey) => {
	const userDocRef = doc(db, "users", uid);

	try {
		const userDoc = await getDoc(userDocRef);
		const userData = userDoc.data();

		const updatedCartItems = userData.cart.items.filter(
			(cartItem) => cartItem.key !== itemKey
		);

		await updateDoc(userDocRef, {
			cart: {
				items: updatedCartItems,
			},
		});

		return updatedCartItems;
	} catch (error) {
		console.error(
			"Error removing item from cart in Firestore: ",
			error.message
		);
		throw error;
	}
};

export { addUserToFirestore, addCartItem, removeCartItem };
