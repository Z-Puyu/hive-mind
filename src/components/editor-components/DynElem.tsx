import { Bookmark } from "@mui/icons-material";
import { RenderElementProps } from "slate-react";
import { ThmElem } from "../../utils/CustomSlateTypes";
import CodeBlock from "./blocks/CodeBlock";
import Command from "./blocks/Command";
import Definition from "./blocks/Definition";
import Heading from "./blocks/Heading";
import Quote from "./blocks/Quote";
import Remark from "./blocks/Remark";
import TeXBox from "./blocks/TeXBox";
import Theorem from "./blocks/Theorem";
import Link from "./blocks/Link";
import Math from "./blocks/Math";

export default function DynElem(props: RenderElementProps): JSX.Element {
  switch (props.element.type) {
    case "code-block":
      return <CodeBlock {...props} />;
    case "math":
      return <Math {...props} />;
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