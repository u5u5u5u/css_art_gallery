
import styles from "./Button.module.css";
import { ReactNode } from "react";
type Props = {
    children: ReactNode
    onClick?: () => void;
}
export const Button = ({ children, onClick }: Props) => {

    return <button className={styles.button} onClick={onClick}>{children}</button>;
};

