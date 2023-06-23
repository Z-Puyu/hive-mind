import { RenderElementProps } from "slate-react";
import classes from "./Quote.module.css"

export default function Quote(props: RenderElementProps): JSX.Element {
  return (
    <div {...props.attributes} className={classes.quote}>
    <blockquote className={classes.quoteContents}>
      {props.children}
    </blockquote>
    </div>
  );
};