import { useState, useRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { NewBlockData, TeXBlockItem } from './TeXBox';

interface TeXBlockProps {
  id: string
  html: string;
  onAddBlock: (x: NewBlockData) => void;
  onUpdateBox: (x: TeXBlockItem) => void;
}

export default function TeXBlock(props: TeXBlockProps): JSX.Element {
  const [innerHtml, setInnerHtml] = useState<string>(props.html);
  const ref = useRef<HTMLElement>(null);

  /* No idea what this does but it is the equivalent of 
  the ComponentDidMount function from Konstantin's code */
  useEffect(() => {
    props.onUpdateBox({
      id: props.id,
      html: props.html,
    })
  }, [innerHtml])

  return (
    <ContentEditable
      innerRef={ref} // This is the ref of the innerHtml.
      html={innerHtml} // This is the innerHtml.
      tagName="span"
      onChange={event => setInnerHtml(event.target.value)} // Change the innerHtml as the user types.
      onKeyDown={event => {
        if (event.key === "Enter") {
          console.log("KeyDown");
          event.preventDefault();
          props.onAddBlock({
            id: props.id,
            ref: ref.current,
          })
        }
      }}
    />
  )
}