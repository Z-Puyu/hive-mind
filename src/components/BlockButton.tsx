import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { Editor } from "slate";

interface BlockButtonProps {
  blockType: string;
}

export default function BlockButton(props: BlockButtonProps): JSX.Element {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleBlock(editor, props.blockType);
  };

  return (
    <TooltipButton onPointerDown={onPointerDownHandler}>
      <>{props.blockType}</>
    </TooltipButton>
  );
};