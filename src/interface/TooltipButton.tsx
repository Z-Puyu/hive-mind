import { PointerEvent } from "react";
import classes from "./TooltipButton.module.css";

interface TooltipButtonProps {
  children: JSX.Element;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
}

export default function TooltipButton(props: TooltipButtonProps): JSX.Element {
  return (
    <button 
      className={classes.tooltipButton}
      onPointerDown={props.onPointerDown}
    >
      {props.children}
    </button>
  );
};