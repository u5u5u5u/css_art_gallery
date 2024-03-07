import React, { useRef, useEffect } from "react";

type Post = {
  title: string;
  height: number;
  width: number;
  html: string;
  css: string;
  author: string;
  authorId: string;
  tags: string[];
};

type Props = {
  content: string;
  height: number;
  width: number;
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
  );
};

export default PreviewIframe;
