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

function Editor(): JSX.Element {
  return (
    <MathJaxContext version={3} config={mathjaxConfig}>
      <TeXBox />
    </MathJaxContext>
  );
}

export default Editor;