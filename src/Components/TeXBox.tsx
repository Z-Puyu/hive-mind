import { useState, useEffect, useRef } from 'react';
import { NewBoxData, TeXBoxItem } from './Editor';
import { MathJax } from 'better-react-mathjax';
import Input from './Input';

export interface TeXBlockItem {
  id: string;
  html: string;
}

export interface NewBlockData {
  id: string;
  ref: HTMLElement | null;
}

interface TeXBoxProps {
  id: string;
  html: string;
  initInputVisibility: boolean;
  onAddBox: (data: NewBoxData) => void;
  onUpdatePage: (data: TeXBoxItem) => void;
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
      />
      <div 
        className="displayBox"
        onClick={() => setInputVisibility(!inputIsVisible)}>
        <MathJax
          inline={true}
          dynamic={true}
        >
          {/* <ContentEditable
          disabled={true}
          innerRef={BoxRef}
          html={innerHtml}
          tagName="p"
          onChange={event => setInnerHtml(event.target.value)}
          onKeyDown={event => {
            if (!event.shiftKey && event.key === "Enter") {
              event.preventDefault();
              props.onAddBox({ id: props.id, ref: BoxRef.current });
            }
          }}
        /> */}
          {innerHtml}
        </MathJax>
      </div>
    </div>
  );
}