import { useRef } from "react";
import HoveringWindow from "../interface/HoveringWindow";
import PreviewBox from "../interface/PreviewBox";
import { MathJax } from "better-react-mathjax";

interface MathPreviewProps {
  value: string;
  displayStyle?: true;
}

export default function MathPreview(props: MathPreviewProps): JSX.Element {
  const mathRef = useRef<HTMLDivElement>(null);
  
  return (
    <HoveringWindow>
      <PreviewBox ref={mathRef}>
        <MathJax
          dynamic
          contentEditable={false}
          style={{
            fontFamily: "times",
          }}
        >
          {props.displayStyle
            ? "\\begin{displaymath}" + props.value + "\\end{displaymath}"
            : props.value}
        </MathJax>
      </PreviewBox>
    </HoveringWindow>
  );
};