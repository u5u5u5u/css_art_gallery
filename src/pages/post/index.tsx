import styles from "./post.module.css";
import Link from "next/link";
import React, { useState } from "react";

const StringToHtml: React.FC = () => {
  const [textValue, setTextValue] = useState<string>("");

  const handleSaveClick = () => {
    const cleanedText = textValue.replace(/\r?\n/g, ""); // 改行コードを削除
    const htmlNodes = stringToHTML(cleanedText);
    console.log("HTML Nodes:", htmlNodes); // ここでHTMLのノードが配列で取得できる
    console.log(htmlNodes[0]); // ここでHTMLのノードが取得できる
    console.log(htmlNodes[0].textContent); // ここでHTMLのノードのテキストが取得できる
  };

  const stringToHTML = (str: string): NodeListOf<ChildNode> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.body.childNodes;
  };

  return (
    <>
      <div className={styles.title}>
        <h1>投稿しろ！</h1>
        <h2>Post or Die</h2>
      </div>
      <Link href="/">ギャラリーに戻る</Link>
      <div className={styles.input}>
        <div className={styles.children1}>
          <h1>aaa</h1>
        </div>
        <div className={styles.children2}>
          <textarea
            id="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className={styles.placeholder}
            placeholder="コードを入力してね！"
          ></textarea>
        </div>
      </div>
      <button id="saveButton" onClick={handleSaveClick}>
        post
      </button>
    </>
  );
};

export default StringToHtml;
