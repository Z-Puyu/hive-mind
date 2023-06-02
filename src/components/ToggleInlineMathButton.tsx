import TooltipButton from "../interface/TooltipButton"
import { TypesetUtil } from "../utils/TypesetUtil"
import { useSlate } from "slate-react"

export default function ToggleInlineMathButton() {
  const editor = useSlate()
  return (
    <TooltipButton
      onPointerDown={event => {
        event.preventDefault()
        TypesetUtil.insertInlineMath(editor)
      }}
    >
      <>+ Math</>
    </TooltipButton>
  )
}