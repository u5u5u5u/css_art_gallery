import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "./works.module.css";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  height: number;
  width: number;
  html: string;
  css: string;
  author: string;
  authorId: string;
  tags: string[];
};

const inter = Inter({ subsets: ["latin"] });

const auth = getAuth();
const db = getFirestore();

export default function Home() {
  useEffect(() => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getWorks(id);
      } else {
        console.log("not logged in");
      }
    });

    return () => unsubscribe(); // cleanup function
  }, []);

  async function getWorks(id: string) {
    // ここでworksのデータを取得して表示する
    // "Works"コレクションから特定のドキュメントを取得する
    const workRef = doc(db, "Works", id);
    const workSnapshot = await getDoc(workRef);

    if (workSnapshot.exists()) {
      // ドキュメントのデータを取得する
      const workData = workSnapshot.data() as Post;
      console.log(workData);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <>
      <Link href="/">ギャラリーに戻る</Link>
      <div>
        <div className={styles.canvas}></div>
        <div className={styles.editor}>
          <div className={styles.canvasCode}>
            <div>
              <h2>HTML</h2>
            </div>
            <div>
              <h2>CSS</h2>
            </div>
          </div>
        </div>
        <div className={styles.workDetail}></div>
      </div>
    </>
  );
}
