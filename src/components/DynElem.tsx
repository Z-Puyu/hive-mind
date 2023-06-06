import { RenderElementProps } from "slate-react";
import InlineMath from "./InlineMath";
import { InlineChromiumBugfix } from "../utils/InlineChromBugFix";
import { LinkElem } from "../utils/CustomSlateTypes";
import TeXBox from "./TeXBox";
import classes from "./DynElem.module.css";

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
      return <InlineMath {...props} />;
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
    default: // Paragraph
      return <TeXBox {...props} />;
  }
}