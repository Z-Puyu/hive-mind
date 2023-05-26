import { useState, useRef, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useSelector, useDispatch } from "react-redux";
//import { BlockData, BlockItem } from '../pages/notes';

// interface BlockProps {
//   id: string
//   html: string;
//   onAddBlock: (x: BlockData) => void;
//   onUpdateBox: (x: BlockItem) => void;
// }

export default function Block(props: any): JSX.Element {
  const blocks = useSelector((state: any) => state.note.value);
  console.log(blocks[0].html);
  
  const [innerHtml, setInnerHtml] = useState<string>(props.html);
  //const ref = useRef<HTMLElement>(null);

  const dispatch = useDispatch();

  /* No idea what this does but it is the equivalent of 
  the ComponentDidMount function from Konstantin's code */
  // useEffect(() => {
  //   dispatch(props.onUpdateBlock({
  //     uid: props.uid,
  //     html: innerHtml,
  //   }))
  // }, [innerHtml])

  const HandleChange = (event:any) => {
    const updatedHtml = event.target.value;
    setInnerHtml(updatedHtml);
    dispatch(props.onUpdateBlock({
      uid: props.uid,
      html: event.target.value,
    }))
    // console.log(props.uid);
    // console.log(props.html);
    // console.log(props);
    console.log(blocks[0].html);
  }
  
  const HandleKeyDown = (event:any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // dispatch(props.onAddBlock({
      //   uid: props.uid,
      //   html: props.html,
      // }));
      //console.log(props);
      console.log(blocks[0].html);
    }
    if (event.key === "Backspace" && props.html ==="") {
      event.preventDefault();
      dispatch(props.onDeleteBlock({
        uid: props.uid,
        html: props.html,
      }));
      //console.log(props);
      //console.log(blocks);
    }
  }

  const HandleClick = () => {
    console.log(blocks[0].html);
  } 

  return (
    <ContentEditable
      className="notes"
      //innerRef={ref} // This is the ref of the innerHtml.
      html={innerHtml} // This is the innerHtml.
      tagName="p"
      onChange={HandleChange} // Change the innerHtml as the user types.
      onKeyDown={HandleKeyDown}
      onClick={HandleClick}
    />
  )
}