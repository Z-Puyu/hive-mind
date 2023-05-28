import { useState, useEffect, useRef } from 'react';
import { TeXBoxItem } from './Editor';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

interface TeXBoxProps {
  id: string;
  html: string;
  initInputVisibility: boolean;
  onAddBox: (box: TeXBoxItem) => void;
  onUpdatePage: (box: TeXBoxItem) => void;
  onDeleteBox: (box: TeXBoxItem) => void;
}

export default function TeXBox(props: TeXBoxProps): JSX.Element {
  const [innerHtml, setInnerHtml] = useState<string>(props.html);
  const [inputIsVisible, setInputVisibility] = useState<boolean>(props.initInputVisibility);
  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    props.onUpdatePage({
      id: props.id,
      html: innerHtml,
      initInputVisibility: props.initInputVisibility,
    })
  }, [innerHtml]);

  const onUpdateInputHandler = (newInput: string) => {
    setInnerHtml(newInput);
  };

  return (
    <div>
      <Input
        isVisible={inputIsVisible}
        value={innerHtml}
        id={props.id}
        ref={boxRef.current}
        onUpdateInput={onUpdateInputHandler}
        onToggleVisibility={setInputVisibility}
        onAddBox={props.onAddBox}
        onDeleteBox={props.onDeleteBox}
      />
      <div 
        className="display-box"
        contentEditable
        onClick={() => setInputVisibility(!inputIsVisible)}>
        <MathJax
          inline={true}
          dynamic={true}
        >
          {innerHtml}
        </MathJax>
      </div>
    </div>
  );
}