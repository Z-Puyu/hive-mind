import { useEffect, useRef } from "react";
import PreviewBox from "../../interface/PreviewBox";
import { MathJax } from "better-react-mathjax";
import { Editor, Range } from "slate";
import { useSlate, useFocused } from "slate-react";
import { Card, Portal } from "@mui/material";
import { css } from "@emotion/css";

interface MathPreviewProps {
  value: string;
  rect?: DOMRect;
  displayStyle?: string;
  owner?: React.RefObject<HTMLSpanElement>;
}

export default function MathPreview(props: MathPreviewProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement | null>(null)

  return (
    <Portal container={document.getElementById("hivemind-editable")}>
      <Card
        ref={cardRef}
        className={css`
          width: fit-content;
          max-width: 75%;
          padding: ${props.displayStyle ? "0 0.5em" : "0.5em"};
          position: absolute;
          top: ${props.rect?.top! + window.scrollY - 1.25 * cardRef.current?.offsetHeight!}px;
          left: ${props.rect?.left! + window.scrollX -
          (cardRef.current?.offsetWidth! - props.rect?.width!) / 2}px;
        `}
        raised={true}
      >
        <MathJax
          dynamic
          contentEditable={false}
          suppressContentEditableWarning={true}
          style={{
            fontFamily: "times",
          }}
        >
          {props.displayStyle
            ? "\\[\n\\begin{" + props.displayStyle + "}" +
              props.value +
              "\\end{" + props.displayStyle + "}\n\\]"
            : props.value}
        </MathJax>
      </Card>
    </Portal>
  );
};