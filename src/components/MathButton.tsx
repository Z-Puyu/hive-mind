import { Editor } from "slate";
import TooltipButton from "../interface/TooltipButton"
import { TypesetUtil } from "../utils/TypesetUtil"
import { useSlate } from "slate-react"

interface ToggleMathButtonProps {
  inline?: true;
}

export default function MathButton(props: ToggleMathButtonProps): JSX.Element {
  const editor: Editor = useSlate();

  const onPointerDownHandler = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    TypesetUtil.toggleMath(editor, props.inline ? true : false);
  };

  return (
    <TooltipButton onPointerDown={onPointerDownHandler}>
      <>+ Math</>
    </TooltipButton>
  );
};