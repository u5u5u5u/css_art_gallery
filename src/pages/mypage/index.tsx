import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./mypage.module.css";
import Link from "next/link";
import { PostList } from "@/components/Goodlist";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import Modal from "react-modal";
import { PostButton } from "../../components/PostButton";
import clsx from "clsx";

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

const auth = getAuth();
const db = getFirestore();

export default function Home() {
  const router = useRouter();
  const { uid } = router.query;

  const [modal, setModal] = useState(false);
  const [works, setWorks] = useState<Post[]>([]);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getMyWorksId();
      } else {
        console.log("not logged in");
      }
    });
    return () => unsubscribe(); // cleanup function
  }, [uid]);

  async function getMyWorksId() {
    // ここでUserFavoritesのデータを取得して表示する
    const user = auth.currentUser;
    const docRef = doc(db, "UsersWorks", `${uid}`);

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

      <Link className={styles.tag} href="../mypage/goodlist">
        いいねした作品
      </Link>
      <Link className={styles.tag} href="/">
        ギャラリーに戻る
      </Link>

      <div className={styles.icon_name_detail}>
        <div className={styles.icon}></div>

        <div className={styles.name_detail}>
          <div className={styles.name}>hoge</div>

          <div>
            <div className={styles.detail_frame}>hogehoge</div>
            <PostButton onClick={openModal} className={styles.edit_button}>
              編集
            </PostButton>
            <div className={styles.modal_grandparent}>
              <Modal isOpen={modal} className={styles.modal_parent}>
                <textarea
                  className={styles.placeholder_name}
                  placeholder=" 名前"
                ></textarea>
                <textarea
                  className={styles.placeholder_detail}
                  placeholder=" 自己紹介"
                ></textarea>
                <PostButton
                  onClick={closeModal}
                  className={styles.close_button}
                >
                  閉じる
                </PostButton>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.page_s_title}>作品</div>
        <PostList Post={works} />
      </div>
    </>
  );
}
