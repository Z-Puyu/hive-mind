import { RenderElementProps } from "slate-react";
import Math from "../Math";
import Code from "../Code";
import Link from "../Link";
import CodeBlock from "../CodeBlock";
import Quote from "../Quote";
import Heading from "../Heading";
import Command from "../Command";
import Theorem from "../Theorem";
import { ThmElem } from "../../utils/CustomSlateTypes";
import Definition from "../Definition";
import Remark from "../Remark";
import Bookmark from "../Bookmark";
import TeXBox from "./TeXBox";

export default function DynElem(props: RenderElementProps): JSX.Element {
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
    case "cmd":
      return <Command {...props} />;
    case "bookmark":
      return <Bookmark {...props} />;
    case "thm":
      switch ((props.element as ThmElem).style) {
        case "dfn":
          return <Definition {...props} />;
        case "remark":
          return <Remark {...props} />;
        case "thm":
        default:
          return <Theorem {...props} />;
      }
    default: // Paragraph
      return <TeXBox {...props} />;
  }
};