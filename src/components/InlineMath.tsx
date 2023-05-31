import { RenderElementProps, useSelected } from "slate-react";
import { InlineChromiumBugfix } from "../utils/InlineChromBugFix";
import { useEffect, useState } from "react";
import Input from "./Input";
import { MathJax } from "better-react-mathjax";

export default function InlineMath(props: RenderElementProps) {
  const selected = useSelected();
  // Initialise the input's value with the text in the Element.
  // const [inputValue, setInputValue] = useState<string>(props.children[0].props.text.text);
  const [inputValue, setInputValue] = useState<string>(props.children[0].props.text.text + "\\quad");
  const [inputVisibility, setInputVisibility] = useState<boolean>(false);

  useEffect(() => {setInputVisibility(true)});

  return (
    <>
      <Input 
        isVisible={inputVisibility}
        value={inputValue}
        onChange={setInputValue}
        onToggleVisibility={setInputVisibility}
      />
      <MathJax
        inline
        dynamic
        data-playwright-selected={selected}
        onClick={
          () => {
            console.log("clicked")
            setInputVisibility(!inputVisibility)
          }
        }
      >
        {/* Removed this bug fix as it cause LaTeX to be rendered incorrectly. */}
        {/* <InlineChromiumBugfix /> */}
        {"$" + inputValue + "$"}
        {/* <InlineChromiumBugfix /> */} 
      </MathJax>
    </>
  );
}