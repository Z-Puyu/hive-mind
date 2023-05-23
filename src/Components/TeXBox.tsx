import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import Input from './Input';
import InlineMaths from './InlineMaths';
import { MathJax } from 'better-react-mathjax';

interface MathObject {
  isMath: boolean;
  str?: string;
}

const TeXBox: React.FC = () => {
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
  // const [currInputStr, setCurrInputStr] = useState<string>("");

  /* const onDollarSignDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === "$") {
      setMathObjects(mathObjects.concat([{ isMath: true }]));
    }
  }; */

  return (
    <div>
      {/* <Input updater={setInput} isTriggered={inputBoxIsOpen} /> */}
      <MathJax
        contentEditable="true"
        onKeyDown={event => {
          if (event.shiftKey && event.key === "$") {
            event.preventDefault();
            setMathObjects(mathObjects.concat([{ isMath: true }]));
          }
        }} // This sets the hotkey to insert inline maths.
      >
        {mathObjects.map(obj => obj.isMath ? <InlineMaths /> : <span>{obj.str}</span>)}
      </MathJax>
    </div>
  );
}

export default TeXBox;