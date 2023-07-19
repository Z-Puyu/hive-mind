import { css, cx } from "@emotion/css";
import classes from "./MiniTag.module.css";

interface MiniTagProps {
  colour: string;
  name: string;
}

export default function MiniTag(props: MiniTagProps) {
  return (
    <span
      className={cx(classes.tag, css`background-color: ${props.colour}`)}
    >
      {props.name}
    </span>
  )
}