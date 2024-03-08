import styles from "./PostButton.module.css";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const PostButton = ({ children, onClick, className }: Props) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};
