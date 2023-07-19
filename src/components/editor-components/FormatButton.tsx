import { Editor, Text } from "slate";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { useSlate } from "slate-react";
import { css } from "@emotion/css";
import { Tooltip } from "@mui/material";

interface FormatButtonProps {
  mark: string;
  icon: JSX.Element;
}

const BUTTON_TOOLTIPS: { [key: string]: string } = {
  "bold": "Bold (ctrl + b)",
  "italic": "Italic (ctrl + i)",
  "roman": "Regular (ctrl + r)",
  "underline": "Underline (ctrl + u)",
  "strikethru": "Strike through (ctrl + s)",
  "code": "Code (ctrl + `)"
};

export default function FormatButton(props: FormatButtonProps) {
  const editor: Editor = useSlate();
  const isActive: boolean = props.mark === "roman"
    ? !TypesetUtil.isMarkActive(editor, "bold") && !TypesetUtil.isMarkActive(editor, "italic")
    : TypesetUtil.isMarkActive(editor, props.mark as keyof Omit<Text, "text">);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleMark(editor, props.mark as keyof Omit<Text, "text">);
  };

  return (
    <Tooltip title={BUTTON_TOOLTIPS[props.mark]} arrow placement="top">
      <span
        className={css`
        cursor: pointer;
        color: ${isActive ? "rgb(83, 60, 27)" : "rgb(182, 164, 118)"};
        margin-right: 0.25em;
      `}
        onPointerDown={onPointerDownHandler}
      >
        {props.icon}
      </span>
    </Tooltip>
  );
};