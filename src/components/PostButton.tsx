import styles from "./PostButton.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const PostButton = ({ children, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
