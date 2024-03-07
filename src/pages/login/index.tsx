import { Inter } from "next/font/google";
import styles from "./login.module.css";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = getAuth();

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  return (
    <>
      <div className={styles.title}>
        <h1>ログインページ</h1>
        <button onClick={login}>Googleでログイン</button>
      </div>
      <Link className={styles.tag} href="../mypage">
        マイページ
      </Link>
      <Link href="/">ギャラリーに戻る</Link>
    </>
  );
}
