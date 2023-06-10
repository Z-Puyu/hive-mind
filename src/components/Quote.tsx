import { RenderElementProps } from "slate-react";
import classes from "./Quote.module.css"

export default function Quote(props: RenderElementProps): JSX.Element {
  return (
    <blockquote {...props.attributes} className={classes.quote}>
      {props.children}
    </blockquote>
  );
};