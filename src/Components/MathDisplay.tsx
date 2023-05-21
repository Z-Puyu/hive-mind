import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const mathjaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"]
    ],
    displayMath: [
      ["\\[", "\\]"],
      ["\\begin{displaymath}", "\\end{displaymath}"]
    ]
  }
};

interface props {
  input: string;
}

const MathDisplay: React.FC<props> = ({input}) => {
  return (
    <MathJaxContext version={3} config = {mathjaxConfig}>
      <MathJax>
        {input}
      </MathJax>
    </MathJaxContext>
  );
}

export default MathDisplay;