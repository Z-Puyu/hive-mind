import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { Editor } from "slate";
import { css } from "@emotion/css";

interface BlockButtonProps {
  blockType: string;
  icon: JSX.Element;
}

export default function BlockButton(props: BlockButtonProps): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isBlockActive(editor, props.blockType);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleBlock(editor, props.blockType);
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
};