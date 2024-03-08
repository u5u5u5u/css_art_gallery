import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { PostButton } from "@/components/PostButton";
import PreviewIframe from "@/components/iframe";
import styles from "./works.module.css";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  height: number;
  width: number;
  html: string;
  css: string;
  author: string;
  authorId: string;
  tags: string[];
};

const inter = Inter({ subsets: ["latin"] });

const auth = getAuth();
const db = getFirestore();

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [workData, setWorkData] = useState<Post>();

  async function Addfavorite() {
    console.log("like");
    const user = auth.currentUser;
    const favRef = doc(db, "UserFavorites", `${user?.uid}`);
    await setDoc(
      favRef,
      {
        workIds: arrayUnion(workData?.id),
      },
      { merge: true }
    );
  }

  useEffect(() => {
    // ユーザーのログイン状態を確認する
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getWorks(id as string);
      } else {
        console.log("not logged in");
      }
    });
    return () => unsubscribe(); // cleanup function
  }, [id]);

  //レンダリング時にクエリパラメータのidを取得
  async function getWorks(id: string) {
    // ここでworksのデータを取得して表示する
    // "Works"コレクションから特定のドキュメントを取得する
    const workRef = doc(db, "Works", id);
    const workSnapshot = await getDoc(workRef);

    if (workSnapshot.exists()) {
      // ドキュメントのデータを取得する
      var workData = workSnapshot.data() as Post;
      var formattedCSS = workData.css.replace(/;|}/g, "$&\n");
      // 正規表現を使用してセミコロンと波括弧の後に改行を追加

      // 波括弧の前に改行を追加
      formattedCSS = formattedCSS.replace(/{/g, "{\n");

      // セレクタの前に改行を追加
      formattedCSS = formattedCSS.replace(
        /\.home::after|\.home::before/g,
        "\n$&"
      );

      //HTMLの文字列も同様にフォーマット
      var formattedHTML = formatHTML(workData.html);

      workData.html = formattedHTML;
      workData.css = formattedCSS;
      console.log(workData);
      setWorkData(workData);
    } else {
      console.log("No such document!");
    }
  }

  function formatHTML(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html.trim();

    return formatHTMLNode(div, 0);
  }

  function formatHTMLNode(node: any, level: number) {
    const indentBefore = new Array(level++ + 1).join("  ");
    const indentAfter = new Array(level - 1).join("  ");
    let textNode;

    for (let i = 0; i < node.children.length; i++) {
      textNode = document.createTextNode("\n" + indentBefore);
      node.insertBefore(textNode, node.children[i]);

      formatHTMLNode(node.children[i], level);

      if (node.lastElementChild == node.children[i]) {
        textNode = document.createTextNode("\n" + indentAfter);
        node.appendChild(textNode);
      }
    }

    return node.innerHTML;
  }

  return (
    <>
      <Link href="/">ギャラリーに戻る</Link>
      <div>
        <h1 className={styles.title}>{workData?.title}</h1>
        <div className={styles.canvas}>
          {workData && <PreviewIframe Post={workData} />}
        </div>
        <div className={styles.button}>
          <PostButton onClick={Addfavorite} className={styles.favoriteButton}>
            お気に入りに追加
          </PostButton>
        </div>
        <h2>author</h2>
        <div className={styles.author}>
          <Link href={`/mypage?uid=${workData?.authorId}`}>
            {workData?.author}
          </Link>
        </div>
        <h2>tags</h2>
        <div className={styles.tag_group}>
          {workData?.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.workDetail}></div>
        <div className={styles.editor}>
          <div className={styles.canvasCode}>
            <div className={styles.code}>
              <h2>HTML</h2>
              <article className={styles.codeContent}>{workData?.html}</article>
            </div>
            <div className={styles.code}>
              <h2>CSS</h2>
              <article className={styles.codeContent}>{workData?.css}</article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
