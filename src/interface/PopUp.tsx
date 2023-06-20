import { PropsWithChildren, useRef } from "react";
import classes from "./PopUp.module.css";
import { css, cx } from "@emotion/css";

export default function PopUp(props: PropsWithChildren) {
  const popUpRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.popUp}>
      {props.children}
    </div>
  );
};