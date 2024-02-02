import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCd3H24PYdvnqm3UcEAA_6euSeEzTQl4Rg",
	authDomain: "gazelle-tja.firebaseapp.com",
	projectId: "gazelle-tja",
	storageBucket: "gazelle-tja.appspot.com",
	messagingSenderId: "1098045300746",
	appId: "1:1098045300746:web:dba645b37d49906555bff3",
	measurementId: "G-2SHZWSZ7J6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, getDocs };
