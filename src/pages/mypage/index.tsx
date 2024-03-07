import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./mypage.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>

            <div className={styles.title}>
                <h1>マイページ</h1>
            </div>
            <Link className={styles.tag} href="../mypage/goodlist">いいねした作品</Link>
            <Link className={styles.tag} href="/">ギャラリーに戻る</Link>
        </>
    )
}