import { useSlate } from "slate-react";
import { TypesetUtil } from "../utils/TypesetUtil";
import TooltipButton from "../interface/TooltipButton";
import { Editor } from "slate";

export default function ToggleLinkButton() {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleLink(editor);
  };

  return (
    <TooltipButton onPointerDown={onPointerDownHandler}>
      <>link</>
    </TooltipButton>
  );
};