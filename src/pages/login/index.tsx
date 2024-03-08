import { Inter } from "next/font/google";
import styles from "./login.module.css";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

type profile = {
  uid: string;
  displayName: string;
  introduction: string;
};

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const auth = getAuth();
const db = getFirestore();

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

  const myProRef = doc(db, "UsersProfile", `${auth.currentUser?.uid}`);
  await setDoc(
    myProRef,
    {
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      introduction: "自己紹介文を書いてください",
    },
    { merge: true }
  );
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
