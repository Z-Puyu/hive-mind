import React from 'react';
import { useState } from "react";
import MathDisplay from "./MathDisplay";

const Input: React.FC = () => {
  const [inputTex, setInputTex] = useState<string>("");
  return (
    <div>
      <textarea  onChange={event => setInputTex(event.target.value)}>This textarea supports $\LaTeX$</textarea>
      <MathDisplay input={inputTex}/>
    </div>
  )
}

export default Input;