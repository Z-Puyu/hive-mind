import { css, cx } from "@emotion/css";
import { CheckSharp } from "@mui/icons-material";
import classes from "./Colour.module.css";

interface ColourProps {
  colour: string;
  isSelected: boolean;
  onCheck: () => void;
}

export default function Colour(props: ColourProps) {
  return (
    <span
      className={cx(classes.button, css`
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