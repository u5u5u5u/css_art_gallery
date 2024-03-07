
import { Inter } from "next/font/google";
import styles from "./login.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>

            <div className={styles.title}>
                <h1>ログインページ</h1>
            </div>
            <Link className={styles.tag} href="../mypage/mypage">マイページ</Link>
            <Link href="../">ギャラリーに戻る</Link>
        </>
    )
}