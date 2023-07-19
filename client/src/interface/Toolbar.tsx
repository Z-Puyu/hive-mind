import { PropsWithChildren } from "react"
import classes from "./Toolbar.module.css";

export default function VerticalToolbar(props: PropsWithChildren): JSX.Element {
  return (
    <div
      className={classes.toolbar}
      contentEditable="false"
      suppressContentEditableWarning={true}
    >
      {props.children}
    </div>
  );
};