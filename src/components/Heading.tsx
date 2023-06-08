import { RenderElementProps } from "slate-react";
import { HeadingElem } from "../utils/CustomSlateTypes";
import TextCard from "../interface/TextCard";

export default function Heading(props: RenderElementProps) {
  let styles;
  switch ((props.element as HeadingElem).level) {
    case "part":
      styles = {
        fontSize: "24.88pt"
      }
      break;
    case "chapter":
      styles = {
        fontSize: "24.88pt"
      }
      break;
    case "section":
      styles = {
        fontSize: "17.28pt"
      }
      break;
    case "subsection":
      styles = {
        fontSize: "14.4pt"
      }
      break;
    case "subsubsection":
      styles = {
        fontSize: "12pt"
      }
      break;
    default:
      styles = {
        fontSize: "17.28pt"
      }
      break;
  }
  return (
    <TextCard>
      <h1>
        {props.children}
      </h1>
    </TextCard>
  );
}