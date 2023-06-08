import TooltipButton from "../interface/TooltipButton"
import { TypesetUtil } from "../utils/TypesetUtil"
import { useSlate } from "slate-react"

interface ToggleMathButtonProps {
  inline?: true;
}

export default function MathButton(props: ToggleMathButtonProps) {
  const editor = useSlate();
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault()
        TypesetUtil.toggleMath(editor, props.inline ? true : false);
      }}
    >
      <>+ Math</>
    </TooltipButton>
  );
};