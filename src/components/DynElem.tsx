import { RenderElementProps } from "slate-react";
import InlineMath from "./InlineMath";
import { InlineChromiumBugfix } from "../utils/InlineChromBugFix";
import { LinkElem } from "../utils/CustomSlateTypes";

export default function DynElem(props: RenderElementProps): JSX.Element {
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
        <InlineMath {...props} />
      );
    case "link":
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