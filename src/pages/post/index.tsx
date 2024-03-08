import styles from "./post.module.css";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { set } from "firebase/database";

const db = getFirestore();
const auth = getAuth();

export default function Post() {
  const [htmlValue, setHtmlValue] = useState<string>("");
  const [cssValue, setCssValue] = useState<string>("");
  const [height, setHeight] = useState<number>(300);
  const [width, setWidth] = useState<number>(300);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const htmlareaRef: any = useRef(null);
  const cssareaRef: any = useRef(null);
  const iframeRef: any = useRef(null);

  useEffect(() => {
    if (htmlareaRef.current || cssareaRef.current) {
      htmlareaRef.current.addEventListener("input", () => {
        changeContent();
      });
      cssareaRef.current.addEventListener("input", () => {
        changeContent();
      });
    }
  }, []);

  function changeContent() {
    const content =
      htmlareaRef.current.value +
      "<style>" +
      "body { margin: 0;}" +
      cssareaRef.current.value +
      "</style>";
    const iframe = iframeRef.current;
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
  }

  function tagtest() {
    console.log(tags);
  }

  async function PostWorks() {
    const worksRef = collection(db, "Works");
    const docRef = await addDoc(worksRef, {
      title: title,
      height: height,
      width: width,
      html: htmlValue,
      css: cssValue,
      author: `${auth.currentUser?.displayName}`,
      authorId: `${auth.currentUser?.uid}`,
      tags: tags,
    });

    console.log("Document written with ID: ", docRef.id);

    // ドキュメントに自身のドキュメントIDを追加
    await setDoc(docRef, { id: docRef.id }, { merge: true });

    const myWorksRef = doc(db, "UsersWorks", `${auth.currentUser?.uid}`);
    await setDoc(
      myWorksRef,
      {
        workIds: arrayUnion(docRef.id),
      },
      { merge: true }
    );

    tags.map(async (tag) => {
      // タグのコレクションにタグの名前のドキュメントを追加
      const tagRef = doc(db, "Tags", tag);
      await setDoc(
        tagRef,
        {
          workIds: arrayUnion(docRef.id),
        },
        { merge: true }
      );
    });
  }
  return (
    <>
      <Link href="/">ギャラリーに戻る</Link>
      <div>
        <div className={styles.canvas}>
          <iframe
            className={styles.canvas_children}
            ref={iframeRef}
            id="preview"
            style={{
              width: width,
              height: height,
              border: "none",
            }}
            scrolling="no"
          ></iframe>
        </div>
        <div className={styles.editor}>
          <div className={styles.canvasProp}>
            <div>
              Height
              <input
                type="range"
                min="100"
                max="500"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <input
                type="number"
                min="100"
                max="500"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              ></input>
              px
            </div>
            <div>
              Width
              <input
                type="range"
                min="100"
                max="500"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              <input
                type="number"
                min="100"
                max="500"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
              px
            </div>
          </div>
          <div className={styles.canvasCode}>
            <div>
              <h2>HTML</h2>
              <textarea
                ref={htmlareaRef}
                value={htmlValue}
                onChange={(e) => setHtmlValue(e.target.value)}
                className={styles.placeholder}
                placeholder="HTMLを入力してね!"
              ></textarea>
            </div>
            <div>
              <h2>CSS</h2>
              <textarea
                ref={cssareaRef}
                value={cssValue}
                onChange={(e) => setCssValue(e.target.value)}
                className={styles.placeholder}
                placeholder="CSSを入力してね!"
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles.workDetail}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(/,| |　|\r\n|\r|\n/))}
            placeholder="タグを入力してください"
          />
        </div>
        <button id="saveButton" onClick={() => PostWorks()}>
          post
        </button>
      </div>
    </>
  );
}
