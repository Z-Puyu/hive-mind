import React from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import TeXBox from './TeXBox'

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

const Editor: React.FC = () => {
  return (
    <MathJaxContext version={3} config={mathjaxConfig}>
      <TeXBox />
    </MathJaxContext>
  );
}

export default Editor;