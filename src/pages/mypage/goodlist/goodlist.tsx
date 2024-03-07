
import { Inter } from "next/font/google";
import styles from "./goodlist.module.css";
import Link from "next/link";
import { GoodList } from "@/components/Goodlist";
const inter = Inter({ subsets: ["latin"] });

const mockData = [
    {
        id: 1,
        title: "post1",
    },
]
export default function Home() {

    return (
        <>

            <div className={styles.title}>
                <h1>いいねした作品</h1>
            </div>


            <Link className={styles.tag} href="../../">ギャラリーに戻る</Link>
            <GoodList />
        </>
    )
}