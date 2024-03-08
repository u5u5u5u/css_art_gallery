import Link from "next/link";
import style from "./iframe.module.css";
import React, { useRef, useEffect } from "react";

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

const PreviewIframe: React.FC<{
  Post: Post;
}> = ({ Post }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const content = Post.html + "<style>" + Post.css + "</style>";
    const iframe: any = iframeRef.current;
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
  }, []);

  return (
    <>
      <div className={style.work}>
        <iframe
          ref={iframeRef}
          id="preview"
          style={{
            width: Post.width,
            height: Post.height,
            border: "none",
          }}
          scrolling="no"
        ></iframe>
        <div className={style.title}>
          <Link href={`/works?id=${Post.id}`}>{Post.title}</Link>
        </div>
      </div>
    </>
  );
};

export default PreviewIframe;
