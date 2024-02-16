"use client";
import { createContext, useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	deleteDoc,
	doc,
	getFirestore,
	collection,
	addDoc,
	updateDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";

const firebaseConfig = {
	apiKey: "AIzaSyDqbfejYC6USd4i8s9WOhPcFKEsfcoxrO4",
	authDomain: "todo-app-414410.firebaseapp.com",
	projectId: "todo-app-414410",
	storageBucket: "todo-app-414410.appspot.com",
	messagingSenderId: "502233930938",
	appId: "1:502233930938:web:fe8511019fcb81808c3683",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
	const [logedin, setislogedin] = useState(false);
	const [user, setuser] = useState(null);

	const [data, setdata] = useState([]);
	const signupUser = ({ email, password }) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				toast.success("Registration Successful");
				// alert("Registration Successful");
				authchange();
			})
			.catch((err) => {
				toast.error("Singup Failed!");
				alert("Error:", err.message);
			});
	};

	const signinUser = ({ email, password }) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				toast.success("Login Successful");
				setTimeout(() => {
					authchange();
				}, 1000);
			})
			.catch((err) => {
				toast.error("Login Failed!");
				console.log("Login not successful:", err);
			});
	};
	const signout = () => {
		signOut(auth)
			.then((res) => {
				alert("Logout Successful");
				authchange();
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	const authchange = () => {
		auth.onAuthStateChanged((user) => {
			setislogedin(user && user.uid ? true : false);
			setuser(user);
		});
		return { logedin, user };
	};
	const craeteTodo = async ({ userId, title, description, status }) => {
		try {
			await addDoc(collection(firestore, "todos"), {
				user: userId,
				title: title,
				description: description,
				status: status,
			});
		} catch (error) {
			console.log(error);
			toast.error("Not Added");
		}
	};
	const toggleStatus = async ({ docId, status }) => {
		try {
			const todoref = doc(firestore, "todos", docId);
			await updateDoc(
				todoref,
				{
					status: status,
				},
				{ merge: true }
			);
		} catch (error) {
			console.log(error);
			toast.error("Changed");
		}
	};
	const deleteTodo = async (docId) => {
		try {
			const todoref = doc(firestore, "todos", docId);
			await deleteDoc(todoref);
		} catch (error) {
			console.log(error);
			toast.error("Changed");
		}
	};

	const editTodo = async (docId, { title, description }) => {
		try {
			const todoRef = doc(firestore, "todos", docId);
			await updateDoc(
				todoRef,
				{
					title,
					description,
				},
				{ merge: true }
			);
		} catch (error) {
			console.log(error);
			toast.error("Changed");
		}
	};

	return (
		<FirebaseContext.Provider
			value={{
				signupUser,
				signinUser,
				signout,
				authchange,
				craeteTodo,
				toggleStatus,
				deleteTodo,
				editTodo,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
