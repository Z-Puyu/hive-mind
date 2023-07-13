import { css, cx } from "@emotion/css";
import { CheckSharp } from "@mui/icons-material";
import classes from "./Colour.module.css";

interface ColourProps {
  colour: string;
  isSelected?: boolean;
  onCheck?: () => void;
  static?: true;
  size: string;
}

export default function Colour(props: ColourProps) {
  return props.static ? (
    <span
      className={cx(classes.button, props.size, css`
        background-color: ${props.colour};
      `)}
    />
  ) : (
    <span
      className={cx(classes.button, props.size, css`
        background-color: ${props.colour};
      `)}
      onPointerDown={props.onCheck}
    >
      <div
        className={css`
          opacity: ${props.isSelected ? 1 : 0};
        `}
      >
        <CheckSharp />
      </div>
    </span>
  );
}