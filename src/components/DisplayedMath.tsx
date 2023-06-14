import { MathJax } from "better-react-mathjax";
import { RenderElementProps, useSelected } from "slate-react";
import MathPreview from "./MathPreview";
import { useEffect, useState, useRef } from "react";
import MathCard from "../interface/MathCard";
import classes from "./DisplayedMath.module.css"
import LaTeXCard from "../interface/LaTeXCard";

export default function DisplayedMath(props: RenderElementProps): JSX.Element {
  const isSelected: boolean = useSelected();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const mathRef = useRef<HTMLDivElement>(null);
  useEffect(() => setIsVisible(false), [isSelected === true]);

  return isVisible || isSelected ? (
    <div {...props.attributes} className={classes.displayedMath}>
      <MathPreview
        value={props.children[0].props.text.text}
        owner={mathRef}
        displayStyle
      />
      <LaTeXCard ref={mathRef}>
        {props.children}
      </LaTeXCard>
    </div>
  ) : (
    <MathCard>
      <MathJax
        dynamic
        contentEditable={false}
        style={{
          fontFamily: "times",
          fontWeight: "normal",
          fontStyle: "normal",
        }}
        onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
          event.preventDefault();
          setIsVisible(true);
        }}
      >
        {"\\begin{displaymath}"}
        {props.children[0].props.text.text}
        {"\\end{displaymath}"}
      </MathJax>
    </MathCard>
  );
};