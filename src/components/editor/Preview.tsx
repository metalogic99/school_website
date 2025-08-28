"use client";
import "./editor.css";
import createDOMPurify from "dompurify";

const Preview = (props: { html: string }) => {
  const { html } = props;

  if (window === undefined) return <></>;

  const DOMPurify = createDOMPurify(window);

  return (
    <div
      className="editor"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};

export default Preview;
