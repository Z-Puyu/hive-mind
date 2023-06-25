import { RenderElementProps } from "slate-react";
import classes from "./CodeBlock.module.css"

export default function CodeBlock(props: RenderElementProps): JSX.Element {
  return (
    <div className={classes.blockCode}>
      <code className={classes.codeLines}>
        {props.children}
      </code>
    </div>
  );
};