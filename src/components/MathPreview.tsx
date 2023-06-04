import { useRef } from "react";
import HoveringWindow from "../interface/HoveringWindow";
import PreviewBox from "../interface/PreviewBox";
import { MathJax } from "better-react-mathjax";

interface MathOutputProps {
  value: string;
}

export default function MathPreview(props: MathOutputProps): JSX.Element {
  const mathRef = useRef<HTMLDivElement>(null);
  return (
    <HoveringWindow>
      <PreviewBox ref={mathRef}>
        <MathJax
          inline
          dynamic
          contentEditable={false}
        >
          {props.value}
        </MathJax>
      </PreviewBox>
    </HoveringWindow>
  );
}