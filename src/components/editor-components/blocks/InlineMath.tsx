import { MathJax } from "better-react-mathjax";
import { ReactEditor, RenderElementProps, useSelected, useSlate } from "slate-react";
import { useEffect, useState, useRef } from "react";
import MathPreview from "../MathPreview";
import { css } from "@emotion/css";
import { findDOMNode } from "react-dom";
import { Editor, Transforms } from "slate";

export default function InlineMath(props: RenderElementProps) {
  const editor: Editor = useSlate();
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setIsVisible(false), [isSelected === true]);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setIsVisible(true);
  }

  return isSelected ? (
    <span
      className={css`
        position: relative;
      `}
    >
      <MathPreview
        value={props.children[0].props.text.text}
        rect={mathRef.current?.getBoundingClientRect()}
      />
      <span
        {...props.attributes}
        ref={mathRef}
        style={{
          color: "gray",
        }}
        suppressContentEditableWarning={true}
      >
        {props.children}
      </span>
    </span>
  ) : isVisible ? (
    <span
      className={css`
          position: relative;
        `}
      contentEditable="false"
    >
      <MathPreview
        value={props.children[0].props.text.text}
        rect={mathRef.current?.getBoundingClientRect()}
      />
      <span
        {...props.attributes}
        ref={mathRef}
        style={{
          color: "gray",
        }}
        onPointerUp={() => Transforms.select(editor, ReactEditor.findPath(editor, props.element))}
        suppressContentEditableWarning={true}
      >
        {props.children}
      </span>
    </span>
  ) : (
    <MathJax
      inline
      dynamic
      contentEditable="false"
      className={css`
        font-family: "times";
        font-weight: normal;
        font-style: normal;
        cursor: pointer;
        border-radius: 0.25em;
        &:hover {
          background-color: rgb(233, 221, 182);
          padding: 0 0.25em;
          transition: 0.2s;
        }
      `}
      onPointerDown={onPointerDownHandler}
      suppressContentEditableWarning={true}
    >
      {props.children[0].props.text.text}
    </MathJax>
  );
};