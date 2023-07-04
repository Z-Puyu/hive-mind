import { PropsWithChildren, useRef } from "react";
import classes from "./PopUp.module.css";

export default function PopUp(props: PropsWithChildren) {
  return (
    <div className={classes.popUp}>
      {props.children}
    </div>
  );
};