import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";

export default function CodeButton() {
  const editor = useSlate();
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault();
        TypesetUtil.toggleCode(editor, true);
      }}
    >
      <>code</>
    </TooltipButton>
  );
}