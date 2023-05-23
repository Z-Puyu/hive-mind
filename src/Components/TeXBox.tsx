import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import Input from './Input';
import InlineMaths from './InlineMaths';
import { MathJax } from 'better-react-mathjax';

const TeXBox: React.FC = () => {
  const [inputBoxIsOpen, setInputBoxStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("\\LaTeX");

  // Some default element to test functionality
  /* const DEFAULT_DATA = [ 
    {
      text1: "Click on ",
      tex: input,
      texVisibility: inputBoxIsOpen,
      inputTrigger: setInputBoxStatus,
      text2: " to call out the LaTeX input panel, and click again to close it.",
    },
  ];

  const [html, setHtml] = useState(DEFAULT_DATA);

  return (
    <div>
      <Input updater={setInput} isTriggered={inputBoxIsOpen} />
      <MathJax contentEditable="true">
        {html.map(obj => <>{obj.text1}{<InlineMaths tex={obj.tex} inputTrigger={obj.inputTrigger} texVisibility={obj.texVisibility} />}{obj.text2}</>)}
      </MathJax>
    </div>
  ); */

  return (
    <div>
      <Input updater={setInput} isTriggered={inputBoxIsOpen} />
      <MathJax contentEditable="true">
        click on <InlineMaths tex={input} inputTrigger={setInputBoxStatus} texVisibility={inputBoxIsOpen} /> to call out the LaTeX input panel, and click again to close it.
      </MathJax>
    </div>
  );
}

export default TeXBox;