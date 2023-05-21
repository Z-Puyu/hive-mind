import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

interface props {
  input: string;
}

const config = {
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

const MathDisplay: React.FC<props> = ({input}) => {
  return (
    <MathJaxContext version={3} config = {config}>
      <MathJax>
        {input}
      </MathJax>
    </MathJaxContext>
  );
}

export default MathDisplay;