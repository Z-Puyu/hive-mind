import { RenderElementProps, useSelected } from "slate-react";
import InlineMath from "./InlineMath";
import classes from "./DynElem.module.css";
import { InlineChromiumBugfix } from "../utils/InlineChromBugFix";
import { LinkElem } from "../utils/CustomSlateTypes";

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
    case "link":
      // const selected = useSelected();
      return (
        <a
          {...props.attributes}
          href={(props.element as LinkElem).url}
        >
          <InlineChromiumBugfix />
          {props.children}
          <InlineChromiumBugfix />
        </a>
      );
    default:
      return (
        <p {...props.attributes}>
          {props.children}
        </p>
      );
  }
}