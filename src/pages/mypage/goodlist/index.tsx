import { Inter } from "next/font/google";
import styles from "./goodlist.module.css";
import Link from "next/link";
import { PostList } from "@/components/Goodlist";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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
  //UserFavoritesに保存されているworkIdを取得してPostListに渡す
  const [works, setWorks] = useState<Post[]>([]);

  useEffect(() => {
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getFavorites();
      } else {
        console.log("not logged in");
      }
    });
    return () => unsubscribe(); // cleanup function
  }, []);

  useEffect(() => {
    console.log(works);
  }, [works]);

  async function getFavorites() {
    // ここでUserFavoritesのデータを取得して表示する
    const user = auth.currentUser;
    const docRef = doc(db, "UserFavorites", `${user?.uid}`);

    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      const workIds: string[] = docSnapshot.data()?.workIds;
      fetchWorks(workIds);
    } else {
      console.log("No such document!");
    }
  }

  async function fetchWorks(data: string[]) {
    const worksRef = collection(db, "Works");
    const worksList: Post[] = [];

    // data配列の各要素に対して処理を行う
    for (const name of data) {
      const docRef = doc(worksRef, name);
      const docSnapshot = await getDoc(docRef);

      // ドキュメントが存在する場合、そのデータをworksListに追加する
      if (docSnapshot.exists()) {
        worksList.push(docSnapshot.data() as Post);
      }
    }

    setWorks(worksList);
  }

  return (
    <>
      <div className={styles.title}>
        <h1>いいねした作品</h1>
      </div>
      <PostList Post={works} />
      <Link className={styles.tag} href="/">
        ギャラリーに戻る
      </Link>
      <PostList Post={[]} />
    </>
  );
}
