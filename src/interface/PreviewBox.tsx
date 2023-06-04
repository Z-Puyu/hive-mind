import { Ref } from "react";
import classes from "./PreviewBox.module.css";

interface PreviewBoxProps {
  children: JSX.Element;
  ref: Ref<HTMLDivElement>;
}

export default function PreviewBox(props: PreviewBoxProps): JSX.Element {
  return (
    <div 
      ref={props.ref}
      className={classes.PreviewBox}
    >
      {props.children}
    </div>
  );
}