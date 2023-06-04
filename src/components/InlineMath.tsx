import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected } from "slate-react";
import MathOutput from "./MathPreview";

export default function InlineMath(props: RenderElementProps) {
  const isSelected: boolean = useSelected();

  return isSelected ? (
    <>
      <MathOutput
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
    </>
  ) : (
    <MathJax 
    inline 
    dynamic 
    contentEditable={false}>
      {props.children[0].props.text.text}
    </MathJax>
  );
}