import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

interface props {
  tex: string;
  initTexVisibility: boolean;
}

function InlineMaths({ tex, initTexVisibility }: props): JSX.Element {
  const [inputBoxIsOpen, setInputBoxStatus] = useState<boolean>(initTexVisibility);
  const [input, setInput] = useState<string>(tex);

  return (
    <span contentEditable="false">
      <Input
        value={input}
        updater={setInput}
        isTriggered={inputBoxIsOpen}
        toggleVisibility={setInputBoxStatus}
      />
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