import { MathJax3Config } from "better-react-mathjax";

export const mathjaxConfig: MathJax3Config = {
  loader: { load: ["[tex]/autoload"] },
  tex: {
    packages: { "[+]": ["autoload"] },
    inlineMath: [["$", "$"]],
    displayMath: [["\\[", "\\]"], ["\\begin{displaymath}", "\\end{displaymath}"]],
  },
};