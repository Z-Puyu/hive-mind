import { useSlate } from "slate-react";
import TooltipButton from "../interface/TooltipButton";
import { TypesetUtil } from "../utils/TypesetUtil";
import { Editor } from "slate";

export default function CodeButton(): JSX.Element {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    TypesetUtil.toggleCode(editor, true);
  };

  return (
    <TooltipButton onPointerDown={onPointerDownHandler}>
      <>code</>
    </TooltipButton>
  );
};