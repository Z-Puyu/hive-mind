import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected } from "slate-react";
import { useEffect, useState } from "react";
import MathPreview from "./MathPreview";

export default function InlineMath(props: RenderElementProps) {
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => setIsVisible(false), [isSelected]);

  return isVisible || isSelected ? (
    <span>
      <MathPreview
        value={props.children[0].props.text.text}
      />
      <span
        {...props.attributes}
        style={{
          color: "gray"
        }}
      >
        {props.children}
      </span>
    </span>
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
      onClick={() => setIsVisible(true)}
    >
      {props.children[0].props.text.text}
    </MathJax>
  );
}