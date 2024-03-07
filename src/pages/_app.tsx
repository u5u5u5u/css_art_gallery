import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEPCbwPiDhZ28uOtd5w8lfASYju-8Qjwo",
  authDomain: "css-art-gallery-37fd1.firebaseapp.com",
  projectId: "css-art-gallery-37fd1",
  storageBucket: "css-art-gallery-37fd1.appspot.com",
  messagingSenderId: "144393141302",
  appId: "1:144393141302:web:6dd4af313abf260a1fac97",
  measurementId: "G-72G1M5GNFT",
};

const app = initializeApp(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
