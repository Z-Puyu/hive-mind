import { RenderElementProps } from "slate-react";
import Toolbar from "../interface/Toolbar";
import FormatButton from "./FormatButton";
import ToggleInlineMathButton from "./ToggleInlineMathButton";
import ToggleLinkButton from "./ToggleLinkButton";
import classes from "./TeXBox.module.css"

export default function TeXBox(props: RenderElementProps) {
  return (
    <div
      className={classes.box}
    >
      <Toolbar>
        <FormatButton mark="bold" />
        <FormatButton mark="italic" />
        <FormatButton mark="roman" />
        <FormatButton mark="underline" />
        <FormatButton mark="strikethru" />
        <FormatButton mark="code" />
        <ToggleLinkButton />
        <ToggleInlineMathButton />
      </Toolbar>
      <p
        {...props.attributes}
        className={classes.paragraph}
      >
        {props.children}
      </p>
    </div>
  );
}