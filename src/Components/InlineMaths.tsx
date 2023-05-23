import React from 'react';
import { MathJax } from 'better-react-mathjax';

interface props {
  tex: string;
  inputTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  texVisibility: boolean;
}

const InlineMaths: React.FC<props> = (props) => {
  return (
    <MathJax inline={true} dynamic={true} onClick={() => props.inputTrigger(!props.texVisibility)}
      contentEditable="false">
      {"$" + props.tex + "$"}
    </MathJax>
  );
}

export default InlineMaths;