import { RenderElementProps } from "slate-react";
import classes from "./Paragraph.module.css";

interface ParagraphProps {
  attributes: any;
  children: JSX.Element | (JSX.Element | null)[];
}

export default function Paragraph(props: ParagraphProps): JSX.Element {
  return (
    <p
      {...props.attributes}
      className={classes.paragraph}
      autoFocus
      spellCheck
      suppressContentEditableWarning={true}
    >
      {props.children}
    </p>
  )
}