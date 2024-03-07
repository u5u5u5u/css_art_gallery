import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./search.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>

            <div className={styles.title}>
                <h1>検索欄</h1>
            </div>
            <Link href="../">ギャラリーに戻る</Link>
        </>
    )
}