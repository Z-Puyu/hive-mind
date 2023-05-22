import React from 'react';
import { useState } from "react";
import MathDisplay from "./MathDisplay";

const TexInput: React.FC = () => {
  const [inputTex, setInputTex] = useState<string>("");
  return (
    <>
    <h1>This is a simple input box, the code in which gets rendered below it.</h1>
    <div>
      <textarea  onChange={event => setInputTex(event.target.value)}>This textarea supports $\LaTeX$</textarea>
      <MathDisplay input={inputTex}/>
      <h4>The following should be built on top of this framework:</h4>
      <ul>
        <li>The code input box should only pop up when the user activates maths mode;</li>
        <li>Pressing enter should trigger an event that creates a new paragraph;</li>
        <li>Incomplete LaTeX code should not be visible to the user, nor should error messages from LaTeX renderer;</li>
        <li>A LaTeX source code file should be available for download, although it should not be visible in the editor itself;</li>
        <li>For non-math texts, input and rendering should be done in exactly the same location.</li>
      </ul>
    </div>
    </>
  )
}

export default  TexInput;