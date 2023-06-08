import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";

interface BlockButtonProps {
  blockType: string;
}

export default function BlockButton(props: BlockButtonProps) {
  const editor = useSlate();
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault();
        TypesetUtil.toggleBlock(editor, props.blockType);
      }}
    >
      <>{props.blockType}</>
    </TooltipButton>
  );
};