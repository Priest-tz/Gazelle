import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addUserToFirestore } from "../firebase/firestoreUtils";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, loading] = useAuthState(getAuth(app));
	const [authUser, setAuthUser] = useState(user);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
			setAuthUser(user);
		});

		return () => unsubscribe();
	}, []);

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(getAuth(app), provider);
			if (result.user) {
				await addUserToFirestore(result.user.uid, {
					email: result.user.email,
					displayName: result.user.displayName,
				});
			}
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
	};

	const signOutUser = async () => {
		try {
			await signOut(getAuth(app));
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	const value = {
		user: authUser,
		loading,
		signInWithGoogle,
		signOutUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
