
import { Inter } from "next/font/google";
import styles from "./login.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>


            <h1>ログインページ</h1>
            <Link className={styles.tag} href="../mypage/mypage">マイページ</Link>
            <Link href="../">ギャラリーに戻る</Link>
        </>
    )
}