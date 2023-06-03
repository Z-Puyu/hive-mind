import { useSlate } from "slate-react";
import { TypesetUtil } from "../utils/TypesetUtil";
import { Editor } from "slate";
import TooltipButton from "../interface/TooltipButton";

export default function ToggleLinkButton() {
  const editor = useSlate();
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault();
        TypesetUtil.toggleLink(editor);
      }}
    >
      <>link</>
    </TooltipButton>
  );
}