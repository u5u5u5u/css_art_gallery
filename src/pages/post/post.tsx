
import { Inter } from "next/font/google";
import styles from "./post.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>

            <div className={styles.title}>
                <h1>投稿しろ！</h1>
                <h2>Post or Die</h2>
            </div>
            <Link href="/">ギャラリーに戻る</Link>
            <div className={styles.input}><input></input></div>
            <button>post</button>
        </>
    )
}