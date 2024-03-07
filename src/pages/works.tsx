import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEPCbwPiDhZ28uOtd5w8lfASYju-8Qjwo",
  authDomain: "css-art-gallery-37fd1.firebaseapp.com",
  projectId: "css-art-gallery-37fd1",
  storageBucket: "css-art-gallery-37fd1.appspot.com",
  messagingSenderId: "144393141302",
  appId: "1:144393141302:web:6dd4af313abf260a1fac97",
  measurementId: "G-72G1M5GNFT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function Addfavorite() {
    console.log("like");
    const favRef = collection(db, "User", "UserId", "Favorite");
    const docRef = await addDoc(favRef, {
      favId: "favId",
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async function PostWorks() {
    const worksRef = collection(db, "Works");
    const docRef = await addDoc(worksRef, {
      title: "title",
      html: "html",
      css: "css",
    });
    console.log("Document written with ID: ", docRef.id);
  }
  async function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <h1>kakusakuhinnじゃなくてworks</h1>
      <Link href="/">ギャラリーに戻る</Link>
      <button onClick={Addfavorite}>like</button>
      <button onClick={login}>login</button>
      <button onClick={PostWorks}>post</button>
    </>
  );
}
