import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./mypage.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.pagetitle}>
        <h1>マイページ</h1>
      </div>
      <Link className={styles.tag} href="../mypage/goodlist">
        いいねした作品
      </Link>
      <Link className={styles.tag} href="/">
        ギャラリーに戻る
      </Link>

      {/* 名前 */}
      <div>名前</div>

      {/* アイコン */}
      <div className={styles.icon}>アイコン</div>

      {/* 自己紹介 */}
      <div>
        <textarea
          className={styles.placeholder}
          placeholder=" 自己紹介"
        ></textarea>
      </div>

      {/* 自分の作品 */}
      <div>
        <div className={styles.title}>自分の作品</div>
        {(function () {
          const list = [];
          for (let i = 0; i < 10; i++) {
            list.push(
              <div className={styles.post}>
                <p>post</p>
              </div>
            );
          }
          return <ul className={styles.a}>{list}</ul>;
        })()}
      </div>
    </>
  );
}
