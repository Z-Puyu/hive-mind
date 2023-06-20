import { useEffect, useRef } from "react";
import HoveringWindow from "../interface/HoveringWindow";
import PreviewBox from "../interface/PreviewBox";
import { MathJax } from "better-react-mathjax";
import { Editor, Range } from "slate";
import { useSlate, useFocused } from "slate-react";

interface MathPreviewProps {
  value: string;
  owner: React.RefObject<HTMLElement>;
  displayStyle?: true;
}

export default function MathPreview(props: MathPreviewProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)
  /* const editor = useSlate()
  const inFocus = useFocused()
  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection?.getRangeAt(0)
    const rect = domRange?.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect?.top! + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect?.left! +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect?.width! / 2}px`
  }) */
  return (
    // <HoveringWindow>
      <PreviewBox owner={props.owner} displayStyle={props.displayStyle}>
        <MathJax
          dynamic
          contentEditable={false}
          suppressContentEditableWarning={true}
          style={{
            fontFamily: "times",
          }}
        >
          {props.displayStyle
            ? "\\begin{displaymath}" + props.value + "\\end{displaymath}"
            : props.value}
        </MathJax>
      </PreviewBox>
    // </HoveringWindow>
  );
};