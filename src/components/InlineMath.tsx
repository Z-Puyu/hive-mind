import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected, useSlate } from "slate-react";
import { useEffect, useState, useRef } from "react";
import MathPreview from "./MathPreview";
import { Editor, Transforms } from "slate";
import ModalOverlay from "../interface/ModalOverlay";
import { css } from "@emotion/css";

export default function InlineMath(props: RenderElementProps) {
  const editor: Editor = useSlate();
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLSpanElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => setIsVisible(false), [isSelected === true]);

  return isVisible || isSelected ? (
    <>
      <span
        className={css`
          position: relative;
        `}
      >
        <MathPreview value={props.children[0].props.text.text} owner={mathRef} />
        <span
          {...props.attributes}
          ref={mathRef}
          style={{
            color: "gray",
          }}
        >
          {props.children}
        </span>
      </span>
    </>
  ) : (
    <MathJax
      inline
      dynamic
      contentEditable={false}
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
      {props.children[0].props.text.text}
    </MathJax>
  );
};