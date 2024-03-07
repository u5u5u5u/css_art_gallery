import { Html, Head, Main, NextScript } from "next/document";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
