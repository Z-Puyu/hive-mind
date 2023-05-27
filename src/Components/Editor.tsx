import { useState, useEffect } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import TeXBox from './TeXBox'

const { v4: uuidv4 } = require('uuid');

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

export interface TeXBoxItem {
  id: string;
  html: string;
  initInputVisibility: boolean;
}

export interface NewBoxData {
  id: string;
  ref: HTMLElement | null;
}

export default function Editor(): JSX.Element {
  const initBox: TeXBoxItem = {
    id: uuidv4(),
    html: "On starting the editor, there will be an initial TeXBox. Click on this box, and an input field will pop up for you to edit the contents in this TeXBox with $\\LaTeX$. Try to type \\$\\int\\! \\frac{e^x}{x} \\,\\mathrm{d}x\\$ in it and mathematics will be rendered in real time here: ",
    initInputVisibility: false,
  };

  const FOR_ILLUSTRATION: TeXBoxItem[] = [
    initBox,
    {
      id: uuidv4(),
      html: "Click the 1st TeXBox again to close its input field. Now, click here to switch to the 2nd TeXBox. You will notice that the caret is automatically placed at the end of the input field. Without exiting the input field, press Enter key, and a 3rd TeXBox will be instantiated and auto-focused.",
      initInputVisibility: false,
    },
  ]

  const [[TeXBoxes, currBoxData], setTeXBoxes] = useState<[TeXBoxItem[],
    NewBoxData | undefined]>([FOR_ILLUSTRATION, undefined]);

  useEffect(() => (currBoxData?.ref?.nextElementSibling as HTMLElement)?.focus(),
    [TeXBoxes, currBoxData]);

  const updatePageHandler = (updatedBox: TeXBoxItem) => {
    const currBoxList: TeXBoxItem[] = [...TeXBoxes];
    const updatedBoxIndex: number = currBoxList.map(box => box.id).indexOf(updatedBox.id);
    const updatedBoxes: TeXBoxItem[] = [...TeXBoxes];
    updatedBoxes[updatedBoxIndex] = {
      ...updatedBoxes[updatedBoxIndex],
      html: updatedBox.html,
    };
    setTeXBoxes([updatedBoxes, currBoxData]);
  };

  const addBoxHandler = (currBox: NewBoxData) => {
    const currBoxList: TeXBoxItem[] = [...TeXBoxes];
    const currBoxIndex: number = currBoxList.findIndex(box => box.id === currBox.id);
    const updatedBoxes: TeXBoxItem[] = [...currBoxList];
    updatedBoxes.splice(currBoxIndex + 1, 0, { id: uuidv4(), html: "", initInputVisibility: true });
    setTeXBoxes([updatedBoxes, currBox]);
  };

  return (
    <div>
      <MathJaxContext version={3} config={mathjaxConfig}>
        {TeXBoxes.map(box => <TeXBox
          id={box.id}
          html={box.html}
          initInputVisibility={box.initInputVisibility}
          onAddBox={addBoxHandler}
          onUpdatePage={updatePageHandler}
        />)}
      </MathJaxContext>
    </div>
  );
}