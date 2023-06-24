import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { Editor } from "slate";
import { CodeSharp } from "@mui/icons-material";
import { css } from "@emotion/css";

export default function CodeButton(): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isInlineActive(editor, "code");

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleCode(editor, true);
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
      <CodeSharp />
    </span>
  );
};