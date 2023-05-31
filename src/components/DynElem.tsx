import { MathJax } from "better-react-mathjax";
import { Element } from "slate";
import { RenderElementProps, useSelected } from "slate-react";
import InlineMath from "./InlineMath";

export default function DynElem(props: RenderElementProps) {
  switch (props.element.type) {
    case "code-block":
      return (
        <pre {...props.attributes}>
          <code>
            {props.children}
          </code>
        </pre>
      );
    case "inline-math":
      return (
        <span {...props.attributes} contentEditable={false} className="inline-math-box">
          <InlineMath {...props} />
          {props.children}
        </span>
      )
    default:
      return (
        <p {...props.attributes}>
          {props.children}
        </p>
      );
  }
}