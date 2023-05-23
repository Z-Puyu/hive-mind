import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

function InlineMaths(): JSX.Element {
  const [inputBoxIsOpen, setInputBoxStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("\\LaTeX");
  return (
    <span contentEditable="false">
      <Input value={input} updater={setInput} isTriggered={inputBoxIsOpen} />
      <MathJax
        inline={true}
        dynamic={true}
        onClick={() => setInputBoxStatus(!inputBoxIsOpen)}
        contentEditable="false"
      >
        {"$" + input + "$"}
      </MathJax>
    </span>
  );
}

export default InlineMaths;