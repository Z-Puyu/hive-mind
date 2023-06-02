import { PointerEvent } from "react";
import classes from "./TooltipButton.module.css";
import { Editor, Text } from "slate";
import { TypesetUtil } from "../utils/TypesetUtil";

interface TooltipButtonProps {
  children: JSX.Element;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
}

export default function TooltipButton(props: TooltipButtonProps) {
  return (
    <button 
      className={classes.tooltipButton}
      onPointerDown={props.onPointerDown}
    >
      {props.children}
    </button>
  );
}