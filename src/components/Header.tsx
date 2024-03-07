import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { PostButton } from "./PostButton";

export const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>CSS Art Gallery</h1>
      <div className={styles.wrapper}>
        <PostButton>+ POST</PostButton>
        <Image
          width={50}
          height={50}
          className={styles.search}
          src="/search.svg"
          alt="Search"
        />
        <Image
          width={50}
          height={50}
          className={styles.user}
          src="/user.svg"
          alt="User"
        />
      </div>
    </header>
  );
};
