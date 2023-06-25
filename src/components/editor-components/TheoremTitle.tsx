import { css, cx } from "@emotion/css"
import classes from "./TheoremTitle.module.css";
import { MathJax } from "better-react-mathjax";
import { useState } from "react";

interface TheoremTitleProps {
  dfnStyle?: true;
  title?: string;
}

export default function TheoremTitle(props: TheoremTitleProps) {
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [inputIsVisible, setInputIsVisible] = useState<boolean>(true);
  const bgColor: string = props.dfnStyle
    ? css`background-color: rgb(22, 97, 171)`
    : css`background-color: rgb(130, 17, 31)`;

  return (
    <>
      {/* {inputIsVisible ? <HoveringWindow>
        <div
          ref={inputRef}
          onChange={() => setTitle(inputRef.current?.innerHTML)}
          autoFocus
          contentEditable
        >
          Title
        </div>
      </HoveringWindow> : null} */}
      <div
        contentEditable="false"
        suppressContentEditableWarning={true}
        className={cx(classes.title, bgColor)}
        onClick={() => setInputIsVisible(!inputIsVisible)}
      >
        <MathJax inline dynamic>
          {(props.dfnStyle ? "Definition " : "Theorem") + (title ? "(" + title + ")" : "")}
        </MathJax>
      </div>
    </>
  );
}