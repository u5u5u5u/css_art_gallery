import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <p className={styles.logo}>CSS Art Gallery</p>
      <ul>
        <li>
          <Image
            width={20}
            height={20}
            src="/brand-instagram.svg"
            alt="instagram"
          />
        </li>
        <li>
          <Image
            width={20}
            height={20}
            src="/brand-twitter-filled.svg"
            alt="twitter"
          />
        </li>
        <li>
          <Image
            width={20}
            height={20}
            src="/brand-github-filled.svg"
            alt="github"
          />
        </li>
        <li>
          <Image
            width={20}
            height={20}
            src="/brand-discord-filled.svg"
            alt="discord"
          />
        </li>
      </ul>
      <p className={styles.c}>© 2024 CSS Arts Gallery</p>
    </footer>
  );
};
