import React from 'react';
import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

const InlineMaths: React.FC = () => {
  const [inputBoxIsOpen, setInputBoxStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("\\LaTeX");
  return (
    <span contentEditable="false">
      <Input updater={setInput} isTriggered={inputBoxIsOpen} />
      <MathJax inline={true} dynamic={true} onClick={() => setInputBoxStatus(!inputBoxIsOpen)}
        contentEditable="false">
        {"$" + input + "$"}
      </MathJax>
    </span>
  );
}

export default InlineMaths;