import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { PostButton } from "./PostButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const auth = getAuth();

export const Header = () => {
  var user = auth.currentUser;

  const [userState, setUserState] = useState(false);

  useEffect(() => {
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        setUserState(true);
      } else {
        console.log("not logged in");
        setUserState(false);
      }
    });
    return () => unsubscribe(); // cleanup function
  }, []);

  const myPage = () => {
    if (userState) {
      location.replace(`/mypage?uid=${user?.uid}`);
    } else {
      location.replace("/login");
    }
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>CSS Art Gallery</h1>
      <div className={styles.wrapper}>
        <PostButton onClick={() => location.replace("./post")}>
          + POST
        </PostButton>

        <input type="search" name="search" className={styles.input} />

        <Image
          width={50}
          height={50}
          className={styles.search}
          src="/search.svg"
          alt="Search"
        />
        <input type="checkbox" className={styles.search_check} />
        <Image
          width={50}
          height={50}
          className={styles.user}
          src="/user.svg"
          alt="User"
          onClick={myPage}
        />
        <div className={styles.menu}></div>
      </div>
    </header>
  );
};
