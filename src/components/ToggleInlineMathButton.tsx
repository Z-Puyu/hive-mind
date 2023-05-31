import { TypesetUtil } from "../utils/TypesetUtil"
import { useSlate } from "slate-react"

export default function ToggleInlineMathButton() {

  const editor = useSlate()
  return (
    <button
      onClick={event => {
        event.preventDefault()
        if (TypesetUtil.isInlineMathActive(editor)) {
          TypesetUtil.toggleInlineMath(editor)
        } else {
          TypesetUtil.insertInlineMath(editor)
        }
      }}
    >
      +
    </button>
  )
}