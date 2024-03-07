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
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
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
