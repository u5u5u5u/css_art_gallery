import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import styles from "./search.module.css";
import Link from "next/link";

const auth = getAuth();
const db = getFirestore();
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function Addfavorite() {
    console.log("like");
    const user = auth.currentUser;
    const favRef = collection(
      db,
      "User",
      `${auth.currentUser?.uid}`,
      "Favorite"
    );
    const docRef = await addDoc(favRef, {
      favId: "favId",
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <>
      <Link href="/">ギャラリーに戻る</Link>
      <button onClick={Addfavorite}>like</button>
    </>
  );
}
