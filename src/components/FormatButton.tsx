import { Editor,Text } from "slate";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";

interface FormatButtonProps {
  editor: Editor;
  mark: string;
}

export default function FormatButton(props: FormatButtonProps) {
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault();
        TypesetUtil.toggleMark(props.editor, props.mark as keyof Omit<Text, "text">);
      }}
    >
      <>{props.mark}</>
    </TooltipButton>
  );
}