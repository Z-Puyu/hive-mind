import { useState } from "react";
import InlineMaths from './InlineMaths';
import { MathJax } from 'better-react-mathjax';

interface MathObject {
  isMath: boolean;
  str?: string;
}

function TeXBox(): JSX.Element {
  // Some default element to test functionality
  const DEFAULT_DATA: MathObject[] = [
    {
      isMath: false,
      str: "Click on ",
    },
    {
      isMath: true,
    },
    {
      isMath: false,
      str: " to call out the LaTeX input panel, and click again to close it.",
    },
  ];

  const [mathObjects, setMathObjects] = useState<MathObject[]>(DEFAULT_DATA);

  return (
    <div>
      <MathJax
        contentEditable="true"
        onKeyDown={event => {
          if (event.shiftKey && event.key === "$") {
            event.preventDefault();
            setMathObjects(mathObjects.concat([{ isMath: true }]));
          }
        }} // This sets the hotkey to insert inline maths.
      >
        {mathObjects.map(obj => obj.isMath ? <InlineMaths initTexVisibility={true}/> : <span>{obj.str}</span>)}
      </MathJax>
    </div>
  );
}

export default TeXBox;