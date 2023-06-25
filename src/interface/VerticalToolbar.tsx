import { PropsWithChildren } from "react"
import classes from "./VerticalToolbar.module.css";

export default function Toolbar(props: PropsWithChildren): JSX.Element {
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