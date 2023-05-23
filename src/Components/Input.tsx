import React from 'react';

interface props {
  updater: React.Dispatch<React.SetStateAction<string>>;
  isTriggered: boolean;
}

const Input: React.FC<props> = (props) => {
  return props.isTriggered ? (
    <textarea onChange={event => props.updater(event.target.value)}>\LaTeX</textarea>
  ) : null;
}

export default Input;