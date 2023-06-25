import { Editor } from "slate";
import { TypesetUtil } from "../../utils/TypesetUtil"
import { useSlate } from "slate-react"
import { css } from "@emotion/css";
import { CalculateSharp, FunctionsSharp } from "@mui/icons-material";

interface ToggleMathButtonProps {
  inline?: true;
}

export default function MathButton(props: ToggleMathButtonProps): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isInlineActive(editor, "math");

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    TypesetUtil.toggleMath(editor, props.inline ? true : false);
  };

  return (
    <span
      className={css`
        cursor: pointer;
        color: ${isActive ? "rgb(83, 60, 27)" : "rgb(182, 164, 118)"};
        margin-right: 0.25em;
      `}
      onPointerDown={onPointerDownHandler}
    >
      {props.inline ? <CalculateSharp /> : <FunctionsSharp />}
    </span>
  );
};