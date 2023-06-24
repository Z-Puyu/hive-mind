import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected } from "slate-react";
import MathPreview from "./MathPreview";
import { useEffect, useState, useRef } from "react";
import classes from "./DisplayedMath.module.css"
import { css } from "@emotion/css";

export default function DisplayedMath(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLDivElement>(null);
  useEffect(() => setIsVisible(false), [isSelected === true]);

  return isVisible || isSelected ? (
    <div {...props.attributes} className={classes.displayedMath}>
      <MathPreview
        value={props.children[0].props.text.text}
        owner={mathRef}
        displayStyle
      />
      <div
        className={css`
          text-align: left;
          margin: auto;
          width: fit-content;
          padding: 0.8em 0;
          font-family: "Times New Roman";
      ` }
        ref={mathRef}
      >
        {props.children}
      </div>
    </div>
  ) : (
    <div
      className={css`
        text-align: center;
        margin: auto;
        width: fit-content;
        font-family: "Times New Roman";
        cursor: pointer;
      `}
    >
      <MathJax
        dynamic
        contentEditable="false"
        suppressContentEditableWarning={true}
        style={{
          fontFamily: "times",
          fontWeight: "normal",
          fontStyle: "normal",
        }}
        onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          event.preventDefault();
          setIsVisible(true);
        }}
      >
        {"\\begin{displaymath}"}
        {props.children[0].props.text.text}
        {"\\end{displaymath}"}
      </MathJax>
    </div>
  );
};