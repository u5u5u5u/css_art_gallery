import React, { useRef, useEffect } from "react";

const PreviewIframe: React.FC<{
  html: string;
  height: number;
  width: number;
}> = ({ html, height, width }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe: any = iframeRef.current;
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      id="preview"
      style={{
        width: width,
        height: height,
        border: "none",
      }}
    ></iframe>
  );
};

export default PreviewIframe;
