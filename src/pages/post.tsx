
import { Inter } from "next/font/google";
import styles from "./works.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>


            <h1>投稿しよ！</h1>
            <Link href="/">ギャラリーに戻る</Link>
        </>
    )
}