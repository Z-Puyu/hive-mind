import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

interface props {
  initTexVisibility: boolean;
}

function InlineMaths({ initTexVisibility }: props): JSX.Element {
  // let initStatus: boolean = initTexVisibility === "true" ? true : false;
  const [inputBoxIsOpen, setInputBoxStatus] = useState<boolean>(initTexVisibility);
  const [input, setInput] = useState<string>("\\LaTeX");

  return (
    <span contentEditable="false">
      <Input value={input} updater={setInput} isTriggered={inputBoxIsOpen} />
      <MathJax
        inline={true}
        dynamic={true}
        onClick={() => {
          setInputBoxStatus(!inputBoxIsOpen);
        }}
        contentEditable="false"
      >
        {"$" + input + "$"}
      </MathJax>
    </span>
  );
}

export default InlineMaths;