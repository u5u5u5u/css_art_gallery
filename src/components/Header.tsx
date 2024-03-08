import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { PostButton } from "./PostButton";
import Link from "next/link";

export const Header = () => {
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
        <Link href="/mypage">
          <Image
            width={50}
            height={50}
            className={styles.user}
            src="/user.svg"
            alt="User"
          />
        </Link>
        <div className={styles.menu}></div>
      </div>
    </header>
  );
};
