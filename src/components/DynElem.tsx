import { RenderElementProps } from "slate-react";
import InlineMath from "./InlineMath";
import classes from "./DynElem.module.css";

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
        <span {...props.attributes} contentEditable={false} className={classes.inlineMath}>
          <InlineMath {...props} />
          {props.children}
        </span>
      );
    default:
      return (
        <p {...props.attributes}>
          {props.children}
        </p>
      );
  }
}