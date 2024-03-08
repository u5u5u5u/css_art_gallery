import { Inter } from "next/font/google";
import styles from "./works.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Link className={styles.tag} href="../login">
        ログインページ
      </Link>
      <Link href="/">ギャラリーに戻る</Link>
      <div className={styles.postfamily}>
        <div className={styles.post}>
          <div className={styles.img}>image</div>
          <div className={styles.code}>code</div>
        </div>
      </div>
    </>
  );
}
