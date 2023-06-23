import { Editor, Text } from "slate";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { useSlate } from "slate-react";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

interface FormatButtonProps {
  mark: string;
  icon: JSX.Element;
}

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
  );
}