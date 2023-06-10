import { Editor,Text } from "slate";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { useSlate } from "slate-react";

interface FormatButtonProps {
  mark: string;
  // icon
}

export default function FormatButton(props: FormatButtonProps) {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleMark(editor, props.mark as keyof Omit<Text, "text">);
  };

  return (
    <TooltipButton
      onPointerDown={onPointerDownHandler}
    >
      <>{props.mark}</>
    </TooltipButton>
  );
}