import { RenderElementProps } from "slate-react";
import { SolnElem } from "../../../utils/CustomSlateTypes";
import { Divider } from "@mui/material";
import { css } from "@emotion/css";
import { MathJax } from "better-react-mathjax";

export default function Solution(props: RenderElementProps): JSX.Element {
  return (
    <>
      <Divider 
        className={css`
          border-style: dashed;
          border-width: 1px;
          margin: 0.5em;
        `}
      />
      <span 
      className={css`
        font-style: normal;
      `}
      >
        <span
        className={css`
          font-style: italic;
        `}
        contentEditable="false"
        >
        {(props.element as SolnElem).proof ? "Proof. " : "Solution. "}
        </span>
        {props.children}
        {(props.element as SolnElem).proof ? <div
          className={css`
            width: 99.5%;
            display: inline-block;
            text-align-last: right;
          `}
          contentEditable="false"
        >
          <MathJax inline>
            $\square$
          </MathJax>
        </div> : null}
      </span>
    </>
  );
}