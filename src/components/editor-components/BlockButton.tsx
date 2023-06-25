import { useSlate } from "slate-react";
import TooltipButton from "../../interface/TooltipButton";
import { TypesetUtil } from "../../utils/TypesetUtil";
import { Editor } from "slate";
import { css } from "@emotion/css";

interface BlockButtonProps {
  blockType: string;
  thmStyle?: string;
  icon: JSX.Element;
}

export default function BlockButton(props: BlockButtonProps): JSX.Element {
  const editor: Editor = useSlate();
  const isActive: boolean = TypesetUtil.isBlockActive(editor, props.blockType);

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleBlock(editor, props.blockType, props.thmStyle);
  };

  return (
    <span
      className={css`
        cursor: pointer;
        color: ${isActive ? "black" : "gray"};
        margin-right: 0.25em;
        margin-bottom: 0.25em;
      `}
      onPointerDown={onPointerDownHandler}
    >
      {props.icon}
    </span>
  );
};