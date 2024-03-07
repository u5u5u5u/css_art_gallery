import React from "react";
import Image from "next/image";
import { ReactNode } from "react";
import styles from "./Header.module.css";

type Props = {
  label: ReactNode;
};

export const Header = ({ label }: Props) => {
  return (
    <header className={styles.container}>
      <h1>{label}</h1>
      <div className={styles.wrapper}>
        <button>create</button>
        <Image width={50} height={50} src="/userIcon.svg" alt="User" />
      </div>
    </header>
  );
};
