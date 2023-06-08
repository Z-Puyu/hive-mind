import { RenderElementProps } from "slate-react";
import classes from "./CodeBlock.module.css"

export default function CodeBlock(props: RenderElementProps) {
  return (
    <pre
      {...props.attributes}
      className={classes.blockCode}
    >
      <code>
        {props.children}
      </code>
    </pre>
  );
};