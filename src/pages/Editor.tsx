import { MathJaxContext } from "better-react-mathjax";
import TeXBox from "../components/TeXBox";
import { useState } from "react";

const { v4: uuidv4 } = require("uuid");

export interface TeXBoxItem {
  id: string;
}

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

export default function Editor() {
  const [TeXBoxes, setTeXBoxes] = useState<TeXBoxItem[]>([{ id: uuidv4() }]);

  const onAddBoxHandler = (currBox: TeXBoxItem) => {
    const currBoxList: TeXBoxItem[] = [...TeXBoxes];
    const currBoxIndex: number = currBoxList.findIndex(box => box.id === currBox.id);
    const updatedBoxes: TeXBoxItem[] = [...currBoxList];
    updatedBoxes.splice(currBoxIndex + 1, 0, { id: uuidv4() });
    setTeXBoxes(updatedBoxes);
  };

  const onDeleteBoxHandler = (currBox: TeXBoxItem) => {
    const currBoxIndex: number = TeXBoxes.findIndex(box => box.id === currBox.id);
    if (currBoxIndex !== 0) {
      const updatedBoxes: TeXBoxItem[] = [...TeXBoxes];
      updatedBoxes.splice(currBoxIndex, 1);
      setTeXBoxes(updatedBoxes);
    }
  };

  return (
    <div>
      <MathJaxContext version={3} config={mathjaxConfig}>
        {TeXBoxes.map(box => <TeXBox
          key={box.id}
          id={box.id}
          onAddBox={onAddBoxHandler}
          onDeleteBox={onDeleteBoxHandler}
        />)}
      </MathJaxContext>
    </div>
  );
}