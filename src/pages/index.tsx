import Head from "next/head";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import styles from "./index.module.css";
import Link from "next/link";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PostList } from "@/components/Goodlist";
import { use } from "react";
import { get } from "http";
import { set } from "firebase/database";

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

const db = getFirestore();
const auth = getAuth();

export default function Home() {
  const [works, setWorks] = useState<Post[]>([]);
  const [userState, setUserState] = useState<boolean>(false);

  useEffect(() => {
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getWorks();
      } else {
        console.log("not logged in");
      }
    });

    return () => unsubscribe(); // cleanup function
  }, []);

  async function getWorks() {
    // ここでworksのデータを取得して表示する
    const worksRef = collection(db, "Works");
    // documentの中身はpost型のデータを持っているのでworksに一つずつ入れる
    const worksSnapshot = await getDocs(worksRef);
    const worksList: Post[] = [];
    worksSnapshot.forEach((doc) => {
      worksList.push(doc.data() as Post);
    });
    setWorks(worksList);
    console.log(worksList);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <Link className={styles.tag} href="./search">
            検索欄
          </Link>
          <Link className={styles.tag} href="./post">
            投稿ページ
          </Link>
          <div className={styles.tag}>
            <Button onClick={() => location.replace("./login")}>
              ログインページ
            </Button>
          </div>
          <div>
            <PostList Post={works} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
