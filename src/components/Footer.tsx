import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.logo}>CSS Art Gallery</p>
        <ul className={styles.brandIcons}>
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
              src="/brand-github.svg"
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
          <li>
            <Image width={20} height={20} src="/brand-slack.svg" alt="github" />
          </li>
        </ul>
        <p className={styles.copyright}>© 2024 CSS Arts Gallery</p>
      </div>
    </footer>
  );
};
