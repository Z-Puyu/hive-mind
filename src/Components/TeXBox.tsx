import { useState } from "react";
import InlineMaths from './InlineMaths';
import { MathJax } from 'better-react-mathjax';

interface MathObject {
  isMath: boolean;
  str: string;
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
      str: "\\LaTeX",
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
          // Press "$" to insert inline maths.
          if (event.shiftKey && event.key === "$") {
            event.preventDefault();
            setMathObjects(mathObjects.concat([{ isMath: true, str: "" }]));
          }
        }}
      >
        {mathObjects.map(obj => obj.isMath ? <InlineMaths tex={obj.str} initTexVisibility={true}/> : <span>{obj.str}</span>)}
      </MathJax>
    </div>
  );
}

export default TeXBox;