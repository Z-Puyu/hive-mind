import { Editor,Text } from "slate";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { useSlate } from "slate-react";

interface FormatButtonProps {
  // editor: Editor;
  mark: string;
}

export default function FormatButton(props: FormatButtonProps) {
  const editor = useSlate();
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault();
        TypesetUtil.toggleMark(editor, props.mark as keyof Omit<Text, "text">);
      }}
    >
      <>{props.mark}</>
    </TooltipButton>
  );
}