import { css, cx } from "@emotion/css"
import classes from "./TheoremTitle.module.css";
import { MathJax } from "better-react-mathjax";
import { useState, useRef } from "react";

interface TheoremTitleProps {
  style?: "dfn" | "eg" | "problem"
  title?: string;
  index?: string
}

export default function TheoremTitle(props: TheoremTitleProps) {
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [inputIsVisible, setInputIsVisible] = useState<boolean>(true);
  const inputRef = useRef<HTMLDivElement>(null);
  
  let bgColor: string;
  let type: string;
  switch (props.style) {
    case "dfn":
      bgColor = css`background-color: rgb(22, 97, 171)`;
      type = "Definition";
      break;
    case "eg":
      bgColor = css`background-color: rgb(139, 38, 113)`;
      type = "Example";
      break;
    case "problem":
      bgColor = css`background-color: rgb(93, 101, 95)`;
      type = "Problem";
      break;
    default:
      bgColor = css`background-color: rgb(130, 17, 31)`;
      type = "Theorem";
      break;
  }

  return (
    <>
      <div
        contentEditable="false"
        suppressContentEditableWarning={true}
        className={cx(classes.title, bgColor)}
        onClick={() => setInputIsVisible(!inputIsVisible)}
      >
        <MathJax inline dynamic>
          {type + " " + (props.index ? props.index : "") + (title ? "(" + title + ")" : "")}
        </MathJax>
      </div>
    </>
  );
}