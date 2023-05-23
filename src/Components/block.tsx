import React, { useState, useRef } from "react";
// @ts-ignore
import ContentEditable from "react-contenteditable";


const CMD_KEY = "/";

export default function Block(props:any) {
  const contentEditable = useRef(null);
  const [tag, setTag] = useState("p");
  const [html, setHtml] = useState("");

  const onChangeHandler = (e:any) => {
    setHtml(e.target.value);
    console.log(html);
  };

  const onKeyDownHandler = (e:any) => {
    //if (e.key === CMD_KEY) {}
    if (e.key === "Enter") {
      e.preventDefault();
      props.addBlock({ id: props.id, ref: contentEditable.current });
    }
    if (e.key === "Backspace" && html === "") {
      e.preventDefault();
      props.deleteBlock({ id: props.id, ref: contentEditable.current });
    }
  };


  return (
    <>
      <ContentEditable
        className="Block"
        innerRef={contentEditable}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
    </>
  );
}