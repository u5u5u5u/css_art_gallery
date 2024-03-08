import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./mypage.module.css";
import Link from "next/link";
import React, { useState } from "react";
import Modal from "react-modal";

export default function Home() {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

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

      <div className={styles.icon_name_detail}>
        <div className={styles.icon}></div>

        <div className={styles.name_detail}>
          <div className={styles.name}>名前</div>

          <div>
            <div className={styles.detail_frame}></div>
            <button onClick={openModal}>編集</button>
            <div className={styles.modal_grandparent}>
              <Modal isOpen={modal} className={styles.modal_parent}>
                <div className={styles.modal}>
                  <textarea
                    className={styles.placeholder_name}
                    placeholder=" 名前"
                  ></textarea>
                  <textarea
                    className={styles.placeholder_detail}
                    placeholder=" 自己紹介"
                  ></textarea>
                  <button className={styles.button} onClick={closeModal}>
                    close
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.page_s_title}>自分の作品</div>
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
