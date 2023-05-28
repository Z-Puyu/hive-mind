import { useState, useEffect } from 'react';
import { MathJaxContext } from 'better-react-mathjax';
import TeXBox from '../Components/TeXBox'

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
  ref?: HTMLElement | null;
}

export default function Editor(): JSX.Element {
  const initBox: TeXBoxItem = {
    id: uuidv4(),
    html: "On starting the editor, there will be an initial TeXBox. Click on this box, and an input field will pop up for you to edit the contents in this TeXBox with $\\LaTeX$. Try to type \\$\\int\\! \\frac{e^x}{x} \\,\\mathrm{d}x\\$ after THIS WORD: ",
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

  const [[TeXBoxes, nextTargetBox], setTeXBoxes] = useState<[TeXBoxItem[],
    HTMLElement | null | undefined]>([FOR_ILLUSTRATION, undefined]);

  useEffect(() => nextTargetBox?.focus(), [TeXBoxes, nextTargetBox]);

  const onUpdatePageHandler = (updatedBox: TeXBoxItem) => {
    const currBoxList: TeXBoxItem[] = [...TeXBoxes];
    const updatedBoxIndex: number = currBoxList.map(box => box.id).indexOf(updatedBox.id);
    const updatedBoxes: TeXBoxItem[] = [...TeXBoxes];
    updatedBoxes[updatedBoxIndex] = {
      ...updatedBoxes[updatedBoxIndex],
      html: updatedBox.html,
    };
    setTeXBoxes([updatedBoxes, nextTargetBox]);
  };

  const onAddBoxHandler = (currBox: TeXBoxItem) => {
    const currBoxList: TeXBoxItem[] = [...TeXBoxes];
    const currBoxIndex: number = currBoxList.findIndex(box => box.id === currBox.id);
    const updatedBoxes: TeXBoxItem[] = [...currBoxList];
    updatedBoxes.splice(currBoxIndex + 1, 0, { 
      id: uuidv4(), 
      html: currBox.html, 
      initInputVisibility: currBox.initInputVisibility, 
    });
    setTeXBoxes([updatedBoxes, currBox.ref?.nextElementSibling as HTMLElement]);
  };

  const onDeleteBoxHandler = (currBox: TeXBoxItem) => {
    const prevBox: HTMLElement | null = currBox.ref?.previousElementSibling as HTMLElement;
    console.log(currBox.id);
    console.log(initBox.id);
    if (prevBox !== null) {
      const currBoxIndex: number = TeXBoxes.findIndex(box => box.id === currBox.id);
      const updatedBoxes: TeXBoxItem[] = [...TeXBoxes];
      updatedBoxes.splice(currBoxIndex, 1);
      setTeXBoxes([updatedBoxes, prevBox]);
    }
  }

  return (
    <div>
      <MathJaxContext version={3} config={mathjaxConfig}>
        {TeXBoxes.map(box => <TeXBox
          key={box.id}
          id={box.id}
          html={box.html}
          initInputVisibility={box.initInputVisibility}
          onAddBox={onAddBoxHandler}
          onUpdatePage={onUpdatePageHandler}
          onDeleteBox={onDeleteBoxHandler}
        />)}
      </MathJaxContext>
    </div>
  );
}