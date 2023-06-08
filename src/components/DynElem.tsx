import { RenderElementProps } from "slate-react";
import InlineMath from "./InlineMath";
import { InlineChromiumBugfix } from "../utils/InlineChromBugFix";
import { LinkElem } from "../utils/CustomSlateTypes";
import TeXBox from "./TeXBox";
import classes from "./DynElem.module.css";
import DisplayedMath from "./DisplayedMath";
import Math from "./Math";
import Code from "./Code";
import Link from "./Link";
import CodeBlock from "./CodeBlock";
import Quote from "./Quote";
import Heading from "./Heading";

export default function DynElem(props: any): JSX.Element {
  switch (props.element.type) {
    case "code-block":
      return <CodeBlock {...props} />;
    case "math":
      return <Math {...props} />;
    case "code":
      return <Code {...props} />;
    case "link":
      return <Link {...props} />;
    case "quote":
      return <Quote {...props} />;
    case "heading":
      return <Heading {...props} />;
    default: // Paragraph
      return <TeXBox {...props} />;
  }
}